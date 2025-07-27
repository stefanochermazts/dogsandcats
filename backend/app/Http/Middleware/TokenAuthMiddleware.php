<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\PersonalAccessToken;
use App\Models\User;
use Symfony\Component\HttpFoundation\Response;

class TokenAuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken();

        if (!$token) {
            return response()->json([
                'success' => false,
                'message' => 'Token di accesso mancante'
            ], 401);
        }

        // Gestisci token demo
        if (str_starts_with($token, 'demo_token_')) {
            return response()->json([
                'success' => false,
                'message' => 'demo_token_detected'
            ], 401);
        }

        // Trova il token nel database
        $accessToken = PersonalAccessToken::findToken($token);

        if (!$accessToken) {
            return response()->json([
                'success' => false,
                'message' => 'Token di accesso non valido'
            ], 401);
        }

        // Trova l'utente associato
        $user = User::find($accessToken->tokenable_id);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Utente non trovato'
            ], 401);
        }

        // Verifica che l'utente sia attivo
        if (!$user->is_active) {
            return response()->json([
                'success' => false,
                'message' => 'Account non attivo'
            ], 403);
        }

        // Aggiorna last_used_at
        $accessToken->update(['last_used_at' => now()]);

        // Imposta l'utente autenticato
        $request->setUserResolver(function () use ($user) {
            return $user;
        });

        return $next($request);
    }
} 