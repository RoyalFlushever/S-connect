<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MonitoringSessionResponse extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'citizenship_value_assignment_id', 'response_id', 'responded_at'
    ];

    public function citizenship_value_assignment()
    {
        return $this->belongsTo('App\CitizenshipValueAssignment');
    }

    public function session()
    {
        return $this->belongsTo('App\MonitoringSession');
    }

    public function response()
    {
        return $this->belongsTo('App\MonitoringResponse');
    }

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;
}
