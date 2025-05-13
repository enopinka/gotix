<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Event;
use App\Models\Order;

class PartnerOrderController extends Controller
{
    public function index(Request $request)
    {
        $user_id = $request->user()->getAuthIdentifier();
        $events = Event::where('user_id', $user_id)->get();
        $event_ids = $events->pluck('id');
        $orders = Order::whereIn('event_id', $event_ids)->with('user')->get();
        $events_map = $events->map(function ($event) use ($orders) {
            
        $event_orders = $orders->where('event_id', $event->id)->values();
        
      
            
            return [
                'id' => $event->id,
                'title' => $event->title,
                'description' => $event->description,
                'date' => $event->date,
                'time' => $event->time,
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



}