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
        Schema::table('orders', function (Blueprint $table) {
            // $table->dropUnique('orders_transaction_status_unique');
            $table->string('transaction_id')->nullable();
            $table->string('order_id')->nullable();
            $table->string('payment_type')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn([
                'transaction_id',
                'order_id',
                'payment_type',

            ]);
        });
    }
};
