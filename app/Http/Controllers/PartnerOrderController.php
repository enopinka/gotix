<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PartnerOrderController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render("Partner/Order");
    }


}