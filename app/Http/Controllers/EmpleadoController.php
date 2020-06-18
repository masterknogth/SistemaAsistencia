<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;

use App\Empleado;
use App\Asistencia;
use App\Reporte;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

use Illuminate\Validation\Rule;

use DateTime;
use Carbon\Carbon;





class EmpleadoController extends Controller
{

    public function __construct()
    {

        $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)//registrara un empleado nuevo
    {
         

       

        $nro=$request->input('nro');
        $cedula=$request->input('cedula');
        $nombre=$request->input('nombre');
        $apellido=$request->input('apellido');
        $tipo=$request->input('tipo');
        

        

        $empleado = new Empleado();
        
        $empleado->cedula = $cedula;
        $empleado->nro = $nro;
        $empleado->nombre = $nombre;
        $empleado->apellido = $apellido;
        $empleado->tipo = $tipo;
        $empleado->estado = "ON";
        
        
        $empleado->created_at;
        $empleado->updated_at;

        $cedulaexistente =  Empleado::select('cedula')->where('cedula', $cedula )->first();
        $nroexistente =  Empleado::select('nro')->where('nro', $nro )->first();


//---------------------------------------------------------VALIDACIONES--------------------------------------------------------------------

        if ($nro=="" ){$response['message'] = "El Numero de Empleado No Puede Estar Vacio";$response['success'] = "no";return $response;} 

        if ($cedula=="" ){$response['message'] = "El Campo Cedula No Puede Estar Vacio";$response['success'] = "no";return $response;} 

        if ($nombre=="" ){$response['message'] = "El Campo Nombres No Puede Estar Vacio";$response['success'] = "no";return $response;} 

        if ($apellido=="" ){$response['message'] = "El Campo Apellidos No Puede Estar Vacio";$response['success'] = "no"; return $response;} 

        if ($tipo=="" ){$response['message'] = "El Campo Tipo No Puede Estar Vacio";$response['success'] = "no";return $response;}
        
        if (!is_numeric($cedula)){$response['message'] = "El Campo Cedula Solo Puede Ser Numerico";$response['success'] = "no";return $response;}
        
        if (!is_numeric($nro)){$response['message'] = "El Numero de Empleado No Puede Tener Letras";$response['success'] = "no";return $response;}
        
        if (preg_match('/0|1|2|3|4|5|6|7|8|9/', $nombre)){$response['message'] = "El Campo Nombres No Puede Tener Numeros";$response['success'] = "no";return $response;}
        
        if (preg_match('/0|1|2|3|4|5|6|7|8|9/', $apellido)){$response['message'] = "El Campo Apellidos No Puede Tener Numeros";$response['success'] = "no";return $response;}

        if ($nroexistente['nro']==$nro ){$response['message'] = "Este Numero de Empleado Ya Ha Sido Asignado";$response['success'] = "no";return $response;}
       
        if ($cedulaexistente['cedula']==$cedula ){$response['message'] = "Este Numero de Cedula Ya Existe";$response['success'] = "no";return $response;}

    





        
//------------------------------------------------------------------------------------------------------------------------------------------------------------------

       if ($request->file('file') != null) {
           $image_path = $request->file('file');
           $image_path_name = $image_path->getClientOriginalName();
           Storage::disk('public')->put($image_path_name,File::get($image_path));
       }
      

        

        //if ($image_path) {

            //$image_path_name = time().$image_path->getClientOriginalName();
           

           //lo guardo en la carpeta storage(storage/app/users)
              

            $empleado->save();


            $response['message'] = "Guardo exitosamente";
            $response['success'] = true;

            return $response;      
           
        //}


 
         
        

                

               
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

   //mostrara la lista de todos los empleados registrados en el sistema
    public function listar_empleado(){

        
            return Empleado::where('estado','ON')->get();

        
    }



    public function empleados(){// llama la vista de los empleados
       
      
          /*$user = \Auth::user();

          if ($user->role != "Administrador") {
               
               return redirect('/');

          }*/

          return view('empleado');
        
      
         
     
       
        

    } 


    public function listar_inactivos(){
         return Empleado::where('estado','OFF')->get();// muestra la lista de los empleados que estan inactivos
    }

    public function inactivos(){
        return view('inactivo');  //llama la vista de los empleados inactivos
    }



   public function show(Request $request)
    {
        $user = \Auth::user();

        date_default_timezone_set('America/Caracas');
       

        $dias = array("DOM","LUN","MAR","MIE","JUE","VIE","SAB");

        $dia = $dias[date("w")];

        $hora = date('G:i');
        $f = date('d/m/Y');

        $fecha = $dia." ".$f;



       

  

        $cod=$request->input('cedula');
        
        $date1 = Carbon::now();
        //$date1 = $date1->format('h:i');
          

        Asistencia::where('fecha','!=',$fecha)->delete();
   
            
        

        if(preg_match('/A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z|a|b|c|d|e|f|g|h|i|j|k|l|m|n|o|p|q|r|s|t|u|v|w|x|y|z/', $cod)) {


                      
          //"DECODIFICA PORQUE SE PUSO EL CODIGO DE BARRAS <br>";

              $codecimal =base_convert ( substr($cod ,0, -3), 36 , 10 ); //converto el codigo  a decimal
              $ced=substr($codecimal,1);// elimino el primer caracter pues ese no hace falta
              $num= (int)$ced;//convierto la cedula decodificada en un entero para ser leido 
              
              //busca los datos del empleado para mostrarlo en pantalla
              $datos =  Empleado::select('cedula','nombre','apellido','tipo')->where('cedula', $num )->where('estado', 'ON' )->first();

              //busca los datos del empleado para que este luego pueda ser registrado en la tabla de asistencia
              $datosa = Asistencia::select('cedula','entrada')->where('cedula', $num )->first(); 

              // si el usuario marco la entrada actualiza para poner la hora de salida en el reporte
              $sirep = Reporte::select('cedula',)->where('cedula', $num)->where('fecha',$fecha)->first();

              // se encarga de poner el reporte del dia siguiente
              $sirepnofecha = Reporte::select('cedula',)->where('cedula', $num)->where('fecha','!=',$fecha)->first();
             
              //si no aparece en el reporte lo agrega
              $norep = Reporte::select('cedula')->where('cedula', $num)->first();


              
          

        }else{

           if ($user->role == "Administrador") {
               //"NO DE CODIFICA PORQUE PONES LA CI DIRECTA <br>";
                 $id = (int)$cod;
                 //busca los datos del empleado para mostrarlo en pantalla
                 $datos =  Empleado::select('cedula','nombre','apellido','tipo')->where('cedula', $id )->where('estado', 'ON' )->first();

                  //busca los datos del empleado para que este luego pueda ser registrado en la tabla de asistencia
                 $datosa = Asistencia::select('cedula','entrada')->where('cedula', $id )->first();

                 // si el usuario marco la entrada actualiza para poner la hora de salida en el reporte
                 $sirep = Reporte::select('cedula',)->where('cedula', $id)->where('fecha',$fecha)->first();

                 // se encarga de poner el reporte del dia siguiente
                 $sirepnofecha = Reporte::select('cedula',)->where('cedula', $id)->where('fecha','!=',$fecha)->first();

                 //si no aparece en el reporte lo agrega
                 $norep = Reporte::select('cedula')->where('cedula', $id)->first();



                   
           }elseif(strlen($cod)>=7){
                $response['message'] = "No Se Acepta Colocar Cedula";
                $response['success'] = "nocedula";

                 return $response;
           }
                
            

            

                      
        }

        if ($datos && $datosa) {
            //$response['message'] es el resultado que mostrara el react, ['message'] seria como la variable
            // divido por comas los campos para luego en el componente de react separarlos e insertarlo en el campo correspodiente de la su tabla
            $response['message'] = $datos['cedula'].",".$datos['nombre'].",".$datos['apellido'].",".$datos['tipo'].",".$hora;

            $response['success'] = true;

             

            
               // se encarga de registrar la hora de salida del personal
              Asistencia::where('cedula',$datos['cedula'])-> 
              update([
                'user_id' => $user->id,
                'cedula' => $datos['cedula'],
                'entrada' => $datosa['entrada'],
                'salida' => $hora,
                'fecha' => $fecha
              ]);

              if (!$norep) {// si no hay reporte de ese usuario crea una nuevo
                $nuevor = new Reporte();
                $nuevor->user_id = $user->id;
                $nuevor->cedula = $datos['cedula'];
                $nuevor->nombre = $datos['nombre'];
                $nuevor->apellido = $datos['apellido'];
                $nuevor->tipo = $datos['tipo'];
                $nuevor->entrada = $hora;
                $nuevor->salida = ' ';
                $nuevor->horas = '0';
                //$nuevor->fecha = $dia." ".$fecha;
                $nuevor->fecha = $fecha;
                $nuevor->created_at;
                $nuevor->updated_at;
                

                $nuevor->save();

            }

            if($sirep){// si ya hay un reporte de que ese mismo dia el usuario marco la entrada actualiza y pone que marco tambien la salida
               
               $entrada  = new Carbon($datosa['entrada']);
               $salida    = new Carbon($hora);

               $horas=$entrada->diff($salida)->format('%h:%I'); // calculara cuantas horas de trabajo hizo al dia

               Reporte::where('cedula',$datos['cedula'])->where('fecha',$fecha)-> 
              update([
                'user_id' => $user->id,
                'cedula' => $datos['cedula'],
                'nombre' => $datos['nombre'],
                'apellido' => $datos['apellido'],
                'tipo' => $datos['tipo'],
                'entrada' => $datosa['entrada'],
                'salida' => $hora,
                'horas' => $horas,
                //'fecha' => $dia." ".$fecha
                'fecha' => $fecha,
                /*'created-at'=> '',
                'updated-at'=> '',*/

              ]); 
            }
                
//where('fecha','LIKE' ,'%'.$mes.'%')
            return $response;

            

            

        }elseif(strlen($cod)>=8 && !$datos){//si los datos que enviaste por post tiene una longuitud mayor a 7 y no encuentra nada
      
            $response['message'] = "Personal No Se Encuentra";
            $response['success'] = "no";
            return $response;

            
        }





        if ($datos && !$datosa) {

            $response['message'] = $datos['cedula'].",".$datos['nombre'].",".$datos['apellido'].",".$datos['tipo'].",".$hora;

            $response['success'] = true;

            

            $asistencia = new Asistencia();// se encarga de registrar la hora de entrada del personal
            $asistencia->user_id = $user->id;
            $asistencia->cedula = $datos['cedula'];
            $asistencia->entrada = $hora;
            $asistencia->salida = ' ';
            $asistencia->fecha = $fecha;
            $asistencia->created_at;
            $asistencia->updated_at;
            

            $asistencia->save();
             
            if (!$norep) {// si no hay reporte de esa persona crea el primer reporte
                $nuevor = new Reporte();
                $nuevor->user_id = $user->id;
                $nuevor->cedula = $datos['cedula'];
                $nuevor->nombre = $datos['nombre'];
                $nuevor->apellido = $datos['apellido'];
                $nuevor->tipo = $datos['tipo'];
                $nuevor->entrada = $hora;
                $nuevor->salida = ' ';
                $nuevor->horas = '0';
                //$nuevor->fecha = $dia." ".$fecha;
                $nuevor->fecha = $fecha;

                $nuevor->created_at;
                $nuevor->updated_at;
                

                $nuevor->save();

            } 

            if ($sirepnofecha) { // si ya hay un reporte de ese usuario pero de otro dia, guarda un nuevo reporte del dia actual que marco
                
                

                $nuevor = new Reporte();
                $nuevor->user_id = $user->id;
                $nuevor->cedula = $datos['cedula'];
                $nuevor->nombre = $datos['nombre'];
                $nuevor->apellido = $datos['apellido'];
                $nuevor->tipo = $datos['tipo'];
                $nuevor->entrada = $hora;
                $nuevor->salida = ' ';
                $nuevor->horas =  '0';
                //$nuevor->fecha = $dia." ".$fecha;
                $nuevor->fecha = $fecha;
                $nuevor->created_at;
                $nuevor->updated_at;
                

                $nuevor->save();

            }









            return $response;
            
        }


         

         
         
    }





   /*public function show($id)
    {
        
    }*/
    



    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
       $id = $request->input('id');
        $nro = $request->input('nro');
        $cedula = $request->input('cedula');
        $nombre = $request->input('nombre');
        $apellido = $request->input('apellido');
        $tipo = $request->input('tipo');


        $nroexistente =  Empleado::select('id','nro')->where('id','!=', $id )->where('nro', $nro )->first();
        $cedulaexistente =  Empleado::select('id','cedula')->where('id','!=', $id )->where('cedula', $cedula )->first();

 //---------------------------------------------------------VALIDACIONES-----------------------------------------------------------

        if ($nro=="" ){$response['message'] = "El Numero de Empleado No Puede Estar Vacio";$response['success'] = "no";return $response;} 

        if ($cedula=="" ){$response['message'] = "El Campo Cedula No Puede Estar Vacio";$response['success'] = "no";return $response;} 

        if ($nombre=="" ){$response['message'] = "El Campo Nombres No Puede Estar Vacio";$response['success'] = "no";return $response;} 

        if ($apellido=="" ){$response['message'] = "El Campo Apellidos No Puede Estar Vacio";$response['success'] = "no"; return $response;} 

        if ($tipo=="" ){$response['message'] = "El Campo Tipo No Puede Estar Vacio";$response['success'] = "no";return $response;}
        
        if (!is_numeric($cedula)){$response['message'] = "El Campo Cedula Solo Puede Ser Numerico";$response['success'] = "no";return $response;}
        
        if (!is_numeric($nro)){$response['message'] = "El Numero de Empleado No Puede Tener Letras";$response['success'] = "no";return $response;}
        
        if (preg_match('/0|1|2|3|4|5|6|7|8|9/', $nombre)){$response['message'] = "El Campo Nombres No Puede Tener Numeros";$response['success'] = "no";return $response;}
        
        if (preg_match('/0|1|2|3|4|5|6|7|8|9/', $apellido)){$response['message'] = "El Campo Apellidos No Puede Tener Numeros";$response['success'] = "no";return $response;}

        if ($nroexistente){$response['message'] = "Este Numero de Empleado Ya Ha Sido Asignado";$response['success'] = "no";return $response;}

        if ($cedulaexistente){$response['message'] = "Este Numero de Cedula Ya Existe";$response['success'] = "no";return $response;}
 



//--------------------------------------------------------------------------------------------------------------------------------------------------------- 


        Empleado::where('id',$id)-> 
              update([
                
                'cedula' => $cedula,
                'nro' => $nro,
                'nombre' => $nombre,
                'apellido' => $apellido,
                'tipo' => $tipo,
                 'estado'=> "ON",
                //'fecha' => $dia." ".$fecha
                //'fecha' => $fecha,
                /*'created-at'=> '',
                'updated-at'=> '',*/

              ]); 

              if ($request->file('file') != null) {
                   $image_path = $request->file('file');
                   $image_path_name = $image_path->getClientOriginalName();
                   Storage::disk('public')->put($image_path_name,File::get($image_path));
              }


        $response['message'] = "editado exitosamente";
        $response['success'] = true;

        return $response;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request) // cambiara el estado del usuario de activo a inactivo para que no aparezca en la lista de empleados
    {

        $id = $request->input('id');
        $nro = $request->input('nro');
        $cedula = $request->input('cedula');
        $nombre = $request->input('nombre');
        $apellido = $request->input('apellido');
        $tipo = $request->input('tipo');

        Empleado::where('id',$id)-> 
              update([
                
                'cedula' => $cedula,
                'nro' => $nro,
                'nombre' => $nombre,
                'apellido' => $apellido,
                'tipo' => $tipo,
                 'estado'=> "OFF",
                //'fecha' => $dia." ".$fecha
                //'fecha' => $fecha,
                /*'created-at'=> '',
                'updated-at'=> '',*/

              ]); 


        $response['message'] = "Eliminado exitosamente";
        $response['success'] = true;

        return $response;
    
     }

     public function activar(Request $request) // cambiara el estado del usuario de inactivo a activo para que aparezca en la lista de empleados
    {

        $id = $request->input('id');
        $nro = $request->input('nro');
        $cedula = $request->input('cedula');
        $nombre = $request->input('nombre');
        $apellido = $request->input('apellido');
        $tipo = $request->input('tipo');

        Empleado::where('id',$id)-> 
              update([
                
                'cedula' => $cedula,
                'nro' => $nro,
                'nombre' => $nombre,
                'apellido' => $apellido,
                'tipo' => $tipo,
                 'estado'=> "ON",
                //'fecha' => $dia." ".$fecha
                //'fecha' => $fecha,
                /*'created-at'=> '',
                'updated-at'=> '',*/

              ]); 


        $response['message'] = "Activado exitosamente";
        $response['success'] = true;

        return $response;
    
     } 
 






    }
