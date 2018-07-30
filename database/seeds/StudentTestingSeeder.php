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
                        'first_name' => 'Test', 'last_name' => 'Student', 'password' => Hash::make('test'),
                        'created_at' => $now, 'updated_at' => $now 
                    ];
                },
                [
                    [ 'id' => 1 ,  'username' => 'teststudent1'  , 'birthdate' => '2017-04-17' , 'gender_id' => 1 , 'mentor_id' => null ],
                    [ 'id' => 2 ,  'username' => 'teststudent2'  , 'birthdate' => '2017-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 3 ,  'username' => 'teststudent3'  , 'birthdate' => '1998-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 4 ,  'username' => 'teststudent4'  , 'birthdate' => '1999-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 5 ,  'username' => 'teststudent5'  , 'birthdate' => '1999-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 6 ,  'username' => 'teststudent6'  , 'birthdate' => '1995-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 7 ,  'username' => 'teststudent7'  , 'birthdate' => '1999-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 8 ,  'username' => 'teststudent8'  , 'birthdate' => '1999-04-18' , 'gender_id' => 1 , 'mentor_id' => 4    ],
                    [ 'id' => 9 ,  'username' => 'teststudent9'  , 'birthdate' => '2001-04-18' , 'gender_id' => 1 , 'mentor_id' => 4    ],
                    [ 'id' => 10 , 'username' => 'teststudent10' , 'birthdate' => '1999-04-18' , 'gender_id' => 2 , 'mentor_id' => null ],
                    [ 'id' => 11 , 'username' => 'teststudent11' , 'birthdate' => '1999-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 12 , 'username' => 'teststudent12' , 'birthdate' => '1999-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 13 , 'username' => 'teststudent13' , 'birthdate' => '2003-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 14 , 'username' => 'teststudent14' , 'birthdate' => '1995-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 15 , 'username' => 'teststudent15' , 'birthdate' => '1999-04-18' , 'gender_id' => 2 , 'mentor_id' => null ],
                    [ 'id' => 16 , 'username' => 'teststudent16' , 'birthdate' => '1995-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 17 , 'username' => 'teststudent17' , 'birthdate' => '1999-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 18 , 'username' => 'teststudent18' , 'birthdate' => '1993-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 19 , 'username' => 'teststudent19' , 'birthdate' => '1994-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 20 , 'username' => 'teststudent20' , 'birthdate' => '1999-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 21 , 'username' => 'teststudent21' , 'birthdate' => '1999-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 22 , 'username' => 'teststudent22' , 'birthdate' => '1999-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 23 , 'username' => 'teststudent23' , 'birthdate' => '2003-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 24 , 'username' => 'teststudent24' , 'birthdate' => '1995-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 25 , 'username' => 'teststudent25' , 'birthdate' => '1999-04-18' , 'gender_id' => 2 , 'mentor_id' => null ],
                    [ 'id' => 26 , 'username' => 'teststudent26' , 'birthdate' => '1995-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 27 , 'username' => 'teststudent27' , 'birthdate' => '1999-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 28 , 'username' => 'teststudent28' , 'birthdate' => '1993-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 29 , 'username' => 'teststudent29' , 'birthdate' => '1994-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                    [ 'id' => 30 , 'username' => 'teststudent30' , 'birthdate' => '1999-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                ]
            )
        );
    }
}

