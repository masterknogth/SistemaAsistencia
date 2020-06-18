import React,{ Component } from 'react';
import ReactDOM from 'react-dom';

//import axios, { post } from 'axios';








export default class Usuario extends Component {

	constructor(props){
      super(props);
      this.state = {
        usuario:[],
        Backup:[],
        textBuscar:'',
        
        formNombre:'',
        formTipo:'',
        formClave:'',       
        formConfirmClave:'',
        
        idUsuario:0,
       


//-------------------------------------------------STATES PARA EDITAR USUARIO------------------------------------------------------
        editNombre:'',
        editTipo:'',
        editClave:'',       
        editConfirmClave:'',

        idUsuarioEdit:0,

        edit: false,

//----------------------------------------------------------------------------------------------------------------------------------------
      }

       this.handleChangeNombre = this.handleChangeNombre.bind(this);   
       this.handleChangeTipo = this.handleChangeTipo.bind(this);
       this.handleChangeClave = this.handleChangeClave.bind(this);  
       this.handleChangeConfirmClave = this.handleChangeConfirmClave.bind(this);

 //---------------------------------------------------BINDS PARA EDITAR-------------------------------------------------------------


       this.handleChangeEditNombre = this.handleChangeEditNombre.bind(this);   
       this.handleChangeEditTipo = this.handleChangeEditTipo.bind(this);
       this.handleChangeEditClave = this.handleChangeEditClave.bind(this);  
       this.handleChangeEditConfirmClave = this.handleChangeEditConfirmClave.bind(this);

//-------------------------------------------------------------------------------------------------------------------------------------
}




    handleChangeNombre(event) {
      this.setState({formNombre: event.target.value});

    }

    handleChangeTipo(event) {
      this.setState({formTipo: event.target.value});
    }

    handleChangeClave(event) {
      this.setState({formClave: event.target.value});
    }

    handleChangeConfirmClave(event) {
      this.setState({formConfirmClave: event.target.value});
    }


//-------------------------------------------------HANDLE CHANGE PARA EDITAR------------------------------------------------------------    

   handleChangeEditNombre(event) {
      this.setState({editNombre: event.target.value});

    }

    handleChangeEditTipo(event) {
      this.setState({editTipo: event.target.value});
    }

    handleChangeEditClave(event) {
      this.setState({editClave: event.target.value});
    }

