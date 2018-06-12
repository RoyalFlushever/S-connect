<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CitizenshipValue extends Model
{
    public function type()
    {
        return $this->belongsTo('App\CitizenshipValueType', 'type_id');
    }
}
