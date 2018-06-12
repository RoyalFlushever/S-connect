<?php

namespace App\Repositories;

use App\Stakeholder;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\ServiceProvider;

class StakeholderRepository
{
    /**
     * TODO: Split this into unfiltered and filtered methods? Only mentors need the filtered one
     * @return A collection of Stakeholders that is filtered for Mentors
     */
    public function getFilteredList()
    {
        // TODO: when we actually have Schools, add filter based on that. For now, other staff can vew all stakeholders
        $stakeholders = Stakeholder::query()
            ->select('id', 'first_name', 'middle_name', 'last_name', 'username', 'student_id', 'last_login')
            ->orderBy('last_name', 'asc')->orderBy('first_name', 'asc')->orderBy('middle_name', 'asc')->orderBy('id', 'asc')
            ->with('student')
            ->get();

        // Mentors can only view stakeholders who are associated with students the Mentor is directly mentoring
        // Performance TODO: Determine if we need to perform this as a DB join
        $user = Auth::user();
        if ((int)$user->user_role_id === 4) {
            $userId = $user->id;
            $stakeholders = $stakeholders->filter(function($stakeholder) use (&$userId) {
                return $stakeholder->student->mentor_id == $userId;
            })->values();
        }

        return $stakeholders;
    }
}
