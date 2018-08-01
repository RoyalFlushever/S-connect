<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class School extends Model
{
    protected $table = "us_schools";

    // public function SchoolLevel() {
    //     return $this->hasOne('App\SchoolLevel');
    // }
    public function district() {
        return $this->belongsTo('App\District');
    }
}
