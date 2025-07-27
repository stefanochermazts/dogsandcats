<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Lista utenti con filtri e paginazione
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $query = User::query();

            // Filtri
            if ($request->has('user_type') && $request->user_type !== '') {
                $query->where('user_type', $request->user_type);
            }

            if ($request->has('is_active') && $request->is_active !== '') {
                $query->where('is_active', $request->boolean('is_active'));
            }

            if ($request->has('email_verified') && $request->email_verified !== '') {
                if ($request->boolean('email_verified')) {
                    $query->whereNotNull('email_verified_at');
                } else {
                    $query->whereNull('email_verified_at');
                }
            }

            // Ricerca
            if ($request->has('search') && $request->search !== '') {
                $search = $request->search;
                $query->where(function ($q) use ($search) {
                    $q->where('first_name', 'like', "%{$search}%")
                      ->orWhere('last_name', 'like', "%{$search}%")
                      ->orWhere('email', 'like', "%{$search}%")
                      ->orWhere('organization_name', 'like', "%{$search}%");
                });
            }

            // Ordinamento
            $sortBy = $request->get('sort_by', 'created_at');
            $sortOrder = $request->get('sort_order', 'desc');
            
            $allowedSorts = ['id', 'first_name', 'last_name', 'email', 'user_type', 'is_active', 'created_at', 'last_login_at'];
            if (in_array($sortBy, $allowedSorts)) {
                $query->orderBy($sortBy, $sortOrder === 'asc' ? 'asc' : 'desc');
            }

            // Paginazione
            $perPage = min($request->get('per_page', 15), 100);
            $users = $query->paginate($perPage);

            // Statistiche
            $stats = [
                'total_users' => User::count(),
                'active_users' => User::where('is_active', true)->count(),
                'verified_users' => User::whereNotNull('email_verified_at')->count(),
                'by_type' => [
                    'proprietario' => User::where('user_type', 'proprietario')->count(),
                    'associazione' => User::where('user_type', 'associazione')->count(),
                    'volontario' => User::where('user_type', 'volontario')->count(),
                    'admin' => User::where('user_type', 'admin')->count(),
                ],
            ];

            return response()->json([
                'success' => true,
                'data' => [
                    'users' => $users->items(),
                    'pagination' => [
                        'current_page' => $users->currentPage(),
                        'last_page' => $users->lastPage(),
                        'per_page' => $users->perPage(),
                        'total' => $users->total(),
                        'from' => $users->firstItem(),
                        'to' => $users->lastItem(),
                    ],
                    'stats' => $stats,
                    'filters' => [
                        'user_type' => $request->user_type,
                        'is_active' => $request->is_active,
                        'email_verified' => $request->email_verified,
                        'search' => $request->search,
                        'sort_by' => $sortBy,
                        'sort_order' => $sortOrder,
                    ]
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Errore nel recupero degli utenti',
                'error' => config('app.debug') ? $e->getMessage() : 'Errore interno del server'
            ], 500);
        }
    }

    /**
     * Mostra singolo utente
     */
    public function show(User $user): JsonResponse
    {
        try {
            return response()->json([
                'success' => true,
                'data' => [
                    'user' => [
                        'id' => $user->id,
                        'firstName' => $user->first_name,
                        'lastName' => $user->last_name,
                        'fullName' => $user->full_name,
                        'email' => $user->email,
                        'userType' => $user->user_type,
                        'userTypeLabel' => $user->getUserTypeLabel(),
                        'phone' => $user->phone,
                        'organizationName' => $user->organization_name,
                        'vatNumber' => $user->vat_number,
                        'skills' => $user->skills,
                        'formattedSkills' => $user->formatted_skills,
                        'availabilityStatus' => $user->availability_status,
                        'availabilityStatusLabel' => $user->getAvailabilityStatusLabel(),
                        'isActive' => $user->is_active,
                        'emailVerified' => $user->hasVerifiedEmail(),
                        'emailVerifiedAt' => $user->email_verified_at?->toISOString(),
                        'privacyConsent' => $user->privacy_consent,
                        'termsConsent' => $user->terms_consent,
                        'marketingConsent' => $user->marketing_consent,
                        'lastLoginAt' => $user->last_login_at?->toISOString(),
                        'createdAt' => $user->created_at->toISOString(),
                        'updatedAt' => $user->updated_at->toISOString(),
                    ]
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Errore nel recupero dell\'utente',
                'error' => config('app.debug') ? $e->getMessage() : 'Errore interno del server'
            ], 500);
        }
    }

    /**
     * Aggiorna utente
     */
    public function update(Request $request, User $user): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'firstName' => 'sometimes|required|string|max:255',
                'lastName' => 'sometimes|required|string|max:255',
                'email' => 'sometimes|required|string|email|max:255|unique:users,email,' . $user->id,
                'userType' => 'sometimes|required|in:proprietario,associazione,volontario,admin',
                'phone' => 'nullable|string|max:20',
                'organizationName' => 'nullable|string|max:255',
                'vatNumber' => 'nullable|string|max:50',
                'skills' => 'nullable|array',
                'availabilityStatus' => 'sometimes|in:disponibile,occupato,non_disponibile',
                'isActive' => 'sometimes|boolean',
                'marketingConsent' => 'sometimes|boolean',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Errori di validazione',
                    'errors' => $validator->errors()
                ], 422);
            }

            $validatedData = $validator->validated();

            // Mappa i campi frontend -> database
            $updateData = [];
            
            if (isset($validatedData['firstName'])) {
                $updateData['first_name'] = $validatedData['firstName'];
            }
            if (isset($validatedData['lastName'])) {
                $updateData['last_name'] = $validatedData['lastName'];
            }
            if (isset($validatedData['email'])) {
                $updateData['email'] = $validatedData['email'];
            }
            if (isset($validatedData['userType'])) {
                $updateData['user_type'] = $validatedData['userType'];
            }
            if (isset($validatedData['phone'])) {
                $updateData['phone'] = $validatedData['phone'];
            }
            if (isset($validatedData['organizationName'])) {
                $updateData['organization_name'] = $validatedData['organizationName'];
            }
            if (isset($validatedData['vatNumber'])) {
                $updateData['vat_number'] = $validatedData['vatNumber'];
            }
            if (isset($validatedData['skills'])) {
                $updateData['skills'] = $validatedData['skills'];
            }
            if (isset($validatedData['availabilityStatus'])) {
                $updateData['availability_status'] = $validatedData['availabilityStatus'];
            }
            if (isset($validatedData['isActive'])) {
                $updateData['is_active'] = $validatedData['isActive'];
            }
            if (isset($validatedData['marketingConsent'])) {
                $updateData['marketing_consent'] = $validatedData['marketingConsent'];
            }

            $user->update($updateData);

            return response()->json([
                'success' => true,
                'message' => 'Utente aggiornato con successo',
                'data' => [
                    'user' => [
                        'id' => $user->id,
                        'firstName' => $user->first_name,
                        'lastName' => $user->last_name,
                        'fullName' => $user->full_name,
                        'email' => $user->email,
                        'userType' => $user->user_type,
                        'userTypeLabel' => $user->getUserTypeLabel(),
                        'isActive' => $user->is_active,
                        'updatedAt' => $user->updated_at->toISOString(),
                    ]
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Errore nell\'aggiornamento dell\'utente',
                'error' => config('app.debug') ? $e->getMessage() : 'Errore interno del server'
            ], 500);
        }
    }

    /**
     * Elimina utente
     */
    public function destroy(User $user): JsonResponse
    {
        try {
            // Impedisci l'eliminazione dell'ultimo admin
            if ($user->isAdmin() && User::where('user_type', 'admin')->count() <= 1) {
                return response()->json([
                    'success' => false,
                    'message' => 'Non puoi eliminare l\'ultimo amministratore'
                ], 400);
            }

            $user->delete();

            return response()->json([
                'success' => true,
                'message' => 'Utente eliminato con successo'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Errore nell\'eliminazione dell\'utente',
                'error' => config('app.debug') ? $e->getMessage() : 'Errore interno del server'
            ], 500);
        }
    }

    /**
     * Attiva/Disattiva utente
     */
    public function toggleActive(User $user): JsonResponse
    {
        try {
            $user->update(['is_active' => !$user->is_active]);

            return response()->json([
                'success' => true,
                'message' => $user->is_active ? 'Utente attivato' : 'Utente disattivato',
                'data' => [
                    'user' => [
                        'id' => $user->id,
                        'isActive' => $user->is_active,
                    ]
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Errore nell\'aggiornamento dello stato utente',
                'error' => config('app.debug') ? $e->getMessage() : 'Errore interno del server'
            ], 500);
        }
    }

    /**
     * Forza verifica email
     */
    public function verifyEmail(User $user): JsonResponse
    {
        try {
            if ($user->hasVerifiedEmail()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Email già verificata'
                ], 400);
            }

            $user->markEmailAsVerified();

            return response()->json([
                'success' => true,
                'message' => 'Email verificata manualmente',
                'data' => [
                    'user' => [
                        'id' => $user->id,
                        'emailVerified' => true,
                        'emailVerifiedAt' => $user->email_verified_at->toISOString(),
                    ]
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Errore nella verifica dell\'email',
                'error' => config('app.debug') ? $e->getMessage() : 'Errore interno del server'
            ], 500);
        }
    }

    /**
     * Resetta password utente
     */
    public function resetPassword(Request $request, User $user): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'newPassword' => 'required|string|min:8',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Password non valida',
                    'errors' => $validator->errors()
                ], 422);
            }

            $user->update([
                'password' => Hash::make($request->newPassword)
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Password reimpostata con successo'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Errore nel reset della password',
                'error' => config('app.debug') ? $e->getMessage() : 'Errore interno del server'
            ], 500);
        }
    }
} 