<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Project;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->word,
            'description' => $this->faker->sentence,
            'image_path' => $this->faker->imageUrl,
            'status' => $this->faker->randomElement(['pending', 'in_progress', 'completed']),
            'priority' => $this->faker->randomElement(['low', 'medium', 'high']),
            'due_date' => $this->faker->dateTimeBetween('now', '+1 year'),
            'assigned_user_id' => 1,
            'created_by' => 1,
            'updated_by' => 1,
        ];
    }
}
