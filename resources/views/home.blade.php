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

    
</div>
@endsection
