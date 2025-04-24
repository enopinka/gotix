<?php

namespace App\Http\Controllers;

use App\Models\Event;

class EventController extends Controller
{
    public function show($id)
    {
        $event = Event::with('tickets')->find($id);

        if (!$event) {
            return response()->json(['error' => 'Event not found'], 404);
        }

        return response()->json($event);
    }
}