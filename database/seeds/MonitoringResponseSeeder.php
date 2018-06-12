<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;

class MonitoringResponseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('monitoring_responses')->insert(
            array_map(
                function($data) {
                    $now = Carbon::now();
                    return $data + ['created_at' => $now, 'updated_at' => $now];
                },
                [
                    [ 'id' => 1  , 'value' => 'Yes'             ],
                    [ 'id' => 2  , 'value' => 'No'              ],
                    [ 'id' => 3  , 'value' => 'Did not respond' ]
                ]
            )
        );
    }
}
