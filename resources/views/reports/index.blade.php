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

    <div class="panel panel-default">
        
        <div class="panel-body">
            <div class="row">
                <div class="reports-type text-center">
                    <div class="reports-img">
                    </div>
                    <h4>Reports</h4>
                    <select name="type" id="report-type">
                        <option value="type" disabled selected>Select Report Type</option>
                        <option value="student demographic">Student Demographic Report</option>
                        <option value="summary demographic">Summary Demographic</option>
                        <option value="summary citizenship">Summary Citizenship Mentoring</option>
                        <option value="usage report">School/Mentor Usage Report</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection