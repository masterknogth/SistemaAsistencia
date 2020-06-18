import React,{ Component } from 'react';
import ReactDOM from 'react-dom';


export default class Configurar extends Component {


	 constructor(props) {
        super(props);
        this.state = {
            formClave:'',
            formClaveNueva:'',
            formConfirmClaveNueva:'',

         
        }
        

       this.handleChangeClave = this.handleChangeClave.bind(this);
       this.handleChangeClaveNueva = this.handleChangeClaveNueva.bind(this);
       this.handleChangeConfirmClaveNueva = this.handleChangeConfirmClaveNueva.bind(this);


      

  }


  handleChangeClave(event) {
    
        this.setState({formClave: event.target.value});
 
  }

  handleChangeClaveNueva(event) {
    
        this.setState({formClaveNueva: event.target.value});
 
  }

  handleChangeConfirmClaveNueva(event) {
    
        this.setState({formConfirmClaveNueva: event.target.value});
 
  }


  sendNetworkClave(){

        const formData = new FormData()
        formData.append('clave',this.state.formClave)//el 'clave' es el clave del $request->input('clave') del controlador
        formData.append('clavenueva',this.state.formClaveNueva)
        formData.append('confirmclavenueva',this.state.formConfirmClaveNueva)

        axios.post('configurar/clave',formData).then(response=>{
                    

                    if (response.data.success==true) {
                          
                          $("#nulo").hide(); //oculta el header que no tiene ningun mensaje
                          $("#error").hide();// ocula mensaje de error
                          $("#exito").show();//muestra mensaje de exito al cambiar clave
                          $('#mensajexito').text(response.data.message);

                          this.setState({ 

				      	  formClave:'',
				      	  formClaveNueva:'',
				          formConfirmClaveNueva:'',
				          

				          })

                          $('#clave').val(''),
                          $('#clavenueva').val(''),
                          $('#confirmarclave').val(''),
  
                          $(document).ready(function() {//oculta el mensajes despues de un tiempo
				              setTimeout(function() {
				                  
				                $("#exito").hide();//oculta mensaje de exito luego de 3 segundos
				                $("#nulo").show();//muestra header sin mensaje
				                  
				              },3000);
			              
			              
			            });
                    	 
                    }

                    if(response.data.success=="no"){
                        $("#error").show();//muestra mensajes de error
                        $("#nulo").hide();//oculta el header q no tiene mensajes
                        $("#exito").hide();//oculta mensaje de exito
                        $('#mensajefail').text(response.data.message);

                        $(document).ready(function() {//oculta el mensajes despues de un tiempo
				              setTimeout(function() {
				                  
				                $("#error").hide();//oculta mensaje de Error
				                $("#nulo").show();//muestra header sin mensaje	
				                  
				              },3000);
			              
			              
			            });
                    }

                    

        	}).catch(error=>{
              alert("Error "+error)


         })
   }

   hideOrShowPassword(e){
   	e.preventDefault();
	  var password1,password2,check;

	  password1=document.getElementById("clave");
	  password2=document.getElementById("password2");
	  check=document.getElementById("ver");

	  if(check.checked==true) // Si la checkbox de mostrar contraseña está activada
	  {
	      password1.type = "text";
	      password2.type = "text";
	  }
	  else // Si no está activada
	  {
	      password1.type = "password";
	      password2.type = "password";
	  }
   }


//--------------------------------------------------PARA VER LAS CLAVES QUE SE ESTAN INSERTANDO----------------------------------------
   verClave(){

   	var tipo = document.getElementById("clave");
      if(tipo.type == "password"){
          tipo.type = "text";
      }else{
          tipo.type = "password";
      }
   	
   }
    verClaveNueva(){

   	var tipo = document.getElementById("clavenueva");
      if(tipo.type == "password"){
          tipo.type = "text";
      }else{
          tipo.type = "password";
      }
   	
   }
    verConfirmClave(){

   	var tipo = document.getElementById("confirmarclave");
      if(tipo.type == "password"){
          tipo.type = "text";
      }else{
          tipo.type = "password";
      }
   	
   }

//-----------------------------------------------------------------------------------------------------------------------------------


