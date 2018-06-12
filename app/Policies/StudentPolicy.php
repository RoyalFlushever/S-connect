<?php

namespace App\Policies;

use App\Student;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class StudentPolicy extends BasePolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view an index of students
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function index(User $user)
    {
        // Facilitators and Site Facilitators can index students
        return $user->user_role_id > 1 && $user->user_role_id < 4;
    }

    /**
     * Determine whether the $user can view the $student.
     *
     * @param \App\User    $user
     * @param \App\Student $student
     * @return mixed
     */
    public function view(User $user, Student $student)
    {
        //
    }

    /**
     * Determine whether a student is requesting their own information (allowed) or someone else's (disallowed)
     */
    public function showSelf(Student $requestor, Student $target)
    {
        return $requestor->id === $target->id;
    }

    /**
     * Determine whether the user can create students.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        // All staff user types (Facilitators, Site Facilitators, Mentors) can add new Students
        return $user->user_role_id > 1 && $user->user_role_id <= 4;
    }

    /**
     * Determine whether the user can update the students.
     *
     * @param  \App\User  $user
     * @param  \App\User  $user
     * @return mixed
     */
    public function update(User $user)
    {
        //
    }

    /**
     * Determine whether the user can delete the students.
     *
     * @param  \App\User  $user
     * @param  \App\User  $user
     * @return mixed
     */
    public function delete(User $user)
    {
        //
    }
}
