<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;

class UsStatesSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $inputFileName = 'school.txt';


        $lines = file($inputFileName);

        $stateCount = 0;

        foreach ($lines as $lnum => $line) {

            if($lnum == 0) continue;

            $items = explode("\t", $line);

            $stateAbbr = trim($items[7]);

            if ($stateAbbr == "") {
                continue;
            }

            if (!isset($states[$stateAbbr])) {
                $stateCount++;
                $states[$stateAbbr] = new stdClass;
                $states[$stateAbbr]->id = $stateCount;
                $states[$stateAbbr]->abbr = $stateAbbr;
                $states[$stateAbbr]->name = trim($items[6]);
            }

        }

        /**
         *  make states table
         */
		$now = Carbon::now();
        $rows = [];
        foreach ($states as $abbr => $state) {
            $now = Carbon::now();
            array_push($rows, [ 'id' => $state->id, 'name' => $state->name, 'abbreviation' => $abbr, 'created_at' => $now, 'updated_at' => $now ]);
        }
        DB::table('us_states')->insert($rows);
    }
}