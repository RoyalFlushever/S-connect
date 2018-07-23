<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMonitoringSessionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('monitoring_sessions', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->datetime('started_at');
            $table->datetime('ended_at');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('monitoring_session_responses');
        Schema::dropIfExists('monitoring_sessions');
    }
}
