@extends('layouts.app')

@section('content')

@component('components.login-form', [
    'submitUrl' => url('/login'),
    'username'  => 'email'
])
    @slot('navItems')
        <li role="presentation" class="active"><a>Faculty/Staff</a></li>
        <li role="presentation"><a href="{{ url('/login/stakeholder') }}">Stakeholder</a></li>
    @endslot

    @slot('passwordResetLink')
        <a class="btn btn-link" href="{{ url('/password/reset') }}">
            Forgot Your Password?
        </a>
    @endslot

@endcomponent

@endsection
