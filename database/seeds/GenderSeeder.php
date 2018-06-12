<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;

class GenderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('genders')->insert(
            array_map(
                function($data) {
                    $now = Carbon::now();
                    return $data + ['created_at' => $now, 'updated_at' => $now];
                },
                [
                    ['id' => 1 , 'name' => 'Female' ],
                    ['id' => 2 , 'name' => 'Male'   ]
                ]
            )
        );
    }
}
