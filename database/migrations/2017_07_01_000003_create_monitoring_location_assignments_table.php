<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMonitoringLocationAssignmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('monitoring_location_assignments', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->integer('student_id')->unsigned();
            $table->integer('monitoring_location_id')->unsigned();
            $table->string('label')->nullable();
            $table->timestamps();

            $table->foreign('student_id')->references('id')->on('students')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->foreign('monitoring_location_id')->references('id')->on('monitoring_locations')
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
        Schema::table('monitoring_location_assignments', function(Blueprint $table)
        {
            $table->dropForeign('monitoring_location_assignments_student_id_foreign');
            $table->dropForeign('monitoring_location_assignments_monitoring_location_id_foreign');
        });
        Schema::drop('monitoring_location_assignments');
    }
}
