<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Reporte extends Model
{
    protected $table='reportes';

    protected $fillable=['id','user_id', 'cedula','nombre','apellido', 'entrada', 'salida','fecha','created_at','updated_at' ];

    //public $timestamps = false;
}
