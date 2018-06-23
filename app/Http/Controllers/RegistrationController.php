<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

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
}
