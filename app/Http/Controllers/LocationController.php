<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\State;
use App\County;
use App\District;
use App\School;
use Illuminate\Support\Facades\Auth;

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
    /**
     * get default location
     */
    public function defaultLocation() {

        $location = [];

        $role_id = Auth::user()->user_role_id;

        switch ($role_id) {
            case 1:
                $location = [
                    'state_id'      => 0,
                    'county_id'     => 0,
                    'district_id'   => 0,
                    'school_id'     => 0,
                ];
                break;
            case 2:
                $location = [
                    'district_id'   => Auth::user()->district_id,
                    'school_id'     => 0,
                ];
                $location['county_id'] = District::find($location['district_id'])->county->id;
                $location['state_id'] = County::find($location['county_id'])->state->id;
                break;
            case 3:
            case 4:
                $location = [
                    'district_id'   => Auth::user()->district_id,
                    'school_id'     => Auth::user()->school_id,
                ];
                $location['county_id'] = District::find($location['district_id'])->county->id;
                $location['state_id'] = County::find($location['county_id'])->state->id;
                break;
        }
        return json_encode(
            $location
        );
    }
}
