<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;

class HowknowSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('howknow')->insert(
            array_map(
                function($data) {
                    $now = Carbon::now();
                    return $data + ['created_at' => $now, 'updated_at' => $now];
                },
                [
                    ['id' => 1, 'kind' => 1, 'contents' => 'Website'                                ],
                    ['id' => 2, 'kind' => 1, 'contents' => 'From Someone in my School'              ],
                    ['id' => 3, 'kind' => 1, 'contents' => 'From Someone in my School District'     ],
                    ['id' => 4, 'kind' => 1, 'contents' => 'From a State of Regional PBIS Trainer'  ],
                    ['id' => 5, 'kind' => 1, 'contents' => 'Attended a Conference Presentation'     ],
                    ['id' => 6, 'kind' => 1, 'contents' => 'Social Media'                           ],
                    ['id' => 7, 'kind' => 1, 'contents' => 'Other, Please Specify'                  ],
                    
                    ['id' => 8,  'kind' => 2, 'contents' => 'Website'                                                ],
                    ['id' => 9,  'kind' => 2, 'contents' => 'Attended a Conference Presentation'                     ],
                    ['id' => 10, 'kind' => 2, 'contents' => 'Referred to I-Connect by someone in a School District'  ],
                    ['id' => 11, 'kind' => 2, 'contents' => 'Social Media'                                           ],
                    ['id' => 12, 'kind' => 2, 'contents' => 'Other, Please Specify'                                  ]
                ]
            )
        );
    }
}