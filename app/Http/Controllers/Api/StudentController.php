<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Student;

class StudentController extends Controller
{
   /**
     * Display the specified resource.
     *
     * @param  string  $username
     * @return \Illuminate\Http\Response
     */
    public function show($username)
    {
        // TODO: Convert HTTP errors (e.g. 403, 404) into JSON API error response
        $student = Student::where('username', $username)->firstOrFail();
        $this->authorize('showSelf', $student);

        // TODO: Should we just fetch this before authorization? (See above)
        // Fetch student with assigned monitoring locations and citizenship values
        $student = Student::with('monitoring_location_assignments.monitoring_location.category',
            'monitoring_location_assignments.citizenship_value_assignments.citizenship_value.type')
            ->where('username', $username)
            ->take(1)
            ->first();

        return response()->json($student);
    }
}
