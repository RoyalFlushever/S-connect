@extends('layouts.app')

@section('content')

<div class="container">
    <div class="filter">
        <form action="">
            <div class="row">
                <div class="form-group col-xs-2 text-center">
                    <label for="school_level">School Level</label>
                    <select name="school level" id="school_level" class="form-control">
                        <option value="" selected disabled>Select</option>
                    </select>
                </div>
                <div class="form-group col-xs-2 col-xs-offset-1 text-center">
                    <label for="school_name">School Name</label>
                    <select name="school name" id="school_name" class="form-control">
                        <option value="" selected disabled>Select</option>
                    </select>
                </div>
                <div class="form-group col-xs-2 col-xs-offset-1 text-center">
                    <label for="mentor">Mentor</label>
                    <select name="mentor" id="mentor" class="form-control">
                        <option value="" selected disabled>Select</option>
                    </select>
                </div>
                <div class="form-group col-xs-2 text-center">
                    <a href="#" class="btn btn-large btn-blue">View Students</a>
                </div>
            </div>
        </form>
    </div>
    @component('components.table-list', [ 'title' => 'my-students', ])
        @slot('columnHeadings')
            <th>#</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Age</th>
            <th></th>
        @endslot

        @forelse ($students as $index => $student)
            <tr>
                <td>{{ $index+1 }}</td>
                <td>{{ $student->first_name }}</td>
                <td>{{ $student->last_name }}</td>
                <td>{{ date("Y") - $student->birthdate->format("Y") }}</td>
                <td class="actions text-center">
                    <a href="#" class="btn btn-large btn-cta">Edit</a>
                    <a href="#" class="btn btn-large btn-blue">View Chart</a>
                    <a href="#" class="btn btn-large btn-yellow">Transfer</a>
                </td>
            </tr>
        @empty
            <tr>
                <td colspan="4" class="warning text-center">No students have been assigned</td>
            </tr>
        @endforelse
    @endcomponent
    <div class="text-center">
        <a href="/students/create" class="btn btn-lg btn-cta">Add New Student</a>
    </div>
</div>

@endsection
