<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\User;
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
        $token = $request->bearerToken();

        if (!$token) {
            return response()->json([
                'success' => false,
                'message' => 'Token di accesso mancante'
            ], 401);
        }

        // Gestisci token demo per admin
        if (str_starts_with($token, 'demo_token_')) {
            // Per token demo, simula un utente admin
            $demoUser = new User([
                'id' => 1,
                'first_name' => 'Admin',
                'last_name' => 'Demo',
                'email' => 'admin@dogsandcats.com',
                'user_type' => 'admin',
                'organization_name' => null,
                'phone' => null,
                'vat_number' => null,
                'skills' => [],
                'availability_status' => null,
                'is_active' => true,
                'email_verified_at' => now(),
                'last_login_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
                'privacy_consent' => true,
                'terms_consent' => true,
                'marketing_consent' => false
            ]);
            
            $request->setUserResolver(function () use ($demoUser) {
                return $demoUser;
            });
            
            return $next($request);
        }

        // Per token reali, verifica che l'utente sia admin
        $user = $request->user();
        
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Utente non autenticato'
            ], 401);
        }

        if ($user->user_type !== 'admin') {
            return response()->json([
                'success' => false,
                'message' => 'Accesso negato. Richiesti permessi di amministratore.'
            ], 403);
        }

        return $next($request);
    }
}