    handleChangeEditConfirmClave(event) {
      this.setState({editConfirmClave: event.target.value});
    }




//-----------------------------------------------------------------------------------------------------------------------------------------


//--------------------------------------------------------------REGISTRA  USUARIO--------------------------------------------------------
sendNetworkUsuario(){

      const formData = new FormData()
      formData.append('nombre',this.state.formNombre)
      formData.append('tipo',this.state.formTipo)
      formData.append('clave',this.state.formClave)
      formData.append('confclave',this.state.formConfirmClave)

      axios.post('usuario/registro',formData).then(response=>{

           if (response.data.success==true) {
            // alert(response.data.message)
                   $('#nombre').val(''),
		           $('#tipo').val(''),
		           $('#clave').val(''),
		           $('#ConfirmarClave').val(''),
		         

		           this.setState({ 
	 
			      	 formNombre:'',
			         formTipo:'',
			         formClave:'',
			         formConfirmClave:'',

			        })   

                  $('#mensajenulo').hide();// oculta el header del modal al mostrar error
	              $("#mensaje").show(); // muestra mensaje de exito al registrar
	              $('#validacion').hide();// oculta errores de validacion  

	              $(document).ready(function() {//oculta el mensaje de exito al regitrar y el modal
		              setTimeout(function() {
		                  
		                 $('#mensajenulo').show();// muestra el header del modal que no tiene mensajes
		                $("#mensaje").hide();
		                //$("#registrar").modal("hide");


		              
		                  
		              },3000);
		              
		              
		            });
             
            this.listaUsuario()

             //$("#exampleModal").modal("hide");
           }

           if (response.data.success=="no") {
                 $('#mensajenulo').hide();// oculta el header del modal al mostrar error
                 $('#validacion').show();  //el es el container que muestra los errores al registrar
	             $('#error').text(response.data.message);//mensajes de error
	             $("#mensaje").hide();//oculta el mensaje de exito al registrar

	         	$(document).ready(function() {//oculta el mensaje de exito al regitrar y el modal
		              setTimeout(function() {
		                
		                 $('#mensajenulo').show();// muestra el header del modal que no tiene mensajes
		                $('#validacion').hide();  //el es el container que muestra los errores al registrar
	                    $('#error').text(response.data.message);//mensajes de error



		              
		                  
		              },3000);
		              
		              
		            });
                 
                
               


	         } 

       }).catch(error=>{
         alert("Error "+error)
       })

    }  

//----------------------------------------------------------------------------------------------------------------------------------------




//--------------------------------------------------------PROCESO DE EDITAR USUARIO------------------------------------------------------

sendNetworkEditar(){

      const formData = new FormData()
      formData.append('id',this.state.idUsuarioEdit)
      formData.append('nombre',this.state.editNombre)
      formData.append('tipo',this.state.editTipo)
      formData.append('clave',this.state.editClave)
      formData.append('confclave',this.state.editConfirmClave)

      axios.post('usuario/editar',formData).then(response=>{

           if (response.data.success==true) {
              //alert(response.data.message)
                   $('#editnombre').val(''),
		           $('#edittipo').val(''),
		           $('#editclave').val(''),
		           $('#editConfirmarClave').val(''),
		          

		           this.setState({ 
				      	 editNombre:'',
				         editTipo:'',
				         editClave:'',
				         editConfirmClave:'',
			        })

		           $('#mostrarerror').hide();// oculta el mensaje de errores al editar
			       $('#editarnulo').hide();//esconde el container donde aparece el mensaje pero que esta en blanco
 
                   $("#editarexito").show();//muestra mensaje de exito al editar



			        $(document).ready(function() {//oculta el mensaje de exito al editar y el modal
		              setTimeout(function() {
		                  
		                $("#editarexito").hide();
		                $('#editarnulo').show();//esconde el container donde aparece el mensaje pero que esta en blanco
		                //$("#registrar").modal("hide");
		              
		                  
		              },3000);
		              
		              
		            });

                  
             
              this.listaUsuario()

             //$("#exampleModal").modal("hide");
           }

           if (response.data.success=="no") {

                $('#mostrarerror').show();  // es el container que muestra el error
	            $('#errores').text(response.data.message);// muestra el mensaje de error
	            $('#editarnulo').hide();//esconde el container donde aparece el mensaje pero que esta en blanco
                $("#editarexito").hide();//oculta el mensaje de exito al editar

	         	$(document).ready(function() {//oculta el mensaje de exito al editar y el modal
		              setTimeout(function() { 
		              $('#mostrarerror').hide();  // es el container que muestra el error
	                  $('#errores').text(response.data.message);// muestra el mensaje de error
	                  $('#editarnulo').show();//esconde el container donde aparece el mensaje pero que esta en blanco

		                  
		              },3000);
		              
		              
		         });
                 
                
               


	         } 

       }).catch(error=>{
         alert("Error "+error)
       })

    }  


showModalEditar(data){

	//alert("mostrar modal "+JSON.stringify(data))

    	this.setState({ 

      	idUsuarioEdit: data.id,
      	editTipo: data.role,
      	editNombre: data.name,
        
        //editClave: data.password, 
        edit:true

       })
    //alert(this.state.editClave)	
      
        $("#modaleditaruser").modal("show");
    }


//------------------------------------------------------------PROCESO DE ELIMINACION DE USUARIO-----------------------------------------




showModalDelete(data){ //muestra el mensaje de confirmacion de eliminacion 
      

      //alert("mostrar modal "+JSON.stringify(data))
      this.setState({ 

      	idUsuario:data.id,
      	

       })
      $("#ModalDeleteuser").modal("show");
}


sendNetworkDelete(){// envia los datos de usuario a eliminar al controlador

	      const formData = new FormData()
	      formData.append('id',this.state.idUsuario)
	     

	      axios.post('usuario/eliminar',formData).then(response=>{

	           if (response.data.success==true) {
	             //alert(response.data.message)
	             // para cargar datos de nuevo
	             this.setState({ 

		      	 idUsuario:'',
		      	  

		        })
	             this.listaUsuario()

	             $("#eliminar").show();

	              $(document).ready(function() {//oculta el mensaje de exito al eliminar y el modal
		              setTimeout(function() {
		                  
		                $("#eliminar").hide();
		                $("#ModalDelete").modal("hide");
		                  
		              },3000);
		              
		              
		            });
	             
	               //$("#ModalDelete").modal("hide");
	             }

	       }).catch(error=>{
	         alert("Error 456"+error)
	       })

	 }


//-----------------------------------------------------------------------------------------------------------------------------------------












//-------------------------------------------------------LISTA LOS USUARIOS-------------------------------------------------------------
componentDidMount(){
     
         this.listaUsuario();
    }

listaUsuario(){
       axios.get('usuarios/list').then(response=>{
          this.setState({
            usuario:response.data,
            Backup:response.data,
            
          })


        }).catch(error=>{
          alert("error"+error)
          
           
        })
     }

//---------------------------------------------------------------------------------------------------------------------------------------------



//-------------------------------------------------------BUSCA POR NOMBRE, ROL, O TIPO A LOS USUARIOS-----------------------------------------
filter(event){
	     console.log(event.target.value)
	     var text = event.target.value
	     const data = this.state.Backup

	     const newData = data.filter(function(item){
	     	  const itemDataId = item.id
	          const itemDataName = item.name
	          const itemDataRole = item.role.toUpperCase()
	         
	          const campo = itemDataId+" "+itemDataName+" "+itemDataRole
	          const textData = text.toUpperCase()
	          return campo.indexOf(textData) > -1
	      })
	     this.setState({
	          usuario: newData,
	          textBuscar: text,
	      })
   } 

//-----------------------------------------------------------------------------------------------------------------------------------------------       


//-----------------------------------------------------MUESTRA LAS CLAVES A LA HORA DE REGISTRAR  Y EDITAR----------------------------------------
verClave(){

   	var tipo = document.getElementById("clave");
      if(tipo.type == "password"){
          tipo.type = "text";
      }else{
          tipo.type = "password";
      }
   	
 }
verConfirmClave(){

	var tipo = document.getElementById("ConfirmarClave");
  if(tipo.type == "password"){
      tipo.type = "text";
  }else{
      tipo.type = "password";
  }
	
}

verEditClave(){

   	var tipo = document.getElementById("editclave");
      if(tipo.type == "password"){
          tipo.type = "text";
      }else{
          tipo.type = "password";
      }
   	
 }
verEditConfirmClave(){

	var tipo = document.getElementById("editConfirmarClave");
  if(tipo.type == "password"){
      tipo.type = "text";
  }else{
      tipo.type = "password";
  }
	
}


//-----------------------------------------------------------------------------------------------------------------------------------------



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
		                <div className="col-xs-4">                                          
			                  <div className="input-group-append click_on_enterkey">
			                     <button type="button"  className="btn btn-success" data-toggle="modal" data-target="#registraruser">Registrar Usuario</button>
			                  </div>
		                </div>                                                                                  
	               </div>


