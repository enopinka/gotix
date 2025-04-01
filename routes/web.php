<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\PartnerController;
use App\Http\Controllers\PartnerControllerController;
use App\Http\Controllers\ProfileController;
use App\Http\Middleware\Authentication;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// diakses publik
Route::get('/', function(){
    return Inertia::render("LandingPage");
});

Route::get('/login', [AuthController::class, "index"]
);

Route::post('/login', [AuthController::class, 'login']
);

Route::get('/logout', [AuthController::class, 'logout']);

Route::get('/register', function(){
    return Inertia::render("Register");
});

// diakses customer
Route::middleware([Authentication::class."customer"])->group( function(){

});


// diakses partner
Route::middleware([Authentication::class.":partner"])->group(function(){
    Route::get('/partner', [PartnerController::class, 'index']);
}); 


// diakses admin
Route::middleware([Authentication::class.":admin"])->group(function(){
    Route::get('/admin', [AdminController::class, 'index']);
});