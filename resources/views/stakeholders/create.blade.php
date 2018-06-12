@extends('layouts.app')

@section('content')

    @component('components.user-form.start', [
        'type'      => 'stakeholder',
        'submitUrl' => url('/stakeholders'),
    ])
        @if ($showStaffNavigation)
            @slot('navList')
                <nav>
                    <ul class="nav nav-tabs">
                        <li role="presentation"><a href="{{ url('/users/create') }}">Faculty/Staff</a></li>
                        <li role="presentation" class="active"><a>Stakeholder</a></li>
                    </ul>
                </nav>
            @endslot
        @endif
    @endcomponent

    <div class="form-group">
        <label for="student">Student</label>
        <select class="form-control" name="student" id="student" required>
            <option value="" disabled
            @if (!old('student'))
                selected
            @endif
            >Please select a student</option>
            @foreach ($students as $student)
                <option value="{{ $student->id }}"
                @if (old('student') == $student->id)
                    selected
                @endif
                >{{ $student->full_name }}</option>
            @endforeach
        </select>
    </div>

    @include('components.user-form.name-fields')

    <registration-auth-fields old-username="{{ old('username') }}"></registration-auth-fields>

    @component('components.user-form.end')
    @endcomponent

@endsection
