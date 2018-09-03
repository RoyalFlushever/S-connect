<?php

namespace App\Http\Controllers;

use App\Stakeholder;
use App\Student;
use App\Repositories\StakeholderRepository;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use DB;

class StakeholderController extends Controller
{
    protected $stakeholders;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(StakeholderRepository $stakeholderRepo)
    {
        $this->middleware('auth', ['except' => 'register']);
        $this->stakeholders = $stakeholderRepo;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('stakeholders.index', [ 'stakeholders' => $this->stakeholders->getFilteredList() ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        // Mentors can only assign stakeholders to students they are directly mentoring
        // Everyone else can assign stakeholders to any student
        $query = Student::query()->orderBy('last_name', 'asc')->orderBy('first_name', 'asc')
            ->orderBy('middle_name', 'asc')->orderBy('id', 'asc');
        $authUser = Auth::user();
        if ($authUser->user_role_id > 3) {
            $query->where('mentor_id', '=', $authUser->id);
        }
        $students = $query->get();

        // Mentors cannot manage staff
        $showStaffNavigation = Auth::user()->user_role_id < 4;
        return view('stakeholders.create', [ 'students' => $students, 'showStaffNavigation' => $showStaffNavigation ]);
    }

    /**
     * Register a stakeholder
     * 
     */
    public function register(Request $request) {
        $validate_arr = [
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required|email|unique:stakeholders,email',
            'state_id' => 'required|integer|min:1',
            'county_id' => 'required|integer|min:1',
        ];

        $this->validate($request, $validate_arr);
        $attributes = $request->only(['first_name', 'last_name', 'email', 'referral_source_id']);
        // set a password same as email
        $attributes['password'] = Hash::make($request->input('email'));
        $stakeholder = new Stakeholder($attributes);

        DB::beginTransaction();

        if ($stakeholder->save()) {
            DB::commit();
            return json_encode(["result" => "success"]);
        }
        else {
            DB::rollBack();
            return json_encode(["result" => "failure"]);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validate_arr = [
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required|email|unique:stakeholders,email',
            'state_id' => 'required|integer|min:1',
            'county_id' => 'required|integer|min:1',
        ];

        $this->validate($request, $validate_arr);
        $attributes = $request->only(['first_name', 'last_name', 'email', 'referral_source_id']);
        // set a password same as email
        $attributes['password'] = Hash::make($request->input('email'));
        $stakeholder = new Stakeholder($attributes);

        DB::beginTransaction();

        if ($stakeholder->save()) {
            DB::commit();
            return json_encode(["result" => "success"]);
        } else {
            DB::rollBack();
            return json_encode(["result" => "failure"]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
