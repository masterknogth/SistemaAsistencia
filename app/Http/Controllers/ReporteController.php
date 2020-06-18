<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Carbon\Carbon;


use App\Reporte;




class ReporteController extends Controller
{

   
    
    /**
     * Create a new controller instance.
     *
     * @return void
     */
  public function __construct()
    {
        $this->middleware('auth');
       

    }



    public function get_all(){ 
         date_default_timezone_set('America/Caracas');
         $mes = date("m/Y");

        /* $numero = cal_days_in_month(CAL_GREGORIAN, date("m"), date("Y")); // 31
         
         $a = $numero-5;
          echo "Hubo {$a} ----------";*/

         //$hora = date('10:00');

         //$min = date('i');

         /*$date = Carbon::parse($hora);

         $now = Carbon::now();*/
         //$diff = $date->floatdiffInHours($now);

        //echo $diff."---------------";

       
        /*$entrada  = new Carbon($hora);
        $salida    = new Carbon(date('G:i'));

        echo $entrada->diff($salida)->format('%H:%I')."----";*/

        




         


      

         	
    	 //return Reporte::all();
         return Reporte::where('fecha','LIKE' ,'%'.$mes.'%')->orderBy('cedula','DESC')->get();
         




                 
    } 

   /* public function get_all(Request $request){  
         $cedula=$request->input('cedula');         
         //return Reporte::all();
         $info = Reporte::select('cedula','nombre','apellido','tipo','entrada','salida','fecha')->where('cedula',$cedula)->first();

         $response['success'] = true;
         $response['message'] = $info['cedula'];

         return $response;


                 
    } */


    

    public function reporteMensual(){
        date_default_timezone_set('America/Caracas');
        $fecha = date('d/m/Y');
        $mes = date("m/Y");
         
         //$fecha = date('08/05/2020');

        //$r = DB::table('reportes')->SELECT('cedula')->distinct()->get;
        //$r = Reporte::orderBy('id')->distinct();//asi puedo paginar 5 elementos por pagina

        
        //$r = Reporte::select('cedula','nombre')->distinct()->where('fecha', $fecha)->get();
       // $r = Reporte::select('cedula','nombre')->distinct()->get();

        $r = Reporte::select('cedula','nombre','apellido','tipo')->selectRaw('count(*) as asistencia')->
        where('fecha','LIKE' ,'%'.$mes.'%')->
        groupBy('cedula','nombre','apellido','tipo')->orderBy('cedula','DESC')->get();


       /* $r = Reporte::select('cedula','nombre','apellido','tipo')->selectRaw('count(*) as asistencia')->
        where('entrada','!=' ,'')->where('fecha','LIKE' ,'%'.$mes.'%')->
        groupBy('cedula','nombre','apellido','tipo')->orderBy('cedula','DESC')->get();*/
        
        //$a = Reporte::count();
        
         //$a = Reporte::where('fecha', $fecha)->selectRaw('count(*) as cuenta')->first();
         $a = Reporte::select('cedula','nombre')->distinct()->count('cedula');



         //SELECT estado,COUNT(*) as total FROM pedidos GROUP BY estado;

        // select idUsuario, count(*) as TotalComentarios from TuTabla group by idUsuario


         //'count(DISTINCT name) as name_count'
         //$a = Reporte::where('cedula', 22785229)->selectRaw('count(*) as cuenta')->first();

      // return view('reporte',['reportes'=> $r],[ 'aa'=> $a ]);

       //return view('reporte',['reportes'=> $r]);

         return $r;
    }




    public function reporte(){
        return view('reporte');

    } 




}
