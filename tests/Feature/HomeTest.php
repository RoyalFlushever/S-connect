<?php

namespace Tests\Feature;

use App\User;
use Tests\StaffUsersOnly;
use Tests\TestCase;

use Illuminate\Foundation\Testing\WithoutMiddleware;

class HomeTest extends TestCase
{
    use StaffUsersOnly;

    public function testStaffHomeGuardAgainstStakeholder()
    {
        $this->assertStakeholderIsGuarded('get', '/home');
    }

    public function testDashboardItemsAsMentor()
    {
        $this->runDashboardItemsTest(4, [ 'My students', 'New student', 'View stakeholders', 'New stakeholder' ]);
    }

    public function testDashboardItemsAsSiteFacilitator()
    {
        $this->runDashboardItemsTest(3, [ 'My students', 'View students', 'New student', 'View users', 'New user' ]);
    }

    public function testDashboardItemsAsFacilitator()
    {
        $this->runDashboardItemsTest(2, [ 'My students', 'View students', 'New student', 'View users', 'New user' ]);
    }

    public function testDashboardItemsAsAdministrator()
    {
        $this->runDashboardItemsTest(1, [ 'View students', 'New student', 'View users', 'New user' ]);
    }

    private function runDashboardItemsTest($userId, $expectedDashboardLabels)
    {
        // Non-exhaustive test: use dashboard item labels as indicators of correct contents
        $checkItems = function($items) use ($expectedDashboardLabels) {
            if (count($items) !== count($expectedDashboardLabels)) {
                return false;
            }

            foreach ($items as $index => $item) {
                if ($item['label'] !== $expectedDashboardLabels[$index]) {
                    return false;
                }
            }

            return true;
        };

        $user = User::findOrFail($userId);
        $response = $this->actingAs($user)->get('/home');
        $response
            ->assertStatus(200)
            ->assertViewHas('dashboardItems', $checkItems);
    }
}
