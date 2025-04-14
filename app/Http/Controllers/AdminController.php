<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index(){
        return Inertia::render('Admin/Dashboard');
    }
    public function promotor(){
        return Inertia::render('Admin/Promotor');
    }
    public function laporan(){
        return Inertia::render('Admin/Laporan');
    }

}
