@extends('layouts.app')

@section('content')

@component('components.table-list', [ 'title' => 'My students' ])
    @slot('columnHeadings')
        <th>First name</th>
        <th>Middle name</th>
        <th>Last name</th>
        <th>Date of birth</th>
    @endslot

    @forelse ($students as $student)
        <tr>
            <td>{{ $student->first_name }}</td>
            <td>{{ $student->middle_name }}</td>
            <td>{{ $student->last_name }}</td>
            <td>{{ $student->birthdate->toFormattedDateString() }}</td>
        </tr>
    @empty
        <tr>
            <td colspan="4" class="warning text-center">No students have been assigned</td>
        </tr>
    @endforelse
@endcomponent

@endsection
