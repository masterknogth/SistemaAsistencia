@extends('layouts.app')

@section('content')
<!--<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Dashboard</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                           
                        </div>
                    @endif

                    
                </div>
            </div>
        </div>
    </div>
</div>-->



<div class="container" >
  <div id="example" class="example"></div>
 
</div>
@include('footer')



<script>
// para que el boton enter no funcione
 document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('input[type=password]').forEach( node => node.addEventListener('keypress', e => {
      if(e.keyCode == 13) {
        e.preventDefault();
      }
    }))
  });


  /*var timeout = setTimeout("location.reload(true);",9000);
 function resetTimeout() {
  clearTimeout(timeout);
  timeout = setTimeout("location.reload(true);",9000);
   }*/




   /*var time = new Date().getTime();
    $(document.body).bind("mousemove keypress", function () {
     time = new Date().getTime(); });
     setInterval(function() {
      if (new Date().getTime() - time >= 100) {
       window.location.reload(true); } }, 100); */


/* DEBO ESPERAR A TENER UNA PISTOLA DE CODIGO A VER SI ASI FUNCIONA
    var t=false;
     var c = document.getElementById('cedula');
    function contar(){
     
    if(t)
        clearTimeout(t);
    s=arguments[0] || 0;
    if(s>10)location.reload();
    s++;
    t=setTimeout("contar("+s+")",500);
    }

    
      window.onload=document.onkeypress=contar;
      //window.onload=document.onmousemove=contar;
     
    */   


       
    
    

</script>



@endsection


