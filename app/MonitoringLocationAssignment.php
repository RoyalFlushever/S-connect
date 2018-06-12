<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MonitoringLocationAssignment extends Model
{
    public function student()
    {
        return $this->belongsTo('App\Student');
    }

    public function monitoring_location()
    {
        return $this->belongsTo('App\MonitoringLocation');
    }

    public function citizenship_value_assignments()
    {
        return $this->hasMany('App\CitizenshipValueAssignment');
    }
}
