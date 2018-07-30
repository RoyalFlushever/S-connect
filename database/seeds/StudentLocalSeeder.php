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
                    return $data + [ 'first_name' => 'Test', 'last_name' => 'Student', 'password' => Hash::make('test'),
                        'created_at' => $now, 'updated_at' => $now ];
                },
                [
                    [ 'id' => 1 ,  'username' => 'teststudent1' , 'birthdate' => '2000-04-17' , 'gender_id' => 1 , 'mentor_id' => null ],
                    [ 'id' => 2 ,  'username' => 'teststudent2' , 'birthdate' => '1999-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 3 ,  'username' => 'teststudent2' , 'birthdate' => '1998-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 4 ,  'username' => 'teststudent2' , 'birthdate' => '1999-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 5 ,  'username' => 'teststudent2' , 'birthdate' => '1999-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 6 ,  'username' => 'teststudent2' , 'birthdate' => '1995-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 7 ,  'username' => 'teststudent2' , 'birthdate' => '1999-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 8 ,  'username' => 'teststudent2' , 'birthdate' => '1999-04-18' , 'gender_id' => 1 , 'mentor_id' => 4    ],
                    [ 'id' => 9 ,  'username' => 'teststudent2' , 'birthdate' => '2001-04-18' , 'gender_id' => 1 , 'mentor_id' => 4    ],
                    [ 'id' => 19 , 'username' => 'teststudent2' , 'birthdate' => '1999-04-18' , 'gender_id' => 2 , 'mentor_id' => null ],
                    [ 'id' => 11 , 'username' => 'teststudent2' , 'birthdate' => '1999-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 12 , 'username' => 'teststudent2' , 'birthdate' => '1999-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 13 , 'username' => 'teststudent2' , 'birthdate' => '2003-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 14 , 'username' => 'teststudent2' , 'birthdate' => '1995-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 15 , 'username' => 'teststudent2' , 'birthdate' => '1999-04-18' , 'gender_id' => 2 , 'mentor_id' => null ],
                    [ 'id' => 16 , 'username' => 'teststudent2' , 'birthdate' => '1995-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 17 , 'username' => 'teststudent2' , 'birthdate' => '1999-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 18 , 'username' => 'teststudent2' , 'birthdate' => '1993-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 19 , 'username' => 'teststudent2' , 'birthdate' => '1994-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 20 , 'username' => 'teststudent2' , 'birthdate' => '1999-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
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

