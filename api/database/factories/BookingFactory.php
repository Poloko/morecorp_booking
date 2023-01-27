<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class BookingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        //date range base dates
        $s=strtotime("10:30pm January 01 2023");
        $e=strtotime("10:30pm February 27 2023");
        $start_date = date("Y-m-d h:i:sa", $s);
        $end_date = date("Y-m-d h:i:sa", $e);
        $booking_date =  date('Y-m-d',strtotime(now()));
        $random_time = rand(28800,64800);
        $start_time = date('H:i', $random_time);
        $end_time = date('H:i', ($random_time + 1800));
        $contact = "08".mt_rand(10000000,19999999);

        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'message' => $this->faker->realText($maxNbChars = 200, $indexSize = 2),
            'contact_number' => $contact,
            'booking_date' => $this->faker->dateTimeBetween($start_date, $end_date),
            'booking_start_time' => $start_time,
            'booking_end_time' => $end_time,
            'user_id' => "1",
            'updated_at' => now()
        ];
    }
}
