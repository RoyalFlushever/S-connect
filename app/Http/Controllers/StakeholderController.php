<?php

namespace App\Http\Controllers;

use App\Stakeholder;
use App\Student;
use App\Repositories\StakeholderRepository;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

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
        $this->middleware('auth');
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
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'first_name' => 'required',
            'last_name'  => 'required',
            'username'   => 'bail|required|min:6|regex:/[0-9]+/|regex:/[a-zA-Z]+/|unique:stakeholders,username',
            'password'   => 'required',
            'student'    => 'required|integer'
        ]);

        // Password needs to be hashed before storing
        $attributes = $request->only([ 'first_name', 'middle_name', 'last_name', 'username' ]);
        $attributes['password'] = Hash::make($request->input('password'));

        // TODO: If saving separate relationships (e.g. multiple insertions), wrap this in a transaction
        $stakeholder = new Stakeholder($attributes);
        $stakeholder->student()->associate($request->input('student'));

        if ($stakeholder->save()) {
            return redirect()->route('home')->with('status', 'New account created');
        }
        else {
            return redirect()->action('StakeholderController@create')
                ->withErrors('Stakeholder account was not saved. Please try again')
                ->withInput($request->only([ 'first_name', 'middle_name', 'last_name', 'username', 'student' ]));
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
