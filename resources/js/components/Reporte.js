import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Reporte extends Component {


  constructor(props){
      super(props);
      this.state = {
        reporte:[],
        reporteBackup:[],
        textBuscar:'',

        reportemes:[],
        reporteBackupMes:[],
        textBuscarMes:''
        
      
      }
    }

   UNSAFE_componentWillMount(){
     
     
      axios.get('reporte/list').then(response=>{
        this.setState({
          reporte:response.data,
          reporteBackup:response.data
        })


      }).catch(error=>{
        alert("error"+error)
        
         
      })
   }

    componentDidMount(){
     
         this.listaMensual();
    }


     listaMensual(){
       axios.get('reporte/mes').then(response=>{
          this.setState({
            reportemes:response.data,
            reporteBackupMes:response.data
            
          })


        }).catch(error=>{
          alert("error"+error)
          
           
        })
     }



   /*componentDidMount(){

      axios.get('reporte/mes').then(response=>{
        this.setState({
          reportemes:response.data,
          
        })


      }).catch(error=>{
        alert("error"+error)
        
         
      })
   }*/

   /*componentWillMount(){
        this.sendNetworkDelete()

    }*/



   /* sendNetworkDelete(data){
    //alert("mostrar modal "+JSON.stringify(data))
      
      const formData = new FormData()
      this.setState({ idPersonal:data.cedula }) 
      
      formData.append('cedula',this.state.idPersonal)

      axios.post('reporte/list',formData).then(response=>{

        


           if (response.data.success==true) {
             alert(response.data.message)
             
             /*this.setState({
              reporte:response.data,
              reporteBackup:response.data
            })*/

             // para cargar datos de nuevo
            // this.loadDataProduct()
             // para cerrar el modal
             //$("#exampleModalDelete").modal("hide");
          /* }

       }).catch(error=>{
         alert("Error "+error)
       })

    }*/

   
 

    

    

    /*componentWillMount(){
      this.getTasks();
    }*/


   

    filter(event){
     console.log(event.target.value)
     var text = event.target.value
     const data = this.state.reporteBackup

     const newData = data.filter(function(item){
          const itemDataCedula = item.cedula.toUpperCase()
          const itemDataNombres = item.nombre.toUpperCase()
          const itemDataApellidos = item.apellido.toUpperCase()
          const itemDataTipo = item.tipo.toUpperCase()
          const itemDataFecha = item.fecha.toUpperCase()
          const campo = itemDataCedula+" "+itemDataNombres+" "+itemDataApellidos+" "+itemDataTipo+" "+itemDataFecha
          const textData = text.toUpperCase()
          return campo.indexOf(textData) > -1
      })
     this.setState({
          reporte: newData,
          textBuscar: text,
      })
   }


 filtermes(event){
     console.log(event.target.value)
     var text = event.target.value
     const data = this.state.reporteBackupMes

     const newData = data.filter(function(item){
          const itemDataCedula = item.cedula.toUpperCase()
          const itemDataNombres = item.nombre.toUpperCase()
          const itemDataApellidos = item.apellido.toUpperCase()
          const itemDataTipo = item.tipo.toUpperCase()
          const campo = itemDataCedula+" "+itemDataNombres+" "+itemDataApellidos+" "+itemDataTipo
          const textData = text.toUpperCase()
          return campo.indexOf(textData) > -1
          //return itemDataCedula.indexOf(textData) > -1
      })
     this.setState({
          reportemes: newData,
          textBuscarMes: text,
      })
   }

  
    render() {
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

         return (
          <div className="container">
          
            
           
            <div className="row justify-content-center">                                         
                <div className="col-xs-4">                                          
                  <div className="input-group-append click_on_enterkey">
                     <button type="button" className="btn btn-success" data-toggle='modal' data-target='#modalpersonal' >Reporte Diario</button>
                  </div>
                </div>                                                                                  
            </div>
            <br/>
            
            
           
            <input className="form-control col-md-4" placeholder="Buscar:" value={this.state.text} onChange={(text) => this.filtermes(text)}/>            
            <br/>
            
            <div className="tbl-header">
              
                <table id='tablauno' className="table table-dark table-bordered table-hover">
                    <thead>
                      <tr className="alineartexto">
                          <th className='anchocasilla'>CEDULA</th>
                          <th className='anchocasilla'>NOMBRES</th>
                          <th className='anchocasilla'>APELLIDOS</th>
                          <th className='anchocasilla'>TIPO</th>
                          <th className='anchocasilla'>ASISTENCIAS</th> 
                           
                       </tr>
                   </thead>
                </table>
            </div>

            <div id="tablados">
               
                <table className="table table-dark table-bordered table-hover">

                <thead className="inicio_tabla">
                    <tr>
                        <th className='anchocasill'>CEDULA</th>
                        <th className='anchocasill'>NOMBRES</th>
                        <th className='anchocasill'>APELLIDOS</th>
                        <th className='anchocasill'>TIPO</th>
                        <th className='anchocasill'>ASISTENCIAS</th>   
                        
                     </tr>
                 </thead>

                
                 <tbody id="bodytable">
                    {this.renderListMes()}
                 </tbody>
                </table>
            </div>

              
              
            <div className="modal fade" id="modalpersonal"  tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-lg">
                <div className="modal-content" >
                  <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">Dias Asistidos</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                      </button>
                  </div>
                  <div className="modal-body">
                       <input className="form-control col-md-4" placeholder="Buscar:" value={this.state.text} onChange={(text) => this.filter(text)}/>
                       <br/>

                        <div className="tbl-header">
                         
                            <table id='tablauno' className="table table-dark table-bordered table-hover">
                                <thead>
                                  <tr className="alineartexto">
                                      <th className='anchocasilla'>CEDULA</th>
                                      <th className='anchocasilla'>NOMBRES</th>
                                      <th className='anchocasilla'>APELLIDOS</th>
                                      <th className='anchocasilla'>TIPO</th>
                                      <th width="10%">ENTRADA</th>
                                      <th width="10%">SALIDA</th>
                                      <th width="10%">HORAS</th>                                     
                                      <th className='anchocasilla'>FECHA</th>   
                                   </tr>
                               </thead>
                            </table>
                        </div>


                       <div id='tablados'> 
                         <table className="table table-dark table-bordered table-hover">
                            <thead >
                              <tr>
                                <th className='anchocasilla'></th>
                                <th className='anchocasilla'></th>
                                <th className='anchocasilla'></th>
                                <th className='anchocasilla'></th>
                                <th width="10%"></th>
                                <th width="10%"></th>
                                <th width="10%"></th>
                                <th className='anchocasilla'></th>       
                              </tr>
                            </thead>
                            <tbody id="bodytable">
                                {this.renderList()}
                            </tbody>
                          </table>
                       </div>
                  </div>

                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                  </div>
                </div>
              </div>
            </div>

                  {/*<div class="modal fade" id="exampleModalDelete" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">

                      <div class="modal-content">

                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">Eliminar</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                          </button>
                        </div>
                        <div class="modal-body">
                          <p>Esta seguro desea de eliminar un regsitro?</p>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                          <button type="button" class="btn btn-primary" onClick={()=>this.sendNetworkDelete()}>Eliminar</button>
                        </div>
                      </div>

                    </div>
                  </div>*/}
                   
           

 
             




          </div>


        );
    }





    renderList(){

      return this.state.reporte.map((data)=>{

        return(
          <tr className="alineartexto">
            <td>{data.cedula}</td>
            <td>{data.nombre}</td>
            <td>{data.apellido}</td>
            <td>{data.tipo}</td>
            <td>{data.entrada}</td>
            <td>{data.salida}</td>
            <td>{data.horas}</td>         
            <td>{data.fecha}</td>

          </tr>
        )

      })

    }


/*showModalDelete(data){ 
      // id seleccionado para eliminar
      //alert("mostrar modal "+JSON.stringify(data))
      this.setState({ idPersonal:data.cedula })
      $("#exampleModalDelete").modal("show");
    }*/

    

    

   
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

if (document.getElementById('reporte')) {
    ReactDOM.render(<Reporte/>, document.getElementById('reporte'));
}