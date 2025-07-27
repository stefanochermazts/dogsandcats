<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Admin user
        User::create([
            'first_name' => 'Admin',
            'last_name' => 'DogsAndCats',
            'email' => 'admin@dogsandcats.com',
            'email_verified_at' => now(),
            'password' => Hash::make('admin123'),
            'user_type' => 'admin',
            'phone' => '+39 123 456 7890',
            'privacy_consent' => true,
            'terms_consent' => true,
            'marketing_consent' => false,
            'is_active' => true,
            'last_login_at' => now(),
        ]);

        // Proprietario test user
        User::create([
            'first_name' => 'Mario',
            'last_name' => 'Rossi',
            'email' => 'proprietario@test.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password123'),
            'user_type' => 'proprietario',
            'phone' => '+39 321 654 9870',
            'privacy_consent' => true,
            'terms_consent' => true,
            'marketing_consent' => true,
            'is_active' => true,
            'last_login_at' => now()->subHours(2),
        ]);

        // Associazione test user
        User::create([
            'first_name' => 'Laura',
            'last_name' => 'Bianchi',
            'email' => 'associazione@test.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password123'),
            'user_type' => 'associazione',
            'phone' => '+39 456 789 0123',
            'organization_name' => 'Rifugio Amici a 4 Zampe',
            'vat_number' => '12345678901',
            'privacy_consent' => true,
            'terms_consent' => true,
            'marketing_consent' => true,
            'is_active' => true,
            'last_login_at' => now()->subDays(1),
        ]);

        // Volontario test user
        User::create([
            'first_name' => 'Giuseppe',
            'last_name' => 'Verdi',
            'email' => 'volontario@test.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password123'),
            'user_type' => 'volontario',
            'phone' => '+39 789 012 3456',
            'skills' => ['addestramento', 'cure mediche', 'trasporto'],
            'availability_status' => 'disponibile',
            'privacy_consent' => true,
            'terms_consent' => true,
            'marketing_consent' => false,
            'is_active' => true,
            'last_login_at' => now()->subHours(6),
        ]);

        // Altri utenti di esempio per popolare la dashboard
        
        // Proprietari aggiuntivi
        User::create([
            'first_name' => 'Anna',
            'last_name' => 'Verdi',
            'email' => 'anna.verdi@email.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password123'),
            'user_type' => 'proprietario',
            'phone' => '+39 111 222 3333',
            'privacy_consent' => true,
            'terms_consent' => true,
            'marketing_consent' => true,
            'is_active' => true,
            'last_login_at' => now()->subDays(3),
        ]);

        User::create([
            'first_name' => 'Paolo',
            'last_name' => 'Neri',
            'email' => 'paolo.neri@email.com',
            'email_verified_at' => null, // Non verificato
            'password' => Hash::make('password123'),
            'user_type' => 'proprietario',
            'phone' => '+39 444 555 6666',
            'privacy_consent' => true,
            'terms_consent' => true,
            'marketing_consent' => false,
            'is_active' => false, // Non attivo
            'last_login_at' => null,
        ]);

        // Associazioni aggiuntive
        User::create([
            'first_name' => 'Francesca',
            'last_name' => 'Gialli',
            'email' => 'francesca@rifugio.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password123'),
            'user_type' => 'associazione',
            'phone' => '+39 777 888 9999',
            'organization_name' => 'Rifugio della Speranza',
            'vat_number' => '98765432109',
            'privacy_consent' => true,
            'terms_consent' => true,
            'marketing_consent' => true,
            'is_active' => true,
            'last_login_at' => now()->subDays(2),
        ]);

        // Volontari aggiuntivi
        User::create([
            'first_name' => 'Marco',
            'last_name' => 'Blu',
            'email' => 'marco.blu@email.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password123'),
            'user_type' => 'volontario',
            'phone' => '+39 000 111 2222',
            'skills' => ['pulizia canili', 'passeggiate'],
            'availability_status' => 'occupato',
            'privacy_consent' => true,
            'terms_consent' => true,
            'marketing_consent' => true,
            'is_active' => true,
            'last_login_at' => now()->subHours(12),
        ]);

        User::create([
            'first_name' => 'Sofia',
            'last_name' => 'Rosa',
            'email' => 'sofia.rosa@email.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password123'),
            'user_type' => 'volontario',
            'phone' => '+39 333 444 5555',
            'skills' => ['socializzazione', 'addestramento di base', 'eventi'],
            'availability_status' => 'disponibile',
            'privacy_consent' => true,
            'terms_consent' => true,
            'marketing_consent' => false,
            'is_active' => true,
            'last_login_at' => now()->subDays(5),
        ]);

        // Utente recente non verificato
        User::create([
            'first_name' => 'Luca',
            'last_name' => 'Marroni',
            'email' => 'luca.marroni@email.com',
            'email_verified_at' => null,
            'password' => Hash::make('password123'),
            'user_type' => 'proprietario',
            'phone' => '+39 666 777 8888',
            'privacy_consent' => true,
            'terms_consent' => true,
            'marketing_consent' => true,
            'is_active' => false,
            'last_login_at' => null,
            'created_at' => now()->subDays(1),
        ]);
    }
} 