<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User; // <- Import User model
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard');
    }

    public function promotor()
    {
        return Inertia::render('Admin/Promotor');
    }

    public function laporan()
    {
        return Inertia::render('Admin/Laporan');
    }

    public function acara()
    {
        return Inertia::render('Admin/Acara');
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
