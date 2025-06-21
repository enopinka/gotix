<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Ticket;
use App\Models\Revenue;
use App\Models\Order;
use App\Models\User;
use App\Models\Event;
use Mpdf\Mpdf;

class CustomerOrderController extends Controller
{
    // public function checkout($ticketId)
    // {
    //     // Ambil data tiket berdasarkan ID
    //     $ticket = Ticket::findOrFail($ticketId);

    //     // Kirim data ke halaman checkout
    //     // return Inertia::render('Customer/Checkout', [
    //     //     'ticket' => $ticket,
    //     // ]);
    // }

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
        \Midtrans\Config::$isProduction = config('midtrans.isProduction');
        // Set sanitization on (default)
        \Midtrans\Config::$isSanitized = config('midtrans.isSanitized');
        // Set 3DS transaction for credit card to true
        \Midtrans\Config::$is3ds = config('midtrans.isSanitized');

        $order_id = substr(base_convert(sha1(uniqid(mt_rand())), 16, 36), 0, 8);;
        // Simpan order
        $order = Order::create([
            'order_id' => $order_id,
            'user_id' => Auth::id(),
            'ticket_id' => $request->ticket_id,
            'quantity' => $request->quantity,
            'total_price' => $request->total_price,
            'event_id' => $ticket->event_id,
            'status' => "pending"
        ]);


        $get_order_id = $order->order_id;

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

        return redirect("/tickets")->with('success', 'Order created successfully.');

        // return response()->json([
        //     'message' => 'Order created successfully.',
        //     'order' => $order
        // ], 201);
    }

    public function checkoutPayment(Request $request, $id)
    {
        $order = Order::where($id);

        $json = json_decode($request->getContent());
        // $json = json_decode($request->get('json'));
        // $order = new Order();
        // dd($request);
        $order->status = $json->transaction_status;
        $order->transaction_id = $json->transaction_id;
        $order->order_id = $json->order_id;
        $order->payment_type = $json->payment_type;
        $order->payment_code = isset($json->payment_code) ? $json->payment_code : null;
        $order->pdf_url = isset($json->pdf_url) ? $json->pdf_url : null;
        $order->save();
        return redirect('/tickets')->with('Success', 'Order berhasil dibuat');
    }


    public function createInvoice($id)
    {

        $order = Order::find($id);
        $customer = User::where('id', $order->user_id)->first();
        $event_title = Event::where('id', $order->event_id)->first()->title;
        $ticket_type = Ticket::where('id', $order->ticket_id)->first()->type;
        $item_name = $event_title . " - " . $ticket_type;

        $payload = [
            "order_id" => $order->order_id,
            "invoice_number" => "INV-" . $order->order_id,
            "invoice_date" => $order->created_at->format('d/m/Y H:i'),
            "status" => strtoupper($order->status),
            "customer_details" => [
                "id" => $customer->id,
                "name" => $customer->name,
                "email" => $customer->email,
                "phone" => "89674505304"
            ],
            "item_details" => [
                [
                    "item_id" => $order->ticket->id,
                    "description" => $item_name,
                    "quantity" => $order->quantity,
                    "price" => $order->total_price,
                ]
            ],
            "payment_type" => "payment_link",
        ];

        $html = "
        <html>
        <head>
            <style>
                body {
                    font-family: sans-serif;
                    color: #333;
                    background: #fff;
                    padding: 40px; /* margin KIRI & KANAN sama */
                }
                h1 {
                    color: #00B4FF;
                }
                p, h3 {
                    color: #333;
                }
                .status {
                    font-weight: bold;
                    padding: 5px 12px;
                    border-radius: 20px;
                    color: #fff;
                    background-color: " . ($payload['status'] === 'PAID' ? '#00B4FF' : ($payload['status'] === 'PENDING' ? '#FFC107' : '#F44336')) . ";
                    display: inline-block;
                    font-size: 14px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }
                th {
                    background-color: #00B4FF;
                    color: #fff;
                    padding: 10px;
                    text-align: left;
                }
                td {
                    border: 1px solid #ddd;
                    padding: 10px;
                }
                td.right {
                    text-align: right;
                }
                tr.total-row td {
                    font-weight: bold;
                    background: #f2f2f2;
                }
            </style>
        </head>
        <body>
            <h1>Invoice #{$payload['invoice_number']}</h1>
            <p>Order ID: {$payload['order_id']}</p>
            <p>Status: <span class='status'>{$payload['status']}</span></p>
            <p>Invoice Date: {$payload['invoice_date']}</p>

            <h3>Customer Details</h3>
            <p>Name: {$payload['customer_details']['name']}</p>
            <p>Email: {$payload['customer_details']['email']}</p>
            <p>Phone: {$payload['customer_details']['phone']}</p>

            <h3>Item Details</h3>
            <table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th class='right'>Price</th>
                        <th class='right'>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{$payload['item_details'][0]['description']}</td>
                        <td>{$payload['item_details'][0]['quantity']}</td>
                        <td class='right'>Rp " . number_format($payload['item_details'][0]['price'] / $payload['item_details'][0]['quantity']) . "</td>
                        <td class='right'>Rp " . number_format($payload['item_details'][0]['price']) . "</td>
                    </tr>
                    <tr class='total-row'>
                        <td colspan='3' class='right'>Total</td>
                        <td class='right'>Rp " . number_format($payload['item_details'][0]['price']) . "</td>
                    </tr>
                </tbody>
            </table>
        </body>
        </html>
        ";

        // --------------------------
        // 2️⃣ Buat PDF pakai mPDF
        // --------------------------
        $mpdf = new Mpdf();
        $mpdf->WriteHTML($html);

        // --------------------------
        // 3️⃣ Return PDF ke browser
        // --------------------------
        return response($mpdf->Output('', 'S'))
            ->header('Content-Type', 'application/pdf');
    }
}
