<?php

namespace App\Providers;

use App\ApplicationVersion;

use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //if (config('app.debug')) {
        //    // Enable query logging for debugging
        //    \DB::listen(function($query) {
        //        $bindings = implode(',', $query->bindings);
        //        \Log::info("Executing query: [$query->sql, ($bindings)]. Duration: $query->time");
        //    });
        //}

        View::share('applicationVersion', ApplicationVersion::get());
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        // Set a default schema string length of 191 so that we can use keys in MySQL (see below) without exceeding key
        // length limits or manually setting field lengths
        // For background info, see https://github.com/laravel/framework/issues/17337
        // TODO: Remove this once our infrastructure includes MySQL 5.7.7+ or otherwise uses `innodb_large_prefix`
        \Illuminate\Support\Facades\Schema::defaultStringLength(191);
    }
}
