<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('name');
            $table->text('description');
            $table->date('date');
            $table->time('time');
            $table->mediumText('place');
            $table->foreignId('partner_id')->constrained('partners')->cascadeOnDelete();
            $table->longText('poster')->charset('binary');
            $table->longText('seating_chart')->charset('binary');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};