	               <br/>
	    
                   
	               <input className="form-control  col-md-4 " placeholder="Buscar:" value={this.state.text} onChange={(text) => this.filter(text)} />

	               <br/>

	               

	                <div className="tbl-header">
		             
		                <table id='tablauno' className="table table-dark table-bordered table-hover">
		                    <thead>
		                      <tr className="alineartexto">
		                         
		                          <th className='anchocasilla'>NOMBRE</th>
		                          <th className='anchocasilla'>TIPO DE USUARIO</th>
		                          
		                          <th  width="7%"></th>
		                          <th  width="7%"></th>	                            
		                       </tr>
		                   </thead>
		                </table>
		            </div>

		            <div id="tablados">
		               
		                <table className="table table-dark table-bordered table-hover">

			                <thead>
			                    <tr>
			                        
			                        <th className='anchocasilla'></th>
			                        <th className='anchocasilla'></th>			   			             
			                        <th width="7%"> </th>
			                        <th width="7%"> </th>
			                          
			                     </tr>
			                 </thead>

			                
			                 <tbody id="bodytable">
			                    {this.renderList()}
			                 </tbody>
		                </table>
		            </div>


                      {this.renderModalRegistro()}

                       {this.renderModalEditar()}

                      {this.renderModalEliminar()}

