<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;

class UserRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('user_roles')->insert(
            array_map(
                function($data) {
                    $now = Carbon::now();
                    return $data + ['created_at' => $now, 'updated_at' => $now];
                },
                [
                    ['id' => 1 , 'name' => 'Administrator'    , 'description' => 'Has full access to the system'              ],
                    ['id' => 2 , 'name' => 'Facilitator'      , 'description' => 'Manages an entire School Group'             ],
                    ['id' => 3 , 'name' => 'Site Facilitator' , 'description' => 'Manages Mentors and Students at a School'   ],
                    ['id' => 4 , 'name' => 'Mentor'           , 'description' => 'Works with individual Students at a School' ]
                ]
            )
        );
    }
}
