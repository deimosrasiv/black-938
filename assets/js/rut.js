// Capturando el DIV alerta y mensaje
var alerta = document.getElementById("alerta");
console.log(alerta);
var mensaje = document.getElementById("mensaje");

// Permitir sólo números en el imput
function isNumber(evt) {

  var charCode = evt.which ? evt.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode === 75) return false;

  return true;
}




function checkRut() {
//cuentaN()
var alerta = document.getElementById("alerta");
var mensaje = document.getElementById("mensaje");
var mensaje = document.getElementById("mensaje");


	var rut = document.forms["miFormulario"].elements[0];

  if (rut.value.length <= 1) {
    
    alerta.classList.remove('alert-success', 'alert-danger');
    alerta.classList.add('alert-danger');
    mensaje.innerHTML = 'Ingrese su RUT en el siguiente campo';
    document.getElementById("rut").focus();
   
  }

  // Obtiene el valor ingresado quitando puntos y guión.
  var valor = clean(rut.value);

  // Divide el valor ingresado en dígito verificador y resto del RUT.
  cuerpo = valor.slice(0, -1);
  dv = valor.slice(-1).toUpperCase();

  // Separa con un Guión el cuerpo del dígito verificador.
  rut.value = format(rut.value);

  // Si no cumple con el mínimo ej. (n.nnn.nnn)
  if (cuerpo.length < 7) {

    rut.setCustomValidity("RUT Incompleto");
    alerta.classList.remove('alert-success', 'alert-danger');
    alerta.classList.add('alert-info');
    mensaje.innerHTML = 'Ingrese su RUT';
    mensaje.classList.remove('parpadea');
    alerta.classList.remove('bg-warning');
    alerta.classList.add('alert-info');
    document.getElementById("rut").focus();
    
    return false;
  }

  // Calcular Dígito Verificador "Método del Módulo 11"
  suma = 0;
  multiplo = 2;

  // Para cada dígito del Cuerpo
  for (i = 1; i <= cuerpo.length; i++) {
    // Obtener su Producto con el Múltiplo Correspondiente
    index = multiplo * valor.charAt(cuerpo.length - i);

    // Sumar al Contador General
    suma = suma + index;

    // Consolidar Múltiplo dentro del rango [2,7]
    if (multiplo < 7) {
      multiplo = multiplo + 1;
    } else {
      multiplo = 2;
    }
  }

  // Calcular Dígito Verificador en base al Módulo 11
  dvEsperado = 11 - (suma % 11);

  // Casos Especiales (0 y K)
  dv = dv == "K" ? 10 : dv;
  dv = dv == 0 ? 11 : dv;

  // Validar que el Cuerpo coincide con su Dígito Verificador

  if (dvEsperado != dv) {


    rut.setCustomValidity("RUT Inválido");
    
    //alerta.classList.remove('alert-info', 'alert-success');
    //alerta.classList.add('bg-warning');
    mensaje.innerHTML = 'El RUT es <strong>INCORRECTO   </strong><i id="dedo" class="fas fa-solid fa-hand-point-up fa-1x" ></i>';
    
    //mensaje.classList.remove('text-light');
    //mensaje.classList.add('text-dark');
    //mensaje.classList.add('parpadea');
    document.getElementById("vbok").style.display = "none";
    document.getElementById("vbnook").style.display = "inline";
    document.getElementById("dedo").style.display='inline';
    document.getElementById("rut").focus();


    return false;
  } else {
    rut.setCustomValidity("RUT Válido");

    alerta.classList.remove('d-none', 'alert-danger');
   // alerta.classList.add('alert-success');
    alerta.classList.remove('bg-warning');
    alerta.classList.add('alert-info');

    mensaje.innerHTML = 'El RUT es <strong>CORRECTO</strong>';
    document.getElementById("vbnook").style.display = "none";
    document.getElementById("vbok").style.display = "inline";
   // mensaje.classList.remove('text-danger');
    //mensaje.classList.remove('text-dark');
   // mensaje.classList.remove('parpadea');
    document.getElementById("rut").focus();


    return true;
  }
}






function format (rut) {
  rut = clean(rut)

  var result = rut.slice(-4, -1) + '-' + rut.substr(rut.length - 1)
  for (var i = 4; i < rut.length; i += 3) {
    result = rut.slice(-3 - i, -i) + '.' + result
  }

  return result
}

function clean (rut) {
  return typeof rut === 'string'
    ? rut.replace(/^0+|[^0-9kK]+/g, '').toUpperCase()
    : ''
}

function dgv(T)    //digito verificador
{  
      var M=0,S=1;
	  for(;T;T=Math.floor(T/10))
      S=(S+T%10*(9-M++%6))%11;
	  //return S?S-1:'k';
      
      alert(S?S-1:'k');
 }
 
 function validarRutDv(rut, dv)
 {
	 rut = clean(rut);
	  suma = 0;
	  multiplo = 2;
	  valor = rut;

  // Para cada dígito del rut
  for (i = 1; i <= rut.length; i++) {
    // Obtener su Producto con el Múltiplo Correspondiente
    index = multiplo * valor.charAt(rut.length - i);

    // Sumar al Contador General
    suma = suma + index;

    // Consolidar Múltiplo dentro del rango [2,7]
    if (multiplo < 7) {
      multiplo = multiplo + 1;
    } else {
      multiplo = 2;
    }
  }

  // Calcular Dígito Verificador en base al Módulo 11
  dvEsperado = 11 - (suma % 11);

  // Casos Especiales (0 y K)
  dv = dv == "K" ? 10 : dv;
  dv = dv == 0 ? 11 : dv;
  if (dvEsperado != dv) 
  {
		return false;
  }
  else
  {
		return true;
  }
	 
 }
 
 
 