<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RegistrationIssue extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table= 'registration_issues';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name', 'middle_name', 'last_name', 'email', 'state_id', 'county_id', 'district_id', 'school_id', 'reason', 'description',
    ];
}
