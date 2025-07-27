<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    /**
     * Statistiche generali del dashboard
     */
    public function stats()
    {
        try {
            // Conta utenti per tipo
            $totalUsers = User::count();
            $totalProprietari = User::where('user_type', 'proprietario')->count();
            $totalAssociazioni = User::where('user_type', 'associazione')->count();
            $totalVolontari = User::where('user_type', 'volontario')->count();
            $totalAdmins = User::where('user_type', 'admin')->count();
            
            // Calcola cambiamenti percentuali (simulati per ora)
            $usersChange = 12; // +12% questo mese
            $adoptionsChange = 8; // +8% questo mese
            $volunteersChange = 2; // +2% questo mese
            $associationsChange = 3; // +3% questo mese
            
            return response()->json([
                'success' => true,
                'data' => [
                    'totalUsers' => $totalUsers,
                    'totalAdoptions' => 567, // Simulato per ora
                    'totalVolunteers' => $totalVolontari,
                    'totalAssociations' => $totalAssociazioni,
                    'usersChange' => $usersChange,
                    'adoptionsChange' => $adoptionsChange,
                    'volunteersChange' => $volunteersChange,
                    'associationsChange' => $associationsChange,
                    'userBreakdown' => [
                        'proprietari' => $totalProprietari,
                        'associazioni' => $totalAssociazioni,
                        'volontari' => $totalVolontari,
                        'admin' => $totalAdmins
                    ]
                ]
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Errore nel caricamento delle statistiche: ' . $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * Attività recenti del dashboard
     */
    public function recentActivity()
    {
        try {
            // Ottieni gli ultimi utenti registrati
            $recentUsers = User::orderBy('created_at', 'desc')
                ->take(5)
                ->get(['id', 'first_name', 'last_name', 'user_type', 'created_at']);
            
            $activities = [];
            
            foreach ($recentUsers as $user) {
                $activities[] = [
                    'id' => $user->id,
                    'type' => 'user_registered',
                    'title' => 'Nuovo utente registrato',
                    'description' => $user->first_name . ' ' . $user->last_name . ' si è registrato come ' . $user->user_type,
                    'created_at' => $user->created_at->toISOString()
                ];
            }
            
            // Aggiungi alcune attività simulate
            $activities[] = [
                'id' => 999,
                'type' => 'adoption',
                'title' => 'Nuova adozione',
                'description' => 'Luna è stata adottata da Laura Bianchi',
                'created_at' => now()->subHours(5)->toISOString()
            ];
            
            $activities[] = [
                'id' => 998,
                'type' => 'volunteer',
                'title' => 'Nuovo volontario',
                'description' => 'Giuseppe Verdi si è unito come volontario',
                'created_at' => now()->subDays(1)->toISOString()
            ];
            
            return response()->json([
                'success' => true,
                'data' => $activities
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Errore nel caricamento delle attività: ' . $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * Statistiche avanzate (per future implementazioni)
     */
    public function advancedStats()
    {
        return response()->json([
            'success' => true,
            'data' => [
                'message' => 'Statistiche avanzate non ancora implementate'
            ]
        ]);
    }
    
    /**
     * Export utenti (per future implementazioni)
     */
    public function exportUsers()
    {
        return response()->json([
            'success' => true,
            'data' => [
                'message' => 'Export utenti non ancora implementato'
            ]
        ]);
    }
}
