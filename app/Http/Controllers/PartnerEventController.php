<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Ticket;
use App\Models\User;
use App\Models\Order;
use App\Models\Revenue;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class PartnerEventController extends Controller
{
    
    public function eventScreen(){
        $user_id = Auth::user()->getAuthIdentifier();
      
        $events = Event::where('user_id', $user_id)->get();

        return Inertia::render('Partner/Event', ['events'=>$events]);
    }

    public function eventDetailScreen($id){
        $user_id = Auth::user()->getAuthIdentifier();

        $event = Event::find($id);


        if (!$event) {
            return redirect()->back()->withErrors(['message' => 'Event tidak ditemukan']);
        }

        $event_user_id = $event->user_id;
        
        if ($user_id != $event_user_id) {
            return Inertia::render('Partner/Error', ['message' => 'Anda tidak memiliki akses ke acara ini']);
        }

        $categories = Ticket::where('event_id', $id)->get();

        return Inertia::render('Partner/EventDetail', ['event' => $event, 'categories'=>$categories] );

    }

    public function editEvent(Request $request, $id){
       
        $user_id = Auth::user()->getAuthIdentifier();

        $event = Event::find($id);

        
        if (!$event) {
            return redirect()->back()->withErrors(['message' => 'Event tidak ditemukan']);
        };

        $event_user_id = $event->user_id;

        $validated = $request->validate([
            'title' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
            'date' => ['nullable', 'date'],
            'place' => ['nullable', 'string'],
            'time' => ['nullable', 'string'],
            'poster' => ['nullable'],
            'seat' => ['nullable'],
            'banner' => ['nullable'],
        ]);

        if ($user_id != $event_user_id) {
            return Inertia::render('Partner/Error', ['message' => 'Anda tidak memiliki akses ke acara ini']);
        }

        $data = [
            'title' => $validated['title'],
            'description' => $validated['description'],
            'date' => $validated['date'],
            'place' => $validated['place'],
            'time' => $validated['time'],
        ];
        
        if ($request->poster) {
            $posterPath = $request->file('poster')->store('images', 'public');
            $data['poster'] = "/storage/{$posterPath}";
        }
        
        if ($request->seat) {
            $seatPath = $request->file('seat')->store('images', 'public');
            $data['seating_chart'] = "/storage/{$seatPath}";
        }
        
        if ($request->banner) {
            $bannerPath = $request->file('banner')->store('images', 'public');
            $data['banner'] = "/storage/{$bannerPath}";
        }
        
        $event->update($data);
        return redirect('/partner/event')->with('success', 'Event berhasil diubah!');
    }

    public function createEventScreen(){
        
        return Inertia::render('Partner/EditorEvent');
    }

    public function editEventScreen($id){
        $user_id = Auth::user()->getAuthIdentifier();

        $event = Event::find($id);

        if (!$event) {
            return redirect()->back()->withErrors(['message' => 'Event tidak ditemukan']);
        }

        $event_user_id = $event ->user_id;

        
        if ($user_id != $event_user_id) {
            return Inertia::render('Partner/Error', ['message' => 'Anda tidak memiliki akses ke acara ini']);
        }
    
        return Inertia::render('Partner/EditorEvent', ['event' => $event]);
    }

    public function reportScreen(){
        $user_id = Auth::user()->getAuthIdentifier();

        $event_ids = Event::where('user_id', $user_id)->pluck('id');
        $ticket_solds = Order::whereIn('event_id',$event_ids)->sum('quantity');
        
        $total_revenue = Revenue::where('user_id', $user_id)->value('total_revenue');
        $unreleased_earnings = Revenue::where('user_id', $user_id)->value('unreleased_earnings');

        return Inertia::render('Partner/Report', [
            'ticket_solds' => $ticket_solds,
            'total_revenue' => $total_revenue,
            'unreleased_earnings' => $unreleased_earnings,
        ]);
    }

    public function createEvent(Request $request){
        
        $validated = $request->validate([
            'title' => ['required'],
            'description' => ['required'],
            'date' => ['required'],
            'time' => ['required'],
            'place' => ['required'],
            'poster' => ['required'],
            'seat' => ['nullable'],
            'banner' => ['nullable'],
        ]);
        
        $posterPath = $request ->file('poster')->store('images', 'public');
        if ($request->seat) $seatPath = $request ->file('seat')->store('images', 'public');
        if ($request->banner) $bannerPath = $request ->file('banner')->store('images', 'public');
        
        
        $user = Auth::user()->getAuthIdentifier();

        $event = Event::create([
            'title'=>$validated['title'],
            'description'=>$validated['description'],
            'date'=>$validated['date'],
            'place'=>$validated['place'],
            'time'=>$validated['time'],
            'poster'=>"/storage/{$posterPath}",
            'seating_chart'=>"/storage/{$seatPath}",
            'banner'=>"/storage/{$bannerPath}",
            'user_id'=>$user,
       ]);
        
       return redirect('/partner/event')->with('success', 'Event berhasil dibuat!');
    }

    public function createEventCategory(Request $request, $id){ 
        $validated = $request->validate([
            'title'=> ["required"],
            'price'=> ["required"],
            'quota'=> ["required"],
        ]);
        
        $user_id = Auth::id();

        // 1. Validasi apakah event dengan ID ini ada
    $event = Event::find($id);

    if (!$event) {
        return redirect()->back()->withErrors(['Event tidak ditemukan.']);
    }

    // 2. Validasi apakah user adalah pemilik atau authorized untuk event ini
    if ($event->user_id !== $user_id) {
        return redirect()->back()->withErrors(['Anda tidak memiliki akses ke event ini.']);
    }
        
        $category = Ticket::create([
            'event_id' => $id,
            'user_id' => $user_id,
            'type' => $validated['title'],
            'price' => $validated['price'],
            'quota' => $validated['quota'],
            'available_seats' => $validated['quota'], 
        ]);

         
        return redirect('/partner/event/detail/$id')->with('success', 'Event berhasil dibuat!');
    }

    public function deleteEvent($id){
        
        $user_id = Auth::user()->getAuthIdentifier();

        $event = Event::find($id);

        if (!$event) {
            return redirect()->back()->withErrors(['message' => 'Event tidak ditemukan']);
        }

        $event_user_id = $event->user_id;

        if ($user_id != $event_user_id) {
            return Inertia::render('Partner/Error', ['message' => 'Anda tidak memiliki akses ke acara ini']);
        }

        $event->delete();

        return redirect('/partner/event')->with('success', 'Event berhasil dihapus!');
    }

    public function deleteEventCategory($event_id, $category_id){
        $user_id = Auth::user()->getAuthIdentifier();

        $event = Event::find($event_id);

        if (!$event) {
            return redirect()->back()->withErrors(['message' => 'Event tidak ditemukan']);
        }

        $event_user_id = $event->user_id;

        if ($user_id != $event_user_id) {
            return Inertia::render('Partner/Error', ['message' => 'Anda tidak memiliki akses ke acara ini']);
        }

        $category = Ticket::find($category_id);

        if (!$category) {
            return redirect()->back()->withErrors(['message' => 'Kategori tidak ditemukan']);
        }

        $category->delete();

        return redirect('/partner/event/detail/$event_id')->with('success', 'Kategori event berhasil dihapus!');    
    }

    public function editEventCategory(Request $request, $event_id, $category_id){
        $validated = $request->validate([
            'title'=> ["required"],
            'price'=> ["required"],
            'quota'=> ["required"],
        ]);
        
        $user_id = Auth::user()->getAuthIdentifier();

        // 1. Validasi apakah event dengan ID ini ada
        $event = Event::find($event_id);

        if (!$event) {
            return redirect()->back()->withErrors(['Event tidak ditemukan.']);
        }

        // 2. Validasi apakah user adalah pemilik atau authorized untuk event ini
        if ($event->user_id !== $user_id) {
            return redirect()->back()->withErrors(['Anda tidak memiliki akses ke event ini.']);
        }
        
        $category = Ticket::find($category_id); 
        if (!$category) {
            return redirect()->back()->withErrors(['message' => 'Kategori tidak ditemukan']);
        }

        $usedSeats = $category->quota - $category->available_seats;

        if ($validated['quota'] < $usedSeats) {
            return redirect()->back()->withErrors(['quota' => 'Kuota tidak boleh lebih kecil dari jumlah kursi yang sudah terpakai']);
        }

        $newAvailableSeats = $validated['quota'] - $usedSeats;

        $category->update([
            'type' => $validated['title'],
            'price' => $validated['price'],
            'quota' => $validated['quota'],
            'available_seats' => $newAvailableSeats,
        ]);
        return redirect('/partner/event/detail/$event_id')->with('success', 'Kategori event berhasil diubah!');
    }
    public function show($id)
    {
        // Ambil event beserta relasi kategori tiketnya
        $event = Event::with('categories')->findOrFail($id);

        // Kirim ke komponen Inertia (Vue atau React)
        return Inertia::render('Event/Details', [
            'event' => $event,
        ]);
    }
}    