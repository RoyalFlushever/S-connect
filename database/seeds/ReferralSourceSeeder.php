<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;

class ReferralSourceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('referral_source')->insert(
            array_map(
                function($data) {
                    $now = Carbon::now();
                    return $data + ['created_at' => $now, 'updated_at' => $now];
                },
                [
                    ['id' => 1, 'is_employee' => 1, 'contents' => 'Website'                                ],
                    ['id' => 2, 'is_employee' => 1, 'contents' => 'From Someone in my School'              ],
                    ['id' => 3, 'is_employee' => 1, 'contents' => 'From Someone in my School District'     ],
                    ['id' => 4, 'is_employee' => 1, 'contents' => 'From a State of Regional PBIS Trainer'  ],
                    ['id' => 5, 'is_employee' => 1, 'contents' => 'Attended a Conference Presentation'     ],
                    ['id' => 6, 'is_employee' => 1, 'contents' => 'Social Media'                           ],
                    ['id' => 7, 'is_employee' => 1, 'contents' => 'Other, Please Specify'                  ],
                    
                    ['id' => 8,  'is_employee' => 0, 'contents' => 'Website'                                                ],
                    ['id' => 9,  'is_employee' => 0, 'contents' => 'Attended a Conference Presentation'                     ],
                    ['id' => 10, 'is_employee' => 0, 'contents' => 'Referred to I-Connect by someone in a School District'  ],
                    ['id' => 11, 'is_employee' => 0, 'contents' => 'Social Media'                                           ],
                    ['id' => 12, 'is_employee' => 0, 'contents' => 'Other, Please Specify'                                  ]
                ]
            )
        );
    }
}