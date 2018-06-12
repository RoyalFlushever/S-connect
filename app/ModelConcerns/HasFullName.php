<?php

namespace App\ModelConcerns;

trait HasFullName
{
    /**
     * Returns a user's concatenated, full name
     * @return string
     */
    public function getFullNameAttribute()
    {
        // Middle name is optional
        if (!empty($this->middle_name)) {
            return "{$this->last_name}, {$this->first_name} {$this->middle_name}";
        }
        else {
            return "{$this->last_name}, {$this->first_name}";
        }
    }
}
