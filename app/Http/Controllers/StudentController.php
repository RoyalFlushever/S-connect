<?php

namespace App\Http\Controllers;

use App\CitizenshipValue;
use App\CitizenshipValueAssignment;
use App\MonitoringLocation;
use App\MonitoringLocationAssignment;
use App\Student;
use App\User;
use App\Ethnicity;
use App\Iep;
use App\SchoolLevel;
use App\School;
use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

use Illuminate\Support\Facades\Log;
use function GuzzleHttp\json_encode;
// use Zend\Diactoros\Request;

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
     * Store a student transfer data.
     */
    public function transfer(Request $request) {
        $student = Student::find($request->input('id'));
        $student->school_id = $request->input('school_id');
        $student->mentor_id = null;
        return response()->json(['result' => $student->save()]);
    }

    /**
     * Display a list of students being directly mentored by the authenticated user
     *
     * @return \Illuminate\Http\Response
     */
    public function getList(Request $filter)
    {

        $role = (int)Auth::user()->user_role_id;

        $query = DB::table('students as s');
        $query->select(

            's.id',
            's.first_name',
            's.last_name',
            's.birthdate',
            's.mentor_id',
            'st.id as state_id',
            'st.name as state_name',
            'dst.id as district_id',
            'dst.name as district_name',
            'cnt.id as county_id',
            'cnt.name as county_name',
            'sch.id as school_id',
            'sch.name as school_name'

        );

        $district_id = Auth::user()->district_id;

        $query->leftjoin('users as u',          's.mentor_id',      'u.id'   );
        $query->leftjoin('us_schools as sch',   's.school_id',      'sch.id' );
        $query->leftjoin('us_districts as dst', 'sch.district_id',  'dst.id' );
        $query->leftjoin('us_counties as cnt',  'dst.county_id',    'cnt.id' );
        $query->leftjoin('us_states as st',     'cnt.state_id',     'st.id'  );

        if(Auth::user()->user_role_id == 4) {

            $query->where('mentor_id', Auth::user()->id);

        } else {

            if(Auth::user()->user_role_id == 3) {

                $query->where('s.school_id', Auth::user()->school_id);

            } else {

                if($district_id != 0) {
                    $query->where('s.district_id', $district_id);
                }
                if($filter->input('level') && $filter->input('level') != 0) {
                    $query->where('sch.level', $filter->input('level'));
                }
                if($filter->input('schoolId') && $filter->input('schoolId') != 0) {
                    $query->where('s.school_id', $filter->input('schoolId'));
                }

            }

            if($filter->input('mentorId') && $filter->input('mentorId') != 0) {
                $query->where('mentor_id', $filter->input('mentorId'));
            }

        } 

        if($filter->input('searchKeyword') && $filter->input('searchKeyword') != '') {

            $query->where(function($query) use ($filter) {
                $query->where('s.first_name', 'like', '%' . $filter->input('searchKeyword') . '%')
                    ->orWhere('s.last_name', 'like', '%' . $filter->input('searchKeyword') . '%');
            });
            
        }

        $ret = $query->paginate($filter->input('rowCount'));
        // if($ret->current_page < $ret->last_page) {
        //     $ret->current_page = $ret->last_page;
        // }

        // return response()->json($ret);
        return response()->json($ret);
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
     * get a student info.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function getStudent(Request $request)
    {
        $student = Student::find($request->input('id'));
        return response()->json($student);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function saveStudent(Request $request)
    {
        $this->authorize('create', Student::class);

        $attributes = $request->only([ 'first_name', 'middle_name', 'last_name', 'username', 'school_id', 'iep_id', 'ethnicity_id' ]);
        
        $validate_arr = [
            'first_name' => 'required',
            'last_name'  => 'required',
            'birthdate'  => 'required|date|before_or_equal:today',
            'username'   => 'bail|required|min:6|regex:/[0-9]+/|regex:/[a-zA-Z]+/|unique:students,username'.($request->input('id') != 0 ? ','.$request->input('id') : ''),
            'password'   => 'required',
            'gender_id'  => "required|integer|between:1,2",
            'mentor'     => 'nullable|integer'
        ];

        if(Auth::user()->user_role_id < 3) {
            // $validate_arr['school_id'] = 'required|integer|min:1';
            if(Auth::user()->user_role_id == 2) {
                $attributes['district_id']  = Auth::user()->district_id;
            } else {
                $attributes['district_id']  = 0;
            }
            $attributes['school_id']    = $attributes['school_id'];
        } else {
            $attributes['district_id']  = School::find(Auth::user()->school_id)->district->id;
            $attributes['school_id']    = Auth::user()->school_id;
        }

        $this->validate($request, $validate_arr);

        $attributes['birthdate'] = date('Y-m-d', strtotime($request->input('birthdate')));

        if($request->input('id') == 0 && $request->input('password') != '') {
            $attributes['password'] = Hash::make($request->input('password'));
        }

        if($request->input('id') == 0) {
            $student = new Student($attributes);
        } else {
            $student = Student::Find($request->input('id'));
            $student->fill($attributes);
        }

        // Make the authenticated user the student's mentor (should be set for Mentor users)
        if ($request->input('auto_assign_mentor')) {
            $student->mentor()->associate(Auth::user()->id);
        }
        elseif ($request->input('mentor')) {
            $student->mentor()->associate($request->input('mentor'));
        }

        $student->gender()->associate($request->input('gender_id'));

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

        return json_encode(['result' => 'ok']);
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
     * Get levels in student list
     * @return \JSON
     */
    public function getFilterLevels()
    {
        $schoolLevels = SchoolLevel::all();
        return response()->json($schoolLevels);
    }

    /**
     * Get schools for level in student list
     * @param  \Illuminate\Http\Request  $request
     * @return \JSON
     */
    public function getFilterSchools(Request $request)
    {
        $schoolQuery = School::query();
        $schoolQuery->where('district_id', '=', Auth::user()->district_id);
        if($request->input('level') != 0) {
            $schoolQuery->where('level', '=', $request->input('level'));
        }
        $schools = $schoolQuery->get();
        return response()->json($schools);
        // return response()->json(['district_id' => Auth::user()->district_id]);
    }

    /**
     * Get Students by Mentors
     * @param \Illuminate\Http\Request  $request
     * mentor id array
     * @return \JSON
     */
    public function getFilterStudents(Request $request) {
        $studentQuery = Student::query();

        $studentQuery->whereIn('mentor_id', $request->input('selectedMentors'));
        $students = $studentQuery->get();
        return response()->json($students);
    }

    /**
     * Get options for student creation
     * @return \JSON
     */
    public function getOptions()
    {
        $ethnicities = Ethnicity::all();
        $ieps = Iep::all();

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

        return json_encode(
            [
                'userRole'                      => Auth::user()->user_role_id,
                'ethnicities'                   => $ethnicities,
                'ieps'                          => $ieps,
                'availableMentors'              => $availableMentors,
                'availableSchools'              => School::where('district_id', Auth::user()->district_id)->get(),
                'monitoringLocationsByCategory' => $monitoringLocationsByCategory,
                'monitoringLocationNamesById'   => $monitoringLocationNamesById,
                'citizenshipValuesByType'       => $citizenshipValuesByType,
            ]
        );
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
