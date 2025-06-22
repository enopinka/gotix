<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph,
            'place' => $this->faker->address,
            'date' => $this->faker->dateTimeBetween('tomorrow', '+1 year')->format('Y-m-d'),
            'time' => $this->faker->time(),
            'poster' => "/storage/images/carousel/carousel1.jpg",
            'seating_chart' => "/storage/images/carousel/carousel2.jpg",
            'user_id' => 1,
        ];
    }
}
