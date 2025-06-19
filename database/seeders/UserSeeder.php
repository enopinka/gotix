<?php

namespace Database\Seeders;

use App;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Mitra Satu',
            'email' => 'mitra@gmail.com',
            'role' => 'partner',
            'password' => Hash::make('password')
        ]);
        User::factory()->create([
            'name' => 'Customer Satu',
            'email' => 'customer@gmail.com',
            'role' => 'customer',
            'password' => Hash::make('password')
        ]);
        User::factory()->create([
            'name' => 'Admin Satu',
            'email' => 'admin@gmail.com',
            'role' => 'admin',
            'password' => Hash::make('password')
        ]);
    }
}
