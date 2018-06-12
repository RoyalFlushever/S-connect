<?php

namespace App\Http\Controllers;

use App\Stakeholder;
use App\Student;
use App\User;
use App\Repositories\StakeholderRepository;

use DB;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
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
        $user = Auth::user();
        $this->authorize('view', $user);

        // Determine what list of users I can view
        // Admins can always see all users
        // TODO: when we actually have Schools, add filter based on that. For now, non-admins can vew all users who are
        // less-privileged then themselves.
        $userQuery = User::query();
        if ($user->user_role_id > 1) {
            $userQuery->where('user_role_id', '>', $user->user_role_id);
        }
        $users = $userQuery
            ->select('id', 'first_name', 'middle_name', 'last_name', 'email', 'user_role_id', 'last_login')
            ->orderBy('last_name', 'asc')->orderBy('first_name', 'asc')->orderBy('middle_name', 'asc')->orderBy('id', 'asc')
            ->with('user_role')
            ->get();

        return view('users.index', [ 'users' => $users, 'stakeholders' => $this->stakeholders->getFilteredList() ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $user = Auth::user();
        $this->authorize('create', $user);

        // Determine user types I can create based on my user role
        // Admins: any user type
        // Mentors: not allowed (via authorization above)
        // Everyone else: user types that are *less privileged* than my user type
        $availableTypes = [
            [ 'value' => 1, 'label' => 'Administrator'    ],
            [ 'value' => 2, 'label' => 'Facilitator'      ],
            [ 'value' => 3, 'label' => 'Site Facilitator' ],
            [ 'value' => 4, 'label' => 'Mentor'           ]
        ];

        $userRoleId = (int)$user->user_role_id;
        if ($userRoleId === 1) {
            $allowedTypes = $availableTypes;
        }
        else {
            $allowedTypes = array_values(array_filter($availableTypes, function($type) use ($user) {
                return $type['value'] > $user->user_role_id;
            }));
        }

        // Fetch a list of students that are available for mentoring (not currently being mentored)
        // TODO: once we have schools, filter by schools based on user roles (authenticated user's as well as new user's)
        $availableStudents = Student::query()->whereNull('mentor_id')->orderBy('last_name', 'asc')
            ->orderBy('first_name', 'asc')->orderBy('middle_name', 'asc')->orderBy('id', 'asc')->get();

        return view('users.create', [ 'availableUserRoles' => $allowedTypes, 'availableStudents' => $availableStudents ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = Auth::user();
        $this->authorize('create', $user);

        // Non-admins can only add users less privileged then themselves
        $minUserRoleId = $user->user_role_id > 1 ? $user->user_role_id + 1 : 1;
        $this->validate($request, [
            'first_name' => 'required',
            'last_name'  => 'required',
            'email'      => 'bail|required|email|unique:users,email',
            'password'   => 'required',
            'user_role'  => "required|integer|between:$minUserRoleId,4",
            'student-list-assigned' => 'array'
        ]);

        // Password needs to be hashed before storing
        $attributes = $request->only(['first_name', 'middle_name', 'last_name', 'email']);
        $attributes['password'] = Hash::make($request->input('password'));

        // Wrap this in a transaction saving separate relationships
        $newUser = new User($attributes);
        $newUser->user_role()->associate($request->input('user_role'));
        DB::beginTransaction();
        if ($successfulSave = $newUser->save()) {
            $assignedStudents = $request->input('student-list-assigned');
            if (!empty($assignedStudents)) {
                // Assign mentor id to newUser->id for all selected students (must not already be assigned a mentor)
                $numRowsAffected = DB::table('students')
                    ->whereIn('id', $request->input('student-list-assigned'))
                    ->whereNull('mentor_id')
                    ->update([ 'mentor_id' => $newUser->id, 'updated_at' => Carbon::now() ]);
                $successfulSave = $numRowsAffected === count($assignedStudents);
            }
        }

        if ($successfulSave) {
            DB::commit();
            return redirect()->route('home')->with('status', 'New account created');
        }
        else {
            // Generic failure handling. TODO: Determine if we need to use more detailed troubleshooting messages
            DB::rollBack();
            return redirect()->action('UserController@create')
                ->withErrors('User account was not saved. Please try again')
                ->withInput($request->only(['first_name', 'middle_name', 'last_name', 'email', 'user_role']));
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
