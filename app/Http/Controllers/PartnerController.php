<?php

namespace App\Http\Controllers;
use App\Models\Event;
use App\Models\Order;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;

class PartnerController extends Controller
{
    public function index(){
        $user_id = Auth::user()->getAuthIdentifier();

        
        $event_ids = Event::where('user_id', $user_id)->pluck('id');

        $total_event = $event_ids->count();
        $total_ticket_sold = Order::whereIn('event_id',$event_ids)->sum('quantity');
       
        $total_earnings = Order::whereIn('event_id', $event_ids)->sum('total_price');

        // dd($total_event, $total_ticket_sold, $total_earnings);

        return Inertia::render('Partner/Dashboard', [
            'events' => $total_event,
            'ticket_solds' => $total_ticket_sold,
            'earnings' => $total_earnings
        ]);
    }
}