<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Contracts\Auth\MustVerifyEmail;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'user_type',
        'phone',
        'organization_name',
        'vat_number',
        'skills',
        'availability_status',
        'privacy_consent',
        'terms_consent',
        'marketing_consent',
        'is_active',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'last_login_at' => 'datetime',
        'password' => 'hashed',
        'skills' => 'array',
        'privacy_consent' => 'boolean',
        'terms_consent' => 'boolean',
        'marketing_consent' => 'boolean',
        'is_active' => 'boolean',
    ];

    /**
     * Accessor per il nome completo
     */
    public function getFullNameAttribute(): string
    {
        return "{$this->first_name} {$this->last_name}";
    }

    /**
     * Scope per filtrare per tipo utente
     */
    public function scopeOfType($query, string $type)
    {
        return $query->where('user_type', $type);
    }

    /**
     * Scope per utenti attivi
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope per utenti verificati
     */
    public function scopeVerified($query)
    {
        return $query->whereNotNull('email_verified_at');
    }

    /**
     * Controlla se l'utente è di un tipo specifico
     */
    public function isType(string $type): bool
    {
        return $this->user_type === $type;
    }

    /**
     * Controlla se l'utente è un admin
     */
    public function isAdmin(): bool
    {
        return $this->user_type === 'admin';
    }

    /**
     * Controlla se l'utente è un proprietario
     */
    public function isOwner(): bool
    {
        return $this->user_type === 'proprietario';
    }

    /**
     * Controlla se l'utente è un'associazione
     */
    public function isAssociation(): bool
    {
        return $this->user_type === 'associazione';
    }

    /**
     * Controlla se l'utente è un volontario
     */
    public function isVolunteer(): bool
    {
        return $this->user_type === 'volontario';
    }

    /**
     * Controlla se l'utente può accedere all'admin panel
     */
    public function canAccessAdmin(): bool
    {
        return $this->isAdmin() && $this->is_active && $this->hasVerifiedEmail();
    }

    /**
     * Aggiorna il timestamp dell'ultimo login
     */
    public function updateLastLogin(): void
    {
        $this->update(['last_login_at' => now()]);
    }

    /**
     * Formatta le skills per la visualizzazione
     */
    public function getFormattedSkillsAttribute(): string
    {
        if (!$this->skills || !is_array($this->skills)) {
            return '';
        }
        
        return implode(', ', $this->skills);
    }

    /**
     * Restituisce l'etichetta del tipo utente
     */
    public function getUserTypeLabel(): string
    {
        $labels = [
            'proprietario' => 'Proprietario',
            'associazione' => 'Associazione',
            'volontario' => 'Volontario',
            'admin' => 'Amministratore',
        ];

        return $labels[$this->user_type] ?? $this->user_type;
    }

    /**
     * Restituisce l'etichetta dello stato di disponibilità
     */
    public function getAvailabilityStatusLabel(): string
    {
        $labels = [
            'disponibile' => 'Disponibile',
            'occupato' => 'Occupato',
            'non_disponibile' => 'Non Disponibile',
        ];

        return $labels[$this->availability_status] ?? $this->availability_status;
    }
} 