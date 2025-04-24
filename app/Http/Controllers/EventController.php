<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Inertia\Inertia;

class EventController extends Controller
{
    public function show($id)
    {
        // Ambil event berdasarkan ID, termasuk tiket yang terkait
        $event = Event::with('tickets')->find($id);

        // Jika event tidak ditemukan, kembalikan halaman 404
        if (!$event) {
            abort(404, 'Event not found');
        }

        // Kirim data event ke komponen React melalui Inertia
        return Inertia::render('Customer/DetailsEvent', [
            'event' => $event,
        ]);
    }
}