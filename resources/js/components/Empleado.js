import React,{ Component } from 'react';
import ReactDOM from 'react-dom';

import axios, { post } from 'axios';






//const baseUrl = "http://127.0.0.1:8000/";
//const baseUrl = "http://localhost/asistencia/public/";

export default class Empleado extends Component {

	constructor(props){
      super(props);
      this.state = {
        empleado:[],
        Backup:[],
        textBuscar:'',
        
        formNro:'',
        formCedula:'',
        formNombre:'',
        formApellido:'',
        formTipo:'',
      
        file:null,
        idEmpleado:0,
        edit: false,


//-------------------------------------------------STATES PARA EDITAR USUARIO------------------------------------------------------
        editNro:'',
        editCedula:'',
        editNombre:'',
        editApellido:'',
        editTipo:'',

        fileu:null,

        idEmpleadoEdit:0,

        editE: false,


      }

//---------------------------------------------------------------------------------------------------------------------------------




  //------------------------------------------------------BINDS PARA REGISTRAR-------------------------------------------------    
       
       this.handleChangeNro = this.handleChangeNro.bind(this);
       this.handleChangeCedula = this.handleChangeCedula.bind(this);
       this.handleChangeNombre = this.handleChangeNombre.bind(this);
       this.handleChangeApellido = this.handleChangeApellido.bind(this);
       this.handleChangeTipo = this.handleChangeTipo.bind(this);

       this.onFormSubmit = this.onFormSubmit.bind(this)
       this.onChange = this.onChange.bind(this)
       this.fileUpload = this.fileUpload.bind(this)
//---------------------------------------------------------------------------------------------------------------------------------       

// -------------------------------------------------LOS BIND PARA EDITAR-------------------------------------------------------------
       this.handleChangeEditNro = this.handleChangeEditNro.bind(this);
       this.handleChangeEditCedula = this.handleChangeEditCedula.bind(this);
       this.handleChangeEditNombre = this.handleChangeEditNombre.bind(this);
       this.handleChangeEditApellido = this.handleChangeEditApellido.bind(this);
       this.handleChangeEditTipo = this.handleChangeEditTipo.bind(this);

       this.onFormSubmitEditar = this.onFormSubmitEditar.bind(this)
       this.handleChangeEditFoto = this.handleChangeEditFoto.bind(this)
       this.fileUploadEditar = this.fileUploadEditar.bind(this)
       

     
    }
 //-------------------------------------------------------------------------------------------------------------------------------
 


//------------------------------------------HANDLECHANGE PARA REGISTRAR-----------------------------------------------------------  

    handleChangeNro(event) {
      this.setState({formNro: event.target.value});

    }

    handleChangeCedula(event) {
      this.setState({formCedula: event.target.value});
    }

    handleChangeNombre(event) {
      this.setState({formNombre: event.target.value});
    }

    handleChangeApellido(event) {
      this.setState({formApellido: event.target.value});
    }

    handleChangeTipo(event) {
      this.setState({formTipo: event.target.value});
    }

    onChange(e) {
      this.setState({file:e.target.files[0]})
    }



//-------------------------------------------------HANDLECHANGE PARA EDITAR----------------------------------------------------------

 handleChangeEditNro(event) {
      this.setState({editNro: event.target.value});

    }

    handleChangeEditCedula(event) {
      this.setState({editCedula: event.target.value});
    }

    handleChangeEditNombre(event) {
      this.setState({editNombre: event.target.value});
    }

    handleChangeEditApellido(event) {
      this.setState({editApellido: event.target.value});
    }

    handleChangeEditTipo(event) {
      this.setState({editTipo: event.target.value});
    }

    handleChangeEditFoto(e) {
      this.setState({fileu:e.target.files[0]})
    }
//--------------------------------------------------------------------------------------------------------

//-------------------------------------------SECCION DE REGISTRAR NUEVO EMPLEADO---------------------------

