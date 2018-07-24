<?php
ini_set('memory_limit', '1024M');

use Carbon\Carbon;
use Illuminate\Database\Seeder;

class UsDistrictsSeeder extends Seeder
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
                $countyCount++;
                $states[$stateAbbr]->counties[$county] = new stdClass;
                $states[$stateAbbr]->counties[$county]->id = $countyCount;
                $states[$stateAbbr]->counties[$county]->name = $county;
                $states[$stateAbbr]->counties[$county]->districts = [];
            }

            $district = trim($items[12]);
            if($district == '') $district = trim($items[16]);

            // $district = UCWORDS(mb_strtolower(trim($district)));
            $district = mb_strtolower(trim($district));

            if (!isset($states[$stateAbbr]->counties[$county]->districts[$district])) {
                $districtCount++;
                $states[$stateAbbr]->counties[$county]->districts[$district] = new stdClass;
                $states[$stateAbbr]->counties[$county]->districts[$district]->id = $districtCount;
                $states[$stateAbbr]->counties[$county]->districts[$district]->name = $district;
                $states[$stateAbbr]->counties[$county]->districts[$district]->schools = [];
            }

            $lineCount++;
        }

        /**
         * make counties table
         */
		$now = Carbon::now();
        $rows = [];
        $cc = 0;
        foreach ($states as $abbr => $state) {
            foreach ($state->counties as $county) {
                foreach ($county->districts as $district) {
                    $cc++;
                    $now = Carbon::now();
                    array_push($rows, [ 'id' => $district->id, 'name' => $district->name, 'county_id' => $county->id, 'created_at' => $now, 'updated_at' => $now ]);
                    if($cc == 10000) {
                        DB::table('us_districts')->insert($rows);
                        $cc = 0;
                        $rows = [];
                    }
                }
            }
        }
        DB::table('us_districts')->insert($rows);
    }
}