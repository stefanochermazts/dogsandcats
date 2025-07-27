<?php

namespace App\Traits;

use App\Models\PersonalAccessToken;
use Illuminate\Support\Str;

trait HasApiTokens
{
    /**
     * Get all of the user's access tokens.
     */
    public function tokens()
    {
        return $this->morphMany(PersonalAccessToken::class, 'tokenable');
    }

    /**
     * Determine if the current API token has a given scope.
     */
    public function tokenCan(string $ability): bool
    {
        return $this->currentAccessToken()?->can($ability) ?? false;
    }

    /**
     * Create a new personal access token for the user.
     */
    public function createToken(string $name, array $abilities = ['*'])
    {
        $token = Str::random(40);
        
        $accessToken = $this->tokens()->create([
            'name' => $name,
            'token' => hash('sha256', $token),
            'abilities' => $abilities,
        ]);

        return new class($accessToken, $token) {
            public $accessToken;
            public $plainTextToken;
            
            public function __construct($accessToken, $plainTextToken) {
                $this->accessToken = $accessToken;
                $this->plainTextToken = $plainTextToken;
            }
        };
    }

    /**
     * Get the access token that the user is currently using.
     */
    public function currentAccessToken()
    {
        return request()->user()?->currentAccessToken();
    }

    /**
     * Set the current access token for the user.
     */
    public function withAccessToken($accessToken)
    {
        $this->accessToken = $accessToken;

        return $this;
    }
} 