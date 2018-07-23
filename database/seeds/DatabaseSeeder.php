<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * @var string The current environment with the first character capitalized (e.g. Local)
     */
    private $ucFirstEnv;

    /**
     * Initialize this seeder
     */
    function __construct()
    {
        $this->ucFirstEnv = ucfirst(App::environment());
    }

    /**
     * Run an entity's seeder for the current environment. If that seeder does not exist, nothing will be run.
     * Some seeders are only defined for certain environments, so this provides a way to conditionally find and run them.
     * This assumes that seeder class names follow the convention: Entity . Environment . 'Seeder' (e.g. UserTestingSeeder)
     *
     * @param string $entity The entity to seed data for.
     */
    private function callSeederForEnvironment($entity)
    {
        $seederClass = $entity . $this->ucFirstEnv . 'Seeder';

        if (is_callable([$seederClass, 'run'])) {
            $this->call($seederClass);
        }
    }

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call('UserRoleSeeder');
        $this->callSeederForEnvironment('User');
        $this->call('GenderSeeder');
        $this->call('MonitoringLocationSeeder');
        $this->call('CitizenshipValueSeeder');
        $this->call('MonitoringResponseSeeder');
        $this->callSeederForEnvironment('Student');  // May also assign monitoring locations and citizenship values
        $this->callSeederForEnvironment('Stakeholder');
        
        $this->callSeederForEnvironment('OauthClient');
        $this->call('UsStatesSeeder');
        $this->call('UsCountiesSeeder');
        $this->call('UsDistrictsSeeder');
        $this->call('UsSchoolsSeeder');
    }
}
