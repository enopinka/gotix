<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\User;
use App\Models\Event;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard');
    }

    public function promotor()
    {
        $promotors = User::with(['events' => function($query) {
                $query->select(
                    'id',
                    'created_at',
                    'updated_at',
                    'title',
                    'description',
                    'date',
                    'time',
                    'place',
                    'user_id',
                    'poster',
                    'seating_chart'
                );
            }])
            ->where('role', 'partner')
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'description' => $user->description ?? null,
                    'profile_picture' => $user->profile_picture ?? null,
                    'events' => $user->events->map(function ($event) {
                        return [
                            'id' => $event->id,
                            'created_at' => $event->created_at,
                            'updated_at' => $event->updated_at,
                            'title' => $event->title,
                            'description' => $event->description,
                            'date' => $event->date,
                            'time' => $event->time,
                            'place' => $event->place,
                            'user_id' => $event->user_id,
                            'poster' => $event->poster,
                            'seating_chart' => $event->seating_chart,
                        ];
                    }),
                ];
            });

        return Inertia::render('Admin/Promotor', [
            'promotors' => $promotors,
        ]);
    }


    public function laporan()
    {
        return Inertia::render('Admin/Laporan');
    }

    public function acara()
    {
        $events = Event::all();

        return Inertia::render('Admin/Acara', [
            'events' => $events,
        ]);
    }

    public function customer()
    {
        // Ambil semua user yang rolenya 'customer'
        $customers = User::where('role', 'customer')->get();

        // Kirim data ke halaman Admin/Customer
        return Inertia::render('Admin/Customer', [
            'customers' => $customers,
        ]);
    }
}