    onFormSubmit(e){ // incluye el metodo fileUpload y envia los datos al controlador
	    e.preventDefault() // Stop form submit

	    this.fileUpload(this.state.file).then((response)=>{
	      console.log(response.data);

	    

		      if (response.data.success==true) {
	             //alert(response.data.message)

	             
	               
	               //hace que los campos del formulario esten vacios despues de registrar un empleado

		           $('#nro').val(''),
		           $('#cedula').val(''),
		           $('#nombre').val(''),
		           $('#apellido').val(''),
		           $('#tipo').val(''),

		           this.setState({ 

			      	 
			      	 formNro:'',
			         formCedula:'',
			         formNombre:'',
			         formApellido:'',
			         formTipo:'',
			        

			        })


	               $('#foto').val(''),//hace que el campo de subir foto del formulario este vacios despues de registrar un empleado

	             // cargar datos de nuevo
	              this.listaEmpleado()
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
	  
	           }

	         if (response.data.success=="no") {
                 $('#mensajenulo').hide();// oculta el header del modal al mostrar error
                 $('#validacion').show();  //el es el container que muestra los errores al registrar
	             $('#error').text(response.data.message);//mensajes de error
	             $("#mensaje").hide(); // oculta mensaje de exito al registrar

	         	$(document).ready(function() {//oculta el mensaje de exito al regitrar y el modal
		              setTimeout(function() {
		                
		                 $('#mensajenulo').show();// muestra el header del modal que no tiene mensajes
		                $('#validacion').hide();  //el es el container que muestra los errores al registrar
	                    $('#error').text(response.data.message);//mensajes de error



		              
		                  
		              },3000);
		              
		              
		            });
                 
                
               


	         } 

         


	    })

    }

 

	  fileUpload(file){// se encargara de registrar usuario
	    const url = 'empleado/registro';
	    const formData = new FormData();
	    formData.append('file',file)
	    formData.append('nro',this.state.formNro)
	    formData.append('cedula',this.state.formCedula)
	    formData.append('nombre',this.state.formNombre)
	    formData.append('apellido',this.state.formApellido)
	    formData.append('tipo',this.state.formTipo)

	    const config = {
	        headers: {
	            'content-type': 'multipart/form-data'
	        }
	    } 

	    return  post(url, formData,config)
	  }


//------------------------------------------------------------------------------------------------------------------------------------



//------------------------------------------------SECCION PARA EDITAR EMPLEADO---------------------------------------------------

	   onFormSubmitEditar(e){ // incluye el metodo fileUpload y envia los datos al controlador
	    e.preventDefault() // Stop form submit

	    this.fileUploadEditar(this.state.fileu).then((response)=>{
	      console.log(response.data);

	    

		      if (response.data.success==true) {
	             //alert(response.data.message)

	             this.listaEmpleado()
	               
	               $('#nr').val(''),
		           $('#ced').val(''),
		           $('#nom').val(''),
		           $('#ape').val(''),
		           $('#tip').val(''),

		            this.setState({ 

			      	 
			      	 editNro:'',
			         editCedula:'',
			         editNombre:'',
			         editApellido:'',
			         editTipo:'',
			        

			        })

			        $('#fot').val(''),

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

			         

	  
	           }

	         if (response.data.success=="no") {

	         	$('#mostrarerror').show();  // es el container que muestra el error
	            $('#errores').text(response.data.message);// muestra el mensaje de error
	            $('#editarnulo').hide();//esconde el container donde aparece el mensaje pero que esta en blanco
	            $("#editarexito").hide();//oculta mensaje de exito al editar

	         	$(document).ready(function() {//oculta el mensaje de exito al editar y el modal
		              setTimeout(function() {
		                  
		              $('#mostrarerror').hide();  // es el container que muestra el error 
		              $('#editarnulo').show();//esconde el container donde aparece el mensaje pero que esta en blanco  
		             
	                  //$('#errores').text(response.data.message);// muestra el mensaje de error
	                  
		                  
		              },3000);
		              
		              
		            });
                 
                
               


	         } 

         


	    })

    }


	  fileUploadEditar(file){// se encargara de editar usuario
	    const url = 'empleado/editar';
	    const formData = new FormData();
	    formData.append('file',file)
	    formData.append('id',this.state.idEmpleadoEdit)
	    formData.append('nro',this.state.editNro)
	    formData.append('cedula',this.state.editCedula)
	    formData.append('nombre',this.state.editNombre)
	    formData.append('apellido',this.state.editApellido)
	    formData.append('tipo',this.state.editTipo)

	    const config = {
	        headers: {
	            'content-type': 'multipart/form-data'
	        }
	    } 

	    return  post(url, formData,config)
	  }
 

    

    showModalEditar(data){

    	this.setState({ 

      	idEmpleadoEdit: data.id,
      	editNro: data.nro,
        editCedula: data.cedula,
        editNombre: data.nombre,
        editApellido: data.apellido,
        editTipo: data.tipo,
        editE:true

       })
      
        $("#modaleditar").modal("show");
    }

//-----------------------------------------------------------------------------------------------------------------------------------------


//--------------------------------------------------------SECCION PARA BORRAR EMPLEADO------------------------------------------------

