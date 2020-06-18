<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\User;

class UserController extends Controller
{
    //

    public function __construct(){
   
        $this->middleware('auth');
    }


    
    public function listar_usuario(){

        
            //return User::all();

             return User::where('id','!=' ,19 )->get();

        
    }
    
    public function usuarios(){


    	$user = \Auth::user();
    	 if ($user->role != "Administrador") {
    	 	return redirect('/');
    	 }
         
         return view('usuario');
    }


    public function guardar(Request $request)//registrara un usuario nuevo
    {
         

       

        $nombre=$request->input('nombre');
        $tipo=$request->input('tipo');
        $clave=$request->input('clave');
        $Confclave=$request->input('confclave');

        $nombreexistente =  user::select('name')->where('name', $nombre )->first();
       
       
        

        if ($nombre=="" ){$response['message'] = "El Campo Nombres No Puede Estar Vacio";$response['success'] = "no";return $response;} 

        if ($tipo=="" ){$response['message'] = "El Campo Tipo No Puede Estar Vacio";$response['success'] = "no";return $response;} 

        if ($clave=="" ){$response['message'] = "El Campo Clave No Puede Estar Vacio";$response['success'] = "no";return $response;} 

        if ($Confclave=="" ){$response['message'] = "El Campo Confirmar Clave No Puede Estar Vacio";$response['success'] = "no";return $response;} 

        if ($clave != $Confclave ){$response['message'] = "La Clave y la Confirmacion de Clave deben ser Iguales";$response['success'] = "no";return $response;}

        if ($nombreexistente){$response['message'] = "El Nombre de Usuario ya Existe";$response['success'] = "no";return $response;}
        
        

        $usuario = new User();

        $usuario->role = $tipo;
        $usuario->name = $nombre;        
        $usuario->password = bcrypt($clave);// encripta la clave pues si no al poner los datos no inicia sesion
        $usuario->created_at;
        $usuario->updated_at;

         


        $usuario->save();


            $response['message'] = "Guardo exitosamente";
            $response['success'] = true;

            return $response; 


           // 'password' => Hash::make($data['password']),

       }




       public function editar(Request $request){

       	    $id = $request->input('id');
	        $nombre = $request->input('nombre');
	        $tipo = $request->input('tipo');
	        $clave = $request->input('clave');
	        $confclave = $request->input('confclave');

            $nombreexistente =  User::select('id','name')->where('id','!=', $id )->where('name', $nombre )->first();


            if ($nombre=="" ){$response['message'] = "El Campo Nombres No Puede Estar Vacio";$response['success'] = "no";return $response;} 

            if ($tipo=="" ){$response['message'] = "El Campo Tipo No Puede Estar Vacio";$response['success'] = "no";return $response;} 

            if ($clave=="" ){$response['message'] = "El Campo Clave No Puede Estar Vacio";$response['success'] = "no";return $response;}

            if ($confclave=="" ){$response['message'] = "El Campo Confirmar Clave No Puede Estar Vacio";$response['success'] = "no";return $response;} 

            if ($confclave != $clave ){$response['message'] = "La Clave y la Confirmacion de Clave deben ser Iguales";$response['success'] = "no";return $response;}

            if ($nombreexistente){$response['message'] = "El Nombre de Usuario ya Existe";$response['success'] = "no";return $response;}
	       

	        User::where('id',$id)-> 
	              update([

	                'role' => $tipo,
	                'name' => $nombre,
	                'password' => bcrypt($clave), //encripta la clave para que pueda iniciar sesion              
	                /*'created-at'=> '',
	                'updated-at'=> '',
	                'remember_token'=> '',*/

	              ]);


	        $response['message'] = "Edit exitosamente";
	         
	        $response['success'] = true;

	        return $response;
       }






       public function eliminar(Request $request){
             

            $id = $request->input('id');
	        

	        User::where('id', $id)->delete();

	        $response['message'] = "Eliminado exitosamente";
	        $response['success'] = true;

	        return $response;


       } 




       public function configurar(){

           return view('configurar');
       }





       public function cambiar_clave(Request $request){

           $usuario = \Auth::user();

           //$usuario->id;

           $clave =$request->input('clave');
           $clavenueva =$request->input('clavenueva');
           $confirmclavenueva =$request->input('confirmclavenueva');

          

            //$a = User::select('id','password')->where('id', $usuario->id)->where('password', $clave)->first();

           
           
            // se encarga de validar si la clave introducida es la clave actual de el usuario 
            if ( Hash::check($clave,$usuario->password) ) {

                  if ($clavenueva=="") {
                      $response['message'] = "La Contraseña Nueva no puede estar vacia";   
                      $response['success'] = 'no';
                      return $response;
                  }

                  if (strlen($clavenueva)<6) {
                      $response['message'] = "La Contraseña Debe tener al menos 6 Caracteres";   
                      $response['success'] = 'no';
                      return $response;
                  }

                  if($clavenueva != $confirmclavenueva){
                        $response['message'] = "La Contraseña y la Confirmacion deben ser Iguales";
                        $response['success'] = 'no';
                        return $response;
                  }


                  if ($clavenueva == $confirmclavenueva) {
                       User::where('id', $usuario->id)-> 
                          update([

                            'role' => $usuario->role,
                            'name' => $usuario->name,
                            'password' => bcrypt($clavenueva), //encripta la clave para que pueda iniciar sesion              
                            /*'created-at'=> '',
                            'updated-at'=> '',
                            'remember_token'=> '',*/

                          ]);


                        $response['message'] = "Contraseña cambiada con exito";
                        $response['success'] = true;

                        return $response;
                  }

                  
                  

                    
            }else{
                $response['success'] = "no";
                $response['message'] ="Contraseña Actual Erronea";
                return $response;
            }

           
       }

    
}


