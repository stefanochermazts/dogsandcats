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
            'password' => Hash::make('admin123'),
            'user_type' => 'admin',
            'phone' => '+39 123 456 7890',
            'organization_name' => 'DogsAndCats Admin',
            'vat_number' => 'IT12345678901',
            'skills' => ['Administration', 'Management'],
            'availability_status' => 'disponibile',
            'privacy_consent' => true,
            'terms_consent' => true,
            'marketing_consent' => false,
            'is_active' => true,
            'email_verified_at' => now(),
        ]);

        // Proprietario user
        User::create([
            'first_name' => 'Mario',
            'last_name' => 'Rossi',
            'email' => 'proprietario@test.com',
            'password' => Hash::make('password123'),
            'user_type' => 'proprietario',
            'phone' => '+39 123 456 7891',
            'organization_name' => null,
            'vat_number' => null,
            'skills' => ['Pet care', 'Training'],
            'availability_status' => 'disponibile',
            'privacy_consent' => true,
            'terms_consent' => true,
            'marketing_consent' => true,
            'is_active' => true,
            'email_verified_at' => now(),
        ]);

        // Associazione user
        User::create([
            'first_name' => 'Laura',
            'last_name' => 'Bianchi',
            'email' => 'associazione@test.com',
            'password' => Hash::make('password123'),
            'user_type' => 'associazione',
            'phone' => '+39 123 456 7892',
            'organization_name' => 'Associazione Amici degli Animali',
            'vat_number' => 'IT12345678902',
            'skills' => ['Animal rescue', 'Veterinary care'],
            'availability_status' => 'disponibile',
            'privacy_consent' => true,
            'terms_consent' => true,
            'marketing_consent' => true,
            'is_active' => true,
            'email_verified_at' => now(),
        ]);

        // Volontario user
        User::create([
            'first_name' => 'Giuseppe',
            'last_name' => 'Verdi',
            'email' => 'volontario@test.com',
            'password' => Hash::make('password123'),
            'user_type' => 'volontario',
            'phone' => '+39 123 456 7893',
            'organization_name' => null,
            'vat_number' => null,
            'skills' => ['Pet walking', 'Feeding', 'Cleaning'],
            'availability_status' => 'disponibile',
            'privacy_consent' => true,
            'terms_consent' => true,
            'marketing_consent' => false,
            'is_active' => true,
            'email_verified_at' => now(),
        ]);

        // Additional users for testing
        User::create([
            'first_name' => 'Anna',
            'last_name' => 'Neri',
            'email' => 'anna.neri@test.com',
            'password' => Hash::make('password123'),
            'user_type' => 'proprietario',
            'phone' => '+39 123 456 7894',
            'organization_name' => null,
            'vat_number' => null,
            'skills' => ['Pet grooming'],
            'availability_status' => 'disponibile',
            'privacy_consent' => true,
            'terms_consent' => true,
            'marketing_consent' => true,
            'is_active' => true,
            'email_verified_at' => now(),
        ]);

        User::create([
            'first_name' => 'Marco',
            'last_name' => 'Gialli',
            'email' => 'marco.gialli@test.com',
            'password' => Hash::make('password123'),
            'user_type' => 'volontario',
            'phone' => '+39 123 456 7895',
            'organization_name' => null,
            'vat_number' => null,
            'skills' => ['Emergency response', 'First aid'],
            'availability_status' => 'disponibile',
            'privacy_consent' => true,
            'terms_consent' => true,
            'marketing_consent' => false,
            'is_active' => true,
            'email_verified_at' => now(),
        ]);

        echo "Users created successfully!\n";
    }
}
