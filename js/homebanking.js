//Variables de datos del usuario
var nombreUsuario = "Avelino Figueira";
var claveSeguridad = 26390042;
var saldo = 6000.00;
var saldoCuenta = saldo.toFixed(2);
var saldoDolar = 100.00;
var saldoCuentaDolar = saldoDolar.toFixed(2);
var limite = 4000.00;
var limiteExtraccion = limite.toFixed(2);
var precioDolar = 20.05;

//Variables necesarias
var verificacion;
var claveVerificacion;
var saldoAnterior;
var saldoAnteriorDolar;

//Variables para guardar cuentas
var cuentas = [1234567,7654321];

//Variables de servicios
var servicioAPagar;
var agua = 350.00;
var telefono = 425.00;
var luz = 210.00;
var internet = 570.00;

// Inicio de sección
iniciarSesion();

//Ejecución de las funciones que actualizan los valores de las variables en el HTML
cargarNombreEnPantalla();
actualizarSaldoEnPantalla();
actualizarSaldoEnDolarEnPantalla();
actualizarLimiteEnPantalla();
actualizarPrecioDeDolarEnPantalla();

//Funciones de operaciones matemáticas

function sumarDinero(monto,estatus,dolar){
	saldoAnterior = saldoCuenta;
	saldo += monto;
	saldoCuenta = saldo.toFixed(2);
			/* Esté switch compara el estado en que la función se encuentra, y va 
			 a ejecutar el código y la alerta necesaria */
		switch (estatus){
			case 5:
			 	alert ("¡Haz depositado: "+monto+"$!\nSaldo anterior: "+saldoAnterior+"$\nSaldo: "+saldoCuenta+"$");
			 break;
			case 4:
			 	saldoDolar -= dolar;
			 	saldoCuentaDolar = saldoDolar;
			 	alert ("¡Haz vendido la cantidad de "+dolar+"US$ con éxito!\nMonto pagado: "+monto+"$\nSaldo en Dolares: "+saldoCuentaDolar);

			 break;	
	 			}
	actualizarSaldoEnPantalla();
	actualizarSaldoEnDolarEnPantalla();
}

function restarDinero(monto,estatus,texto,dolar){
	saldoAnterior = saldoCuenta;
	saldoAnteriorDolar = saldoCuentaDolar;
	saldo -= monto;
	saldoCuenta = saldo.toFixed(2);

		switch(estatus) {
			case 1:
				alert ("¡Haz realizado con exito la extracción de dinero!\nMonto: "+monto+"$\nSaldo anterior: "+saldoAnterior+"$\nSaldo: "+saldoCuenta+"$");
				limiteExtraccion -= monto;	
				break;	
			case 2:
				alert ("¡Haz pagado el servicio de "+texto+"!\nMonto: " +monto+"$\nSaldo anterior: "+saldoAnterior+"$\nSaldo: "+saldoCuenta+"$");
				break;
			case 3: 
				alert ("¡Haz realizado la transferencia a "+texto+" con éxito!\nMonto: " +monto+"$\nSaldo: "+saldoCuenta+"$");
				break;
			case 4:
				saldoDolar += dolar;
				saldoCuentaDolar = saldoDolar.toFixed(2);
				alert ("¡Haz realizado la "+texto+" de "+dolar+"US$ con éxito!\nSaldo: "+saldoDolar+"$\nMonto en pesos:"+monto);
			
		}

	actualizarSaldoEnPantalla();
	actualizarSaldoEnDolarEnPantalla();
	actualizarLimiteEnPantalla();
}

//Funciones que realiza la web

function extraerDinero() {
	var estatus = 1;
	var monto = parseFloat(prompt("¿Cuánto dinero vas a extraer?"));
		if (saldoDisponible(monto)){
			if (ExtraccionOk(monto)){
				restarDinero(monto,estatus);
			}
		}
}		

function depositarDinero() {
	var estatus = 5;
 		if (claveVerificacion) {
 			var monto = parseFloat(prompt("¿Cuánto dinero vas a depositar?"));
	 			if (verificacion(monto)){
	 				sumarDinero(monto,estatus);
	 			}
 		}
 		else {
 			alert ("Su usuario ha sido bloqueado para está acción");
 	}
 
 }

function pagarServicio() {
	var estatus = 2;
	var servicio = parseInt (prompt ("Ingrese el numero que corresponda al servicio que deseas pagar \n1 - Agua\n2 - Luz\n3 - Internet\n4 - Teléfono"));
	var texto = tablaServicios (servicio);
		if (saldoDisponible(servicioAPagar)){	
			if (servicio <= 4){
				restarDinero(servicioAPagar,estatus,texto);
			}
			else {
				alert (texto);
			}
		}
}

function transferirDinero() {
	var estatus = 3;
	var monto = parseInt(prompt("Ingrese el monto a transferir."));
		if(saldoDisponible(monto)){
			var mostrador = mostradorDeCuentas();
			var oracion = mostrador[0];
			var largoCuenta = mostrador[1];
			var opcionCuenta = parseInt(prompt("Los números de tus cuentas amigas son: \n"+oracion));
			var cuentaEscogida = (opcionCuenta - 1);
				if(verificacion(opcionCuenta) && opcionCuenta <= largoCuenta){
					var texto = cuentas[cuentaEscogida];
					restarDinero(monto,estatus,texto)
				}
				else {
					alert("Ha ocurrido un error con el número de cuenta");
				}
		}
}

function edicionCuentas() {
	var opcion = prompt ("Escoge la opción que deseas realizar\n1.Agregar cuenta\n2.Eliminar cuenta");
	cuentasOpcion (opcion);
}

