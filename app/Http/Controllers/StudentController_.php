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

class StudentController extends Controller
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
        $this->authorize('index', Student::class);

        // TODO: Fetch students based on user access (e.g. School)
        $students = Student::query()->orderBy('last_name', 'asc')->orderBy('first_name', 'asc')
            ->orderBy('middle_name', 'asc')->orderBy('id', 'asc')->with('mentor')->get();

        return view('students.index', ['students' => $students]);
    }

    /**
     * Display a list of students being directly mentored by the authenticated user
     *
     * @return \Illuminate\Http\Response
     */
    public function myStudents()
    {
        $students = Student::query()->orderBy('last_name', 'asc')->orderBy('first_name', 'asc')
            ->orderBy('middle_name', 'asc')->orderBy('id', 'asc')->with('mentor')->get();

        // Administrator : 1
        // Facilitator : 2
        // Site Facilitator : 3
        // Mentor : 4
        $user_role = (int)Auth::user()->user_role_id;
        return view('students.my-students', ['students' => $students, 'role' => $user_role]);
        // return view('students.my-students0', ['students' => $students, 'role' => $user_role]);
    }

    /**
     * Display a list of students being directly mentored by the authenticated user
     *
     * @return \Illuminate\Http\Response
     */
    public function transfer() {
        $students = Student::query()->orderBy('last_name', 'asc')->orderBy('first_name', 'asc')
            ->orderBy('middle_name', 'asc')->orderBy('id', 'asc')->where('mentor_id', '=', Auth::user()->id)->get();

        $schools = [
            'West Middle School',
            'Left High School',
            'Right High School',
            'East Middle School'
        ];
        $mentors = [
            'Dr. Dre',
            'Dr. Who',
            'Dr. Lee',
            'Dr. Young'
        ];

        // Administrator : 1
        // Facilitator : 2
        // Site Facilitator : 3
        // Mentor : 4
        $user_role = (int)Auth::user()->user_role_id;
        return view('students.transfer-students', ['students' => $students, 'role' => $user_role, 'schools' => $schools, 'mentors' => $mentors]);
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $this->authorize('create', Student::class);

        // Fetch a list of possible mentors for this student
        // Mentors don't see the Mentor field; instead, they are automatically assigned as the Mentor for this Student
        $autoAssignMentor = Auth::user()->user_role_id > 3;
        if ($autoAssignMentor) {
            $availableMentors = [];
        }
        else {
            // Possible mentors include all Facilitators, Site Facilitators, and Mentors
            // TODO: when we actually have Schools, this will flex based on the selected School on the form
            $availableMentors = User::query()->whereBetween('user_role_id', [2, 4])->get();
        }

        // Fetch citizenship prompt data
        $monitoringLocations = MonitoringLocation::with('category')->orderBy('category_id', 'asc')->orderBy('name', 'asc')->orderBy('id', 'asc')->get();
        $monitoringLocationsByCategory = $monitoringLocations->groupBy('category.name');
        $monitoringLocationNamesById = $monitoringLocations->mapWithKeys(function ($location) {
            return [ $location->id => $location->name ];
        });

        // Sorting by phrasing puts custom entries (see CitizenshipValueSeeder) apart from other entries
        // TODO: We may want to assign a display_order if we end up not wanting citizenship values to be naturally sorted by name
        $citizenshipValues = CitizenshipValue::with('type')->orderBy('type_id', 'asc')->orderBy('phrasing', 'desc')->orderBy('id', 'asc')->get();
        $citizenshipValuesByType = $citizenshipValues->groupBy('type.name');

        return view('students.create', [
            'autoAssignMentor' => $autoAssignMentor,
            'availableMentors' => $availableMentors,
            'monitoringLocationNamesById' => $monitoringLocationNamesById,
            'monitoringLocationsByCategory' => $monitoringLocationsByCategory,
            'citizenshipValuesByType' => $citizenshipValuesByType,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->authorize('create', Student::class);

        // TODO: Validate monitoring locations

        $this->validate($request, [
            'first_name' => 'required',
            'last_name'  => 'required',
            'birthdate'  => 'required|date|before_or_equal:today',
            'username'   => 'bail|required|min:6|regex:/[0-9]+/|regex:/[a-zA-Z]+/|unique:students,username',
            'password'   => 'required',
            'gender'     => "required|integer|between:1,2",
            'mentor'     => 'nullable|integer'
        ]);

        // Password needs to be hashed before storing; date needs to be formatted using ISO 8601 for Carbon database storage
        $attributes = $request->only([ 'first_name', 'middle_name', 'last_name', 'username' ]);
        $attributes['birthdate'] = date('Y-m-d', strtotime($request->input('birthdate')));
        $attributes['password'] = Hash::make($request->input('password'));


        $student = new Student($attributes);

        // Make the authenticated user the student's mentor (should be set for Mentor users)
        if ($request->input('auto_assign_mentor')) {
            $student->mentor()->associate(Auth::user()->id);
        }
        elseif ($request->input('mentor')) {
            $student->mentor()->associate($request->input('mentor'));
        }

        $student->gender()->associate($request->input('gender'));

        // TODO: Need to save to get student id

        $monitoringLocations = $request->input('monitoringLocations');
        $citizenshipValues = $request->input('citizenshipValues');
        DB::transaction(function() use (&$student, &$monitoringLocations, &$citizenshipValues, &$request) {
            $student->save();
            // TODO: This check can be handled by validation?
            if (is_array($monitoringLocations)) {
                foreach ($monitoringLocations as $locationIndex => $locationId) {
                    $locationAssignment = new MonitoringLocationAssignment();
                    $locationAssignment->student()->associate($student); // Need student id after save!
                    $locationAssignment->monitoring_location()->associate($locationId);
                    $locationAssignment->label = $request->input('locationLabels')[$locationIndex];  // TODO: Validate index exists
                    $locationAssignment->save();

                    foreach ($citizenshipValues[$locationIndex] as $cvType => $citizenshipValueId) {
                        // TODO: Support custom phrasings!
                        // $request->input('customPrompts')[$locationIndex][Engagement|Appropriateness|Comprehension]
                        //if (!empty($citizenshipValueId) && $citizenshipValueId !== '_custom') {
                        if (!empty($citizenshipValueId)) {
                            // Save citizenship values
                            $citizenshipValueAssignment = new CitizenshipValueAssignment();
                            $citizenshipValueAssignment->monitoring_location_assignment()->associate($locationAssignment);
                            $citizenshipValueAssignment->citizenship_value()->associate($citizenshipValueId);

                            // TODO: Make sure these structures are validated (above)
                            // TODO: Restructure these as nested elements in the citizenship values array
                            $isVariableInterval = $request->input('isVariableInterval');
                            $desiredMeanInSeconds = $request->input('desiredMeanInSeconds');
                            $intervalHours = $request->input('intervalHours');
                            $intervalMinutes = $request->input('intervalMinutes');
                            $intervalSeconds = $request->input('intervalSeconds');

                            // Note that (bool)'false' (string) evaluates to true
                            // TODO: Handle this in validation/sanization?
                            $alertIntervalVaries = ($isVariableInterval[$locationIndex][$cvType] == 'true');
                            if ($alertIntervalVaries) {
                                $alertIntervalInSeconds = $desiredMeanInSeconds[$locationIndex][$cvType];
                            }
                            else {
                                $alertIntervalInSeconds = 3600*$intervalHours[$locationIndex][$cvType] +
                                    60*$intervalMinutes[$locationIndex][$cvType] +
                                    $intervalSeconds[$locationIndex][$cvType];
                            }
                            $citizenshipValueAssignment->alert_interval_varies = $alertIntervalVaries;
                            $citizenshipValueAssignment->alert_interval_in_seconds = $alertIntervalInSeconds;

                            // TODO: Shye - check later when other versions of prompts are added
                            if ($citizenshipValueId == 4 || $citizenshipValueId == 5 || $citizenshipValueId == 6) {
                                $customPrompts = $request->input('customPrompts');
                                $citizenshipValueAssignment->custom_phrasing = $customPrompts[$locationIndex][$cvType];
                            }
                            $goalPercent = $request->input('goals');
                            $citizenshipValueAssignment->goal_percentage = $goalPercent[$locationIndex][$cvType];

                            $citizenshipValueAssignment->save();
                        }
                    }
                }
            }
        });

        return redirect()->route('home')->with('status', 'New student account created');
        //}
        //else {
        //    return redirect()->action('StudentController@create')
        //        ->withErrors('Student account was not saved. Please try again')
        //        ->withInput($request->only([ 'first_name', 'middle_name', 'last_name', 'username', 'birthdate',
        //            'gender', 'mentor' ]));
        //}
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