  render(){

  	// al precionar el boton retroceder del navegador recarga la pagina y cierra sesion

          window.addEventListener( "pageshow", function ( event ) {
          var historyTraversal = event.persisted || 
         ( typeof window.performance != "undefined" && 
                window.performance.navigation.type === 2 );
          if ( historyTraversal ) {
            // Handle page restore.
           
            $('#app').hide();// esta en un div de app.blade.php
            
            window.location.reload();
          }
         });


    

  	   return(

            

            

			   <div className="container">
			    <div className="row justify-content-center">

			        <div className="col-md-8">

			             <div className="card">
			            {/*-------------------------------------------------MUESTRA EL HEADER SIN NADA----------------------------------------------*/}
			                <div className="card-header" id="nulo"><h5 className="alinear">Cambiar Clave</h5></div>

			            {/*----------------------------------------------MUESTRA ERRORES DE VALIDACION--------------------------------------------------*/}
			                <div className="card-header alert alert-danger" style={{display:'none'}} id="error"><h5 id="mensajefail" className="alinear"></h5></div>

                        {/*----------------------------------------------------MUESTRA EXITO AL MODIFICAR-------------------------------------------------------------*/}
			                <div className="card-header alert alert-success" style={{display:'none'}} id="exito"><h5 id="mensajexito" className="alinear"></h5></div>

			                <div className="card-body">
			                    <form>

			                     <div className="input-group mb-3">
			                        <label  className="col-md-4 col-form-label text-md-right">Contraseña Actual:</label>
								    <input type="password" id="clave" onChange={this.handleChangeClave} className="form-control col-md-6" placeholder="Contraseña Actual"/>
								    <div className="input-group-append">
								       <button type="button" className="input-group-text" id="ver" onClick={()=>this.verClave()} ><i className="far fa-eye fa-lg"></i></button>
								    </div>
								 </div>


								 <div className="input-group mb-3">
			                        <label  className="col-md-4 col-form-label text-md-right">Nueva Contraseña:</label>
								    <input type="password" id="clavenueva" onChange={this.handleChangeClaveNueva} className="form-control col-md-6" placeholder="Contraseña Nueva"/>
								    <div className="input-group-append">
								       <button type="button" className="input-group-text" onClick={()=>this.verClaveNueva()}><i className="far fa-eye fa-lg"></i></button>
								    </div>
								 </div>


								 <div className="input-group mb-3 ">
			                        <label  className="col-md-4 col-form-label text-md-right">Confirmar Contraseña:</label>
								    <input type="password" id="confirmarclave" onChange={this.handleChangeConfirmClaveNueva} className="form-control col-md-6 " placeholder="Confirmar Contraseña "/>
								    <div className="input-group-append">
								       <button type="button" className="input-group-text" onClick={()=>this.verConfirmClave()}><i className="far fa-eye fa-lg"></i></button>
								    </div>
								 </div>

                                 

			                        
			                        {/*<div className="form-group row">
			                            <label  className="col-md-4 col-form-label text-md-right">Contraseña Actual:</label>			                            
			                            <div className="col-md-6">
			                                <input  type="password" className="form-control" placeholder="Contraseña Actual" id='clave' onChange={this.handleChangeClave} />
			                                
                                                              			                                
			                            </div>
			                            
			                        </div>

			                        <div className="form-group row ">
			                            <label  className="col-md-4 col-form-label text-md-right">Contraseña Nueva</label>
			                            <div className="col-md-6">
                                            <input  type="password" className="form-control" placeholder="Contraseña Nueva" id='clavenueva' onChange={this.handleChangeClaveNueva} />
                                           
			                            </div>
			                        </div>


			                        
			                        <div className="form-group row">
			                            <label className="col-md-4 col-form-label text-md-right">Confirmar Contraseña</label>
			                            <div className="col-md-6">
			                                <input  placeholder="Confirmar Contraseña" type="password" className="form-control" id='confirmarclave' onChange={this.handleChangeConfirmClaveNueva}/>
			                            </div>
			                        </div>*/}

			                         
                                    


			                        <div className="form-group row mb-0">
			                            <div className="col-md-8 offset-md-4">
			                                <button type="button"   className="btn btn-success" onClick={()=>this.sendNetworkClave()}>Cambiar</button>
			                            </div>
			                        </div>
			                    </form>
			                </div>
			            </div>
			        </div>
			    </div>
			</div>

  	   	)
  }




}


if (document.getElementById('configurar')) {
    ReactDOM.render(<Configurar />, document.getElementById('configurar'));
}