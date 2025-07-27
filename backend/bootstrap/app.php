<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        // Registra middleware personalizzati
        $middleware->alias([
            'admin' => \App\Http\Middleware\AdminMiddleware::class,
            'token.auth' => \App\Http\Middleware\TokenAuthMiddleware::class,
            'cors' => \App\Http\Middleware\CorsMiddleware::class,
        ]);
        
        // Applica CORS a tutte le route API
        $middleware->group('api', [
            \App\Http\Middleware\CorsMiddleware::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
