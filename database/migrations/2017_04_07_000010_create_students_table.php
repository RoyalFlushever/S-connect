<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStudentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('students', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->string('username')->unique();
            $table->string('password');
            $table->string('first_name');
            $table->string('middle_name')->nullable();
            $table->string('last_name');
            $table->date('birthdate');
            $table->integer('gender_id')->unsigned();
            $table->integer('district_id')->unsigned()
                ->references('id')->on('districts')
                ->onUpdate('cascade')
                ->onDelete('restrict');;
            $table->integer('school_id')->unsigned()
                ->references('id')->on('schools')
                ->onUpdate('cascade')
                ->onDelete('restrict');;
            $table->integer('mentor_id')->unsigned()->nullable();
            $table->timestamps();

            $table->foreign('gender_id')->references('id')->on('genders')
                ->onUpdate('cascade')
                ->onDelete('restrict');
            $table->foreign('mentor_id')->references('id')->on('users')
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
        Schema::table('students', function(Blueprint $table)
        {
            $table->dropForeign('students_gender_id_foreign');
            $table->dropForeign('students_mentor_id_foreign');
        });
        Schema::drop('students');
    }
}
