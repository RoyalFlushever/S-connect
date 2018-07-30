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

    <div class="row">
        <div class="col-md-3 col-xs-12 admin-dashboard">
            <div class="gray-border">
                <img src="/images/roles.png"  class="img-responsive" alt="Manage Roles">
                <div class="text-center">
                    <h3>Manage Roles</h3>
                    <p>Manage All Roles in this application</p>
                    <p class="updated_at">Last updated 3 mins ago</p>
                </div>
            </div> 
        </div>
        <div class="col-md-3 col-xs-12 admin-dashboard">
            <div class="gray-border">
                <img src="/images/manage banner.png"  class="img-responsive" alt="Manage Banner">
                <div class="text-center">
                    <h3>Manage Banner</h3>
                    <p>Set Banner on logon page</p>
                    <p class="updated_at">Last updated 3 mins ago</p>
                </div>
            </div> 
        </div>
        <div class="col-md-3 col-xs-12 admin-dashboard">
            <div class="gray-border">
                <img src="/images/notify users.png"  class="img-responsive" alt="Notify users">
                <div class="text-center">
                    <h3>Notify users</h3>
                    <p>Send a message to all users</p>
                    <p class="updated_at">Last updated 3 mins ago</p>
                </div>
            </div> 
        </div>
        <div class="col-md-3 col-xs-12 admin-dashboard">
            <div class="gray-border">
                <img src="/images/manage administrators.png"  class="img-responsive" alt="Manage Administrators">
                <div class="text-center">
                    <h3>Manage Administrators</h3>
                    <p>Set site admins</p>
                    <p class="updated_at">Last updated 3 mins ago</p>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection