<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->string('first_name');
            $table->string('middle_name')->nullable();
            $table->string('last_name');
            $table->string('email')->unique();
            $table->string('password');
            $table->integer('user_role_id')->unsigned();
            $table->integer('district_id')->unsigned()->default(0);
            $table->integer('school_id')->unsigned()->default(0);
            $table->integer('referral_source_id')->unsigned()->default(0);
            $table->rememberToken();
            $table->timestamp('last_login')->nullable();
            $table->timestamps();

            $table->foreign('user_role_id')->references('id')->on('user_roles')
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
        Schema::table('users', function(Blueprint $table)
        {
            $table->dropForeign('users_user_role_id_foreign');
        });
        Schema::drop('users');
    }
}
