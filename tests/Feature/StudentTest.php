<?php

namespace Tests\Feature;

use App\User;
use Tests\ChecksCollections;
use Tests\StaffUsersOnly;
use Tests\TestCase;

use DB;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class StudentTest extends TestCase
{
    use ChecksCollections, DatabaseTransactions, StaffUsersOnly;

    const INDEX_ENDPOINT  = '/students';
    const CREATE_ENDPOINT = '/students/create';

    public function testIndexGuardAgainstStakeholder()
    {
        $this->assertStakeholderIsGuarded('get', self::INDEX_ENDPOINT);
    }

    public function testIndexForbiddenAsMentor()
    {
        $user = User::findOrFail(4);
        $response = $this->actingAs($user)->get(self::INDEX_ENDPOINT);
        $response->assertStatus(403);
    }

    public function testIndexAsSiteFacilitator()
    {
        $user = User::findOrFail(3);
        $response = $this->actingAs($user)->get(self::INDEX_ENDPOINT);
        $response
            ->assertStatus(200)
            ->assertViewHas('students', function($students) {
                return static::checkCollectionIds($students, [ 1, 2 ]);
            });

        // Expect mentors to be loaded for each student (see StudentTestingSeeder)
        $this->assertEquals(4, $response->original->students->get(1)->mentor->id, 'Mentor id not correctly set');
    }

    public function testMyStudentsAsMentor()
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
        $response = $this->actingAs($user)->get('/my-students');
        $response->assertStatus(200)
            ->assertViewHas('students', function($students) {
                return static::checkCollectionIds($students, [ 2, 4 ]);
            });
    }

    public function testCreatePageGuardAgainstStakeholder()
    {
        $this->assertStakeholderIsGuarded('get', self::CREATE_ENDPOINT);
    }

    public function testCreatePageAsMentor()
    {
        $user = User::findOrFail(4);
        $response = $this->actingAs($user)->get(self::CREATE_ENDPOINT);
        $response->assertStatus(200)
            ->assertViewHas('availableMentors', [])
            ->assertViewHas('autoAssignMentor', true);
    }

    public function testCreatePageAsSiteFacilitator()
    {
        $user = User::findOrFail(3);
        $response = $this->actingAs($user)->get(self::CREATE_ENDPOINT);
        $response->assertStatus(200)
            ->assertViewHas('availableMentors', function($users) {
                return static::checkCollectionIds($users, [ 2, 3, 4 ]);
            })
            ->assertViewHas('autoAssignMentor', false);
    }

    public function testStoreMissingRequiredFields()
    {
        $user = User::findOrFail(1);
        $response = $this->actingAs($user)->post(self::INDEX_ENDPOINT, []);
        $response->assertStatus(302)
            ->assertSessionHasErrors(['first_name', 'last_name', 'birthdate', 'username', 'password', 'gender']);
    }

    public function testStoreInvalidFieldValues()
    {
        $user = User::findOrFail(1);
        $response = $this->actingAs($user)->post(self::INDEX_ENDPOINT, ['username' => 'abc', 'birthdate' => 'abc']);
        $response->assertStatus(302)
            ->assertSessionHasErrors(['username', 'birthdate']);
    }

    public function testStoreDuplicateUsername()
    {
        $user = User::findOrFail(1);
        $response = $this->actingAs($user)->post(self::INDEX_ENDPOINT, ['username' => 'teststudent1']);
        $response->assertStatus(302)
            ->assertSessionHasErrors(['username']);
    }

    public function testStoreGuardedAgainstStakeholder()
    {
        $this->assertStakeholderIsGuarded('post', self::INDEX_ENDPOINT, []);
    }

    public function testStoreStudentAsMentor()
    {
        $user = User::findOrFail(4);
        $response = $this->actingAs($user)->post(self::INDEX_ENDPOINT, [
            'first_name' => 'Test',
            'last_name'  => 'Student',
            'birthdate'  => '2017-04-17',
            'username'   => 'test student 2',
            'password'   => 'password',
            'gender'     => '1',
            'auto_assign_mentor' => '1'
        ]);
        $response->assertRedirect('/home')
            ->assertSessionHas('status', 'New student account created');

        $this->assertDatabaseHas('students', [
            'username'  => 'test student 2',
            'mentor_id' => 4  // Mentor was auto assigned based on authenticated user
        ]);
    }

}
