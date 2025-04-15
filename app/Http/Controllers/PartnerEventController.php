<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Ticket;
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
        $user_id = Auth::user()->getAuthIdentifier();
      
        $events = Event::where('user_id', $user_id)->get();

        return Inertia::render('Partner/Event', ['events'=>$events]);
    }

    public function eventDetailScreen($id){
        $user_id = Auth::user()->getAuthIdentifier();

        $event = Event::find($id);

        if (!$event) {
            return Inertia::render('Partner/Error', ['message' => 'Event tidak ditemukan']);
        }

        $categories = Ticket::where('event_id', $id)->get();
        
        $event_user_id = $event ->user_id;

        
        if ($user_id != $event_user_id) {
            return Inertia::render('Partner/Error', ['message' => 'Anda tidak memiliki akses ke acara ini']);
        }
    
        return Inertia::render('Partner/EventDetail', ['event' => $event, 'categories' => $categories]);

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