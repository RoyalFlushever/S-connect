<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMonitoringSessionResponsesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('monitoring_session_responses', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->integer('citizenship_value_assignment_id')->unsigned();
            $table->integer('session_id')->unsigned();
            $table->integer('response_id')->unsigned();
            $table->datetime('responded_at');

            // Note that default FK constraint naming convention (table name, column name, key type) results in an
            // invalid identifer length > 64, so we manually specify an identifier
            // See https://dev.mysql.com/doc/refman/5.5/en/identifiers.html
            $table->foreign('citizenship_value_assignment_id', 'monitoring_session_responses_cv_assignment_id_foreign')
                ->references('id')->on('citizenship_value_assignments')
                ->onUpdate('cascade')
                ->onDelete('restrict');
            $table->foreign('session_id')->references('id')->on('monitoring_sessions')
                ->onUpdate('cascade')
                ->onDelete('restrict');
            $table->foreign('response_id')->references('id')->on('monitoring_responses')
                ->onUpdate('cascade')
                ->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('monitoring_session_responses', function(Blueprint $table) {
            $table->dropForeign('monitoring_session_responses_cv_assignment_id_foreign');
            $table->dropForeign('monitoring_session_responses_session_id_foreign');
            $table->dropForeign('monitoring_session_responses_response_id_foreign');
        });

        Schema::dropIfExists('monitoring_session_responses');
    }
}
