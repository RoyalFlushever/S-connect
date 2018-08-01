<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class County extends Model
{
    protected $table = 'us_counties';
    public function state() {
        return $this->belongsTo('App\State');
    }
}
