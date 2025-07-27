<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->enum('user_type', ['proprietario', 'associazione', 'volontario', 'admin'])->default('proprietario');
            $table->string('phone')->nullable();
            
            // Campi specifici per associazioni
            $table->string('organization_name')->nullable();
            $table->string('vat_number')->nullable();
            
            // Campi specifici per volontari
            $table->json('skills')->nullable(); // competenze
            $table->enum('availability_status', ['disponibile', 'occupato', 'non_disponibile'])->default('disponibile');
            
            // Consensi GDPR
            $table->boolean('privacy_consent')->default(false);
            $table->boolean('terms_consent')->default(false);
            $table->boolean('marketing_consent')->default(false);
            
            // Stato account
            $table->boolean('is_active')->default(false);
            $table->timestamp('last_login_at')->nullable();
            
            $table->rememberToken();
            $table->timestamps();
            
            // Indici
            $table->index(['user_type', 'is_active']);
            $table->index(['email_verified_at']);
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
