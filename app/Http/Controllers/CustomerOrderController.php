<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Ticket;
use App\Models\Revenue;
use App\Models\Order;

class CustomerOrderController extends Controller
{
    public function checkout($ticketId)
    {
        // Ambil data tiket berdasarkan ID
        $ticket = Ticket::findOrFail($ticketId);

        // Kirim data ke halaman checkout
        // return Inertia::render('Customer/Checkout', [
        //     'ticket' => $ticket,
        // ]);
    }

    public function storeOrder(Request $request)
    {
        $request->validate([
            'ticket_id' => 'required|exists:tickets,id',
            'quantity' => 'required|integer|min:1',
            'total_price' => 'required'
        ]);

        // Ambil data tiket terlebih dahulu
        $ticket = Ticket::findOrFail($request->ticket_id);

        // Hitung total harga
        $partner_revenue = $ticket->price * $request->quantity;

        // Mengurangi kuota tiket
        $ticket->available_seats -= $request->quantity;

        // Set your Merchant Server Key
        \Midtrans\Config::$serverKey = config('midtrans.serverKey');
        // Set to Development/Sandbox Environment (default). Set to true for Production Environment (accept real transaction).
        \Midtrans\Config::$isProduction = false;
        // Set sanitization on (default)
        \Midtrans\Config::$isSanitized = true;
        // Set 3DS transaction for credit card to true
        \Midtrans\Config::$is3ds = true;

        // Simpan order
        $order = Order::create([
            'user_id' => Auth::id(),
            'ticket_id' => $request->ticket_id,
            'quantity' => $request->quantity,
            'total_price' => $request->total_price,
            'event_id' => $ticket->event_id,
            'status' => 'pending',
        ]);

        $get_order_id = $order->id;

        $params = array(
            'transaction_details' => array(
                'order_id' => $get_order_id,
                'gross_amount' => $request->total_price,
            ),
            'customer_details' => array(
                'name' => Auth::user()->name,
                'email' => Auth::user()->email,
            ),
        );

        // dapetin snap token
        $snapToken = \Midtrans\Snap::getSnapToken($params);
        $order->update(["snap_token" => $snapToken]);

        $available_seats = $ticket->available_seats;
        $ticket->update(['available_seats' => $available_seats]);
        $ticket->save();

        $order->snap_token = $snapToken;
        $order->save();

        //update pendapatan mitra
        $partner_id = $ticket->event->user_id;
        $revenue = Revenue::where('user_id', $partner_id)->first();
        if ($revenue) {
            $revenue->total_revenue += $partner_revenue;
            $revenue->unreleased_earnings += $partner_revenue;
            $revenue->save();
        } else {
            Revenue::create([
                'total_revenue' => $partner_revenue,
                'unreleased_earnings' => $partner_revenue,
                'user_id' => $partner_id,
            ]);
        }

        return redirect("/event/{$ticket->event_id}")->with('success', 'Order created successfully.');

        // return response()->json([
        //     'message' => 'Order created successfully.',
        //     'order' => $order
        // ], 201);
    }

    public function checkoutPayment(Request $request)
    {
        dd($request);
    }
}
