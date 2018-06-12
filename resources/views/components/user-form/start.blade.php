<div class="container">
    <div class="panel panel-default">
        <div class="panel-heading">
            <h1 class="panel-title">Add a {{ $type }} account</h1>
        </div>

        <div class="panel-body">
            @if (isset($navList))
                {{ $navList }}
            @endif

            <form method="POST" action="{{ $submitUrl }}">
                {{ csrf_field() }}

{{-- Correlate closing tags in components/user-form/end.blade.php --}}
