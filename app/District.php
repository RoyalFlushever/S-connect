<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class District extends Model
{
    protected $table = 'us_districts';

    public function county() {
        return $this->belongsTo('App\County');
    }
}
