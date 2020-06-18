<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!--<meta http-equiv="refresh" content="600" >-->

   

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>
    <script src="{{ asset('js/reloj.js') }}" defer></script>
    <script src="{{ asset('js/all.js') }}" defer></script>
    <script src="{{ asset('js/verclave.js') }}" defer></script>
    <script src="{{ asset('js/menu.js') }}" defer></script>

    <!--<script src="{{ asset('js/header/bootstrap.min.js')}}" defer></script>
    <script src="{{ asset('js/jquery.min.js')}}" defer></script>
    <script src="{{ asset('js/popper.min.js')}}" defer></script>-->

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>



    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('css/reloj.css') }}" rel="stylesheet">
    <link href="{{ asset('css/alertas.css') }}" rel="stylesheet">
    <link href="{{ asset('css/otrosEstilos.css') }}" rel="stylesheet">
    <link href="{{ asset('css/header/estilo.css') }}" rel="stylesheet">
    <link href="{{ asset('css/bootstrap.min.css') }}" rel="stylesheet">
    <!--<link href="{{ asset('css/bootstrap4.3.1.css') }}" rel="stylesheet">-->
    

    

</head>
<body id="app" >

  <div  >  
    <nav class="navbar navbar-expand-md bg-dark navbar-dark">
      <a class="navbar-brand" href="{{ url('/') }}">Asistencia</a>
      <!--<a class="navbar-brand" href="#" onclick="example();">Asistencia</a>-->

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="collapsibleNavbar">
        <ul class="navbar-nav ml-auto">

        @guest    
          <!--<li class="nav-item">
            <a class="nav-link" href="{{ route('login') }}">Login</a>
          </li>-->
         @if (Route::has('register')) 
          <!--<li class="nav-item">
            <a class="nav-link" href="{{ route('register') }}">Registrar</a>
          </li>-->
         @endif 
         
         @else
          <li class="nav-item dropdown">

            <a class="nav-link dropdown-toggle" href="#">{{ Auth::user()->name }}</a>
            <ul class="list-unstyled bg-dark text-light submenu level-1">
                @if(Auth::user()->role == "Administrador")
                  <li><a class="nav-link" href="{{ route('usuarios') }}"><i class="fas fa-users fa-xs icon" ></i>{{ __('Usuarios ') }}</a></li>
               <!--<li><a class="nav-link" href="#"onclick="usuario();" ><i class="fas fa-users fa-xs icon" ></i>{{ __('Usuarios ') }}</a></li>-->                      
                @endif  
                  <li><a class="nav-link" href="{{ route('reporte') }}"><i class="fas fa-book fa-xs icon"></i>{{ __('Reporte') }}</a></li>
                  <li><a class="nav-link" href="{{ route('empleados') }}"><i class="fas fa-user-tie fa-xs icon"></i>{{ __('Empleados') }}</a></li>
                  <li><a class="nav-link" href="{{ route('inactivos') }}"><i class="fas fa-user-slash fa-xs icon"></i>{{ __('Empleados Inactivos') }}</a></li>
                  <li><a class="nav-link" href="{{ route('configuracion') }}"><i class="fas fa-cog fa-xs icon"></i>{{ __('Configuracion') }} </a></li>

                  <!--<li><a class="nav-link" href="#" onclick="reporte();"><i class="fas fa-book fa-xs icon"></i>{{ __('Reporte') }}</a></li>
                  <li><a class="nav-link" href="#" onclick="empleado();"><i class="fas fa-user-tie fa-xs icon"></i>{{ __('Empleados') }}</a></li>
                  <li><a class="nav-link" href="#" onclick="inactivo();"><i class="fas fa-user-slash fa-xs icon"></i>{{ __('Empleados Inactivos') }}</a></li>
                  <li><a class="nav-link" href="#" onclick="configurar();"><i class="fas fa-cog fa-xs icon"></i>{{ __('Configuracion') }} </a></li>-->


                  
                  <li><a class="nav-link" href="{{ route('logout') }}" onclick="event.preventDefault();document.getElementById('logout-form').submit();">
                         <i class="fas fa-sign-out-alt fa-xs"></i>
                         {{ __('Cerrar Sesion') }}
                        </a>

                        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                            @csrf
                        </form>
                  </li>

              


            </ul>
          </li>
        @endguest
        </ul>
      </div>
    </nav>

  </div>  


    <main class="py-4">
            @yield('content')
        </main>
   

</body>
</html
