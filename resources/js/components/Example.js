


import React,{ Component } from 'react';
import ReactDOM from 'react-dom';

//const baseUrl = "http://127.0.0.1:8000/";
//const baseUrl = "http://localhost/asistencia/public/";

export default class Example extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formCedula:'',
            reportemes:[],

         
        }
        

       this.handleChangeCedula = this.handleChangeCedula.bind(this);


      

  }



  handleChangeCedula(event) {
    
        this.setState({formCedula: event.target.value});// formCedula dejara de estar vacio y tomara el valor del campo cedula
 
  }

  componentDidMount(){
     
         this.listaMensual();
    }


     listaMensual(){
       axios.get('reporte/mes').then(response=>{
          this.setState({
            reportemes:response.data,
            //reporteBackupMes:response.data
            
          })


        }).catch(error=>{
          alert("error"+error)
          
           
        })
     }

 

  sendNetworkCedula(){

       
     


        const formData = new FormData()
        formData.append('cedula',this.state.formCedula)//el 'cedula' es el cedula del $request->input('cedula') del laravel
        

        axios.post('empleado/buscar',formData).then(response=>{


          

             if (response.data.success==true) {
                   
                    


                  


                   //alert(response.data.message);
                   var cadena = response.data.message.split(','); // obtengo el valor del controlador y separo cada campo para obtenerlos de forma individual
                     this.listaMensual();
                      
                    //$('#ced').val(cadena[0]); asi se agrega valor a un input
                    $('#ced').text(cadena[0]);// asi se agrega valor a un campo de una tabla
                    $('#nom').text(cadena[1]);
                    $('#ape').text(cadena[2]);
                    $('#tipo').text(cadena[3]);

                    
                   // $("#foto").attr("src","img/"+cadena[0]+".jpg");// se encarga de buscar la foto de la persona que ha conseguido

                     $("#foto").attr("src","storage/"+cadena[0]+".jpg");

                    // <img src="/storage/nombreGeneradoDeNuestaImagen.png" alt="image">
                    

                    this.setState({
                        formCedula: '' //hace que el valor que esta en la casilla donde se inserta codigo sea nulo
                    });

                    
{/*__________________________________________________________INSERTA LA HORA EN LA TABLA_____________________________________________*/}


                   
                     $('#horaes').text(cadena[4]);

{/*______________________________________________________________________________________________________________________________________*/}




                  
                    $("#tabla").show();// muestra la tabla con los datos del personal que paso el carnet
                    $("#fotopersonal").show();// muestra la foto del personal que paso el carnet
                    $("#hor").show();// muestra la tabla con la hora de llegada y salida cuando un personal pasa el carnet
                    $("#reloj").hide();// esconde el reloj cuando un personal pasa el codigo de barra

                     $("#horaes").animate({opacity:0},300,"linear",function(){// hace que la hora de entrada y salida parpadee
                        $(this).animate({opacity:1},300);
                        $(this).animate({opacity:0},300);
                        $(this).animate({opacity:1},300);
                        $(this).animate({opacity:1},300);
                      });

                     $('#cedula').blur();// desenfoca el input de la cedula o codigo uan vez se encuentra el usuario

                     

                    $(document).ready(function() {// se encarga de ocultar la tabla una vez que mostro los resultados
                      setTimeout(function() {
                          $('#cedula').val('');//limpia el campo donde se inserta la cedula o codigo del carnet luego de que se ocultar la tabla                          
                          $('#cedula').focus();// enfoca el input de donde se inserta la cedula o cod de carnet al ocultar la tabla
                          $(".content").fadeOut(3);
                          $("#reloj").show();// muestra el reloj cuando la tabla con los datos del personal se oculta

                          $("#foto").attr("src"," ");//hace que quite de cache la foto anterior
                        

                       

                          
                      },3000);
                      
                      
                    });  

                    
                 
              
              }if (response.data.success=='no') {// muestra cuando no se encuentra personal
                  // alert(response.data.message)
                   $('#cedula').val('');
                   $('.mensaje').show();
                   $('#alerta').text(response.data.message);
                   $("#reloj").hide();

                   $('#cedula').blur();// desenfoca el input de la cedula o codigo cuando no se encuentra el usuario

                   $(".mensaje").animate({opacity:0},300,"linear",function(){// hace que el mensaje parpadee
                      $(this).animate({opacity:1},300);
                      $(this).animate({opacity:0},300);
                      $(this).animate({opacity:1},300);
                      $(this).animate({opacity:1},300);
                   });

                   setTimeout(function() {
                          $('#cedula').val('');                                                     
                          $("#reloj").show();
                          $('.mensaje').hide();
                          $('#cedula').focus();
                   },3000);
              }

              if (response.data.success=='nocedula') {// valida para que un usuario cumun no pueda insertar cedula
                   $('#cedula').val('');
                   $('.mensaje').show();
                   $('#alerta').text(response.data.message);
                   $("#reloj").hide();

                   $('#cedula').blur();// desenfoca el input de la cedula 

                   $(".mensaje").animate({opacity:0},300,"linear",function(){// hace que el mensaje parpadee
                        $(this).animate({opacity:1},300);
                        $(this).animate({opacity:0},300);
                        $(this).animate({opacity:1},300);
                        $(this).animate({opacity:1},300);
                      });

                   setTimeout(function() {
                          $('#cedula').val('');                                                     
                          $("#reloj").show();
                          $('.mensaje').hide();
                          $('#cedula').focus();                          
                      },3000);
              }
              
              
                
              
            

         }).catch(error=>{
           //alert("Error "+error)


           


         })

      }



       



    render(){

      const style = {
        display: 'none'
       
      };

      const image={
        width:'30%',
        height:'30%',
        display:'none'
           
      }

      const hora={
        display:'none'
      }

     
     

      

        return (


           <div className="container">
                   <div className="row justify-content-center">
                        <div className="col-xs-4">                                                      
                            <div className="card-body">                                    
                                <form id="form" className='form-inline' >                                     
                                    <div className="col-xs-4">                                          
                                      <input type="password"  id='cedula' className="form-control" autoFocus=' ' value={this.state.formCedula}  onChange={this.handleChangeCedula}/>
                                      <div className="input-group-append click_on_enterkey">
                                        <button type="button" id='busc' style={{display:'none'}} onSubmit={this.sendNetworkCedula()} className="btn btn-primary input-group-text" >                                            
                                            Enviar
                                        </button>
                                      </div>
                                    </div>                                                                               
                                 </form>
                            </div>                      
                        </div>
                    </div>

                    
                    

                    <table className="table content" id='hor' style={hora}>
                      <tr>
                        
                        <td align="center" style={{fontSize:35}} id='horaes' className="horaes"></td>
                        
                      </tr>
                    </table>                                  
   {/*_________________________________________________MUESTRA LA FOTO DEL PERSONAL___________________________________________________*/}   

                    <table className='table content ' id='fotopersonal' style={image} align='center' >
                       <tr>
                         
                         {/*<td ><img src='' id='foto' className="img-thumbnail "  /></td>*/}

                         <td ><img src='' id='foto' className="img-thumbnail "  /></td>


                         
                         
                       </tr>
                    </table>
 {/*__________________________________________________________________________________________________________________________________*/}                    
                   
{/*______________________________________________MUESTRA LA TABLA CON LOS DATOS DEL PERSONAL__________________________________________*/} 

                    <table className="table table-dark table-bordered  content" style={style} id="tabla">
                        
                        <tbody id="bodytable" className="datosempleado">
                          <tr>
                              <th style={{ fontSize:24 }}>CEDULA</th>
                              <th style={{ fontSize:24 }}>NOMBRES</th>
                              <th style={{ fontSize:24 }}>APELLIDOS</th>
                              <th style={{ fontSize:24 }}>PERSONAL</th>
                          </tr>
                         
                          <tr>
                              <td id='ced' style={{ fontSize: 24 }}> </td>
                              <td id='nom' style={{ fontSize: 24 }}> </td>
                              <td id='ape' style={{ fontSize: 24 }}> </td>
                              <td id='tipo'style={{ fontSize: 24 }}> </td>
                          </tr>
                        </tbody>
                    </table>

{/*____________________________________________________________________________________________________________________________________________*/}
                   <div className="wrap" id="reloj">
                         <div className="widget">
                                <div className="fecha">
                                   <p id="diaSemana" className="diaSemana"> </p>
                                   <p id="dia" className="dia"> </p>
                                   <p> de </p>
                                   <p id="mes" className="mes"> </p>
                                   <p>del</p>
                                   <p id="year" className="year"> </p>
                                </div>

                                <div className="reloj">
                                   <p id="horass" className="horas"></p>
                                   <p>:</p>
                                   <p id="minutos" className="minutos"></p>
                                   <p>:</p>
                                   <div className="caja-segundos">
                                        <p id="ampm" className="ampm"></p>
                                        <p id="segundos" className="segundos"></p>
                                   </div> 
                                </div>
                        </div>
                  </div>

                  <div className="principal">
                     <div className="secundario">
                        <div className="mensaje">
                           <p id="alerta"></p>
                        </div>
                     </div>
                  </div>



                  


        </div>

        
      );     

    }



      renderListMes(){

      return this.state.reportemes.map((data)=>{

        return(
          <tr className="alineartexto">
            <td className='anchocasilla'>{data.cedula}</td>
            <td className='anchocasilla'>{data.nombre}</td>
            <td className='anchocasilla'>{data.apellido}</td>
            <td className='anchocasilla'>{data.tipo}</td>
            <td className='anchocasilla'>{data.asistencia}</td>

            

          </tr>
        )

      })

    }

 

   
}






if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}

       


