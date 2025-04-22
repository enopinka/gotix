<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function index(){
        $events = Event::all();

        return Inertia::render('LandingPage', ['events'=>$events]);
    }

    public function event($id){
    
        $event = Event::find($id);
        if (!$event) {
            return redirect()->back()->withErrors(['message' => 'Event tidak ditemukan']);
        }

        // $categories = $event->tickets;
        // $promotor = $event->user;
        // $event_user_id = $event->user_id;

        return Inertia::render('Customer/DetailsEvent', ['event' => $event]);
    }
}