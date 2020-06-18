<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Empleado;
use Faker\Generator as Faker;

$factory->define(Empleado::class, function (Faker $faker) {
    return [
        'cedula' => $faker->name,
        'nombre' => $faker->name,
        'apellido' => $faker->name,
        'tipo' =>$faker->name

    ];
});
