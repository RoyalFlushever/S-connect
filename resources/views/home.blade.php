@extends('layouts.app')

@section('content')
<div class="container">
    @if (session('status'))
        <div class="alert alert-success alert-dismissable" role="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            {{ session('status') }}
        </div>
    @endif

    @include('layouts.homeheading')

    <!-- <div class="panel panel-default">
        <div class="panel-heading">
            <h1 class="panel-title">Dashboard</h1>
        </div>

        <div class="panel-body">
            {{-- Max three items per row (assuming 12 @grid-columns) --}}
            <div class="row">
            @forelse ($dashboardItems as $item)
                <div class="col-md-4">
                    <a class="btn btn-default btn-lg center-block" href="{{ $item['url'] }}" {{ $item['disabled'] or null }}>{{ $item['label'] }}</a>
                </div>
            @empty
                <div class="col-md-12">Sorry, there are no actions to perform</div>
            @endforelse
            </div>
        </div>
    </div> -->

    
    <div class="row" style="margin-bottom: 30px;">
        <div class="col-xs-6 dashboard gray-border">
            <div class='dashboard-icon'>
                <img src="/images/students.png" alt="Manage Students">
            </div>
            <div style="margin: 20px 25px;">
                <h3 class="module-title">Manage Students</h3>
                <ul>
                    <li><a>Add</a></li>
                    <li><a>Edit</a></li>
                    <li><a>View Chart</a></li>
                </ul>
            </div>
        </div>
        <div class="col-xs-6 dashboard gray-border">
            <div class='dashboard-icon'>
                <img src="/images/reports icon.png" alt="Reports">
            </div>
            <div style="margin: 20px 17px;">
                <h3 class="module-title">Reports</h3>
                <ul>
                    <li><a>Create</a></li>
                    <li><a>View Summary Reports</a></li>
                </ul>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-xs-6 dashboard gray-border">
            <div class='dashboard-icon'>
                <img src="/images/mentors.png" alt="Manage mentors">
            </div>
            <div style="margin: 20px 40px;">
                <h3 class="module-title">Manage <br>Site Facilitators/Mentors</h3>
                <ul>
                    <li><a>Add</a></li>
                    <li><a>Edit</a></li>
                    <li><a>De-Activate</a></li>
                </ul>
            </div>
        </div>
        <div class="col-xs-6 dashboard gray-border">
            <div class='dashboard-icon'>
                <img src="/images/resource icon.png" alt="Additional Resources">
            </div>
            <div style="margin: 60px 70px;">
                <h3 class="module-title">Additional Resources</h3>
            </div>
        </div>
    </div>

</div>
@endsection
