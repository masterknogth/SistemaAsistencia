<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Empleado extends Model
{
    protected $table='empleados';

    protected $fillable=['id','cedula', 'nombre', 'apellido', 'tipo','estado' ];

    //public $timestamps = false;


}
