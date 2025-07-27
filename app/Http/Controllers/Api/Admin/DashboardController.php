<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    /**
     * Ottieni statistiche dashboard
     */
    public function stats(): JsonResponse
    {
        try {
            // Statistiche utenti
            $userStats = [
                'total' => User::count(),
                'active' => User::where('is_active', true)->count(),
                'verified' => User::whereNotNull('email_verified_at')->count(),
                'new_this_month' => User::where('created_at', '>=', now()->startOfMonth())->count(),
                'by_type' => [
                    'proprietario' => User::where('user_type', 'proprietario')->count(),
                    'associazione' => User::where('user_type', 'associazione')->count(),
                    'volontario' => User::where('user_type', 'volontario')->count(),
                    'admin' => User::where('user_type', 'admin')->count(),
                ],
                'activity' => [
                    'active_today' => User::where('last_login_at', '>=', now()->startOfDay())->count(),
                    'active_this_week' => User::where('last_login_at', '>=', now()->startOfWeek())->count(),
                    'active_this_month' => User::where('last_login_at', '>=', now()->startOfMonth())->count(),
                ]
            ];

            // Registrazioni degli ultimi 30 giorni
            $registrationsChart = User::select(
                DB::raw('DATE(created_at) as date'),
                DB::raw('COUNT(*) as count')
            )
            ->where('created_at', '>=', now()->subDays(30))
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->map(function ($item) {
                return [
                    'date' => $item->date,
                    'count' => $item->count,
                ];
            });

            // Ultimi utenti registrati
            $recentUsers = User::select([
                'id', 'first_name', 'last_name', 'email', 'user_type', 
                'is_active', 'email_verified_at', 'created_at'
            ])
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'fullName' => $user->full_name,
                    'email' => $user->email,
                    'userType' => $user->user_type,
                    'userTypeLabel' => $user->getUserTypeLabel(),
                    'isActive' => $user->is_active,
                    'emailVerified' => $user->hasVerifiedEmail(),
                    'createdAt' => $user->created_at->toISOString(),
                ];
            });

            // Statistiche per tipo utente negli ultimi 7 giorni
            $userTypeGrowth = [];
            $types = ['proprietario', 'associazione', 'volontario'];
            
            foreach ($types as $type) {
                $userTypeGrowth[$type] = User::where('user_type', $type)
                    ->where('created_at', '>=', now()->subDays(7))
                    ->count();
            }

            // Utenti che necessitano attenzione
            $requiresAttention = [
                'unverified' => User::whereNull('email_verified_at')
                    ->where('created_at', '<=', now()->subDays(7))
                    ->count(),
                'inactive' => User::where('is_active', false)
                    ->whereNotNull('email_verified_at')
                    ->count(),
                'no_login' => User::where('is_active', true)
                    ->where('created_at', '<=', now()->subDays(30))
                    ->whereNull('last_login_at')
                    ->count(),
            ];

            return response()->json([
                'success' => true,
                'data' => [
                    'userStats' => $userStats,
                    'registrationsChart' => $registrationsChart,
                    'recentUsers' => $recentUsers,
                    'userTypeGrowth' => $userTypeGrowth,
                    'requiresAttention' => $requiresAttention,
                    'lastUpdated' => now()->toISOString(),
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Errore nel caricamento delle statistiche',
                'error' => config('app.debug') ? $e->getMessage() : 'Errore interno del server'
            ], 500);
        }
    }

    /**
     * Ottieni statistiche avanzate per periodo specifico
     */
    public function advancedStats(Request $request): JsonResponse
    {
        try {
            $startDate = $request->get('start_date', now()->subDays(30)->format('Y-m-d'));
            $endDate = $request->get('end_date', now()->format('Y-m-d'));
            $groupBy = $request->get('group_by', 'day'); // day, week, month

            // Validazione date
            if (!strtotime($startDate) || !strtotime($endDate)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Date non valide'
                ], 400);
            }

            // Formato per il raggruppamento
            $dateFormat = match($groupBy) {
                'week' => '%Y-%u',
                'month' => '%Y-%m',
                default => '%Y-%m-%d'
            };

            // Registrazioni per periodo
            $registrations = User::select(
                DB::raw("DATE_FORMAT(created_at, '{$dateFormat}') as period"),
                DB::raw('COUNT(*) as total'),
                DB::raw('SUM(CASE WHEN user_type = "proprietario" THEN 1 ELSE 0 END) as proprietario'),
                DB::raw('SUM(CASE WHEN user_type = "associazione" THEN 1 ELSE 0 END) as associazione'),
                DB::raw('SUM(CASE WHEN user_type = "volontario" THEN 1 ELSE 0 END) as volontario')
            )
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy('period')
            ->orderBy('period')
            ->get();

            // Login per periodo
            $logins = User::select(
                DB::raw("DATE_FORMAT(last_login_at, '{$dateFormat}') as period"),
                DB::raw('COUNT(DISTINCT id) as unique_users')
            )
            ->whereNotNull('last_login_at')
            ->whereBetween('last_login_at', [$startDate, $endDate])
            ->groupBy('period')
            ->orderBy('period')
            ->get();

            return response()->json([
                'success' => true,
                'data' => [
                    'registrations' => $registrations,
                    'logins' => $logins,
                    'period' => [
                        'start_date' => $startDate,
                        'end_date' => $endDate,
                        'group_by' => $groupBy,
                    ]
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Errore nel caricamento delle statistiche avanzate',
                'error' => config('app.debug') ? $e->getMessage() : 'Errore interno del server'
            ], 500);
        }
    }

    /**
     * Ottieni attività recenti del sistema
     */
    public function recentActivity(): JsonResponse
    {
        try {
            // Per ora mostriamo solo le registrazioni recenti
            // In futuro si possono aggiungere altre attività (login, modifiche, etc.)
            
            $recentRegistrations = User::select([
                'id', 'first_name', 'last_name', 'email', 'user_type', 'created_at'
            ])
            ->orderBy('created_at', 'desc')
            ->limit(20)
            ->get()
            ->map(function ($user) {
                return [
                    'type' => 'registration',
                    'user' => [
                        'id' => $user->id,
                        'fullName' => $user->full_name,
                        'email' => $user->email,
                        'userType' => $user->user_type,
                        'userTypeLabel' => $user->getUserTypeLabel(),
                    ],
                    'timestamp' => $user->created_at->toISOString(),
                    'description' => "Nuovo utente {$user->getUserTypeLabel()} registrato: {$user->full_name}",
                ];
            });

            $recentLogins = User::select([
                'id', 'first_name', 'last_name', 'email', 'user_type', 'last_login_at'
            ])
            ->whereNotNull('last_login_at')
            ->where('last_login_at', '>=', now()->subDays(7))
            ->orderBy('last_login_at', 'desc')
            ->limit(10)
            ->get()
            ->map(function ($user) {
                return [
                    'type' => 'login',
                    'user' => [
                        'id' => $user->id,
                        'fullName' => $user->full_name,
                        'email' => $user->email,
                        'userType' => $user->user_type,
                        'userTypeLabel' => $user->getUserTypeLabel(),
                    ],
                    'timestamp' => $user->last_login_at->toISOString(),
                    'description' => "Login effettuato da {$user->full_name}",
                ];
            });

            // Combina e ordina tutte le attività
            $allActivities = collect()
                ->merge($recentRegistrations)
                ->merge($recentLogins)
                ->sortByDesc('timestamp')
                ->take(25)
                ->values();

            return response()->json([
                'success' => true,
                'data' => [
                    'activities' => $allActivities,
                    'lastUpdated' => now()->toISOString(),
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Errore nel caricamento delle attività recenti',
                'error' => config('app.debug') ? $e->getMessage() : 'Errore interno del server'
            ], 500);
        }
    }

    /**
     * Esporta dati utenti
     */
    public function exportUsers(Request $request): JsonResponse
    {
        try {
            $format = $request->get('format', 'json'); // json, csv
            $userType = $request->get('user_type');
            $isActive = $request->get('is_active');

            $query = User::query();

            if ($userType) {
                $query->where('user_type', $userType);
            }

            if ($isActive !== null) {
                $query->where('is_active', $request->boolean('is_active'));
            }

            $users = $query->orderBy('created_at', 'desc')->get();

            $exportData = $users->map(function ($user) {
                return [
                    'ID' => $user->id,
                    'Nome' => $user->first_name,
                    'Cognome' => $user->last_name,
                    'Email' => $user->email,
                    'Tipo Utente' => $user->getUserTypeLabel(),
                    'Telefono' => $user->phone,
                    'Organizzazione' => $user->organization_name,
                    'P.IVA' => $user->vat_number,
                    'Competenze' => $user->formatted_skills,
                    'Stato Disponibilità' => $user->getAvailabilityStatusLabel(),
                    'Attivo' => $user->is_active ? 'Sì' : 'No',
                    'Email Verificata' => $user->hasVerifiedEmail() ? 'Sì' : 'No',
                    'Ultimo Login' => $user->last_login_at?->format('d/m/Y H:i'),
                    'Data Registrazione' => $user->created_at->format('d/m/Y H:i'),
                ];
            });

            return response()->json([
                'success' => true,
                'data' => [
                    'users' => $exportData,
                    'count' => $exportData->count(),
                    'format' => $format,
                    'exported_at' => now()->toISOString(),
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Errore nell\'esportazione dei dati',
                'error' => config('app.debug') ? $e->getMessage() : 'Errore interno del server'
            ], 500);
        }
    }
} 