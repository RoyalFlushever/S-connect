@extends('layouts.app')

@section('content')

    @component('components.user-form.start', [
        'type'      => 'student',
        'submitUrl' => url('/students'),
    ])
    @endcomponent

    @include('components.user-form.name-fields')

    <div class="form-group">
        <label for="birthdate">Date of birth</label>
        <input class="form-control" id="birthdate" name="birthdate" required value="{{ old('birthdate') }}"
            data-provide="datepicker"
            data-date-autoclose="true"
            data-date-disable-touch-keyboard="true"
            data-date-assume-nearby-year="true"
            data-date-end-date="0d"
            data-date-today-btn="linked"
            data-date-today-highlight="true"
        >
    </div>

    <div class="form-group">
        <div><label>Gender</label></div>
        <label class="radio-inline">
            <input type="radio" name="gender" id="gender-female" value="1"
                @if (old('gender') == '1')
                    checked
                @endif
                required
            > Female
        </label>
        <label class="radio-inline">
            <input type="radio" name="gender" id="gender-male" value="2"
                @if (old('gender') == '2')
                    checked
                @endif
                required
            > Male
        </label>
    </div>

    <registration-auth-fields old-username="{{ old('username') }}"></registration-auth-fields>

    @if ($autoAssignMentor)
        <input type="hidden" name="auto_assign_mentor" value="1">
    @else
        <div class="form-group">
            <label for="mentor">Mentor (optional)</label>
            <select class="form-control" name="mentor" id="mentor">
                <option value
                @if (!old('mentor'))
                    selected
                @endif
                >Please select a mentor</option>
                @foreach ($availableMentors as $user)
                    <option value="{{ $user->id }}"
                    @if (old('mentor') == $user->id)
                        selected
                    @endif
                    >{{ $user->full_name }}</option>
                @endforeach
            </select>
        </div>
    @endif

    <fieldset>
        <legend>Monitoring and Citizenship</legend>

        <citizenship-value-fields
            :monitoring-location-names-by-id="{{ $monitoringLocationNamesById }}"
            :monitoring-locations-by-category="{{ $monitoringLocationsByCategory }}"
            :citizenship-values-by-type="{{ $citizenshipValuesByType }}"
        ></citizenship-value-fields>

    </fieldset>

    @component('components.user-form.end')
    @endcomponent

@endsection
