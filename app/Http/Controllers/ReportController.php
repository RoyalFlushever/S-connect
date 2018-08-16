<?php

namespace App\Http\Controllers;

use App\CitizenshipValue;
use App\CitizenshipValueAssignment;
use App\MonitoringLocation;
use App\MonitoringLocationAssignment;
use App\Student;
use App\User;

use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class ReportController extends Controller
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
     * Display a listing of the resource.
     *
     * select a report type
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('reports.index');
    }


    /**
     * Display various report pages by type
     */
    public function show(Request $request) {
        $report_type = $request->input('type');
        $userRoleId = (int)Auth::user()->user_role_id;

        return view('reports.show', ['type' => $report_type, 'role' => $userRoleId] );
    }

}