function cambiarLimiteDeExtraccion() {
	var monto = parseFloat(prompt("¡Ingresa tu nuevo limite de extracción"));
	var dato = verificacion(monto);
		if (dato){
			limiteExtraccion = monto;
			alert ("¡Tú limite de extracción fue cambiado a: "+limiteExtraccion+"$!");
			actualizarLimiteEnPantalla();
		}
}

function movimientosEnDolares() {
	var estatus = 4;
	var opcion = parseInt(prompt("¡Ingrese la opción a realizar!\n1. Comprar dolares\n2. Vender dolares"));
		switch (opcion){
			case 1:
				var dolar = parseFloat(prompt("¡Ingrese la cantidad de dolares que desea comprar!\nCantidad minima de compra es de 5000US$"));
				var texto = "compra"
					if (verificacion(dolar)){
						var monto = (dolar*precioDolar);
						if (saldoDisponible(monto)){
							if (dolar <= 5000){
								restarDinero(monto,estatus,texto,dolar);
							} 
							else {
								alert ("Compra mínima por transacción de 5000US$")
							}
						}
					}
			break;
			case 2:
				var dolar = parseFloat(prompt("¡Ingrese la cantidad de dolares que deseas vender!"));
					if (verificacion(dolar)){
						if (dolar <= saldoCuentaDolar){
							var monto = (dolar*precioDolar);
							sumarDinero(monto,estatus,dolar);
						}
						else {
							alert ("¡Fondos insuficientes!");
						}
					} 
			break;
			default: 
				return alert ("¡Haz ingresado una opción no disponible!");
		}

}


//Funciones de verificación para ingreso, y saber que contenido ingreso el usuario

function iniciarSesion() {
	var clave = parseInt (prompt("¡Bienvenido "+nombreUsuario+"!\nIngresa tu clave de seguridad"));
		if(clave === claveSeguridad){
			alert ("Acceso concedido\nAhora podrás comenzar a realizar operaciones");
			claveVerificacion = true;
		} 
		else {
			alert ("Acceso denegado\nTu cuenta ha sido bloqueada por razones de seguridad");
			saldoCuenta = 0;
			nombreUsuario = "Usuario Bloqueado";
			limiteExtraccion = 0;
			claveVerificacion = false;
		}
}

// Funciones para verificación, y buscar datos

function verificacion ( dato ){
	if ( isNaN ( dato ) || ( dato <= 0)){
		alert( "¡Haz ingresado un valor invalido!" );
		return false;
	}
	else {
		return true;
	}
}

function tablaServicios (servicio) {
	switch (servicio) {
		case 1:
			servicioAPagar = agua;
			return "Agua"
		break;

		case 2:
			servicioAPagar = luz;
			return "Luz"
		break;

		case 3:
			servicioAPagar = internet;
			return "Internet"
		break;

		case 4:
			servicioAPagar = telefono;
			return "Teléfono"
		break;

		default:
			return "Haz ingresado una opción no válida.";

	}
}

function saldoDisponible (monto) {
	if (verificacion(monto)){
		if (monto <= saldoCuenta){
			return true;
		} else {
			alert ("¡Fondos insuficientes!");
			return false;
		}
	}	
}

function ExtraccionOk (monto){

	if ( monto%100 === 0 ){
		if (monto <= limiteExtraccion){
			return true;
		} 
		else {
			alert ("La cantidad de dinero que deseas extraer es mayor a tu límite de extracción diario\n(Limite: " +limiteExtraccion+ "$)");
			return false;
		}
	}
	 else {
	 	alert ("Solo puedes extraer billetes de 100$");
		return false;
	}
	
	}

function cuentasOpcion(opcion){
	var mostrador = mostradorDeCuentas();
	if (opcion == 1) {
		var cuentaAgregar = parseInt(prompt("Ingrese el número de cuenta amiga nueva" ));
			if(verificacion(cuentaAgregar)){
				cuentas.push(cuentaAgregar);
				alert("La cuenta amiga: "+cuentaAgregar+" fue agregada con éxito.")
			}
	}
	else if (opcion == 2){
			oracion = mostrador[0];
			largoCuenta = mostrador[1];
			var opcionCuenta = parseInt(prompt("Los números de tus cuentas amigas son: \n"+oracion));
				if(verificacion(opcionCuenta)){
					if((opcionCuenta) <= largoCuenta) {
					var cuentaAEliminar = (opcionCuenta - 1)
					alert("Haz eliminado con exito, la cuenta "+cuentas[cuentaAEliminar]+" de tus cuentas amigas.");
					cuentas.splice(cuentaAEliminar,1);
					} 
					else
					{
						alert ("¡No existe la cuenta que haz escogido!")
					}
				}
	}
	else {
		alert("Haz ingresado una opción no válida.");
	}

}

function mostradorDeCuentas() {
	var oracion = "";
	var cantidadCuentas = 0;
	for (var i = 0; i < cuentas.length; i++) {
			oracion += ("opcion "+(i+1)+" : " +cuentas[i]+"\n");
			cantidadCuentas ++
		}
		return [oracion,cantidadCuentas];
}


//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarSaldoEnDolarEnPantalla() {
    document.getElementById("saldo-cuenta-dolar").innerHTML = "us$" + saldoCuentaDolar;
}

function actualizarPrecioDeDolarEnPantalla() {
    document.getElementById("precio-dolar").innerHTML = "us$" + precioDolar;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Disponible para extraer hoy: $" + limiteExtraccion;
}