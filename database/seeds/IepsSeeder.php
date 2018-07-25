<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;

class IepsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $now = Carbon::now();
        DB::table('ieps')->insert([
            [ 'id' => 1, 'contents' => 'No IEP',                                'created_at' => $now, 'updated_at' => $now ],
            [ 'id' => 2, 'contents' => 'Non-Categorical',                       'created_at' => $now, 'updated_at' => $now ],
            [ 'id' => 3, 'contents' => 'Autism',                                'created_at' => $now, 'updated_at' => $now ],
            [ 'id' => 4, 'contents' => 'Deaf-Blindness',                        'created_at' => $now, 'updated_at' => $now ],
            [ 'id' => 5, 'contents' => 'Deafness',                              'created_at' => $now, 'updated_at' => $now ],
            [ 'id' => 6, 'contents' => 'Developmental Delay',                   'created_at' => $now, 'updated_at' => $now ],
            [ 'id' => 7, 'contents' => 'Emotional Disturbance',                 'created_at' => $now, 'updated_at' => $now ],
            [ 'id' => 8, 'contents' => 'Hearing Impairment',                    'created_at' => $now, 'updated_at' => $now ],
            [ 'id' => 9, 'contents' => 'Intellectual Disability',               'created_at' => $now, 'updated_at' => $now ],
            [ 'id' => 10, 'contents' => 'Multiple Disabilities',                 'created_at' => $now, 'updated_at' => $now ],
            [ 'id' => 11, 'contents' => 'Orthopedic Impairment',                 'created_at' => $now, 'updated_at' => $now ],
            [ 'id' => 12, 'contents' => 'Other Health Impairment',               'created_at' => $now, 'updated_at' => $now ],
            [ 'id' => 13, 'contents' => 'Specific Learning Disability',          'created_at' => $now, 'updated_at' => $now ],
            [ 'id' => 14, 'contents' => 'Speech or Language Impairment',         'created_at' => $now, 'updated_at' => $now ],
            [ 'id' => 15, 'contents' => 'To Be Obtained',                        'created_at' => $now, 'updated_at' => $now ],
            [ 'id' => 16, 'contents' => 'Traumatic Brain Injury',                'created_at' => $now, 'updated_at' => $now ],
            [ 'id' => 17, 'contents' => 'Visual Impairment',                     'created_at' => $now, 'updated_at' => $now ],
            [ 'id' => 18, 'contents' => 'If none selected note “Not Selected"',  'created_at' => $now, 'updated_at' => $now ],
        ]);
    }
}
