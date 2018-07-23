<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use DB;
use Illuminate\Support\Facades\Hash;
use App\User;
use function GuzzleHttp\json_encode;
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
    public function registerUser(Request $request) {

        $validate_arr = [
            'first_name' => 'required',
            'last_name'  => 'required',
            'email'      => 'required|email|unique:users,email',
            // 'password'   => 'required',
            'stateId'  => 'required|integer|min:1',
            'countyId'  => 'required|integer|min:1',
        ];
        
        if($request->input('isEmployee') == 1) {
            $validate_arr += [
                'districtId' => 'required|integer|min:1',
            ];
        }
        if($request->input('user_role') > 2) {
            $validate_arr += ['schoolId' => 'required|integer|min:1'];
        }

        $this->validate($request, $validate_arr);

        // Password needs to be hashed before storing
        $attributes = $request->only(['first_name', 'middle_name', 'last_name', 'email']);
        $attributes['password'] = Hash::make($request->input('password'));

        // Wrap this in a transaction saving separate relationships
        $newUser = new User($attributes);
        $newUser->user_role()->associate($request->input('user_role'));

        DB::beginTransaction();

        if ($newUser->save()) {
            DB::commit();
            return json_encode(["result" => "success"]);
        }
        else {
            // Generic failure handling. TODO: Determine if we need to use more detailed troubleshooting messages
            DB::rollBack();
            return json_encode(["result" => "failure"]);
        }
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
