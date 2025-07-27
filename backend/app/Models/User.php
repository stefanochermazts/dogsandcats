<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Traits\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
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
        'last_login_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'skills' => 'array',
            'privacy_consent' => 'boolean',
            'terms_consent' => 'boolean',
            'marketing_consent' => 'boolean',
            'is_active' => 'boolean',
            'last_login_at' => 'datetime',
        ];
    }

    /**
     * Get the user's full name.
     */
    public function getFullNameAttribute(): string
    {
        return trim($this->first_name . ' ' . $this->last_name);
    }

    /**
     * Get the formatted skills as string.
     */
    public function getFormattedSkillsAttribute(): string
    {
        return is_array($this->skills) ? implode(', ', $this->skills) : '';
    }

    /**
     * Get the user type label.
     */
    public function getUserTypeLabelAttribute(): string
    {
        return match($this->user_type) {
            'admin' => 'Amministratore',
            'proprietario' => 'Proprietario',
            'associazione' => 'Associazione',
            'volontario' => 'Volontario',
            default => 'Utente'
        };
    }

    /**
     * Get the availability status label.
     */
    public function getAvailabilityStatusLabelAttribute(): string
    {
        return match($this->availability_status) {
            'available' => 'Disponibile',
            'busy' => 'Occupato',
            'unavailable' => 'Non disponibile',
            default => 'Sconosciuto'
        };
    }

    /**
     * Scope a query to only include users of a specific type.
     */
    public function scopeOfType($query, string $type)
    {
        return $query->where('user_type', $type);
    }

    /**
     * Scope a query to only include active users.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to only include verified users.
     */
    public function scopeVerified($query)
    {
        return $query->whereNotNull('email_verified_at');
    }

    /**
     * Check if user is of specific type.
     */
    public function isType(string $type): bool
    {
        return $this->user_type === $type;
    }

    /**
     * Check if user is admin.
     */
    public function isAdmin(): bool
    {
        return $this->isType('admin');
    }

    /**
     * Check if user is owner.
     */
    public function isOwner(): bool
    {
        return $this->isType('proprietario');
    }

    /**
     * Check if user is association.
     */
    public function isAssociation(): bool
    {
        return $this->isType('associazione');
    }

    /**
     * Check if user is volunteer.
     */
    public function isVolunteer(): bool
    {
        return $this->isType('volontario');
    }

    /**
     * Check if user can access admin area.
     */
    public function canAccessAdmin(): bool
    {
        return $this->isAdmin() && $this->is_active && $this->email_verified_at;
    }

    /**
     * Update last login timestamp.
     */
    public function updateLastLogin(): void
    {
        $this->update(['last_login_at' => now()]);
    }
}
