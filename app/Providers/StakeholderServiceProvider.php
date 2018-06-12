<?php

namespace App\Providers;

use App\Repositories\StakeholderRepository;

use Illuminate\Support\ServiceProvider;

class StakeholderServiceProvider extends ServiceProvider
{
    /**
     * Register the application services.
     */
    public function register()
    {
        $this->app->singleton(StakeholderRepository::class, function () {
            return new StakeholderRepository();
        });
    }
}
