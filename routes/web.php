<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



/*Route::get('/', function () {
    return view('welcome');
});*/

Auth::routes();

//Route::get('/home', 'HomeController@index')->name('home'); original



Route::get('/', 'HomeController@index')->name('home');

//Route::resource('/empleados','EmpleadoController');


Route::post('empleado/buscar','EmpleadoController@show')->name('buscar');//muestra los datos de empleado al pasar carnet
Route::post('empleado/registro','EmpleadoController@store')->name('registro');//registra nuevo empleado
Route::post('empleado/editar','EmpleadoController@update')->name('editar');//edita empleado
Route::post('empleado/eliminar','EmpleadoController@destroy')->name('eliminar');// elimina el empleado
Route::post('empleado/activar','EmpleadoController@activar')->name('activar');// habilita de nuevo a los empleados que fueron eliminados


Route::get('empleados/list','EmpleadoController@listar_empleado');//lista los empleados que estan activos
Route::get('empleados/list_inactivos','EmpleadoController@listar_inactivos');// lista los empleados que estan inactivos

Route::get('empleados','EmpleadoController@empleados')->name('empleados');// se encarga de llamar la vista de los empleados que estan activos
Route::get('inactivos','EmpleadoController@inactivos')->name('inactivos');// se encarga de llamar la vista de los empleados inactivos

/*Route::get('/reporte', function () {
    return view('reporte');
})->name('reporte');*/


Route::post('usuario/registro','UserController@guardar')->name('saveusuario');// registra nuevo usuario



Route::post('usuario/eliminar','UserController@eliminar');// elimina usuario
Route::post('usuario/editar','UserController@editar');//edita usuario

Route::get('usuarios','UserController@usuarios')->name('usuarios');//se encarga de llamar la vista de los usuarios
Route::get('usuarios/list','UserController@listar_usuario');// lista los empleados 

Route::get('configurar','UserController@configurar')->name('configuracion');//mostrara la vista de configurar usuario
Route::post('configurar/clave','UserController@cambiar_clave')->name('cambiar');//cambiara la clave de usuario





Route::get('reporte','ReporteController@reporte')->name('reporte');//llama la vista del reporte


Route::get('reporte/list','ReporteController@get_all');//muestra todos los dias que un empleado ha asistido


Route::get('reporte/mes','ReporteController@reporteMensual');// muestra cuantas asistencias tien un empleado al mes










