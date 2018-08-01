@extends('layouts.app')

@section('content')

@component('components.table-list', [ 'title' => 'View users' ])
    @slot('columnHeadings')
        <th>First name</th>
        <th>Middle name</th>
        <th>Last name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Last login</th>
    @endslot

    @forelse ($users as $user)
        <tr>
            <td>{{ $user->first_name }}</td>
            <td>{{ $user->middle_name }}</td>
            <td>{{ $user->last_name }}</td>
            <td>{{ $user->email }}</td>
            <td>{{ $user->user_role->name }}</td>
            <td>{{ $user->last_login ? $user->last_login->toFormattedDateString() : 'Never'}}</td>
        </tr>
    @empty
        <tr>
            <td colspan="6" class="warning text-center">No users found</td>
        </tr>
    @endforelse
@endcomponent

@include('components.stakeholder-list')

@endsection