    showModalDelete(data){ //muestra el mensaje de confirmacion de eliminacion y agrega en el estado los datos del empleado seleccionado
      

      //alert("mostrar modal "+JSON.stringify(data))
      this.setState({ 

      	idEmpleado:data.id,
      	formNro:data.nro,
        formCedula:data.cedula,
        formNombre:data.nombre,
        formApellido:data.apellido,
        formTipo:data.tipo,
        edit:true

       })
      $("#ModalDelete").modal("show");
    }



	sendNetworkDelete(){// envia los datos de usuario a eliminar al controlador

	      const formData = new FormData()
	      formData.append('id',this.state.idEmpleado)
	      formData.append('nro',this.state.formNro)
	      formData.append('cedula',this.state.formCedula)
	      formData.append('nombre',this.state.formNombre)
	      formData.append('apellido',this.state.formApellido)
	      formData.append('tipo',this.state.formTipo)

	      axios.post('empleado/eliminar',formData).then(response=>{

	           if (response.data.success==true) {
	             //alert(response.data.message)
	             // para cargar datos de nuevo
	             this.setState({ 

		      	 idEmpleado:'',
		      	 formNro:'',
		         formCedula:'',
		         formNombre:'',
		         formApellido:'',
		         formTipo:'',
		         edit:true

		        })
	             this.listaEmpleado()

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




//---------------------------------------------------------------------------------------------------------------------------





    componentDidMount(){
     
         this.listaEmpleado();
    }


     listaEmpleado(){
       axios.get('empleados/list').then(response=>{
          this.setState({
            empleado:response.data,
            Backup:response.data,
            
          })


        }).catch(error=>{
          alert("error"+error)
          
           
        })
     }


     filter(event){
	     console.log(event.target.value)
	     var text = event.target.value
	     const data = this.state.Backup

	     const newData = data.filter(function(item){
	     	  const itemDataNro = item.nro
	          const itemDataCedula = item.cedula
	          const itemDataNombres = item.nombre.toUpperCase()
	          const itemDataApellidos = item.apellido.toUpperCase()
	          const itemDataTipo = item.tipo.toUpperCase()
	       
	          const campo = itemDataCedula+" "+itemDataNombres+" "+itemDataApellidos+" "+itemDataTipo+" "+itemDataNro
	          const textData = text.toUpperCase()
	          return campo.indexOf(textData) > -1
	      })
	     this.setState({
	          empleado: newData,
	          textBuscar: text,
	      })
   }


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
			                     <button type="button"  className="btn btn-success" data-toggle="modal" data-target="#registrar">Registrar Empleado</button>
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
		                         <th  width="7%">NRO</th>
		                          <th className='anchocasilla'>CEDULA</th>
		                          <th className='anchocasilla'>NOMBRES</th>
		                          <th className='anchocasilla'>APELLIDOS</th>
		                          <th className='anchocasilla'>TIPO</th>
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
			                        <th width="7%"></th>
			                        <th className='anchocasilla'></th>
			                        <th className='anchocasilla'></th>
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

	     );
	}



	


	renderList(){

      return this.state.empleado.map((data)=>{

        return(
          <tr className="alineartexto" >
            <td>{data.nro}</td>
            <td>{data.cedula}</td>
            <td>{data.nombre}</td>
            <td>{data.apellido}</td>
            <td>{data.tipo}</td>
            <td><a  className='btn btn-success' onClick={()=>this.showModalEditar(data)}><i className="fas fa-user-edit fa-xs"></i></a></td>
            <td><a  className='btn btn-danger'  onClick={()=>this.showModalDelete(data)}><i className="fas fa-user-slash fa-xs"></i> </a></td>
          </tr>
        )

      })

    }


    

 //----------------------------------------------------------------MODAL REGISTRAR-------------------------------------------------   

    renderModalRegistro(){

        return(	


	    	<form onSubmit={this.onFormSubmit} id="form">
	    	
	    	
	            <div ref="putomodal" className="modal fade" id="registrar" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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

	                   
		                    <div className="form-group">
		                     <label >Nro Empleado : <span className="validacion" id="error"></span></label>
		                     <input type="text" className="form-control" name="nro"  id='nro' onChange={this.handleChangeNro} />
		                      
		                     
		                    </div>


		                    <div className="form-group">
		                     <label >Cedula:</label>
		                     <input type="text" className="form-control" id='cedula' onChange={this.handleChangeCedula} />
		                    </div>

		                    <div className="form-group">
		                     <label >Nombres:</label>
		                     <input type="text" className="form-control"  id='nombre' onChange={this.handleChangeNombre} />
		                    </div>

		                    <div className="form-group">
		                     <label >Apellidos:</label>
		                     <input type="text" className="form-control"  id='apellido' onChange={this.handleChangeApellido} />
		                    </div>

		                    <div className="form-group">
		                     <label >Tipo:</label>
		                     <select className="form-control" id="role" name='tipo' id='tipo'  className="form-control"  onChange={this.handleChangeTipo}  >
                                    <option></option>
                                    <option>ADMINISTRATIVO</option>
                                    <option>OBRERO</option>
                                    <option>SEGURIDAD</option>
                                    <option>MEDICO</option>
                                    
                             </select>
		                    </div>

		                  

		                    <div className="form-group">
		                     <label >Insertar Foto:</label>
		                       {/*<input type="file" className="form-control"   value={this.state.formFoto} onChange={this.handleChangeFoto} />*/}
		                       <input type="file" id="foto" className="form-control"   onChange={this.onChange} />
		                    </div>
	                    
	                  </div>

	                  <div className="modal-footer">
	                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
	                   {/* <button type="button" className="btn btn-primary" onClick={()=>this.sendNetworkEmpleado()}>Guardar</button>*/}

	                   <button type="submit" className="btn btn-success">Registrar</button>
	                  </div>

	                </div>
	              </div>
	            </div>
	       </form>
       )
    }



  //------------------------------------------------------MODAL EDITAR------------------------------------------------------------  

    renderModalEditar(){

        return(	


	    	<form onSubmit={this.onFormSubmitEditar} id="">
	    	
	            <div ref="putomodal" className="modal fade" id="modaleditar" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
		                     <label >Nro Empleado : </label>
		                     <input type="text" className="form-control"  id="nr"  value={this.state.editNro} onChange={this.handleChangeEditNro} />
		                      
		                     
		                    </div>

		                    <div className="form-group">
		                     <label >Cedula:</label>
		                     <input type="text" className="form-control" id="ced" value={this.state.editCedula} onChange={this.handleChangeEditCedula} />
		                    </div>

		                    <div className="form-group">
		                     <label >Nombres:</label>
		                     <input type="text" className="form-control"  id="nom" value={this.state.editNombre} onChange={this.handleChangeEditNombre} />
		                    </div>

		                    <div className="form-group">
		                     <label >Apellidos:</label>
		                     <input type="text" className="form-control"  id="ape" value={this.state.editApellido} onChange={this.handleChangeEditApellido} />
		                    </div>

		                    <div className="form-group">
		                     <label >Tipo:</label>
		                     <select className="form-control" id="tip" value={this.state.editTipo} className="form-control"  onChange={this.handleChangeEditTipo}  >
                                    <option></option>
                                    <option>ADMINISTRATIVO</option>
                                    <option>OBRERO</option>
                                    <option>SEGURIDAD</option>
                                    <option>MEDICO</option>
                                    
                             </select>
		                    </div>

		                  

		                    <div className="form-group">
		                     <label >Insertar Foto:</label>
		                       {/*<input type="file" className="form-control"   value={this.state.formFoto} onChange={this.handleChangeFoto} />*/}
		                       <input type="file" id="fot" className="form-control"   onChange={this.handleChangeEditFoto} />
		                    </div>
	                    
	                  </div>

	                  <div className="modal-footer">
	                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
	                   

	                   <button type="submit" className="btn btn-success">Editar</button>
	                  </div>

	                </div>
	              </div>
	            </div>
	       </form>
       )
    }

  //----------------------------------------------------------------------------------------------------------------------------
  


  //------------------------------------------------------MODAL ELIMINAR----------------------------------------------------------  


    renderModalEliminar(){

		return(

			<div className="modal fade" id="ModalDelete" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">

                <div className="modal-content">

                  <div className="modal-header alert alert-success" style={{display:'none'}} id="eliminar">
                    <h5 className="modal-title" id="exampleModalLabel">Eliminado Correctamente</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <h5>Desea Eliminar Este Empleado?</h5>
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

//-----------------------------------------------------------------------------------------------------------------------------    



}








if (document.getElementById('empleado')) {
    ReactDOM.render(<Empleado />, document.getElementById('empleado'));
}

   