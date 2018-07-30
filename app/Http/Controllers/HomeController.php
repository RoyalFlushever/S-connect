<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // See UserRoleSeeder
        $userRoleId = (int)Auth::user()->user_role_id;
        if ($userRoleId === 1) {
            // Administrator
            $dashboardItems = [
                ['url' => url('students')        , 'label' => 'View students'],
                ['url' => url('students/create') , 'label' => 'New student'],
                ['url' => url('users')           , 'label' => 'View users'],
                ['url' => url('users/create')    , 'label' => 'New user']
            ];
        }
        elseif ($userRoleId === 2 || $userRoleId === 3) {
            // Facilitator or Site Facilitator
            $dashboardItems = [
                ['url' => url('my-students')     , 'label' => 'My students'],
                ['url' => url('students')        , 'label' => 'View students'],
                ['url' => url('students/create') , 'label' => 'New student'],
                ['url' => url('users')           , 'label' => 'View users'],
                ['url' => url('users/create')    , 'label' => 'New user']
            ];
        }
        elseif ($userRoleId == 4) {
            // Mentor
            $dashboardItems = [
                ['url' => url('my-students')         , 'label' => 'My students'],
                ['url' => url('students/create')     , 'label' => 'New student'],
                ['url' => url('stakeholders')        , 'label' => 'View stakeholders'],
                ['url' => url('stakeholders/create') , 'label' => 'New stakeholder']
            ];
        }
        else {
            // Unknown/default
            $dashboardItems = [];
        }

        return view('home', ['dashboardItems' => $dashboardItems, 'issueModal' => true, 'role' => $userRoleId ]);
    }

    public function welcome() {
        return view('welcome');
    }

    public function site_admin(){
        return view('site-admin');
    }
}
