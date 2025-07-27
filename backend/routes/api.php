<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\Admin\UserController;
use App\Http\Controllers\Api\Admin\DashboardController;

// Test endpoint
Route::get('/test', function () {
    return response()->json([
        'success' => true,
        'message' => 'Backend Laravel funzionante!',
        'timestamp' => now()->toISOString(),
        'version' => '1.0.0'
    ]);
});

// Public authentication routes
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/resend-activation', [AuthController::class, 'resendActivation']);
});

// Protected routes (require authentication)
Route::middleware('token.auth')->prefix('auth')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

// Admin routes (require admin authentication)
Route::middleware('admin')->prefix('admin')->group(function () {
    // Dashboard routes
    Route::prefix('dashboard')->group(function () {
        Route::get('/general', [DashboardController::class, 'stats']);
        Route::get('/recent-activity', [DashboardController::class, 'recentActivity']);
        Route::get('/advanced-stats', [DashboardController::class, 'advancedStats']);
        Route::post('/export-users', [DashboardController::class, 'exportUsers']);
    });
    
    // User management routes
    Route::prefix('users')->group(function () {
        Route::get('/', [UserController::class, 'index']);
        Route::get('/{user}', [UserController::class, 'show']);
        Route::put('/{user}', [UserController::class, 'update']);
        Route::delete('/{user}', [UserController::class, 'destroy']);
        Route::post('/{user}/toggle-active', [UserController::class, 'toggleActive']);
        Route::post('/{user}/verify-email', [UserController::class, 'verifyEmail']);
        Route::post('/{user}/reset-password', [UserController::class, 'resetPassword']);
    });
}); 