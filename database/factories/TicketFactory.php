<?php

namespace Database\Factories;

use App\Models\Ticket;
use App\Models\Event;
use App\Models\User;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ticket>
 */
class TicketFactory extends Factory
{
    protected $model = Ticket::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $quota = $this->faker->numberBetween(10, 100);

        return [
            'event_id' => Event::factory(),
            'user_id' => User::factory(),
            'type' => $this->faker->randomElement(['VIP', 'Regular', 'Economy']),
            'price' => $this->faker->numberBetween(50000, 200000),
            'quota' => $quota,
            'available_seats' => $quota,
        ];
    }
}
