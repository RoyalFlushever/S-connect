
<div class="container">
    <div class="row">
        <form class="form-horizontal login-form" role="form" method="POST" action="{{ $submitUrl }}">
            {{ csrf_field() }}

            <div class="form-group{{ $errors->has($username) ? ' has-error' : '' }}">
                <div class="col-md-4 col-md-offset-4">
                    <input id="{{ $username }}" type="{{ $username === 'email' ? 'email' : 'text' }}" class="form-control input-green" name="{{ $username }}" value="{{ old($username) }}" placeholder="USERNAME" required autofocus>

                    @if ($errors->has($username))
                        <span class="help-block">
                            <strong>{{ $errors->first($username) }}</strong>
                        </span>
                    @endif
                </div>
            </div>

            <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
                <div class="col-md-4 col-md-offset-4">
                    <input id="password" type="password" class="form-control input-blue" name="password" placeholder="PASSWORD" required>

                    @if ($errors->has('password'))
                        <span class="help-block">
                            <strong>{{ $errors->first('password') }}</strong>
                        </span>
                    @endif
                </div>
            </div>
            <div class="form-group">
                <div class="col-md-8 col-md-offset-2">
                    <button type="submit" class="btn btn-yellow full-width">
                        LOGIN
                    </button>
                </div>
            </div>
        </form>
    </div>
</div>
