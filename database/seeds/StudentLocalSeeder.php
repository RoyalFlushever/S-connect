<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class StudentLocalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('students')->insert(
            array_map(
                function($data) {
                    $now = Carbon::now();
                    return $data + [
                        'password'      => Hash::make('test'),
                        'created_at'    => $now,
                        'updated_at'    => $now
                    ];
                },
                [
                    [ 'id' => 1 ,  'username' => 'teststudent1'  , 'first_name' => 'Jonathan'   , 'last_name' => 'Audhat'       , 'birthdate' => '2017-04-17' , 'gender_id' => 1 , 'mentor_id' => null ],
                    [ 'id' => 2 ,  'username' => 'teststudent2'  , 'first_name' => 'Philip'     , 'last_name' => 'Ahn'          , 'birthdate' => '2017-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 3 ,  'username' => 'teststudent3'  , 'first_name' => 'Charles'    , 'last_name' => 'Aidman'       , 'birthdate' => '1998-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 4 ,  'username' => 'teststudent4'  , 'first_name' => 'Danny'      , 'last_name' => 'Aiello'       , 'birthdate' => '1999-04-18' , 'gender_id' => 2 , 'mentor_id' => 2    ],
                    [ 'id' => 5 ,  'username' => 'teststudent5'  , 'first_name' => 'Alan'       , 'last_name' => 'Aisenberg'    , 'birthdate' => '1999-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 6 ,  'username' => 'teststudent6'  , 'first_name' => 'Franklyn'   , 'last_name' => 'Ajaye'        , 'birthdate' => '1995-04-18' , 'gender_id' => 2 , 'mentor_id' => 3    ],
                    [ 'id' => 7 ,  'username' => 'teststudent7'  , 'first_name' => 'Kevin'      , 'last_name' => 'Allison'      , 'birthdate' => '1999-04-18' , 'gender_id' => 2 , 'mentor_id' => 2    ],
                    [ 'id' => 8 ,  'username' => 'teststudent8'  , 'first_name' => 'Chris'      , 'last_name' => 'Alcaide'      , 'birthdate' => '1999-04-18' , 'gender_id' => 1 , 'mentor_id' => 4    ],
                    [ 'id' => 9 ,  'username' => 'teststudent9'  , 'first_name' => 'Robert'     , 'last_name' => 'Alda'         , 'birthdate' => '2001-04-18' , 'gender_id' => 1 , 'mentor_id' => 4    ],
                    [ 'id' => 10 , 'username' => 'teststudent10' , 'first_name' => 'Jason'      , 'last_name' => 'Alexander'    , 'birthdate' => '1999-04-18' , 'gender_id' => 2 , 'mentor_id' => null ],
                    [ 'id' => 11 , 'username' => 'teststudent11' , 'first_name' => 'Daryl'      , 'last_name' => 'Anderson'     , 'birthdate' => '1999-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 12 , 'username' => 'teststudent12' , 'first_name' => 'Erich'      , 'last_name' => 'Anderson'     , 'birthdate' => '1999-04-18' , 'gender_id' => 2 , 'mentor_id' => 3    ],
                    [ 'id' => 13 , 'username' => 'teststudent13' , 'first_name' => 'Steve'      , 'last_name' => 'Agee'         , 'birthdate' => '2003-04-18' , 'gender_id' => 2 , 'mentor_id' => 3    ],
                    [ 'id' => 14 , 'username' => 'teststudent14' , 'first_name' => 'John'       , 'last_name' => 'Agar'         , 'birthdate' => '1995-04-18' , 'gender_id' => 2 , 'mentor_id' => 3    ],
                    [ 'id' => 15 , 'username' => 'teststudent15' , 'first_name' => 'Ben'        , 'last_name' => 'Affleck'      , 'birthdate' => '1999-04-18' , 'gender_id' => 1 , 'mentor_id' => null ],
                    [ 'id' => 16 , 'username' => 'teststudent16' , 'first_name' => 'Nick'       , 'last_name' => 'Afanasiev'    , 'birthdate' => '1995-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 17 , 'username' => 'teststudent17' , 'first_name' => 'Baba'       , 'last_name' => 'Ali'          , 'birthdate' => '1999-04-18' , 'gender_id' => 2 , 'mentor_id' => 2    ],
                    [ 'id' => 18 , 'username' => 'teststudent18' , 'first_name' => 'Mitchell'   , 'last_name' => 'Anderson'     , 'birthdate' => '1993-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 19 , 'username' => 'teststudent19' , 'first_name' => 'Kimberly'   , 'last_name' => 'Elise'        , 'birthdate' => '1994-04-18' , 'gender_id' => 2 , 'mentor_id' => 2    ],
                    [ 'id' => 20 , 'username' => 'teststudent20' , 'first_name' => 'Tiffany'    , 'last_name' => 'Dupont'       , 'birthdate' => '1999-04-18' , 'gender_id' => 1 , 'mentor_id' => 4    ],
                    [ 'id' => 21 , 'username' => 'teststudent21' , 'first_name' => 'Clea'       , 'last_name' => 'DuVall'       , 'birthdate' => '1999-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 22 , 'username' => 'teststudent22' , 'first_name' => 'test'       , 'last_name' => 'Student'      , 'birthdate' => '1999-04-18' , 'gender_id' => 2 , 'mentor_id' => 2    ],
                    [ 'id' => 23 , 'username' => 'teststudent23' , 'first_name' => 'test'       , 'last_name' => 'Student'      , 'birthdate' => '2003-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 24 , 'username' => 'teststudent24' , 'first_name' => 'Tiffany'    , 'last_name' => 'Student'      , 'birthdate' => '1995-04-18' , 'gender_id' => 2 , 'mentor_id' => 3    ],
                    [ 'id' => 25 , 'username' => 'teststudent25' , 'first_name' => 'Robert'     , 'last_name' => 'Afanasiev'    , 'birthdate' => '1999-04-18' , 'gender_id' => 2 , 'mentor_id' => null ],
                    [ 'id' => 26 , 'username' => 'teststudent26' , 'first_name' => 'Baba'       , 'last_name' => 'StudAgarent'  , 'birthdate' => '1995-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 27 , 'username' => 'teststudent27' , 'first_name' => 'Tiffany'    , 'last_name' => 'Student'      , 'birthdate' => '1999-04-18' , 'gender_id' => 2 , 'mentor_id' => 3    ],
                    [ 'id' => 28 , 'username' => 'teststudent28' , 'first_name' => 'Kevin'      , 'last_name' => 'Afanasiev'    , 'birthdate' => '1993-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 29 , 'username' => 'teststudent29' , 'first_name' => 'Charles'    , 'last_name' => 'Agar'         , 'birthdate' => '1994-04-18' , 'gender_id' => 2 , 'mentor_id' => 3    ],
                    [ 'id' => 30 , 'username' => 'teststudent30' , 'first_name' => 'Clea'       , 'last_name' => 'Alda'         , 'birthdate' => '1999-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                ]
            )
        );

        // Assign monitoring locations and citizenship values
        DB::table('monitoring_location_assignments')->insert(
            array_map(
                function($data) {
                    $now = Carbon::now();
                    return $data + [ 'student_id' => 1, 'created_at' => $now, 'updated_at' => $now ];
                },
                [
                    [ 'id' => 1 , 'monitoring_location_id' => 3  , 'label' => 'Probability & Statistics' ],
                    [ 'id' => 2 , 'monitoring_location_id' => 10 , 'label' => NULL ],
                    [ 'id' => 3 , 'monitoring_location_id' => 14 , 'label' => 'Study' ]
                ]
            )
        );
        DB::table('citizenship_value_assignments')->insert(
            array_map(
                function($data) {
                    $now = Carbon::now();
                    return $data + [ 'created_at' => $now, 'updated_at' => $now ];
                },
                [
                    [
                        'id' => 1,
                        'monitoring_location_assignment_id' => 1,
                        'citizenship_value_id' => 1,
                        'alert_interval_in_seconds' => 30,
                        'alert_interval_varies' => false,
                        'custom_phrasing' => NULL,
                        'goal_percentage' => 50
                    ],
                    [
                        'id' => 2,
                        'monitoring_location_assignment_id' => 1,
                        'citizenship_value_id' => 2,
                        'alert_interval_in_seconds' => 60,
                        'alert_interval_varies' => true,
                        'custom_phrasing' => NULL,
                        'goal_percentage' => 60
                    ],
                    [
                        'id' => 3,
                        'monitoring_location_assignment_id' => 1,
                        'citizenship_value_id' => 3,
                        'alert_interval_in_seconds' => 120,
                        'alert_interval_varies' => true,
                        'custom_phrasing' => NULL,
                        'goal_percentage' => 100
                    ],

                    [
                        'id' => 4,
                        'monitoring_location_assignment_id' => 2,
                        'citizenship_value_id' => 4,
                        'alert_interval_in_seconds' => 3600,
                        'alert_interval_varies' => false,
                        'custom_phrasing' => 'Are you being engaged?',
                        'goal_percentage' => 90
                    ],

                    [
                        'id' => 5,
                        'monitoring_location_assignment_id' => 3,
                        'citizenship_value_id' => 3,
                        'alert_interval_in_seconds' => 59,
                        'alert_interval_varies' => false,
                        'custom_phrasing' => NULL,
                        'goal_percentage' => NULL
                    ],
                ]
            )
        );
    }
}

