<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateReferralSource extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
		Schema::create('referral_source', function (Blueprint $table) {
			$table->engine = 'InnoDB';
			$table->increments('id');
			$table->boolean('is_employee')->unsigned();
			$table->string('contents', 125);
			$table->timestamps();
		});
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
		Schema::drop('referral_source');
    }
}