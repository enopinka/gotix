<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CustomerProfileController;
use App\Http\Controllers\PartnerController;
use App\Http\Controllers\PartnerEventController;
use App\Http\Controllers\PartnerOrderController;
use App\Http\Controllers\CustomerEventController;
use App\Http\Controllers\CustomerOrderController;
use App\Http\Controllers\MidtransApiController;
use App\Http\Middleware\Authentication;
use App\Http\Middleware\ContentSecurityPolicy;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Spatie\Csp\AddCspHeaders;

// diakses publik
Route::get('/', [CustomerEventController::class, "index"]);
Route::get('/event/{id}', [CustomerEventController::class, 'eventById']);
// Route::get('/event/{id}', [EventController::class, 'show'])->name('event.show');
Route::get('/login', [AuthController::class, "index"]);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/logout', [AuthController::class, 'logout']);
Route::get('/register', [AuthController::class, 'registerScreen']);
Route::get('/api/search-events', [CustomerEventController::class, 'searchEvents']);
Route::post('/register', [AuthController::class, 'register']);

// diakses customer
Route::middleware([Authentication::class . ":customer"])->group(function () {
    // Profile routes
    Route::get('/profile', [CustomerProfileController::class, 'profileScreenV2']);
    Route::get('/checkout/{ticketId}', [CustomerEventController::class, 'checkout'])->name('checkout');
    Route::get('/tickets', [CustomerProfileController::class, 'myTickets'])->name('customer.tickets');
    Route::get('/api/search-events', [CustomerEventController::class, 'searchEvents']);

    // Route::post('/profile/photo', [CustomerProfileController::class, 'updatePhoto'])->name('customer.profile.photo');
    Route::post('/orders', [CustomerOrderController::class, 'storeOrder']);
    Route::post('/profile/update', [CustomerProfileController::class, 'updateProfileV2'])->name('customer.profile.update');
    Route::post('/payment-handler', [MidtransApiController::class, 'paymentHandler']);
    Route::post('/payment', [CustomerOrderController::class, 'payment_post']);

    Route::put('/profile/password', [CustomerProfileController::class, 'updatePassword'])->name('customer.profile.password');
    Route::put('/checkout/{ticketId}', [CustomerOrderController::class, 'checkoutPayment']);

    // Route::delete('/profile/photo/delete', [CustomerProfileController::class, 'deletePhoto'])->name('customer.profile.photo.delete');

});


// diakses partner
Route::middleware([Authentication::class . ":partner"])->group(function () {
    Route::get('/partner', [PartnerController::class, 'index']);
    Route::get('/partner/event', [PartnerEventController::class, 'eventScreen']);
    Route::get('/partner/event/detail/{id}', [PartnerEventController::class, 'eventDetailScreen']);
    Route::get('/partner/event/create', [PartnerEventController::class, 'createEventScreen']);
    Route::get('/partner/event/edit/{id}', [PartnerEventController::class, 'editEventScreen']);
    Route::get('/partner/report', [PartnerEventController::class, 'reportScreen']);
    Route::get('/partner/order', [PartnerOrderController::class, 'order']);
    Route::get('/partner/order/{id}', [PartnerOrderController::class, 'orderDetail']);

    Route::post('/partner/event/create', [PartnerEventController::class, 'createEvent']);
    Route::post('/partner/event/{id}/category', [PartnerEventController::class, 'createEventCategory']);
    Route::post('/partner/event/edit/{event_id}', [PartnerEventController::class, 'editEvent']);

    Route::put('/partner/event/detail/{event_id}/category/{category_id}', [PartnerEventController::class, 'editEventCategory']);

    Route::delete('/partner/event/{id}/delete', [PartnerEventController::class, 'deleteEvent']);
    Route::delete('/partner/event/detail/{event_id}/category/{category_id}', [PartnerEventController::class, 'deleteEventCategory']);
});




// diakses admin
Route::middleware([Authentication::class . ":admin"])->group(function () {
    Route::get('/admin/dashboard', [AdminController::class, 'index']);
    Route::get('/admin/promotor', [AdminController::class, 'promotor']);
    Route::get('/admin/laporan', [AdminController::class, 'laporan']);
    Route::get('/admin/acara', [AdminController::class, 'acara']);
    Route::get('/admin/customer', [AdminController::class, 'customer']);
});
