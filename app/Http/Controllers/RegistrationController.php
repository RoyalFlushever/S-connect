<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use DB;
class RegistrationController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
    }

    /**
     * Show the iConnect acknowledgement page.
     *
     * @return \Illuminate\Http\Response
     */
    public function welcome()
    {
        return view('welcome');
    }

    /**
     * Show the iConnect Terms of Service page.
     *
     * @return \Illuminate\Http\Response
     */
    public function tos()
    {
        return view('tos');
    }
    
    /**
     * Show Multistep registration form
     * 
     * @return \Illuminate\Http\Response
     */
    public function registration() {
        return view('multistep-form');
    }

    /**
     * Register a user 
     * 
     * @param
     * @return
     */
    public function create() {

    }

    /**
     * get state list
     */
    public function states() {
        return json_encode(DB::select("select * from us_states order by abbreviation"));
    }
    /**
     * get county list
     */
    public function counties(Request $request) {
        $stateId = $request->input("stateId");
        return json_encode(DB::select("select * from us_counties where state_id={$stateId} order by name"));
    }
    // }
    /**
     * get district list
     */
    public function districts(Request $request) {
        $countyId = $request->input("countyId");
        return json_encode(DB::select("select * from us_districts where county_id={$countyId} order by name"));
    }
    /**
     * get class list
     */
    public function schools(Request $request) {
        $districtId = $request->input("districtId");
        return json_encode(DB::select("select * from us_schools where district_id={$districtId} order by name"));
    }
    /**
     * get referralSource list
     */
    public function referralSource() {
        return json_encode(DB::select("select * from referral_source order by id"));
    }
}
