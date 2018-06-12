@extends('layouts.app')

@section('content')

@component('components.table-list', [ 'title' => 'View students' ])
    @slot('columnHeadings')
        <th>First name</th>
        <th>Middle name</th>
        <th>Last name</th>
        <th>Date of birth</th>
        <th>Assigned mentor</th>
    @endslot

    @forelse ($students as $student)
        <tr>
            <td>{{ $student->first_name }}</td>
            <td>{{ $student->middle_name }}</td>
            <td>{{ $student->last_name }}</td>
            <td>{{ $student->birthdate->toFormattedDateString() }}</td>
            <td>{{ $student->mentor ? $student->mentor->fullName : '' }}</td>
        </tr>
    @empty
        <tr>
            <td colspan="5" class="warning text-center">No students found</td>
        </tr>
    @endforelse
@endcomponent

@endsection
