<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\Admin\DashboardController;
use App\Http\Controllers\Api\Admin\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Rotte pubbliche di autenticazione
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/resend-activation', [AuthController::class, 'resendActivation']);
});

// Rotte protette da autenticazione
Route::middleware('auth:sanctum')->group(function () {
    // Profilo utente
    Route::prefix('auth')->group(function () {
        Route::get('/me', [AuthController::class, 'me']);
        Route::post('/logout', [AuthController::class, 'logout']);
    });
    
    // Rotte Admin
    Route::prefix('admin')->middleware(['admin'])->group(function () {
        // Dashboard
        Route::get('/dashboard/stats', [DashboardController::class, 'stats']);
        Route::get('/dashboard/advanced-stats', [DashboardController::class, 'advancedStats']);
        Route::get('/dashboard/recent-activity', [DashboardController::class, 'recentActivity']);
        Route::get('/dashboard/export-users', [DashboardController::class, 'exportUsers']);
        
        // Gestione Utenti
        Route::prefix('users')->group(function () {
            Route::get('/', [UserController::class, 'index']);
            Route::get('/{user}', [UserController::class, 'show']);
            Route::put('/{user}', [UserController::class, 'update']);
            Route::delete('/{user}', [UserController::class, 'destroy']);
            Route::patch('/{user}/toggle-active', [UserController::class, 'toggleActive']);
            Route::patch('/{user}/verify-email', [UserController::class, 'verifyEmail']);
            Route::patch('/{user}/reset-password', [UserController::class, 'resetPassword']);
        });
    });
});

// Rotta di test per verificare che l'API funzioni
Route::get('/test', function () {
    return response()->json([
        'success' => true,
        'message' => 'API DogsAndCats funzionante',
        'timestamp' => now()->toISOString(),
        'environment' => config('app.env'),
    ]);
}); 