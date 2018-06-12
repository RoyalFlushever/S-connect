<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Stakeholder;

use Carbon\Carbon;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginStakeholderController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    protected $redirectTo = '/stakeholder-home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest:web_stakeholder', ['except' => 'logout']);
    }

    /**
     * {@inheritDoc} Use a custom form for stakeholders
     */
    public function showLoginForm()
    {
        return view('auth.login-stakeholder');
    }

    /**
     * {@inheritDoc}. Add custom handling once a user has logged in.
     *
     * @param Request     $request
     * @param Stakeholder $user
     *
     * @return \Illuminate\Http\Response
     */
    protected function authenticated(Request $request, Stakeholder $user)
    {
        // Update the last login time
        $user->last_login = Carbon::now();
        $user->save();

        // Force a redirect to the specified redirect path (versus intended)
        // See also https://github.com/laravel/framework/blob/a513aaa2da69d1d8619c10568b3c13e4e250c825/src/Illuminate/Foundation/Auth/AuthenticatesUsers.php#L103-L104
        return redirect($this->redirectPath());
    }

    /**
     * {@inheritDoc}
     * @return string
     */
    public function username()
    {
        return 'username';
    }

    /**
     * {@inheritDoc}
     * @return \Illuminate\Contracts\Auth\StatefulGuard
     */
    protected function guard()
    {
        // See auth.php config registration
        return Auth::guard('web_stakeholder');
    }
}
