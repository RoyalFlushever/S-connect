<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;

class ScholeLevelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('school_levels')->insert(
            array_map(
                function($data) {
                    $now = Carbon::now();
                    return $data + ['created_at' => $now, 'updated_at' => $now];
                },
                [
                    ['id' => 1, 'name' => 'Elementary'  ],
                    ['id' => 2, 'name' => 'Secondary'   ],
                    ['id' => 3, 'name' => 'Combined'    ]
                ]
            )
        );
    }
}
