<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class StudentTestingSeeder extends Seeder
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
                        'password' => Hash::make('test'),
                        'created_at' => $now, 'updated_at' => $now 
                    ];
                },
                [
                    [ 'id' => 1 ,  'username' => 'teststudent1'  , 'first_name' => 'test', 'last_name' => 'Student', 'birthdate' => '2017-04-17' , 'gender_id' => 1 , 'mentor_id' => null ],
                    [ 'id' => 2 ,  'username' => 'teststudent2'  , 'first_name' => 'test', 'last_name' => 'Student', 'birthdate' => '2017-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 3 ,  'username' => 'teststudent3'  , 'first_name' => 'test', 'last_name' => 'Student', 'birthdate' => '1998-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 4 ,  'username' => 'teststudent4'  , 'first_name' => 'test', 'last_name' => 'Student', 'birthdate' => '1999-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 5 ,  'username' => 'teststudent5'  , 'first_name' => 'test', 'last_name' => 'Student', 'birthdate' => '1999-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 6 ,  'username' => 'teststudent6'  , 'first_name' => 'test', 'last_name' => 'Student', 'birthdate' => '1995-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 7 ,  'username' => 'teststudent7'  , 'first_name' => 'test', 'last_name' => 'Student', 'birthdate' => '1999-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 8 ,  'username' => 'teststudent8'  , 'first_name' => 'test', 'last_name' => 'Student', 'birthdate' => '1999-04-18' , 'gender_id' => 1 , 'mentor_id' => 4    ],
                    [ 'id' => 9 ,  'username' => 'teststudent9'  , 'first_name' => 'test', 'last_name' => 'Student', 'birthdate' => '2001-04-18' , 'gender_id' => 1 , 'mentor_id' => 4    ],
                    [ 'id' => 10 , 'username' => 'teststudent10' , 'first_name' => 'test', 'last_name' => 'Student', 'birthdate' => '1999-04-18' , 'gender_id' => 2 , 'mentor_id' => null ],
                    [ 'id' => 11 , 'username' => 'teststudent11' , 'first_name' => 'test', 'last_name' => 'Student', 'birthdate' => '1999-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 12 , 'username' => 'teststudent12' , 'first_name' => 'test', 'last_name' => 'Student', 'birthdate' => '1999-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 13 , 'username' => 'teststudent13' , 'first_name' => 'test', 'last_name' => 'Student', 'birthdate' => '2003-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 14 , 'username' => 'teststudent14' , 'first_name' => 'test', 'last_name' => 'Student', 'birthdate' => '1995-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 15 , 'username' => 'teststudent15' , 'first_name' => 'test', 'last_name' => 'Student', 'birthdate' => '1999-04-18' , 'gender_id' => 2 , 'mentor_id' => null ],
                    [ 'id' => 16 , 'username' => 'teststudent16' , 'first_name' => 'test', 'last_name' => 'Student', 'birthdate' => '1995-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 17 , 'username' => 'teststudent17' , 'first_name' => 'test', 'last_name' => 'Student', 'birthdate' => '1999-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 18 , 'username' => 'teststudent18' , 'first_name' => 'test', 'last_name' => 'Student', 'birthdate' => '1993-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 19 , 'username' => 'teststudent19' , 'first_name' => 'test', 'last_name' => 'Student', 'birthdate' => '1994-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 20 , 'username' => 'teststudent20' , 'first_name' => 'test', 'last_name' => 'Student', 'birthdate' => '1999-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 21 , 'username' => 'teststudent21' , 'first_name' => 'test', 'last_name' => 'Student', 'birthdate' => '1999-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 22 , 'username' => 'teststudent22' , 'first_name' => 'test', 'last_name' => 'Student', 'birthdate' => '1999-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 23 , 'username' => 'teststudent23' , 'first_name' => 'test', 'last_name' => 'Student', 'birthdate' => '2003-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 24 , 'username' => 'teststudent24' , 'first_name' => 'test', 'last_name' => 'Student', 'birthdate' => '1995-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 25 , 'username' => 'teststudent25' , 'first_name' => 'test', 'last_name' => 'Student', 'birthdate' => '1999-04-18' , 'gender_id' => 2 , 'mentor_id' => null ],
                    [ 'id' => 26 , 'username' => 'teststudent26' , 'first_name' => 'test', 'last_name' => 'Student', 'birthdate' => '1995-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 27 , 'username' => 'teststudent27' , 'first_name' => 'test', 'last_name' => 'Student', 'birthdate' => '1999-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 28 , 'username' => 'teststudent28' , 'first_name' => 'test', 'last_name' => 'Student', 'birthdate' => '1993-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 29 , 'username' => 'teststudent29' , 'first_name' => 'test', 'last_name' => 'Student', 'birthdate' => '1994-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 30 , 'username' => 'teststudent30' , 'first_name' => 'test', 'last_name' => 'Student', 'birthdate' => '1999-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                ]
            )
        );
    }
}

