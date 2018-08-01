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
Route::get('/', 'RegistrationController@welcome');
Route::get('/', function() {
    return redirect('/home');
})->middleware('auth');
Route::get('/tos', 'RegistrationController@tos');

// Manually use authentication routes from Laravel's router, excluding registration routes
// See \Illuminate\Routing\Router@auth
// Authentication Routes...
Route::get('login', 'Auth\LoginController@showLoginForm')->name('login');
Route::get('get-auth', 'Auth\UserController@getAuth')->middleware('auth');
Route::post('login', 'Auth\LoginController@login');
Route::post('logout', 'Auth\LoginController@logout')->name('logout');
// Password Reset Routes...
Route::get('password/reset', 'Auth\ForgotPasswordController@showLinkRequestForm')->name('password.request');
Route::post('password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail')->name('password.email');
Route::get('password/reset/{token}', 'Auth\ResetPasswordController@showResetForm')->name('password.reset');
Route::post('password/reset', 'Auth\ResetPasswordController@reset');

Route::get('home', 'HomeController@index')->name('home');
Route::get('site_admin', 'HomeController@site_admin')->name('site-admin');

Route::resource('students', 'StudentController', ['only' => [
    'index', 'create', 'store'
]]);
Route::get('my-students', 'StudentController@myStudents');
Route::post('my-students/get-list', 'StudentController@getList');
Route::get('my-students/get-filter-levels', 'StudentController@getFilterLevels');
Route::post('my-students/get-filter-schools', 'StudentController@getFilterSchools');
Route::post('my-students/get-filter-mentors', 'UserController@mentors');

Route::get('create-student/get-options', 'StudentController@getOptions');
Route::post('create-student/get-student', 'StudentController@getStudent');
Route::post('create-student/save-student', 'StudentController@saveStudent');
Route::post('transfer-student', 'StudentController@transfer');

Route::get('transfer', 'StudentController@transfer');

Route::resource('users', 'UserController', ['only' => [
    'index', 'create', 'store'
]]);
Route::post('users/get-list', 'UserController@getList');

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

// Multistep Registration
Route::get('registration', 'RegistrationController@registration');
// Route::post('registration', 'RegistrationController@create');

// Reports
Route::get('report', 'ReportController@index');


Route::get('states',            'LocationController@states');
Route::post('counties',         'LocationController@counties');
Route::post('districts',        'LocationController@districts');
Route::post('schools',          'LocationController@schools');
Route::get('default-location',  'LocationController@defaultLocation');

Route::get('referralSource',    'RegistrationController@referralSource');

Route::post('registerUser',     'RegistrationController@registerUser');
Route::post('saveIssue',        'RegistrationController@saveIssue');