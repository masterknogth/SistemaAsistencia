<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Asistencia extends Model
{
    protected $table='asistencias';
    protected $fillable=['id','user_id', 'cedula', 'entrada', 'salida','created_at','updated_at' ];

    public $timestamps = false;
}
