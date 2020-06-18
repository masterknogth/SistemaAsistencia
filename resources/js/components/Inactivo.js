import React,{ Component } from 'react';
import ReactDOM from 'react-dom';


export default class Inactivo extends Component {


	constructor(props){
		super(props);

		this.state ={

			empleado:[],
	        Backup:[],
	        textBuscar:'',
	        
	        formNro:'',
	        formCedula:'',
	        formNombre:'',
	        formApellido:'',
	        formTipo:'',

	        edit: false,
	        idEmpleado:0,


		}
	}


	showModalActivar(data){ //muestra el mensaje de confirmacion de activacioon y agrega en el estado los datos del empleado seleccionado
      

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
      $("#ModalActivar").modal("show");
    }

    sendNetworkActivate(){// envia los datos de usuario a activar al controlador

	      const formData = new FormData()
	      formData.append('id',this.state.idEmpleado)
	      formData.append('nro',this.state.formNro)
	      formData.append('cedula',this.state.formCedula)
	      formData.append('nombre',this.state.formNombre)
	      formData.append('apellido',this.state.formApellido)
	      formData.append('tipo',this.state.formTipo)

	      axios.post('empleado/activar',formData).then(response=>{

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

	             $("#activar").show();

	              $(document).ready(function() {//oculta el mensaje de exito al editar y el modal
		              setTimeout(function() {
		                  
		                $("#activar").hide();
		                $("#ModalActivar").modal("hide");
		                  
		              },3000);
		              
		              
		            });
	             
	               //$("#ModalDelete").modal("hide");
	             }

	       }).catch(error=>{
	         alert("Error 456"+error)
	       })

	 }
   




	componentDidMount(){
     
         this.listaEmpleado();
    }


     listaEmpleado(){
       axios.get('empleados/list_inactivos').then(response=>{
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
              
	
	               <br/>
	    
                   
	               <input className="form-control  col-md-4 " placeholder="Buscar:" value={this.state.text} onChange={(text) => this.filter(text)} />

	               <br/>

	               

	                <div className="tbl-header">
		             
		                <table id='tablauno' className="table table-dark table-bordered table-hover table-md">
		                    <thead>
		                      <tr className="alineartexto">
		                         <th  width="7%">NRO</th>
		                          <th className='anchocasilla'>CEDULA</th>
		                          <th className='anchocasilla'>NOMBRES</th>
		                          <th className='anchocasilla'>APELLIDOS</th>
		                          <th className='anchocasilla'>TIPO</th>
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
			                        
			                          
			                     </tr>
			                 </thead>

			                
			                 <tbody id="bodytable">
			                    {this.renderList()}
			                 </tbody>
		                </table>
		            </div>


                             {this.renderModalActivar()}
               </div>

    		)
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
            
            <td><a  className='btn btn-success' onClick={()=>this.showModalActivar(data)}><i className="fas fa-user-check fa-xs"></i> </a></td>
          </tr>
        )

      })

    }

    renderModalActivar(){

		return(

			<div className="modal fade" id="ModalActivar" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">

                <div className="modal-content">

                  <div className="modal-header alert alert-success" style={{display:'none'}} id="activar">
                    <h5 className="modal-title" id="exampleModalLabel">Empleado Activado Correctamente</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <h5>Desea Habilitar Este Empleado?</h5>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar </button>
                    <button type="button" className="btn btn-success" onClick={()=>this.sendNetworkActivate()}>Activar</button>
                  </div>
                </div>

              </div>
            </div>
	    
	    )
    }

}


if (document.getElementById('inactivo')) {
    ReactDOM.render(<Inactivo />, document.getElementById('inactivo'));
}
