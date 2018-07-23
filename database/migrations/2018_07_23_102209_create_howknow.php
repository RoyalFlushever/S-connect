<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHowknow extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
		Schema::create('howknow', function (Blueprint $table) {
			$table->engine = 'InnoDB';
			$table->increments('id');
			$table->integer('kind')->unsigned();
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
		Schema::drop('howknow');
    }
}
