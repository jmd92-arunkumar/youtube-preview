<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\VideoController;



// Inertia page route
Route::get('/', [VideoController::class, 'index']);

// Data fetch route for frontend (JSON response)
Route::get('/videos/data', [VideoController::class, 'data']);

// Search/filter route (JSON response)
Route::get('/videos/filter', [VideoController::class, 'filter']);

require __DIR__.'/settings.php';
