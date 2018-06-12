<?php

namespace App\Providers;

use Laravel\Passport\Passport;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        'App\MonitoringLocationAssignment' => 'App\Policies\MonitoringLocationAssignmentPolicy',
        'App\Student'                      => 'App\Policies\StudentPolicy',
        'App\User'                         => 'App\Policies\UserPolicy'
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        // Passport OAuth2 routes need CORS handling (intended for API authentication)
        Passport::routes(null, [ 'middleware' => [ \Barryvdh\Cors\HandleCors::class ] ]);
    }
}
