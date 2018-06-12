@extends('layouts.app')

@section('content')

    @component('components.user-form.start', [
        'type'      => 'faculty/staff',
        'submitUrl' => url('/users'),
    ])
        @slot('navList')
            <nav>
                <ul class="nav nav-tabs">
                    <li role="presentation" class="active"><a>Faculty/Staff</a></li>
                    <li role="presentation"><a href="{{ url('/stakeholders/create') }}">Stakeholder</a></li>
                </ul>
            </nav>
        @endslot
    @endcomponent

    @include('components.user-form.name-fields')

    <registration-auth-fields old-username="{{ old('email') }}" use-email="true"></registration-auth-fields>

    <div class="form-group">
        <label for="user_role">User role</label>
        <select class="form-control" name="user_role" id="user_role" required>
            <option value="" disabled
            @if (!old('user_role'))
                selected
            @endif
            >Please select a user role</option>
            @foreach ($availableUserRoles as $user_role)
                <option value="{{ $user_role['value'] }}"
                @if (old('user_role') == $user_role['value'])
                    selected
                @endif
                >{{ $user_role['label'] }}</option>
            @endforeach
        </select>
    </div>

    <h3>Students/Mentees</h3>
    <dual-list :available-students="{{ $availableStudents }}"></dual-list>

    @component('components.user-form.end')
    @endcomponent

@endsection
