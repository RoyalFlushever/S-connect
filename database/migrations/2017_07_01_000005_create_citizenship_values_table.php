<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCitizenshipValuesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('citizenship_values', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->integer('type_id')->unsigned();
            $table->string('phrasing');
            $table->timestamps();

            $table->foreign('type_id')->references('id')->on('citizenship_value_types')
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
        Schema::table('citizenship_values', function(Blueprint $table)
        {
            $table->dropForeign('citizenship_values_type_id_foreign');
        });
        Schema::drop('citizenship_values');
    }
}
