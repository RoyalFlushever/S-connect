<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCitizenshipValueAssignmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('citizenship_value_assignments', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->integer('monitoring_location_assignment_id')->unsigned();
            $table->integer('citizenship_value_id')->unsigned();
            $table->integer('alert_interval_in_seconds')->unsigned();
            $table->boolean('alert_interval_varies')->default(false);
            $table->string('custom_phrasing')->nullable();  // TODO: Do we need this (possibly redundant) field? Should custom phrases be stored in citizenship_values?
            $table->integer('goal_percentage')->unsigned()->nullable();
            $table->timestamps();

            // Note that default FK constraint naming convention (table name, column name, key type) results in an
            // invalid identifer length > 64, so we manually specify an identifier
            // See https://dev.mysql.com/doc/refman/5.5/en/identifiers.html
            $table->foreign('monitoring_location_assignment_id', 'citizenship_value_assignment_mla_id_foreign')
                ->references('id')->on('monitoring_location_assignments')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->foreign('citizenship_value_id')->references('id')->on('citizenship_values')
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
        Schema::table('citizenship_value_assignments', function(Blueprint $table)
        {
            $table->dropForeign('citizenship_value_assignments_citizenship_value_id_foreign');
            $table->dropForeign('citizenship_value_assignment_mla_id_foreign');
        });
        Schema::drop('citizenship_value_assignments');
    }
}
