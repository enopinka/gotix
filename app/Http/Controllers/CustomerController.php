<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function index(){
        $events = Event::all();

        return Inertia::render('LandingPage', ['events'=>$events]);
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
            'partner_name' => $partner_name ,
            'date' => $event->date,
            'time' => $event->time,
            'place' => $event->place,
            'poster' => $event->poster,
            'seating_chart' => $event->seating_chart,
            'categories' => $categories,
        ];

        return Inertia::render('Customer/DetailsEvent', [
            'event' => $formattedEvent,
        ]);
    }
    
}