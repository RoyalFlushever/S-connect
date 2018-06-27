<div class="table-responsive">
    <table class="table table-hover {{ $title }}">
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
