<?php

namespace App\Policies;

use App\MonitoringLocationAssignment;
use App\Student;
use Illuminate\Auth\Access\HandlesAuthorization;

class MonitoringLocationAssignmentPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the student can create a MonitoringSession for a specific MonitoringLocationAssignment
     *
     * @param  \App\Student $student
     * @param  \App\MonitoringLocationAssignment $mla
     * @return boolean
     */
    public function createSession(Student $student, MonitoringLocationAssignment $mla)
    {
        return $student->id === $mla->student_id;
    }
}
