<?php

namespace App\Policies;

use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy extends BasePolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view users.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function view(User $user)
    {
        // Facilitators and Site Facilitators can view other users
        return $user->user_role_id > 1 && $user->user_role_id < 4;
    }

    /**
     * Determine whether the user can create users.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        // Facilitators and Site Facilitators can add new users
        return $user->user_role_id > 1 && $user->user_role_id < 4;
    }

    /**
     * Determine whether the user can update the user.
     *
     * @param  \App\User  $user
     * @param  \App\User  $user
     * @return mixed
     */
    public function update(User $currentUser, User $user)
    {
        //
    }

    /**
     * Determine whether the user can delete the user.
     *
     * @param  \App\User  $user
     * @param  \App\User  $user
     * @return mixed
     */
    public function delete(User $currentUser, User $user)
    {
        //
    }
}
