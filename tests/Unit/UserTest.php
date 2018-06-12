<?php

namespace Tests\Unit;

use App\User;
use Tests\TestCase;

use Illuminate\Foundation\Testing\DatabaseMigrations;

class UserTest extends TestCase
{
    public function testFullNameWithMiddleName()
    {
        $user = new User([ 'first_name' => 'It', 'middle_name' => 'Works', 'last_name' => 'Hello' ]);
        $this->assertEquals('Hello, It Works', $user->fullName, 'fullName attribute does not match');
    }

    public function testFullNameWithoutMiddleName()
    {
        $user = new User([ 'first_name' => 'Sir', 'last_name' => 'Hello' ]);
        $this->assertEquals('Hello, Sir', $user->fullName, 'fullName attribute does not match');
    }
}
