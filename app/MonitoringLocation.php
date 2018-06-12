<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MonitoringLocation extends Model
{
    public function category()
    {
        return $this->belongsTo('App\MonitoringLocationCategory');
    }
}
