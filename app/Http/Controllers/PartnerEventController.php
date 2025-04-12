<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class PartnerEventController extends Controller
{
    public function index(){
        return Inertia::render('Partner/Dashboard');
    }
    public function eventScreen(){
        return Inertia::render('Partner/Event');
    }
    public function createEventScreen(){
        return Inertia::render('Partner/CreateEvent');
    }
    public function reportScreen(){
        return Inertia::render('Partner/Report');
    }

    public function createEvent(Request $request){
        
        $validated = $request->validate([
            'title' => ['required'],
            'description' => ['required'],
            'date' => ['required'],
            'time' => ['required'],
            'place' => ['required'],
            'poster' => ['required'],
            'seat' => ['required'],
        ]);
        
        $posterPath = $request ->file('poster')->store('images', 'public');
        $seatPath = $request ->file('seat')->store('images', 'public');
        
        $user = Auth::user()->getAuthIdentifier();

        $event = Event::create([
            'title'=>$validated['title'],
            'description'=>$validated['description'],
            'date'=>$validated['date'],
            'place'=>$validated['place'],
            'time'=>$validated['time'],
            'poster'=>$posterPath,
            'seating_chart'=>$seatPath,
            'user_id'=>$user,
       ]);
        
       return redirect('/partner/event')->with('success', 'Event berhasil dibuat!');
    }
}