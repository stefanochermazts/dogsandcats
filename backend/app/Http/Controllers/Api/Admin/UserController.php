<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    /**
     * Lista utenti con filtri e paginazione
     */
    public function index(Request $request)
    {
        try {
            $query = User::query();
            
            // Filtro per ricerca
            if ($request->has('search') && !empty($request->search)) {
                $search = $request->search;
                $query->where(function($q) use ($search) {
                    $q->where('first_name', 'like', "%{$search}%")
                      ->orWhere('last_name', 'like', "%{$search}%")
                      ->orWhere('email', 'like', "%{$search}%")
                      ->orWhere('organization_name', 'like', "%{$search}%");
                });
            }
            
            // Filtro per tipo utente
            if ($request->has('user_type') && !empty($request->user_type)) {
                $query->where('user_type', $request->user_type);
            }
            
            // Filtro per stato
            if ($request->has('status') && !empty($request->status)) {
                if ($request->status === 'active') {
                    $query->where('is_active', true);
                } elseif ($request->status === 'inactive') {
                    $query->where('is_active', false);
                }
            }
            
            // Filtro per verifica email
            if ($request->has('email_verified') && !empty($request->email_verified)) {
                if ($request->email_verified === 'verified') {
                    $query->whereNotNull('email_verified_at');
                } elseif ($request->email_verified === 'unverified') {
                    $query->whereNull('email_verified_at');
                }
            }
            
            // Ordinamento
            $sortBy = $request->get('sort_by', 'created_at');
            $sortOrder = $request->get('sort_order', 'desc');
            $query->orderBy($sortBy, $sortOrder);
            
            // Paginazione
            $perPage = $request->get('per_page', 15);
            $users = $query->paginate($perPage);
            
            // Formatta i dati per la risposta
            $formattedUsers = $users->getCollection()->map(function($user) {
                return [
                    'id' => $user->id,
                    'first_name' => $user->first_name,
                    'last_name' => $user->last_name,
                    'email' => $user->email,
                    'user_type' => $user->user_type,
                    'organization_name' => $user->organization_name,
                    'phone' => $user->phone,
                    'is_active' => $user->is_active,
                    'email_verified_at' => $user->email_verified_at,
                    'last_login_at' => $user->last_login_at,
                    'created_at' => $user->created_at,
                    'updated_at' => $user->updated_at,
                    'full_name' => $user->first_name . ' ' . $user->last_name,
                    'status' => $user->is_active ? 'active' : 'inactive',
                    'email_status' => $user->email_verified_at ? 'verified' : 'unverified'
                ];
            });
            
            return response()->json([
                'success' => true,
                'data' => [
                    'users' => $formattedUsers,
                    'pagination' => [
                        'current_page' => $users->currentPage(),
                        'last_page' => $users->lastPage(),
                        'per_page' => $users->perPage(),
                        'total' => $users->total(),
                        'from' => $users->firstItem(),
                        'to' => $users->lastItem()
                    ],
                    'filters' => [
                        'search' => $request->get('search'),
                        'user_type' => $request->get('user_type'),
                        'status' => $request->get('status'),
                        'email_verified' => $request->get('email_verified')
                    ]
                ]
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Errore nel caricamento degli utenti: ' . $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * Mostra dettagli utente
     */
    public function show($userId)
    {
        try {
            // Per token demo, restituisci dati demo
            $token = request()->bearerToken();
            if (str_starts_with($token, 'demo_token_')) {
                $demoUsers = [
                    1 => [
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
                        'marketing_consent' => false,
                        'full_name' => 'Admin Demo',
                        'status' => 'active',
                        'email_status' => 'verified'
                    ],
                    2 => [
                        'id' => 2,
                        'first_name' => 'Marco',
                        'last_name' => 'Gialli',
                        'email' => 'marco.gialli@test.com',
                        'user_type' => 'volontario',
                        'organization_name' => null,
                        'phone' => '+39 123 456 7895',
                        'vat_number' => null,
                        'skills' => ['passeggiate', 'socializzazione'],
                        'availability_status' => 'disponibile',
                        'is_active' => true,
                        'email_verified_at' => now(),
                        'last_login_at' => now(),
                        'created_at' => now(),
                        'updated_at' => now(),
                        'privacy_consent' => true,
                        'terms_consent' => true,
                        'marketing_consent' => false,
                        'full_name' => 'Marco Gialli',
                        'status' => 'active',
                        'email_status' => 'verified'
                    ],
                    3 => [
                        'id' => 3,
                        'first_name' => 'Associazione',
                        'last_name' => 'Test',
                        'email' => 'associazione@test.com',
                        'user_type' => 'associazione',
                        'organization_name' => 'Associazione Test',
                        'phone' => '+39 123 456 7896',
                        'vat_number' => '12345678901',
                        'skills' => [],
                        'availability_status' => null,
                        'is_active' => true,
                        'email_verified_at' => null,
                        'last_login_at' => null,
                        'created_at' => now(),
                        'updated_at' => now(),
                        'privacy_consent' => true,
                        'terms_consent' => true,
                        'marketing_consent' => false,
                        'full_name' => 'Associazione Test',
                        'status' => 'active',
                        'email_status' => 'unverified'
                    ]
                ];
                
                if (isset($demoUsers[$userId])) {
                    return response()->json([
                        'success' => true,
                        'data' => $demoUsers[$userId]
                    ]);
                } else {
                    return response()->json([
                        'success' => false,
                        'message' => 'Utente non trovato'
                    ], 404);
                }
            }
            
            // Per token reali, usa il model binding
            $user = User::find($userId);
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'Utente non trovato'
                ], 404);
            }
            
            $userData = [
                'id' => $user->id,
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'email' => $user->email,
                'user_type' => $user->user_type,
                'organization_name' => $user->organization_name,
                'phone' => $user->phone,
                'vat_number' => $user->vat_number,
                'skills' => $user->skills,
                'availability_status' => $user->availability_status,
                'is_active' => $user->is_active,
                'email_verified_at' => $user->email_verified_at,
                'last_login_at' => $user->last_login_at,
                'created_at' => $user->created_at,
                'updated_at' => $user->updated_at,
                'privacy_consent' => $user->privacy_consent,
                'terms_consent' => $user->terms_consent,
                'marketing_consent' => $user->marketing_consent,
                'full_name' => $user->first_name . ' ' . $user->last_name,
                'status' => $user->is_active ? 'active' : 'inactive',
                'email_status' => $user->email_verified_at ? 'verified' : 'unverified'
            ];
            
            return response()->json([
                'success' => true,
                'data' => $userData
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Errore nel caricamento dei dettagli utente: ' . $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * Aggiorna utente
     */
    public function update(Request $request, User $user)
    {
        try {
            $validated = $request->validate([
                'first_name' => 'sometimes|string|max:255',
                'last_name' => 'sometimes|string|max:255',
                'email' => [
                    'sometimes',
                    'email',
                    Rule::unique('users')->ignore($user->id)
                ],
                'user_type' => 'sometimes|in:proprietario,associazione,volontario,admin',
                'organization_name' => 'sometimes|nullable|string|max:255',
                'phone' => 'sometimes|nullable|string|max:20',
                'vat_number' => 'sometimes|nullable|string|max:20',
                'skills' => 'sometimes|nullable|array',
                'availability_status' => 'sometimes|in:disponibile,occupato,non_disponibile',
                'is_active' => 'sometimes|boolean',
                'privacy_consent' => 'sometimes|boolean',
                'terms_consent' => 'sometimes|boolean',
                'marketing_consent' => 'sometimes|boolean'
            ]);
            
            $user->update($validated);
            
            return response()->json([
                'success' => true,
                'message' => 'Utente aggiornato con successo',
                'data' => $user->fresh()
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Errore nell\'aggiornamento dell\'utente: ' . $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * Elimina utente
     */
    public function destroy(User $user)
    {
        try {
            // Non permettere l'eliminazione dell'admin principale
            if ($user->email === 'admin@dogsandcats.com') {
                return response()->json([
                    'success' => false,
                    'message' => 'Non è possibile eliminare l\'amministratore principale'
                ], 403);
            }
            
            $user->delete();
            
            return response()->json([
                'success' => true,
                'message' => 'Utente eliminato con successo'
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Errore nell\'eliminazione dell\'utente: ' . $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * Reset password utente
     */
    public function resetPassword(Request $request, User $user)
    {
        try {
            $validated = $request->validate([
                'new_password' => 'required|string|min:8'
            ]);
            
            $user->update([
                'password' => Hash::make($validated['new_password'])
            ]);
            
            return response()->json([
                'success' => true,
                'message' => 'Password reimpostata con successo'
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Errore nella reimpostazione della password: ' . $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * Toggle stato attivo/inattivo
     */
    public function toggleActive(User $user)
    {
        try {
            // Non permettere di disattivare l'admin principale
            if ($user->email === 'admin@dogsandcats.com') {
                return response()->json([
                    'success' => false,
                    'message' => 'Non è possibile disattivare l\'amministratore principale'
                ], 403);
            }
            
            $user->update([
                'is_active' => !$user->is_active
            ]);
            
            $status = $user->is_active ? 'attivato' : 'disattivato';
            
            return response()->json([
                'success' => true,
                'message' => "Utente {$status} con successo",
                'data' => [
                    'is_active' => $user->is_active
                ]
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Errore nel cambio di stato: ' . $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * Verifica email utente
     */
    public function verifyEmail(User $user)
    {
        try {
            $user->update([
                'email_verified_at' => now()
            ]);
            
            return response()->json([
                'success' => true,
                'message' => 'Email verificata con successo'
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Errore nella verifica email: ' . $e->getMessage()
            ], 500);
        }
    }
}
