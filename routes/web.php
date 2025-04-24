<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\PartnerEventController;
use App\Http\Controllers\PartnerOrderController;
use App\Http\Middleware\Authentication;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventController;



// diakses publik
Route::get('/', [CustomerController::class, "index"]);
Route::get('/event/{id}', [CustomerController::class, 'event']);
Route::get('/event/{id}', [EventController::class, 'show'])->name('event.show');
Route::get('/login', [AuthController::class, "index"]);
Route::post('/login', [AuthController::class, 'login']);
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
    Route::get('/partner/event/detail/{id}', [PartnerEventController::class, 'eventDetailScreen']);
    Route::get('/partner/event/create', [PartnerEventController::class, 'createEventScreen']);
    Route::get('/partner/event/edit/{id}', [PartnerEventController::class, 'editEventScreen']);
    Route::get('/partner/report', [PartnerEventController::class, 'reportScreen']);
    Route::get('/partner/order', [PartnerOrderController::class, 'index']);

    Route::post('/partner/event/create', [PartnerEventController::class, 'createEvent']);
    Route::post('/partner/event/{id}/category', [PartnerEventController::class, 'createEventCategory']);
    Route::post('/partner/event/edit/{event_id}', [PartnerEventController::class, 'editEvent']);
    
    Route::put('/partner/event/detail/{event_id}/category/{category_id}', [PartnerEventController::class, 'editEventCategory']);
    
    Route::delete('/partner/event/{id}/delete', [PartnerEventController::class, 'deleteEvent']);
    Route::delete('/partner/event/detail/{event_id}/category/{category_id}', [PartnerEventController::class, 'deleteEventCategory']);
}); 




// diakses admin
Route::middleware([Authentication::class.":admin"])->group(function(){
    Route::get('/admin/dashboard', [AdminController::class, 'index']);
    Route::get('/admin/promotor', [AdminController::class, 'promotor']);
    Route::get('/admin/laporan', [AdminController::class, 'laporan']);
    Route::get('/admin/acara', [AdminController::class, 'acara']);
    Route::get('/admin/customer', [AdminController::class, 'customer']);
    Route::get('/admin/dashboard', [AdminController::class, 'index']);

});
