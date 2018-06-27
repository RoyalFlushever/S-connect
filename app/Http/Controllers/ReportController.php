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
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('reports.index');
    }

}
