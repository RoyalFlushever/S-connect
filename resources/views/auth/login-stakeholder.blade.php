@extends('layouts.app')

@section('content')

@component('components.login-form', [
    'submitUrl' => url('/login/stakeholder'),
    'username'  => 'username'
])

    @slot('navItems')
        <li role="presentation"><a href="{{ url('/login') }}">Faculty/Staff</a></li>
        <li role="presentation" class="active"><a>Stakeholder</a></li>
    @endslot

@endcomponent

@endsection
