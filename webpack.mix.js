const { mix } = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

// Make `jquery` available to other modules (e.g. bootstrap)
mix.autoload({
    jquery: [ '$', 'jQuery', 'window.jQuery' ]
});

mix.js('resources/assets/js/app.js', 'public/js')
   .extract([ 'jquery', 'bootstrap-sass', 'bootstrap-datepicker', 'vue', 'zxcvbn' ])
   .sass('resources/assets/scss/app.scss', 'public/css');

// Use cache-busting version suffix for production compilations
if (mix.inProduction()) {
    mix.version();
}
