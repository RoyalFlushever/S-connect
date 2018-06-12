<?php

namespace Tests\Feature;

use App\User;
use Tests\ChecksCollections;
use Tests\StaffUsersOnly;
use Tests\TestCase;

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class UserTest extends TestCase
{
    use ChecksCollections, DatabaseTransactions, StaffUsersOnly;

    const INDEX_ENDPOINT  = '/users';
    const CREATE_ENDPOINT = '/users/create';

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
        $this->runIndexTest(3, [ 4 ]);
    }

    public function testIndexAsFacilitator()
    {
        $this->runIndexTest(2, [ 3, 4 ]);
    }

    public function testIndexAsAdministrator()
    {
        $this->runIndexTest(1, [ 1, 2, 3, 4 ]);
    }

    private function runIndexTest($userId, $expectedUserIds)
    {
        $user = User::findOrFail($userId);
        $response = $this->actingAs($user)->get(self::INDEX_ENDPOINT);
        $response
            ->assertStatus(200)
            ->assertViewHas('users', function($users) use ($expectedUserIds) {
                return static::checkCollectionIds($users, $expectedUserIds);
            })
            ->assertViewHas('stakeholders');
    }

    public function testCreateGuardAgainstStakeholder()
    {
        $this->assertStakeholderIsGuarded('get', self::CREATE_ENDPOINT);
    }

    public function testCreatePageForbiddenAsMentor()
    {
        $user = User::findOrFail(4);
        $response = $this->actingAs($user)->get(self::CREATE_ENDPOINT);
        $response->assertStatus(403);
    }

    public function testCreatePageAsSiteFacilitator()
    {
        $this->runCreatePageTest(3, [ 'Mentor' ]);
    }

    public function testCreatePageAsFacilitator()
    {
        $this->runCreatePageTest(2, [ 'Site Facilitator', 'Mentor' ]);
    }

    public function testCreatePageAsAdministrator()
    {
        $this->runCreatePageTest(1, [ 'Administrator', 'Facilitator', 'Site Facilitator', 'Mentor' ]);
    }

    private function runCreatePageTest($userId, $expectedUserRoles)
    {
        $checkRoles = function($items) use ($expectedUserRoles) {
            if (count($items) !== count($expectedUserRoles)) {
                return false;
            }

            foreach ($items as $index => $item) {
                if ($item['label'] !== $expectedUserRoles[$index]) {
                    return false;
                }
            }

            return true;
        };

        $user = User::findOrFail($userId);
        $response = $this->actingAs($user)->get(self::CREATE_ENDPOINT);
        $response
            ->assertStatus(200)
            ->assertViewHas('availableUserRoles', $checkRoles)
            ->assertViewHas('availableStudents', function($students) {
                // See StudentTestingSeeder; only student 1 is unassigned
                return static::checkCollectionIds($students, [ 1 ]);
            });
    }

    public function testStoreMissingRequiredFields()
    {
        $user = User::findOrFail(1);
        $response = $this->actingAs($user)->post(self::INDEX_ENDPOINT, []);
        $response->assertStatus(302)
            ->assertSessionHasErrors(['first_name', 'last_name', 'email', 'password', 'user_role']);
    }

    public function testStoreInvalidFieldValues()
    {
        $user = User::findOrFail(1);
        $response = $this->actingAs($user)->post(self::INDEX_ENDPOINT, ['email' => 'notanemail']);
        $response->assertStatus(302)
            ->assertSessionHasErrors(['email']);
    }

    public function testStoreDuplicateEmail()
    {
        $user = User::findOrFail(1);
        $response = $this->actingAs($user)->post(self::INDEX_ENDPOINT, ['email' => 'mentor@example.org']);
        $response->assertStatus(302)
            ->assertSessionHasErrors(['email']);
    }

    public function testStoreFacilitatorAsFacilitator()
    {
        $this->runStoreMatchingUserRoleTest(2);
    }

    public function testStoreSiteFacilitatorAsSiteFacilitator()
    {
        $this->runStoreMatchingUserRoleTest(3);
    }

    private function runStoreMatchingUserRoleTest($userRoleId)
    {
        $user = User::findOrFail($userRoleId);
        $response = $this->actingAs($user)->post(self::INDEX_ENDPOINT, ['user_role' => $userRoleId]);
        $response->assertStatus(302)
            ->assertSessionHasErrors(['user_role']);
    }

    public function testStoreForbiddenAsMentor()
    {
        $user = User::findOrFail(4);
        $response = $this->actingAs($user)->post(self::INDEX_ENDPOINT, []);
        $response->assertStatus(403);
    }

    public function testStoreGuardedAgainstStakeholder()
    {
        $this->assertStakeholderIsGuarded('post', self::INDEX_ENDPOINT, []);
    }

    public function testStoreAlreadyAssignedMentee()
    {
        $user = User::findOrFail(1);
        $response = $this->actingAs($user)->post(self::INDEX_ENDPOINT, [
            'first_name' => 'Valid',
            'last_name'  => 'Valid',
            'email'      => 'valid@example.net',
            'password'   => 'valid',
            'user_role'  => '4',
            'student-list-assigned' => [ '1', '2' ]
        ]);

        $response->assertStatus(302);
        $this->assertEquals('User account was not saved. Please try again', app('session.store')->get('errors')->first(),
           'Expected error message not found');
    }

    public function testStoreMentorAsSiteFacilitator()
    {
        $user = User::findOrFail(3);
        $response = $this->actingAs($user)->post(self::INDEX_ENDPOINT, [
            'first_name' => 'Test',
            'last_name'  => 'User',
            'email'      => 'test.user@example.net',
            'password'   => 'password',
            'user_role'  => '4',
            'student-list-assigned' => [ '1' ]
        ]);
        // TODO: Assign students
        $response->assertRedirect('/home')
            ->assertSessionHas('status', 'New account created');

        $this->assertDatabaseHas('users', [ 'email' => 'test.user@example.net' ]);
        $this->assertDatabaseHas('students', [ 'id' => 1, 'mentor_id' => 5 ]);
    }

}
