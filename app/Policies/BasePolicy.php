<?php

namespace App\Policies;

abstract class BasePolicy
{
    public function before($user, $ability)
    {
        // Administrators bypass all authorization checks
        return (int)$user->user_role_id === 1 ? true : null;
    }
}
