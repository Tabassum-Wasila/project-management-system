<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->generateThreeWordsTitle(),
            'description' => $this->faker->sentence,
            'due_date' => $this->faker->dateTimeBetween('now', '+1 year'),
            'status' => $this->faker->randomElement(['pending', 'in_progress', 'completed']),
            'image_path' => $this->faker->imageUrl,
            'created_by' => 1,
            'updated_by' => 1,
        ];
    }

    private function generateThreeWordsTitle()
    {
        $words = [
            'Innovative', 'Creative', 'Dynamic', 'Efficient', 'Robust', 'Strategic',
            'Agile', 'Collaborative', 'Optimized', 'Seamless', 'Scalable', 'Smart',
            'Project', 'Solution', 'Platform', 'System', 'Design', 'Process', 
            'Development', 'Strategy', 'Integration', 'Framework', 'Architecture',
        ];

        // Randomly pick 3 words and join them with spaces
        return implode(' ', $this->faker->randomElements($words, 3));
    }
}
