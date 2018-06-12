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
                    return $data + [ 'first_name' => 'Test', 'last_name' => 'Student', 'password' => Hash::make('test'),
                        'created_at' => $now, 'updated_at' => $now ];
                },
                [
                    [ 'id' => 1 , 'username' => 'teststudent1' , 'birthdate' => '2017-04-17' , 'gender_id' => 1 , 'mentor_id' => null ],
                    [ 'id' => 2 , 'username' => 'teststudent2' , 'birthdate' => '2017-04-18' , 'gender_id' => 2 , 'mentor_id' => 4    ],
                ]
            )
        );
    }
}

