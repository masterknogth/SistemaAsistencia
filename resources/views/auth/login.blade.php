@extends('layouts.app')

@section('content')
<?php 



?>
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">

             <div class="card">
            <!--<div class="cuerpo">-->
                <div class="card-header">{{ __('Login') }}</div>

                <div class="card-body">
                    <form method="POST" action="{{ route('login') }}">
                        @csrf

                        <!--
                        <div class="form-group row">
                            <label for="email" class="col-md-4 col-form-label text-md-right">{{ __('E-Mail Address') }}</label>

                            <div class="col-md-6">
                                <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>

                                @error('email')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>-->

                        <!--<div class="form-group row">
                            <label for="name" class="col-md-4 col-form-label text-md-right"><i class="fas fa-user fa-lg"></i></label>

                            <div class="col-md-6">
                                <input id="name" type="text" placeholder="Nombre de Usuario" class="form-control @error('name') is-invalid @enderror" name="name" value="{{ old('name') }}" required autocomplete="name" autofocus>

                                @error('name')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="password" class="col-md-4 col-form-label text-md-right"><i class="fas fa-lock fa-lg"></i></label>

                            <div class="col-md-6">
                                <input id="password" placeholder="Contraseña" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="current-password">

                                @error('name')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>-->

                       <div class="form-group row">
                            <label for="name" class="col-md-4 col-form-label text-md-right"><i class="fas fa-user fa-lg"></i></label>

                            <div class="col-md-6">
                                <input id="name" type="text" placeholder="Nombre de Usuario" class="form-control @error('name') is-invalid @enderror" name="name" value="{{ old('name') }}" required autocomplete="name" autofocus>

                                @error('name')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                       <div class="input-group mb-3">
                            <label  class="col-md-4 col-form-label text-md-right"><i class="fas fa-lock fa-lg" style="margin-right:0.3em"></i> </label>
                            <input style="margin-left:8px" type="password" id="password" name="password" class="form-control col-md-5  @error('password') is-invalid @enderror" placeholder="Contraseña"/>
                            
                            <div class="input-group-append">
                               <button type="button" class="input-group-text" onclick="verclave()"><i class="far fa-eye fa-lg"></i></button>
                            </div>

                            @error('password')
                                    <span style="margin-left:300px" class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror

                            

                         </div>


                        <!--<div class="form-group row">
                            <div class="col-md-6 offset-md-4">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>

                                    <label class="form-check-label" for="remember">
                                        {{ __('Remember Me') }}
                                    </label>
                                </div>
                            </div>
                        </div>-->

                        <div class="form-group row mb-0">
                            <div class="col-md-8 offset-md-4">
                                <button type="submit" class="btn btn-primary">
                                    {{ __('Login') }}
                                    <i class="fas fa-lock-open fa-lg"></i>
                                </button>
                                <!--

                                @if (Route::has('password.request'))
                                    <a class="btn btn-link" href="{{ route('password.request') }}">
                                        {{ __('Forgot Your Password?') }}
                                    </a>
                                @endif

                                -->
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

@include('footer') 
@endsection
