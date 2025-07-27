<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Verifica che l'utente sia autenticato
        if (!$request->user()) {
            return response()->json([
                'success' => false,
                'message' => 'Non autenticato',
            ], 401);
        }

        // Verifica che l'utente sia admin
        if (!$request->user()->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Accesso negato. Permessi amministratore richiesti.',
            ], 403);
        }

        // Verifica che l'account sia attivo
        if (!$request->user()->is_active) {
            return response()->json([
                'success' => false,
                'message' => 'Account non attivo',
            ], 403);
        }

        // Verifica che l'email sia verificata
        if (!$request->user()->hasVerifiedEmail()) {
            return response()->json([
                'success' => false,
                'message' => 'Email non verificata',
            ], 403);
        }

        return $next($request);
    }
} 