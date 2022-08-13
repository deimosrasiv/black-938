




window.addEventListener("scroll", function() {
    var header = document.querySelector("header")
    header.classList.toggle("sticky", window.scrollY > 0);
})


function enviar() {
    var modal = "modalmensajes";
    var nombre = document.getElementById("nombre").value
    var email = document.getElementById("email").value
    var textMessage = document.getElementById("textMessage").value
    var contador = 0;


    if (nombre != "") {
        var contador = contador + 1;

    } 

    if (email != "") {
        var contador = contador + 1;

    } 

    if (contador > 1) {
        let date = new Date()
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        let hora = date.getHours()
        let minutos = date.getMinutes()
        let segundos = date.getSeconds()

        if (hora < 10) {
            hora1 = (`0${hora}`)

        } else {
            hora1 = (`${hora}`)
        }

        if (minutos < 10) {
            minutos1 = (`0${minutos}`)
        } else {
            minutos1 = (`${minutos}`)
        }

        if (segundos < 10) {
            segundos1 = (`0${segundos}`)
        } else {
            segundos1 = (`${segundos}`)
        }


        if (month < 10) {
            var month1 = (`0${month}`)
        } else {
            var month1 = (`${month}`)
        }


        if (day < 10) {
            var day1 = (`0${day}`)
        } else {
            var day1 = (`${day}`)
        }



        var hora_solicitud = (hora1 + ":" + minutos1 + ":" + segundos1)
        var fecha_solicitud = (day1 + "-" + month1 + `-${year}`)

        var my_mensaje = `Se solicita ingreso a Black 938. : %0A %0A <b>Usuario:</b> <i>${nombre}</i>  %0A <b>Email:</b> <i>${email}</i> %0A <b>Mensaje:</b> <i>${textMessage}</i> %0A <b>Hora de solicitud:</b> <i>${hora_solicitud}</i>  %0A <b>Fecha de solicitud:</b> <i>${fecha_solicitud}</i>`
        var my_mensaje2 = `Esto es solo una Prueba, no es real!!. Alerta de temperatura alta:`

        var token = "1995224836:AAFTI0sdAnVAs5fOjEKjPYu6aU3fe7iMsp0";
        var chat_id_canal = -1001530134776 /* envia al canal */
        var chat_id_master = 1942133499 /* envia solo al master */

        var url_solicita_black938 = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id_master}&text=${my_mensaje}&parse_mode=html`
        //console.log(url_solicita_black938);

        let api_black938 = new XMLHttpRequest();
        api_black938.open("GET", url_solicita_black938, true);
        api_black938.send();

        console.log("Mensaje enviado a Telegram");

        var nombre = document.getElementById("nombre").value
        var email = document.getElementById("email").value
        var textMessage = document.getElementById("textMessage").value
        var cuerpo = "Se han enviado con exito el mensaje";
        var cuerpo2 = "<stron>Black 938.</stron> le enviara un correo con las indicaciones para su ingreso."

        $('#' + modal).modal('show');

            modalcontenido.innerHTML = `
            <div class="modal-header">
                <h5 class="modal-title">Mensaje Enviado</h5>
                <!--<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>-->
              </div>
              <div class="modal-body">
                <p>Su solicitud ha sido enviado.</p>
                <p>Le enviaremos un correo dentro de las 24hrs. siguientes, con las intrucciones necesarias para ingresar al sistema</p>
                <small></small>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                
              </div>
            `
        document.getElementById("nombre").value=""
        document.getElementById("email").value=""
        document.getElementById("textMessage").value=""


    } else {

        modalcontenido.innerHTML = `
            <div class="modal-header">
                <h5 class="modal-title">Falta Información</h5>
                <!--<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>-->
              </div>
              <div class="modal-body">
                <p>Para poder gestionar su solicitud, debe ingresar los datos solicitados.</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
            `
        $('#' + modal).modal('show');

    }
}


function countChars(obj) {
    var strLength = obj.value.length;
    var maxLength = obj.dataset.max;
    var charRemain = (maxLength - strLength);

    if (charRemain < 0) {
        document.getElementById("txaCount").innerHTML = 'Has excedido el límite de ' + maxLength + ' caracteres';
    } else {
        document.getElementById("txaCount").innerHTML = 'Caracteres Restantes: ' + charRemain;
    }
}


function ingresa() {
    var modal = "modalmensajes";
    modalcontenido.innerHTML = `
            <div class="modal-header">
                <h5 class="modal-title text-center" >Autentificación del Usuario</h5>
            </div>
            
            <div class="modal-body">
                <form id="login-form">
                    <div class="form-group">
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label ">Email</label>
                            <input type="email" class="form-control shadow-lg " id="signup-email" placeholder="ejemplo@email.cl" required>
                        </div>
                        
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Password</label>
                            <input type="password" class="form-control shadow-lg" id="signup-password" placeholder="" required>
                        </div>
                    </div>

                    <div class="card-footer text-muted " role="alert">
                        <p class="text-danger text-center" id="error_ingreso"></p>
                    </div>
                </form>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary btn-block" onclick="logear()">Login</button>
                </div>
            </div>
            `

    $('#' + modal).modal('show');

}


function logear(){


    var email = document.getElementById('signup-email').value;
    var contrasena = document.getElementById('signup-password').value;
    var error = document.getElementById('error_ingreso');


    console.log(email);
    console.log(contrasena);

  firebase.auth().signInWithEmailAndPassword(email, contrasena)
  .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;


      //console.log(errorCode);
      //console.log(errorMessage);

      if (errorMessage == "The email address is badly formatted."){
        
           document.getElementById('error_ingreso').innerHTML="";        

      }

      if (errorMessage == "The password is invalid or the user does not have a password."){
         
            document.getElementById('error_ingreso').innerHTML="La contraseña no es válida o el usuario no tiene contraseña.";
      }

      if (errorMessage == "There is no user record corresponding to this identifier. The user may have been deleted."){
        
            document.getElementById('error_ingreso').innerHTML="No existe registro de usuario correspondiente a este identificador. Es posible que el usuario haya sido eliminado.";
      }

      if (errorMessage == "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later."){

        document.getElementById('error_ingreso').innerHTML="El acceso a esta cuenta se ha inhabilitado temporalmente debido a muchos intentos fallidos de inicio de sesión. Puede restaurarlo inmediatamente restableciendo su contraseña o puede volver a intentarlo más tarde.";

      }

     
});

cierraModal()




  }

function cierraModal(){
    firebase.auth().onAuthStateChanged(function(user) {
   if (user) {
     location.reload();
 
    } else {

    }  
  })
}


observador();

function observador(){

  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
     console.log('existe usuario activo')
    //apareceUser(user);
    // console.log(user.email);

     
     aparece(user);
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
  //console.log(emailVerified);
 
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    //console.log(email)

    var providerData = user.providerData;
    // ...
  } else {
    // User is signed out.
    //console.log('no existe usuario activo')



    //document.getElementById("salir").style = "display: none";
    contenido.innerHTML=`

            <div class="container">
            <div class="row">
                <div class="col-12 col-lg-6 col-md-6 ">
                    <h1 >Solicite su Acceso</h1>
                    <small>Balck 938. LisLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</small>
                    <img class="img-fluid" id="ejecutiva" src="assets/img/ejecutiva.jpg ">
                </div>

                <div class="col-12 col-lg-6 col-md-6  alert alert-secondary  ">
                    <form>
                        <div class="card alert  " role="alert">
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label ">Nombre Apellidos</label>
                                <input type="email" class="form-control shadow-lg text-capitalize" id="nombre" placeholder="Juan Quintanilla Paredes" required>
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Email</label>
                                <input type="email" class="form-control shadow-lg" id="email" placeholder="ejemplo@email.cl" required>
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlTextarea1" class="form-label">Indique el motivo de su solicitud.</label>
                                <textarea class="form-control shadow-lg" id="textMessage" onkeypress="countChars(this);" onkeydown="countChars(this);" required data-max=300 maxlength=300 style="width:100%; height: 200px ;align-items: center;" aria-label="With textarea"></textarea>
                                <span>
                                    <p class="mb-0" style="align-content: center; font-size: 10px; color: black;"><small id="txaCount"></small></p>
                                </span>
                                <small class="fw-light"></small>
                            </div>
                            <div class="text-end">
                                <button type="button" class="btn btn-success" onclick="enviar()">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telegram" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z"></path>
                                    </svg>
                                    <font style="vertical-align: inherit;">
                                        <font style="vertical-align: inherit;">Enviar</font>
                                    </font>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    
    
  
    `;
    // ...
  }
});
}





function cerrar(){
  firebase.auth().signOut()
  .then(function(){
    console.log('Saliendo. . .')
    document.getElementById("login").style = "display: online";
    document.getElementById("salir").style = "display: none";

  })
  .catch(function(error){
    console.log(error)
  })
}






function aparece(user){
  var user = user;
  console.log("estamos dentro del Contenido");

  //console.log(user);
  var contenido=document.getElementById('contenido');

 // console.log(user.emailVerified);

  
  if (user.emailVerified){
    document.getElementById("salir").style = "display: online";
    document.getElementById("login").style = "display: none";

    //var rr2 = document.getElementById("titulo_usuario").innerHTML;
    
    //document.getElementById('modalingresa');
    
    //location.reload();
    contenido.innerHTML=`

<div class="container">
    <h1 id="titulo_usuario" class="text-center"></h1>
</div>
    `;
    document.getElementById("titulo_usuario").innerHTML="Felicitasiones ya estas dentro de Black-938."
 console.log(user.emailVerified);
 document.getElementById("salir").style = "display: online";
    document.getElementById("login").style = "display: none";

   
  }

  

}

