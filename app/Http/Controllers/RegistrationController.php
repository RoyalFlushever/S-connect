<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use DB;
use Illuminate\Support\Facades\Hash;
use App\User;
use function GuzzleHttp\json_encode;
use App\RegistrationIssue;
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
            'state_id'  => 'required|integer|min:1',
            'county_id'  => 'required|integer|min:1',
        ];
        
        if($request->input('isEmployee') == 1) {
            $validate_arr += [
                'district_id' => 'required|integer|min:1',
            ];
        }
        if($request->input('user_role') > 2) {
            $validate_arr += ['school_id' => 'required|integer|min:1'];
        }

        $this->validate($request, $validate_arr);

        // Password needs to be hashed before storing
        $attributes = $request->only(['first_name', 'middle_name', 'last_name', 'email', 'district_id', 'school_id', 'referral_source_id']);
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
     * get referralSource list
     */
    public function referralSource() {
        return json_encode(DB::select("select * from referral_source order by id"));
    }

    public function saveIssue(Request $request) {
        
        $attributes = $request->only(['first_name', 'middle_name', 'last_name', 'email', 'state_id', 'county_id', 'district_id', 'school_id', 'reason', 'description']);
        
        $issue = new RegistrationIssue($attributes);

        DB::beginTransaction();

        if ($issue->save()) {
            DB::commit();
            return json_encode(["result" => "success"]);
        }
        else {
            DB::rollBack();
            return json_encode(["result" => "failure"]);
        }
    }
}
