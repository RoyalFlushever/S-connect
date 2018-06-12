<?php

namespace App\Http\Controllers\Stakeholders;

use App\Http\Controllers\Controller;

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
        $this->middleware('auth:web_stakeholder');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Fetch student associated with this stakeholder
        $stakeholder = Auth::user()->load('student');
        return view('stakeholders.home', [ 'student' => $stakeholder->student ]);
    }
}
