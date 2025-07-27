<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Register a new user
     */
    public function register(Request $request)
    {
        $validated = $request->validate([
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'userType' => 'required|in:proprietario,associazione,volontario,admin',
            'phone' => 'nullable|string|max:20',
            'organizationName' => 'nullable|string|max:255',
            'vatNumber' => 'nullable|string|max:20',
            'skills' => 'nullable|array',
            'availabilityStatus' => 'nullable|in:available,busy,unavailable',
            'privacyConsent' => 'required|boolean|accepted',
            'termsConsent' => 'required|boolean|accepted',
            'marketingConsent' => 'nullable|boolean',
        ]);

        $user = User::create([
            'first_name' => $validated['firstName'],
            'last_name' => $validated['lastName'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'user_type' => $validated['userType'],
            'phone' => $validated['phone'] ?? null,
            'organization_name' => $validated['organizationName'] ?? null,
            'vat_number' => $validated['vatNumber'] ?? null,
            'skills' => $validated['skills'] ?? null,
            'availability_status' => $validated['availabilityStatus'] ?? 'available',
            'privacy_consent' => $validated['privacyConsent'],
            'terms_consent' => $validated['termsConsent'],
            'marketing_consent' => $validated['marketingConsent'] ?? false,
            'is_active' => true,
            'email_verified_at' => now(), // Auto-verify for demo
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Registrazione completata con successo',
            'data' => [
                'user' => [
                    'id' => $user->id,
                    'firstName' => $user->first_name,
                    'lastName' => $user->last_name,
                    'email' => $user->email,
                    'userType' => $user->user_type,
                    'isActive' => $user->is_active,
                    'emailVerified' => !is_null($user->email_verified_at),
                ],
                'token' => $token,
            ]
        ], 201);
    }

    /**
     * Login user
     */
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::attempt($credentials)) {
            return response()->json([
                'success' => false,
                'message' => 'Credenziali non valide'
            ], 401);
        }

        $user = Auth::user();
        
        if (!$user->is_active) {
            return response()->json([
                'success' => false,
                'message' => 'Account non attivo'
            ], 403);
        }

        if (is_null($user->email_verified_at)) {
            return response()->json([
                'success' => false,
                'message' => 'Email non verificata'
            ], 403);
        }

        // Update last login
        $user->updateLastLogin();
        
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Login effettuato con successo',
            'data' => [
                'user' => [
                    'id' => $user->id,
                    'firstName' => $user->first_name,
                    'lastName' => $user->last_name,
                    'email' => $user->email,
                    'userType' => $user->user_type,
                    'isActive' => $user->is_active,
                    'emailVerified' => !is_null($user->email_verified_at),
                ],
                'token' => $token,
            ]
        ]);
    }

    /**
     * Get current user
     */
    public function me(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'success' => true,
            'data' => [
                'user' => [
                    'id' => $user->id,
                    'firstName' => $user->first_name,
                    'lastName' => $user->last_name,
                    'email' => $user->email,
                    'userType' => $user->user_type,
                    'isActive' => $user->is_active,
                    'emailVerified' => !is_null($user->email_verified_at),
                ]
            ]
        ]);
    }

    /**
     * Logout user
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Logout effettuato con successo'
        ]);
    }

    /**
     * Resend activation email
     */
    public function resendActivation(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email'
        ]);

        // For demo purposes, just return success
        return response()->json([
            'success' => true,
            'message' => 'Email di attivazione inviata'
        ]);
    }
}
