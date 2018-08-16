<div class="row homeheading">
    @if ($_SERVER['REQUEST_URI'] !="/home")
        <div class="pull-left home-icon">
            <span class="round-tab">
                <a href="/home">
                    <i class="fa fa-home fa-2x" aria-hidden="true"></i>
                    <br>
                    Home
                </a>
            </span>
        </div>
    @endif
    <div class="pull-right help">
        <span class="round-tab"><i class="fa fa-question-circle fa-2x"></i> <br> Help</span>
    </div>
</div>