               </div>
    		)
    }


  renderList(){

      return this.state.usuario.map((data)=>{

        return(
          <tr className="alineartexto" >
            
            <td>{data.name}</td>
            <td>{data.role}</td>
         
            <td><a  className='btn btn-success' onClick={()=>this.showModalEditar(data)}><i className="fas fa-user-edit fa-xs"></i></a></td>
            <td><a  className='btn btn-danger'  onClick={()=>this.showModalDelete(data)}><i className="fas fa-user-slash fa-xs"></i> </a></td>
          </tr>
        )

      })

    }


    //----------------------------------------------------------------MODAL REGISTRAR-------------------------------------------------   

    renderModalRegistro(){

        return(	


	    	<form  id="form">
	    	  

	    	
	            <div ref="putomodal" className="modal fade" id="registraruser" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
	              <div className="modal-dialog" role="document">
	                <div className="modal-content">

	                {/* muestra el header del modal sin mensajes*/}
	                  <div className="modal-header "  id="mensajenulo">
	                    <h5 className="modal-title" id="exampleModalLabel" > </h5>
	                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
	                      <span aria-hidden="true">x</span>
	                    </button>
	                  </div>

	                {/* muestra mensaje de exito al registrar usuario*/}
	                  <div className="modal-header alert alert-success" style={{display:'none'}} id="mensaje">
	                    <h5 className="modal-title" id="exampleModalLabel" >Registrado Correctamente</h5>
	                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
	                      <span aria-hidden="true">×</span>
	                    </button>
	                  </div>

	                  {/* muestra error de validaciones*/}

	                  <div className="modal-header alert alert-danger" style={{display:'none'}} id="validacion">
	                    <h5 className="modal-title"  ><span id="error"> </span></h5>
	                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
	                      <span aria-hidden="true">×</span>
	                    </button>
	                  </div>

	                  <div className="modal-body">


	                        {/*<label>Ingrese Contraseña</label>
                            <div class="input-group password">
                                <input ID="txtPassword" type="Password" Class="form-control col-md-12" />
                                <button id="show_password" class="btn btn-success" type="button" onclick="mostrarPassword()"> 
                                <span class="fa fa-eye-slash icon"></span> </button>
                            </div>*/}

                            {/*<label>Ingrese Contraseña</label>
                            <div class="input-group password">
                                <input type="text" class="form-control col-md-12" placeholder="Your Email"/>
								    <div class="input-group-append">
								       
								       <button id="show_password" class="btn btn-success" type="button" onclick="mostrarPassword()">Ver</button> 
								    </div>
                            </div>*/}

                             

		                    <div className="form-group">
		                     <label >Nombre de Usuario:</label>
		                     <input type="text" className="form-control" name="nombre"  id='nombre' onChange={this.handleChangeNombre} />   
		                    </div>

		                     <div className="form-group">
		                     <label >Tipo de Usuario:</label>
		                     <select className="form-control" id="role" name='tipo' id='tipo'  className="form-control"  onChange={this.handleChangeTipo}  >
                                    <option></option>
                                    <option>Usuario</option>
                                    <option>Administrador</option>
                                    
                             </select>
		                    </div>

		                    <label>Contraseña:</label>
                            <div className="input-group password">
                                <input type="password" id="clave" className="form-control col-md-12" placeholder="Contraseña" onChange={this.handleChangeClave}/>
								    <div className="input-group-append">
								       
								       <button  className="input-group-text" type="button"  onClick={()=>this.verClave()}><i className="far fa-eye fa-lg"></i></button> 
								    </div>
                            </div>
                            <br/>

                            <label>Confirmar Contraseña:</label>
                            <div className="input-group password">
                                <input type="password" id='ConfirmarClave' className="form-control col-md-12" placeholder="Confirmar Contraseña" onChange={this.handleChangeConfirmClave}/>
								    <div className="input-group-append">
								       
								       <button  className="input-group-text" type="button"  onClick={()=>this.verConfirmClave()}><i className="far fa-eye fa-lg"></i></button> 
								    </div>
                            </div>
                            <br/>

		                    {/*<div className="form-group">
		                     <label >Contraseña:</label>
		                     <input type="password" className="form-control" id='clave' onChange={this.handleChangeClave} />
		                    </div>

		                    <div className="form-group">
		                     <label >Confirmar Contraseña:</label>
		                     <input type="password" className="form-control"  id='ConfirmarClave' onChange={this.handleChangeConfirmClave} />
		                    </div>*/}

		                    

		                   

		                  

		                    
	                    
	                  </div>

	                  <div className="modal-footer">
	                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
	                    <button type="button" className="btn btn-success" onClick={()=>this.sendNetworkUsuario()}>Registrar</button>

	                   {/*<button type="submit" className="btn btn-success">Registrar</button>*/}
	                  </div>

	                </div>
	              </div>
	            </div>
	       </form>
       )
    }

//---------------------------------------------------------------------------------------------------------------------------------------------


