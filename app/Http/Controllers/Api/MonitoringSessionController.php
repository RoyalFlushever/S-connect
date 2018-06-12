<?php

namespace App\Http\Controllers\Api;

use DB;
use Validator;

use Illuminate\Http\Request;

use App\MonitoringLocationAssignment;
use App\MonitoringSession;
use App\Http\Controllers\Controller;

class MonitoringSessionController extends Controller
{
    // Provide a static lookup corresponding to MonitoringResponseSeeder
    // TODO: Put this into cache/lib
    private static $responseIds = [
        'yes'             => 1,
        'no'              => 2,
        'did not respond' => 3
    ];

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // TODO: Do we need to enforce/validate headers?
        // Content-type: application/json
        // Accept: application/json

        $scrubbed = $this->validate_store($request);

        // Authorize this student's monitoring session against their assigned monitoring location
        // Note that our database integrity constraints combined with our validation should guarantee this MLA id to exist, but it doesn't hurt to findOrFail
        $monitoringLocationAssignmentId = $scrubbed['monitoring_location_assignment_id'];
        $monitoringLocationAssignment = MonitoringLocationAssignment::findOrFail($monitoringLocationAssignmentId);
        $this->authorize('createSession', $monitoringLocationAssignment);

        $monitoringSession = new MonitoringSession(array_only($scrubbed, [ 'started_at', 'ended_at' ]));
        $responses = $scrubbed['responses'];

        DB::transaction(function() use (&$monitoringSession, &$responses) {
            $monitoringSession->save();

            // Map text responses to ids for saving to database
            $responsesWithIds = [];
            foreach ($responses as $response) {
                $responsesWithIds[] = [
                    'citizenship_value_assignment_id' => $response['citizenship_value_assignment_id'],
                    'response_id' => self::$responseIds[strtolower($response['response'])],
                    'responded_at' => $response['responded_at']
                ];
            }
            $monitoringSession->responses()->createMany($responsesWithIds);
        });

        // Force a load of the newly saved responses for inclusion in the HTTP response
        // TODO: Is there any way to configure `saveMany` to do this on the fly?
        $monitoringSession->responses;
        return response()->json($monitoringSession, 201);  // 201 Created
    }

    private function validate_store($request)
    {
        // MySQL does not store time zones. Expect UTC for storage
        $expectedDateFormat = 'Y-m-d H:i:s';

        $scrubbed = $request->only([ 'started_at', 'ended_at', 'monitoring_location_assignment_id', 'responses' ]);

        // TODO: Allow case insensitivity of responses

        // All supplied citizenship value assignments must belong to one monitoring location assignment (and it must
        // match the supplied monitoring_location_assignment_id)
        // TODO: Use more descriptive/helpful error messages
        $cvAssignmentIds = [];
        $responsesRule = 'bail|required|array|min:1';
        $mlaRule = 'required';
        if (is_array($scrubbed['responses'])) {
            foreach ($scrubbed['responses'] as $responseItem) {
                if (isset($responseItem['citizenship_value_assignment_id'])) {
                    $cvAssignmentIds[$responseItem['citizenship_value_assignment_id']] = true;
                }
            }
            $mlAssignmentIds = DB::table('citizenship_value_assignments')->whereIn('id', array_keys($cvAssignmentIds))
                ->distinct()->get([ 'monitoring_location_assignment_id' ]);
            if ($mlAssignmentIds->count() !== 1) {
                // Force an invalid rule
                $mlaRule = 'in:';
            }
            else {
                // The supplied monitoring_location_assignment_id must match the fetched MLA id
                $mlaRule = 'required|in:'.$mlAssignmentIds->first()->monitoring_location_assignment_id;
            }
        }

        $rules = array_dot([
            'started_at' => 'required|date_format:'.$expectedDateFormat,
            'ended_at'   => 'required|date_format:'.$expectedDateFormat,
            'monitoring_location_assignment_id' => $mlaRule,
            'responses'  => $responsesRule,
            'responses.*' => [
                'citizenship_value_assignment_id' => 'bail|required|exists:citizenship_value_assignments,id',
                'response'                        => 'required|in:Yes,No,Did not respond',
                'responded_at' =>
                    'bail'.
                    '|required'.
                    '|date_format:'.$expectedDateFormat.
                    '|before_or_equal:'.$scrubbed['ended_at'].
                    '|after_or_equal:'.$scrubbed['started_at']
            ]
        ]);

        Validator::make($scrubbed, $rules)->validate();

        return $scrubbed;
    }
}
