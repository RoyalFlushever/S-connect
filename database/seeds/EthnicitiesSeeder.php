<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;

class EthnicitiesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $now = Carbon::now();
        DB::table('ethnicities')->insert([
            [ 'id' => 1, 'name' => 'White', 'created_at' => $now, 'updated_at' => $now ],
            [ 'id' => 2, 'name' => 'Black', 'created_at' => $now, 'updated_at' => $now ],
            [ 'id' => 3, 'name' => 'Asian', 'created_at' => $now, 'updated_at' => $now ],
            [ 'id' => 4, 'name' => 'Other', 'created_at' => $now, 'updated_at' => $now ],
        ]);
    }
}
