function reporte(){
	$(".reporte").show();
	$(".example").hide();
	$(".empleado").hide();
	$(".inactivo").hide();
	$(".usuario").hide();
	$(".configurar").hide();
}

function empleado(){
	$(".empleado").show();
	$(".reporte").hide();
	$(".example").hide();	
	$(".inactivo").hide();
	$(".usuario").hide();
	$(".configurar").hide();
}

function inactivo(){
	$(".inactivo").show();
	$(".empleado").hide();
	$(".reporte").hide();
	$(".example").hide();	
	$(".usuario").hide();
	$(".configurar").hide();
}

function configurar(){
	$(".configurar").show();
	$(".inactivo").hide();
	$(".empleado").hide();
	$(".reporte").hide();
	$(".example").hide();	
	$(".usuario").hide();
	
}

function usuario(){
	$(".usuario").show();
	$(".configurar").hide();
	$(".inactivo").hide();
	$(".empleado").hide();
	$(".reporte").hide();
	$(".example").hide();	
	
	
}

function example(){
	$(".example").show();
	$(".usuario").hide();
	$(".configurar").hide();
	$(".inactivo").hide();
	$(".empleado").hide();
	$(".reporte").hide();
		
	
	
}



