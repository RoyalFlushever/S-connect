<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserTestingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert(
            array_map(
                function($data) {
                    $now = Carbon::now();
                    return $data + [ 'first_name' => 'Test', 'last_name' => 'User', 'password' => Hash::make('test'),
                        'created_at' => $now, 'updated_at' => $now ];
                },
                [
                    ['id' => 1, 'email' => 'administrator@example.org'   , 'user_role_id' => 1, 'district_id' => 0, 'school_id' => 0],
                    ['id' => 2, 'email' => 'facilitator@example.org'     , 'user_role_id' => 2, 'district_id' => 1, 'school_id' => 0],
                    ['id' => 3, 'email' => 'sitefacilitator@example.org' , 'user_role_id' => 3, 'district_id' => 1, 'school_id' => 1],
                    ['id' => 4, 'email' => 'mentor@example.org'          , 'user_role_id' => 4, 'district_id' => 1, 'school_id' => 2]
                ]
            )
        );
    }
}

