<div class="container">
    <div class="panel panel-default">
        <div class="panel-heading">
            <h1 class="panel-title">{{ $title }}</h1>
        </div>

        <div class="panel-body">
            <table class="table table-hover table-condensed">
                <thead>
                    <tr>
                        {{ $columnHeadings }}
                    </tr>
                </thead>
                <tbody>
                    {{ $slot }}
                </tbody>
            </table>
        </div>
    </div>
</div>
