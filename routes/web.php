<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\PartnerEventController;
use App\Http\Middleware\Authentication;
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

Route::get('/register', [AuthController::class, 'registerScreen']);

Route::post('/register', [AuthController::class, 'register']);

// diakses customer
Route::middleware([Authentication::class."customer"])->group( function(){

});


// diakses partner
Route::middleware([Authentication::class.":partner"])->group(function(){
    Route::get('/partner', [PartnerEventController::class, 'index']);
    Route::get('/partner/event', [PartnerEventController::class, 'eventScreen']);
    Route::get('/partner/event/{id}', [PartnerEventController::class, 'eventDetailScreen']);
    Route::get('/partner/event/create', [PartnerEventController::class, 'createEventScreen']);
    Route::get('/partner/report', [PartnerEventController::class, 'reportScreen']);

    Route::post('/partner/event/create', [PartnerEventController::class, 'createEvent']);
}); 



// diakses admin
Route::middleware([Authentication::class.":admin"])->group(function(){
    Route::get('/admin', [AdminController::class, 'index']);
    Route::get('/admin/promotor', [AdminController::class, 'promotor']);
    Route::get('/admin/laporan', [AdminController::class, 'laporan']);
});
