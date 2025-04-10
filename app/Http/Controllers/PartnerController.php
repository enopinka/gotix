<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PartnerController extends Controller
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
}