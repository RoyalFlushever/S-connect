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
    </div>

    @if ($role == 1)
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
    @else
    <div class="row">
        <div class="col-xs-12 col-md-6 dashboard">
            <div class="gray-border">
                <div class='dashboard-icon'>
                    <img src="/images/students.png"  class="img-responsive" alt="Manage Students">
                </div>
                <div class="dashboard-content">
                    <div>
                        <h3 class="module-title"><a href="/my-students">Manage Students</a></h3>
                        <ul>
                            <li><a>Add</a></li>
                            <li><a>Edit</a></li>
                            <li><a>View Chart</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xs-12 col-md-6 dashboard">
            <div class="gray-border">
                <div class='dashboard-icon'>
                    <img src="/images/reports icon.png"  class="img-responsive" alt="Reports">
                </div>
                <div class="dashboard-content">
                    <div>
                    <h3 class="module-title">Reports</h3>
                    <ul>
                        <li><a href="/reports">Create</a></li>
                        <li><a>View Summary Reports</a></li>
                    </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-xs-12 col-md-6 dashboard">
            <div class="gray-border">
                <div class='dashboard-icon'>
                    <img src="/images/mentors.png"  class="img-responsive" alt="Manage mentors">
                </div>
                <div class="dashboard-content">
                    <div>
                    <h3 class="module-title"> <a href="/users">Manage <br>Site Facilitators/Mentors</a></h3>
                    <ul>
                        <li><a>Add</a></li>
                        <li><a>Edit</a></li>
                        <li><a>De-Activate</a></li>
                    </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xs-12 col-md-6 dashboard">
            <div class="gray-border">
                <div class='dashboard-icon'>
                    <img src="/images/resource icon.png"  class="img-responsive" alt="Additional Resources">
                </div>
                <div class="dashboard-content">
                    <div>
                        <h3 class="module-title">Additional Resources</h3>
                        <button class="btn btn-cta btn-green">Link to iConnect.Ku.edu</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    @endif

</div>

<!-- <v-modal v-if={{$issueModal}} @close="{{$issueModal}} == false"  actionurl="https://iconnect.ku.edu">
    <p slot="body" style="font-size: 18px;">
        For additional information, Instructional Materials, Videos <br>
        Readiness Assessment go to iconnect.ku.edu. This link will 
    </p>
    <span slot="action">Link to iConnect.Ku.edu</span>
    <h3 slot="header" class="text-center">Additional Resources</h3>
</v-modal> -->
@endsection
