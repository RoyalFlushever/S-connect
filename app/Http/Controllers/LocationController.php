<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\State;
use App\County;
use App\District;
use App\School;

class LocationController extends Controller
{
    /**
     * get state list
     */
    public function states() {
        return json_encode(State::orderBy('abbreviation')->get());
    }
    /**
     * get county list
     */
    public function counties(Request $request) {
        return json_encode(
            County::where('state_id', $request->input("state_id"))
            ->orderBy('name')->get()
        );
    }
    /**
     * get district list
     */
    public function districts(Request $request) {
        return json_encode(
            District::where('county_id', $request->input("county_id"))
            ->orderBy('name')->get()
        );
    }
    /**
     * get class list
     */
    public function schools(Request $request) {
        return json_encode(
            School::where('district_id', $request->input("district_id"))
            ->orderBy('name')->get()
        );
    }
}
