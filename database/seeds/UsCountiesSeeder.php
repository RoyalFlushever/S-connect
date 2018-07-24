<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;

class UsCountiesSeeder extends Seeder
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

        $counties = [];
        $stateCount = 0;
        $countyCount = 0;
        $districtCount = 0;
        $schoolCount = 0;

        $lineCount = 0;

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
                $states[$stateAbbr]->counties = [];
            }

            $county = $items[8];

            if ($county != "†") {
                $county = str_ireplace("county", "", $county);
                $county = str_ireplace("parish", "", $county);
                $county = str_ireplace("borough", "", $county);
                $county = str_ireplace("City And", "", $county);
                $county = str_ireplace("Census Area", "", $county);
                $county = str_ireplace("City", "", $county);
                $county = UCWORDS(mb_strtolower(trim($county)));
            }


            if ($county == "") continue;

            if (!isset($states[$stateAbbr]->counties[$county])) {
                // echo $items[1]." ".$county."\n";
                $countyCount++;
                $states[$stateAbbr]->counties[$county] = new stdClass;
                $states[$stateAbbr]->counties[$county]->id = $countyCount;
                $states[$stateAbbr]->counties[$county]->name = $county;
                $states[$stateAbbr]->counties[$county]->districts = [];
            }

            $lineCount++;
        }

        /**
         * make counties table
         */
		$now = Carbon::now();
        $rows = [];
        foreach ($states as $abbr => $state) {
            foreach ($state->counties as $county) {
                $now = Carbon::now();
                array_push($rows, [ 'id' => $county->id, 'name' => $county->name, 'state_id' => $state->id, 'created_at' => $now, 'updated_at' => $now ]);
            }
        }
        DB::table('us_counties')->insert($rows);
    }
}