<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;

class CitizenshipValueSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('citizenship_value_types')->insert(
            array_map(
                function($data) {
                    $now = Carbon::now();
                    return $data + ['created_at' => $now, 'updated_at' => $now];
                },
                [
                    [ 'id' => 1 , 'name' => 'Engagement'      ],
                    [ 'id' => 2 , 'name' => 'Appropriateness' ],
                    [ 'id' => 3 , 'name' => 'Comprehension'   ]
                ]
            )
        );

        DB::table('citizenship_values')->insert(
            array_map(
                function($data) {
                    $now = Carbon::now();
                    return $data + ['created_at' => $now, 'updated_at' => $now];
                },
                [
                    // TODO: Add more seeds once we've landed on more phrasings
                    [ 'id' => 1  , 'type_id' => 1 , 'phrasing' => 'Are you on task?'     ],
                    [ 'id' => 2  , 'type_id' => 2 , 'phrasing' => 'Are you appropriate?' ],
                    [ 'id' => 3  , 'type_id' => 3 , 'phrasing' => 'Do you understand?'   ],

                    // Custom citizenship values get three unique entries to distinguish type (see also citizenship_value_assignments)
                    [ 'id' => 4  , 'type_id' => 1 , 'phrasing' => '--Custom engagement prompt, stated positively'      ],
                    [ 'id' => 5  , 'type_id' => 2 , 'phrasing' => '--Custom appropriateness prompt, stated positively' ],
                    [ 'id' => 6  , 'type_id' => 3 , 'phrasing' => '--Custom comprehension prompt, stated positively'   ]
                ]
            )
        );
    }
}
