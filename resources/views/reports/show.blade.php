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
    </div>
    @if ($type == 'demographic report')
        <demographic-report role="{{ $role }}"></demographic-report>
    @elseif ($type == 'demographic summary')
        <demographic-summary role="{{ $role }}"></demographic-summary>
    @elseif ($type == 'citizenship mentoring')
        <citizenship-mentoring role="{{ $role }}"></citizenship-mentoring>
    @else ($type == 'usage report')
        <usage-report role="{{ $role }}"></usage-report>
    @endif

@endsection
