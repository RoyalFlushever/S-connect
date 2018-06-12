<?php

namespace Tests;

use App\Stakeholder;

trait StaffUsersOnly
{
    /**
     * Asserts that a stakeholder attempting to access a specified uri is redirected to staff `/login`.
     * @param string $method Should correspond to a shorthand HTTP request method in
     *                       Illuminate\Foundation\Testing\Concerns\MakesHttpRequests (e.g. 'get', 'post', 'patch', etc.)
     * @param string $uri
     * @param array  $data   Data to be sent with the request (does not apply to 'get')
     */
    public function assertStakeholderIsGuarded($method, $uri, $data = [])
    {
        // Manually authenticate a stakeholder *without* overriding the default guard driver
        // See https://github.com/laravel/framework/blob/7212b1e9620c36bf806e444f6931cf5f379c68ff/src/Illuminate/Foundation/Testing/Concerns/InteractsWithAuthentication.php#L9-L35
        // TODO: Re-evaluate our multi-authentication and testing scheme for a better way
        $stakeholder = Stakeholder::findOrFail(1);
        $this->app['auth']->guard('web_stakeholder')->setUser($stakeholder);
        $response = $method === 'get' ? $this->get($uri) : $this->$method($uri, $data);
        $response->assertRedirect('/login');
    }
}
