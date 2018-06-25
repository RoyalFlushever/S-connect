@extends('layouts.app')


@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2 tos-form">
            <div class="panel panel-default form-wrapper">
                <div id="heading-description" class="description heading">
                    i-Connect is a Self-Management Application for a smart phone or 
                    tablet. iConnect allows School-based Mentors and other individuals 
                    to set goals and monitor academic engagement and
                    social/behavioral growth of a student ages 5-25. For additional
                    information please go to iConnect.Ku.edu.
                </div>
                <form class="form-horizontal" action="/registration" method="GET">
                    <div class="form-group">
                        <div class="col-sm-offset-1  col-sm-10">
                            <div class="checkbox">
                                <input type="checkbox">
                                <label class="description">
                                    Please acknowledge i-Connect can only be accessed with an internet
                                    connection. Before proceeding, understand your students must have access to
                                    internet for the application to operate.
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-offset-1  col-sm-10">
                            <div class="checkbox">
                                <input type="checkbox">
                                <label class="description"> 
                                    Please read and accept the <a href="" onclick="window.open('/tos');">Terms and Conditions</a> 
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="text-center">
                            <button type="submit" class="btn btn-default btn-cta">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection