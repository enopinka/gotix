<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Event;
use App\Models\Ticket;
use App\Models\Order;
use App\Models\Revenue;
use App\Models\User;

class CustomerEventController extends Controller
{
    public function index(Request $request)
    {
        $query = Event::query();

        // Handle search functionality
        if ($request->has('search') && !empty($request->search)) {
            $searchTerm = $request->search;
            $query->where(function ($q) use ($searchTerm) {
                $q->where('title', 'LIKE', '%' . $searchTerm . '%')
                    ->orWhere('description', 'LIKE', '%' . $searchTerm . '%')
                    ->orWhere('place', 'LIKE', '%' . $searchTerm . '%');
            });
        }

        // Get events with basic relations
        $events = $query->with(['user:id,name'])
            ->orderBy('date', 'asc')
            ->get()
            ->map(function ($event) {
                return [
                    'id' => $event->id,
                    'title' => $event->title,
                    'description' => $event->description,
                    'date' => $event->date,
                    'time' => $event->time,
                    'place' => $event->place,
                    'poster' => $event->poster,
                    'partner_name' => $event->user->name ?? 'Unknown',
                ];
            });

        return Inertia::render('LandingPage', [
            'events' => $events,
            'searchQuery' => $request->search ?? '',
            'totalResults' => $events->count(),
        ]);
    }

    public function checkout($ticketId)
    {
        // Ambil data tiket berdasarkan ID
        $ticket = Ticket::findOrFail($ticketId);

        // Kirim data ke halaman checkout
        return Inertia::render('Customer/Checkout', [
            'ticket' => $ticket,
        ]);
    }

    public function show($id)
    {
        $event = Event::with('categories')->findOrFail($id);

        return Inertia::render('Customer/DetailsEvent', [
            'event' => $event,
        ]);
    }

    public function storeOrder(Request $request)
    {
        dd($request->total_price);
        $request->validate([
            'ticket_id' => 'required|exists:tickets,id',
            'quantity' => 'required|integer|min:1',
            'total_price' => 'required'
        ]);

        // Ambil data tiket terlebih dahulu
        $ticket = Ticket::findOrFail($request->ticket_id);

        // Hitung total harga
        $partner_revenue = $ticket->price * $request->quantity;

        // ngurangi kuota tiket
        $ticket->availablxe_seats -= $request->quantity;

        // Simpan order
        $order = Order::create([
            'user_id' => Auth::id(),
            'ticket_id' => $request->ticket_id,
            'quantity' => $request->quantity,
            'total_price' => $request->totalPrice,
            'event_id' => $ticket->event_id,
            'status' => 'pending',
        ]);

        // update kuota tiket
        $available_seats = $ticket->available_seats;
        $ticket->update(['available_seats' => $available_seats]);
        $ticket->save();

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
    }

    public function eventById($id)
    {
        $event = Event::find($id);

        if (!$event) {
            return redirect()->back()->withErrors(['message' => 'Event tidak ditemukan']);
        }

        $categories = $event->tickets->map(function ($ticket) {
            return [
                'id' => $ticket->id,
                'type' => $ticket->type,
                'price' => $ticket->price,
                'quota' => $ticket->quota,
                'available_seats' => $ticket->available_seats,
            ];
        });

        $partner_id = $event->user_id;
        $partner = User::where('id', $partner_id)->first();
        $partner_name = $partner ? $partner->name : 'Unknown';

        $formattedEvent = [
            'id' => $event->id,
            'title' => $event->title,
            'description' => $event->description,
            'partner_name' => $partner_name,
            'date' => $event->date,
            'time' => $event->time,
            'place' => $event->place,
            'poster' => $event->poster,
            'seating_chart' => $event->seating_chart,
            'categories' => $categories,
        ];

        return Inertia::render('Customer/DetailsEvent', [
            'event' => $formattedEvent,
            'isLoggedIn' => Auth::check(),
        ]);
    }

    /**
     * Search events via AJAX for autocomplete
     */
    public function searchEvents(Request $request)
    {
        $query = $request->get('query', '');

        if (empty($query)) {
            return response()->json([]);
        }

        $events = Event::where('title', 'LIKE', '%' . $query . '%')
            ->orWhere('description', 'LIKE', '%' . $query . '%')
            ->orWhere('place', 'LIKE', '%' . $query . '%')
            ->with(['user:id,name'])
            ->limit(10)
            ->get()
            ->map(function ($event) {
                return [
                    'id' => $event->id,
                    'title' => $event->title,
                    'date' => $event->date,
                    'place' => $event->place,
                    'poster' => $event->poster,
                    'partner_name' => $event->user->name ?? 'Unknown',
                ];
            });

        return response()->json($events);
    }
}
