<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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
        $promotors = User::with('events') // pastikan ada relasi 'events'
            ->where('role', 'partner')
            ->get();

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
