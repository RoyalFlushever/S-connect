<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;

class OauthClientProductionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $now = Carbon::now();
        DB::table('oauth_clients')->insert([
            'id' => 1,
            'name' => 'I-Connect Password Client',
            'secret' => 'supersecret',
            'redirect' => '',
            'personal_access_client' => false,
            'password_client' => true,
            'revoked' => false,
            'created_at' => $now,
            'updated_at' => $now,
        ]);
    }
}
