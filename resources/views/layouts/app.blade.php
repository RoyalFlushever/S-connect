<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <link rel="shortcut icon" href="{{ config('iconnect.default_icon') }}" type="image/x-icon">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Styles -->
    <link href="{{ mix('/css/app.css') }}" rel="stylesheet">

    <!-- Scripts -->
    <script>
        window.Laravel = {!! json_encode([
            'csrfToken' => csrf_token(),
        ]) !!};
    </script>
</head>
<body>
    <script src="{{ mix('/js/manifest.js') }}"></script>
    <script src="{{ mix('/js/vendor.js') }}"></script>
    <div id="app">
        <nav class="navbar navbar-default navbar-static-top">
            <div class="container">
                <div class="navbar-header">

                    <!-- Collapsed Hamburger -->
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#app-navbar-collapse">
                        <span class="sr-only">Toggle Navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>

                    <!-- Branding Image -->
                    <a class="navbar-brand" href="@yield('homeUrl', url('/'))">
                        <img src="{{asset('/images/brand.png')}}" alt="iConnect" height="55px">
                    </a>
                </div>

                <div class="collapse navbar-collapse" id="app-navbar-collapse">
                    <!-- Left Side Of Navbar -->
                    <ul class="nav navbar-nav">
                        @if (Auth::guest())
                            &nbsp;
                        @else
                            <h2>Welcome, {{ Auth::user()->full_name }} !</h2>
                        @endif
                    </ul>
                    @if ($_SERVER['REQUEST_URI'] =="/login")
                        <ul class="nav navbar-nav navbar-right">
                            <div>
                                <a class="btn btn-link pull-right login-forgot" href="{{ url('/password/reset') }}">
                                    Forgot Password?
                                </a>
                            </div>
                        </ul>
                    @else
                    <!-- Right Side Of Navbar -->
                        <ul class="nav navbar-nav navbar-right">
                            
                            <!-- Authentication Links -->
                            @if (Auth::guest())
                                <!-- Email and Password -->
                                <form class="navbar-form navbar-left" role="form" method="POST" action="{{ url('/login') }}">
                                    {{ csrf_field() }}

                                    <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                                        <input id="email" type="email" class="form-control" name="email" placeholder="Email" value="{{ old('email') }}"  autocomplete="email" required autofocus>
                                        <input id="password" type="password" class="form-control" name="password" placeholder="Password" required autocomplete="current-password">
                                        @if ($errors->has('email'))
                                            <span class="help-block">
                                                <strong>{{ $errors->first('email') }}</strong>
                                            </span>
                                        @endif

                                        @if ($errors->has('password'))
                                            <span class="help-block">
                                                <strong>{{ $errors->first('password') }}</strong>
                                            </span>
                                        @endif    
                                    </div>
                                    <button type="submit" class="btn btn-default btn-lg btn-cta">Login</button>
                                </form>
                                <div>
                                    <a class="btn btn-link pull-right" href="{{ url('/password/reset') }}">
                                        Forgot Password?
                                    </a>
                                </div>
                            @else
                                <li>
                                    <a href="{{ url('/logout') }}" class="btn btn-red logout nav-link"
                                    onclick="event.preventDefault();
                                    document.getElementById('logout-form').submit();">
                                    Logout
                                    </a>
                                    
                                    <form id="logout-form" action="{{ url('/logout') }}" method="POST" style="display: none;">
                                        {{ csrf_field() }}
                                    </form>
                                </li>
                                <li class="dropdown gray-border">
                                    <!-- <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                                        {{ Auth::user()->full_name }} <span class="caret"></span>
                                    </a>
                                     -->
                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                                        My Account <span class="caret">
                                    </a>
                                    <ul class="dropdown-menu" role="menu">
                                        <li>
                                            <a href="{{ url('/logout') }}"
                                            onclick="event.preventDefault();
                                            document.getElementById('logout-form').submit();">
                                            Logout
                                            </a>
                                            
                                            <form id="logout-form" action="{{ url('/logout') }}" method="POST" style="display: none;">
                                                {{ csrf_field() }}
                                            </form>
                                        </li>
                                    </ul>
                                </li>
                            @endif
                        </ul>
                    @endif
                </div>
            </div>
        </nav>

        @yield('content')

        <!-- <footer class="footer">
            <div class="container">
                <p class="text-muted small">{{ $applicationVersion }}</p>
            </div>
        </footer> -->
    </div>

    <script src="{{ mix('/js/app.js') }}"></script>

</body>
</html>
