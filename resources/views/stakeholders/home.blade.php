@extends('layouts.app')

@section('homeUrl', url('stakeholder-home'))

@section('content')

@component('components.table-list', [ 'title' => 'My student' ])
    @slot('columnHeadings')
        <th>First name</th>
        <th>Middle name</th>
        <th>Last name</th>
        <th>Date of birth</th>
        <th>Assigned mentor</th>
    @endslot

    <tr>
        <td>{{ $student->first_name }}</td>
        <td>{{ $student->middle_name }}</td>
        <td>{{ $student->last_name }}</td>
        <td>{{ $student->birthdate->toFormattedDateString() }}</td>
        <td>{{ $student->mentor ? $student->mentor->fullName : '' }}</td>
    </tr>
@endcomponent

@endsection
