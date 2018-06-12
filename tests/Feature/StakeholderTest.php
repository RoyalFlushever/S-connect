<?php

namespace Tests\Feature;

use App\Stakeholder;
use App\User;
use Tests\ChecksCollections;
use Tests\TestCase;

use DB;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class StakeholderTest extends TestCase
{
    use ChecksCollections, DatabaseTransactions;

    const INDEX_ENDPOINT  = '/stakeholders';
    const CREATE_ENDPOINT = '/stakeholders/create';

    public function testStakeholderHomeAsStaff()
    {
        $user = User::findOrFail(1);
        $response = $this->actingAs($user)->get('/stakeholder-home');
        $response->assertRedirect('/login');
    }

    public function testStakeholderHomeAsStakeholder()
    {
        $stakeholder = \App\Stakeholder::findOrFail(1);
        $this->app['auth']->guard('web_stakeholder')->setUser($stakeholder);
        $response = $this->get('/stakeholder-home');
        $response->assertStatus(200)
            ->assertViewHas('student', function($student) {
                // See StakeholderTestingSeeder
                return $student->id === 1;
            });
    }

    public function testIndexAsMentor()
    {
        $user = User::findOrFail(4);
        $response = $this->actingAs($user)->get(self::INDEX_ENDPOINT);
        $response
            ->assertStatus(200)
            ->assertViewHas('stakeholders', function($stakeholders) {
                // See StudentTestingSeeder and StakeholderTestingSeeder
                // I only see stakeholders for students that I am directly mentoring
                return static::checkCollectionIds($stakeholders, [ 2 ]);
            });
    }

    public function testCreatePageAsMentor()
    {
        // Set up some additional students to test filtering “My Students”
        // TODO: Extract this duplicated seeding?
        DB::table('students')->insert(
            array_map(
                function($data) {
                    return $data + [ 'first_name' => 'Test', 'last_name' => 'Student', 'birthdate' => '2017-05-16',
                        'password' => 'ignore', 'gender_id' => 1 ];
                },
                [
                    [ 'id' => 3 , 'mentor_id' => 3, 'username' => 'ignore1' ],
                    [ 'id' => 4 , 'mentor_id' => 4, 'username' => 'my-student2' ]
                ]
            )
        );
        $user = User::findOrFail(4);
        $response = $this->actingAs($user)->get(self::CREATE_ENDPOINT);
        $response->assertStatus(200)
            ->assertViewHas('showStaffNavigation', false)
            ->assertViewHas('students', function($students) {
                // See StudentTestingSeeder and StakeholderTestingSeeder
                // I only see students that I am directly mentoring
                return static::checkCollectionIds($students, [ 2, 4 ]);
            });
    }

    public function testCreatePageAsSiteFacilitator()
    {
        $user = User::findOrFail(3);
        $response = $this->actingAs($user)->get(self::CREATE_ENDPOINT);
        $response->assertStatus(200)
            ->assertViewHas('showStaffNavigation', true)
            ->assertViewHas('students', function($students) {
                // See StudentTestingSeeder and StakeholderTestingSeeder
                // I only see students that I am directly mentoring
                return static::checkCollectionIds($students, [ 1, 2 ]);
            });
    }

    public function testStoreMissingRequiredFields()
    {
        $user = User::findOrFail(1);
        $response = $this->actingAs($user)->post(self::INDEX_ENDPOINT, []);
        $response->assertStatus(302)
            ->assertSessionHasErrors([ 'first_name', 'last_name', 'username', 'password', 'student' ]);
    }

    public function testStoreInvalidFieldValues()
    {
        $user = User::findOrFail(1);
        $response = $this->actingAs($user)->post(self::INDEX_ENDPOINT, [ 'username' => 'abc' ]);
        $response->assertStatus(302)
            ->assertSessionHasErrors([ 'username' ]);
    }

    public function testStoreDuplicateUsername()
    {
        $user = User::findOrFail(1);
        $response = $this->actingAs($user)->post(self::INDEX_ENDPOINT, [ 'username' => 'stakeholder1' ]);
        $response->assertStatus(302)
            ->assertSessionHasErrors([ 'username' ]);
    }

}
