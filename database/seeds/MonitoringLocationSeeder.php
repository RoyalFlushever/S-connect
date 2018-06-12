<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;

class MonitoringLocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('monitoring_location_categories')->insert(
            array_map(
                function($data) {
                    $now = Carbon::now();
                    return $data + ['created_at' => $now, 'updated_at' => $now];
                },
                [
                    [ 'id' => 1 , 'name' => 'School'    ],
                    [ 'id' => 2 , 'name' => 'Work'      ],
                    [ 'id' => 3 , 'name' => 'Community' ],
                    [ 'id' => 4 , 'name' => 'Home'      ]
                ]
            )
        );

        DB::table('monitoring_locations')->insert(
            array_map(
                function($data) {
                    $now = Carbon::now();
                    return $data + ['created_at' => $now, 'updated_at' => $now];
                },
                [
                    [ 'id' => 1  , 'category_id' => 1 , 'name' => 'Art'                      ],
                    [ 'id' => 2  , 'category_id' => 1 , 'name' => 'Language arts'            ],
                    [ 'id' => 3  , 'category_id' => 1 , 'name' => 'Math'                     ],
                    [ 'id' => 4  , 'category_id' => 1 , 'name' => 'Music'                    ],
                    [ 'id' => 5  , 'category_id' => 1 , 'name' => 'Physical'                 ],
                    [ 'id' => 6  , 'category_id' => 1 , 'name' => 'Science'                  ],
                    [ 'id' => 7  , 'category_id' => 1 , 'name' => 'Social studies'           ],
                    [ 'id' => 8  , 'category_id' => 1 , 'name' => 'Technology'               ],
                    [ 'id' => 9  , 'category_id' => 1 , 'name' => 'Vocational'               ],
                    [ 'id' => 10 , 'category_id' => 2 , 'name' => 'Work'                     ],
                    [ 'id' => 11 , 'category_id' => 3 , 'name' => 'Community Chores/Errands' ],
                    [ 'id' => 12 , 'category_id' => 3 , 'name' => 'Community Social/Leisure' ],
                    [ 'id' => 13 , 'category_id' => 4 , 'name' => 'Home Chores'              ],
                    [ 'id' => 14 , 'category_id' => 4 , 'name' => 'Homework'                 ],
                    [ 'id' => 15 , 'category_id' => 4 , 'name' => 'Routines'                 ],
                    [ 'id' => 16 , 'category_id' => 4 , 'name' => 'Home Social/Leisure'      ]
                ]
            )
        );
    }
}
