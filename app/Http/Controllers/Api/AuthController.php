<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Auth\Events\Registered;

class AuthController extends Controller
{
    /**
     * Registrazione nuovo utente
     */
    public function register(Request $request): JsonResponse
    {
        try {
            // Validazione dati
            $validator = Validator::make($request->all(), [
                'firstName' => 'required|string|max:255',
                'lastName' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8|confirmed',
                'userType' => 'required|in:proprietario,associazione,volontario',
                'phone' => 'nullable|string|max:20',
                'organizationName' => 'required_if:userType,associazione|string|max:255',
                'vatNumber' => 'nullable|string|max:50',
                'privacyConsent' => 'required|accepted',
                'termsConsent' => 'required|accepted',
                'marketingConsent' => 'boolean',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Errori di validazione',
                    'errors' => $validator->errors()
                ], 422);
            }

            $validatedData = $validator->validated();

            // Crea l'utente
            $user = User::create([
                'first_name' => $validatedData['firstName'],
                'last_name' => $validatedData['lastName'],
                'email' => $validatedData['email'],
                'password' => $validatedData['password'],
                'user_type' => $validatedData['userType'],
                'phone' => $validatedData['phone'] ?? null,
                'organization_name' => $validatedData['organizationName'] ?? null,
                'vat_number' => $validatedData['vatNumber'] ?? null,
                'privacy_consent' => true,
                'terms_consent' => true,
                'marketing_consent' => $validatedData['marketingConsent'] ?? false,
                'is_active' => false, // Richiede attivazione email
            ]);

            // Invia email di verifica
            event(new Registered($user));

            // Crea token per l'utente
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'success' => true,
                'message' => 'Registrazione completata con successo. Controlla la tua email per attivare l\'account.',
                'data' => [
                    'user' => [
                        'id' => $user->id,
                        'firstName' => $user->first_name,
                        'lastName' => $user->last_name,
                        'email' => $user->email,
                        'userType' => $user->user_type,
                        'isActive' => $user->is_active,
                        'emailVerified' => $user->hasVerifiedEmail(),
                    ],
                    'token' => $token,
                ]
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Errore durante la registrazione',
                'error' => config('app.debug') ? $e->getMessage() : 'Errore interno del server'
            ], 500);
        }
    }

    /**
     * Login utente
     */
    public function login(Request $request): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required|email',
                'password' => 'required|string',
                'rememberMe' => 'boolean',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Dati di accesso non validi',
                    'errors' => $validator->errors()
                ], 422);
            }

            $credentials = $request->only('email', 'password');

            // Verifica le credenziali
            if (!Auth::attempt($credentials)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Credenziali non valide'
                ], 401);
            }

            $user = Auth::user();

            // Verifica se l'utente è attivo
            if (!$user->is_active) {
                Auth::logout();
                return response()->json([
                    'success' => false,
                    'message' => 'Account non attivato. Controlla la tua email.',
                    'requiresActivation' => true
                ], 403);
            }

            // Aggiorna ultimo login
            $user->updateLastLogin();

            // Crea token
            $tokenName = $request->boolean('rememberMe') ? 'remember_token' : 'auth_token';
            $token = $user->createToken($tokenName)->plainTextToken;

            return response()->json([
                'success' => true,
                'message' => 'Accesso effettuato con successo',
                'data' => [
                    'user' => [
                        'id' => $user->id,
                        'firstName' => $user->first_name,
                        'lastName' => $user->last_name,
                        'email' => $user->email,
                        'userType' => $user->user_type,
                        'fullName' => $user->full_name,
                        'isActive' => $user->is_active,
                        'emailVerified' => $user->hasVerifiedEmail(),
                        'lastLoginAt' => $user->last_login_at?->toISOString(),
                    ],
                    'token' => $token,
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Errore durante l\'accesso',
                'error' => config('app.debug') ? $e->getMessage() : 'Errore interno del server'
            ], 500);
        }
    }

    /**
     * Logout utente
     */
    public function logout(Request $request): JsonResponse
    {
        try {
            // Revoca il token corrente
            $request->user()->currentAccessToken()->delete();

            return response()->json([
                'success' => true,
                'message' => 'Logout effettuato con successo'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Errore durante il logout',
                'error' => config('app.debug') ? $e->getMessage() : 'Errore interno del server'
            ], 500);
        }
    }

    /**
     * Ottieni informazioni utente autenticato
     */
    public function me(Request $request): JsonResponse
    {
        try {
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
                        'userTypeLabel' => $user->getUserTypeLabel(),
                        'fullName' => $user->full_name,
                        'phone' => $user->phone,
                        'organizationName' => $user->organization_name,
                        'vatNumber' => $user->vat_number,
                        'skills' => $user->skills,
                        'formattedSkills' => $user->formatted_skills,
                        'availabilityStatus' => $user->availability_status,
                        'availabilityStatusLabel' => $user->getAvailabilityStatusLabel(),
                        'isActive' => $user->is_active,
                        'emailVerified' => $user->hasVerifiedEmail(),
                        'privacyConsent' => $user->privacy_consent,
                        'termsConsent' => $user->terms_consent,
                        'marketingConsent' => $user->marketing_consent,
                        'lastLoginAt' => $user->last_login_at?->toISOString(),
                        'createdAt' => $user->created_at->toISOString(),
                    ]
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Errore nel recupero dati utente',
                'error' => config('app.debug') ? $e->getMessage() : 'Errore interno del server'
            ], 500);
        }
    }

    /**
     * Richiedi nuova email di attivazione
     */
    public function resendActivation(Request $request): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required|email|exists:users,email',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Email non valida',
                    'errors' => $validator->errors()
                ], 422);
            }

            $user = User::where('email', $request->email)->first();

            if ($user->hasVerifiedEmail()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Account già attivato'
                ], 400);
            }

            // Invia nuova email di verifica
            $user->sendEmailVerificationNotification();

            return response()->json([
                'success' => true,
                'message' => 'Email di attivazione inviata nuovamente'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Errore nell\'invio dell\'email',
                'error' => config('app.debug') ? $e->getMessage() : 'Errore interno del server'
            ], 500);
        }
    }
} 