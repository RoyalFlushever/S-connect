<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MonitoringSession extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'started_at', 'ended_at'
    ];

    public function responses()
    {
        return $this->hasMany('App\MonitoringSessionResponse', 'session_id');
    }

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;
}