//------------------------------------------------------MODAL EDITAR------------------------------------------------------------  

    renderModalEditar(){

        return(	


	    	<form id="">
	    	
	            <div ref="putomodal" className="modal fade" id="modaleditaruser" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
	              <div className="modal-dialog" role="document">
	                <div className="modal-content">

	                {/* muestra mensaje de exito al editar usuario*/}
	                  <div className="modal-header alert "  id="editarnulo">
	                    <h5 className="modal-title" id="exampleModalLabel" ></h5>
	                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
	                      <span aria-hidden="true">×</span>
	                    </button>
	                  </div>


	                {/* muestra mensaje de exito al editar usuario*/}
	                  <div className="modal-header alert alert-success" style={{display:'none'}} id="editarexito">
	                    <h5 className="modal-title" id="exampleModalLabel" >Editado Correctamente</h5>
	                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
	                      <span aria-hidden="true">×</span>
	                    </button>
	                  </div>

	                  {/* muestra error de validaciones*/}

	                  <div className="modal-header alert alert-danger" style={{display:'none'}} id="mostrarerror">
	                    <h5 className="modal-title"  ><span id="errores"> </span></h5>
	                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
	                      <span aria-hidden="true">×</span>
	                    </button>
	                  </div>

	                  <div className="modal-body">
		                    <div className="form-group">
			                     <label >Nombre de Usuario : </label>
			                     <input type="text" className="form-control"  id="editnombre"  value={this.state.editNombre} onChange={this.handleChangeEditNombre} />                   
		                     
		                    </div>

		                     <div className="form-group">
			                     <label >Tipo de Usuario:</label>
			                     <select className="form-control" id="edittipo" name='edittipo' className="form-control" value={this.state.editTipo} onChange={this.handleChangeEditTipo}  >
	                                    <option></option>
	                                    <option>Usuario</option>
	                                    <option>Administrador</option>
	                                    
	                             </select>
		                     </div>

		                     <label>Contraseña:</label>
                            <div className="input-group password">
                                <input type="password"  className="form-control col-md-12" id='editclave' value={this.state.editClave} onChange={this.handleChangeEditClave} placeholder="Contraseña" />
								    <div className="input-group-append">
								       
								       <button  className="input-group-text" type="button"  onClick={()=>this.verEditClave()}><i className="far fa-eye fa-lg"></i></button> 
								    </div>
                            </div>
                            <br/>

                            <label>Confirmar Contraseña:</label>
                            <div className="input-group password">
                                <input type="password" className="form-control col-md-12" placeholder="Confirmar Contraseña" id='editConfirmarClave' value={this.state.editConfirmClave} onChange={this.handleChangeEditConfirmClave}/>
								    <div className="input-group-append">
								       
								       <button  className="input-group-text" type="button"  onClick={()=>this.verEditConfirmClave()}><i className="far fa-eye fa-lg"></i></button> 
								    </div>
                            </div>
                            <br/>



		                     {/*<div className="form-group">
			                     <label >Contraseña:</label>
			                     <input type="password" className="form-control" id='editclave' value={this.state.editClave} onChange={this.handleChangeEditClave}/>
		                     </div>

		                     <div className="form-group">
			                     <label >Confirmar Contraseña:</label>
			                     <input type="password" className="form-control"  id='editConfirmarClave' value={this.state.editConfirmClave} onChange={this.handleChangeEditConfirmClave} />
		                     </div>*/}

		                  
    
	                    
	                  </div>

	                  <div className="modal-footer">
	                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
	                   

	                   <button type="button" className="btn btn-success" onClick={()=>this.sendNetworkEditar()}>Editar</button>
	                  </div>

	                </div>
	              </div>
	            </div>
	       </form>
       )
    }

  //----------------------------------------------------------------------------------------------------------------------------







//-----------------------------------------------------------------MODAL DE ELIMINAR--------------------------------------------------------
renderModalEliminar(){

		return(

			<div className="modal fade" id="ModalDeleteuser" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">

                <div className="modal-content">

                  <div className="modal-header alert alert-success" style={{display:'none'}} id="eliminar">
                    <h5 className="modal-title" id="exampleModalLabel">Eliminado Correctamente</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <h5>Desea Eliminar Este Usuario?</h5>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                    <button type="button" className="btn btn-danger" onClick={()=>this.sendNetworkDelete()}>Eliminar</button>
                  </div>
                </div>

              </div>
            </div>
	    
	    )
    }

 //--------------------------------------------------------------------------------------------------------------------------------------------
 







}

if (document.getElementById('usuario')) {
    ReactDOM.render(<Usuario />, document.getElementById('usuario'));
}

