<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class PersonalAccessToken extends Model
{
    protected $table = 'personal_access_tokens';

    protected $fillable = [
        'tokenable_type',
        'tokenable_id',
        'name',
        'token',
        'abilities',
        'last_used_at',
        'expires_at',
    ];

    protected $casts = [
        'abilities' => 'array',
        'last_used_at' => 'datetime',
        'expires_at' => 'datetime',
    ];

    /**
     * Get the tokenable model that the access token belongs to.
     */
    public function tokenable(): MorphTo
    {
        return $this->morphTo();
    }

    /**
     * Find the token instance matching the given token.
     */
    public static function findToken($token)
    {
        if (strlen($token) === 40) {
            return static::where('token', hash('sha256', $token))->first();
        }

        return static::where('token', $token)->first();
    }

    /**
     * Determine if the token has a given ability.
     */
    public function can($ability): bool
    {
        return in_array('*', $this->abilities ?? []) ||
               in_array($ability, $this->abilities ?? []);
    }

    /**
     * Determine if the token is missing a given ability.
     */
    public function cant($ability): bool
    {
        return ! $this->can($ability);
    }
} 