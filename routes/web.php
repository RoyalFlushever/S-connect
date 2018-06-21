<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Require site users to be logged in; authenticated users are automatically sent to /home
// Route::get('/', function() {
//     return redirect('/home');
// })->middleware('auth');
Route::get('/', 'HomeController@welcome');

// Manually use authentication routes from Laravel's router, excluding registration routes
// See \Illuminate\Routing\Router@auth
// Authentication Routes...
Route::get('login', 'Auth\LoginController@showLoginForm')->name('login');
Route::post('login', 'Auth\LoginController@login');
Route::post('logout', 'Auth\LoginController@logout')->name('logout');
// Password Reset Routes...
Route::get('password/reset', 'Auth\ForgotPasswordController@showLinkRequestForm')->name('password.request');
Route::post('password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail')->name('password.email');
Route::get('password/reset/{token}', 'Auth\ResetPasswordController@showResetForm')->name('password.reset');
Route::post('password/reset', 'Auth\ResetPasswordController@reset');

Route::get('home', 'HomeController@index')->name('home');

Route::resource('students', 'StudentController', ['only' => [
    'index', 'create', 'store'
]]);
Route::get('my-students', 'StudentController@myStudents');
Route::resource('users', 'UserController', ['only' => [
    'index', 'create', 'store'
]]);
Route::resource('stakeholders', 'StakeholderController', ['only' => [
    'index', 'create', 'store'
]]);


//
// As a Stakeholder…
//
// Authentication routes for Stakeholders
Route::get('login/stakeholder', 'Auth\LoginStakeholderController@showLoginForm');
Route::post('login/stakeholder', 'Auth\LoginStakeholderController@login');
//Route::post('logout', 'Auth\LoginController@logout')->name('logout');

// Stakeholder home
Route::get('stakeholder-home', 'Stakeholders\HomeController@index');
