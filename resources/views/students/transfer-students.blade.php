@extends('layouts.app')

@section('content')

{{--  $ role
Administrator : 1
Facilitator : 2
Site Facilitator : 3
Mentor : 4
--}}

<div class="container">
    @include('layouts.homeheading')
    <div class="filter no-margin">
        <form action="">
            <div class="row">
                <h2 class="pull-left">Transfer Students</h2>
                <input type="text" placeholder="Search Table ..." class="pull-right search-table">
            </div>
            
        </form>
    </div>

    @component('components.table-list', [ 'title' => 'my-students', ])
        @slot('columnHeadings')
            <th></th>
            <th>First name</th>
            <th>Last name</th>
            <th>Current School</th>
            <th>Current Mentor</th>
            <th>New School</th>
            <th>New Mentor</th>
        @endslot

        @forelse ($students as $index => $student)
            <tr>
                <td class="actions text-center">
                    <a href="/transfer" class="btn btn-large btn-cta">Transfer</a>
                </td>
                <td>{{ $student->first_name }}</td>
                <td>{{ $student->last_name }}</td>
                <td>{{ $schools[$index] }}</td>
                <td>{{ $mentors[$index] }}</td>
                <td>
                    <select name="new_school" id="new_school" class="form-control">
                        <option value="" selected disabled>Select</option>
                    </select>
                </td>
                <td>
                    <select name="new mentor" id="new_mentor" class="form-control">
                        <option value="" selected disabled>Select</option>
                    </select>
                </td>
            </tr>
        @empty
            <tr>
                <td colspan="4" class="warning text-center">No students have been assigned</td>
            </tr>
        @endforelse
    @endcomponent
</div>

@endsection
