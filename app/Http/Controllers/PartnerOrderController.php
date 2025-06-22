<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Event;
use App\Models\Order;
use App\Models\Ticket;

class PartnerOrderController extends Controller
{
    public function order(Request $request)
    {

        $user_id = $request->user()->getAuthIdentifier();
        $events = Event::where('user_id', $user_id)->get();

        $event_ids = $events->pluck('id');
        $orders = Order::whereIn('event_id', $event_ids)->with('user')->get();
        $events_map = $events->map(function ($event) use ($orders) {
            $event_orders = $orders->where('event_id', $event->id)->values();
            $tickets = Ticket::where('event_id', $event->id)->sum('quota');
            return [
                'id' => $event->id,
                'title' => $event->title,
                'description' => $event->description,
                'date' => $event->date,
                'time' => $event->time,
                'location' => $event->place,
                'quota' => $tickets,
                'orders' => $event_orders->map(function ($order) {
                    return [
                        'id' => $order->id,
                        'name' => $order->user->name,
                        'quantity' => $order->quantity,
                        'total_price' => $order->total_price,
                        'status' => $order->status,
                    ];
                })->all(),

            ];
        });

        return Inertia::render("Partner/Order", ['events' => $events_map]);
    }

    public function orderDetail($id)
    {
        $events = Event::whereId($id)->first();
        $orders = Order::where('event_id', $id)->with('user')->get();

        $orders_map = $orders->map(function ($order) {
            return [
                'id' => $order->id,
                'name' => $order->user->name,
                'quantity' => $order->quantity,
                'ticket_type' => $order->ticket->type,
                'total_price' => $order->total_price,
                'status' => $order->status,
            ];
        });
        return Inertia::render("Partner/OrderDetail", ['event' => $events, 'orders' => $orders_map]);
    }
}
