<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CitizenshipValueAssignment extends Model
{
    public function monitoring_location_assignment()
    {
        return $this->belongsTo('App\MonitoringLocationAssignment');
    }

    public function citizenship_value()
    {
        return $this->belongsTo('App\CitizenshipValue');
    }
}
