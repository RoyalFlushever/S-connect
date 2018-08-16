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
                <form id="reporttypeform" ref="reporttypeform" class="reports-type text-center" action="/reports" method="POST">
                    {{ csrf_field() }}
                    <div class="reports-img">
                    </div>
                    <h4>Reports</h4>
                    <select name="type" id="report-type" form="reporttypeform" v-model="reportType">
                        <option value="type" disabled selected>Select Report Type</option>
                        <option value="demographic report">Student Demographic Report</option>
                        <option value="demographic summary">Summary Demographic</option>
                        <option value="citizenship mentoring">Summary Citizenship Mentoring</option>
                        @if ($role == 2)
                            <option value="usage report">School/Mentor Usage Report</option>
                        @endif
                    </select>
                    <button class="btn btn-lg btn-cta btn-lightblue next report" @click.prevent="clickReport">Next</button>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection