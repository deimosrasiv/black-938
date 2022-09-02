var db = firebase.firestore();

window.addEventListener("scroll", function () {
    var header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 0);
});

function enviar() {
    var modal = "modalmensajes";
    var nombre = document.getElementById("nombre").value;
    var email = document.getElementById("email").value;
    var textMessage = document.getElementById("textMessage").value;
    var contador = 0;

    if (nombre != "") {
        var contador = contador + 1;
    }

    if (email != "") {
        var contador = contador + 1;
    }

    if (contador > 1) {
        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let hora = date.getHours();
        let minutos = date.getMinutes();
        let segundos = date.getSeconds();

        if (hora < 10) {
            hora1 = `0${hora}`;
        } else {
            hora1 = `${hora}`;
        }

        if (minutos < 10) {
            minutos1 = `0${minutos}`;
        } else {
            minutos1 = `${minutos}`;
        }

        if (segundos < 10) {
            segundos1 = `0${segundos}`;
        } else {
            segundos1 = `${segundos}`;
        }

        if (month < 10) {
            var month1 = `0${month}`;
        } else {
            var month1 = `${month}`;
        }

        if (day < 10) {
            var day1 = `0${day}`;
        } else {
            var day1 = `${day}`;
        }

        var hora_solicitud = hora1 + ":" + minutos1 + ":" + segundos1;
        var fecha_solicitud = day1 + "-" + month1 + `-${year}`;

        var my_mensaje = `Se solicita ingreso a Black 938. : %0A %0A <b>Usuario:</b> <i>${nombre}</i>  %0A <b>Email:</b> <i>${email}</i> %0A <b>Mensaje:</b> <i>${textMessage}</i> %0A <b>Hora de solicitud:</b> <i>${hora_solicitud}</i>  %0A <b>Fecha de solicitud:</b> <i>${fecha_solicitud}</i>`;
        var my_mensaje2 = `Esto es solo una Prueba, no es real!!. Alerta de temperatura alta:`;

        var token = "1995224836:AAFTI0sdAnVAs5fOjEKjPYu6aU3fe7iMsp0";
        var chat_id_canal = -1001530134776; /* envia al canal */
        var chat_id_master = 1942133499; /* envia solo al master */

        var url_solicita_black938 = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id_master}&text=${my_mensaje}&parse_mode=html`;
        //console.log(url_solicita_black938);

        let api_black938 = new XMLHttpRequest();
        api_black938.open("GET", url_solicita_black938, true);
        api_black938.send();

        console.log("Mensaje enviado a Telegram");

        var nombre = document.getElementById("nombre").value;
        var email = document.getElementById("email").value;
        var textMessage = document.getElementById("textMessage").value;
        var cuerpo = "Se han enviado con exito el mensaje";
        var cuerpo2 =
            "<stron>Black 938.</stron> le enviara un correo con las indicaciones para su ingreso.";

        $("#" + modal).modal("show");

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
            `;
        document.getElementById("nombre").value = "";
        document.getElementById("email").value = "";
        document.getElementById("textMessage").value = "";
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
            `;
        $("#" + modal).modal("show");
    }
}

function countChars(obj) {
    var strLength = obj.value.length;
    var maxLength = obj.dataset.max;
    var charRemain = maxLength - strLength;

    if (charRemain < 0) {
        document.getElementById("txaCount").innerHTML =
            "Has excedido el límite de " + maxLength + " caracteres";
    } else {
        document.getElementById("txaCount").innerHTML =
            "Caracteres Restantes: " + charRemain;
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
            `;

    $("#" + modal).modal("show");
}

function logear() {
    var email = document.getElementById("signup-email").value;
    var contrasena = document.getElementById("signup-password").value;
    var error = document.getElementById("error_ingreso");

    console.log(email);
    console.log(contrasena);

    firebase
        .auth()
        .signInWithEmailAndPassword(email, contrasena)
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;

            //console.log(errorCode);
            //console.log(errorMessage);

            if (errorMessage == "The email address is badly formatted.") {
                document.getElementById("error_ingreso").innerHTML = "";
            }

            if (
                errorMessage ==
                "The password is invalid or the user does not have a password."
            ) {
                document.getElementById("error_ingreso").innerHTML =
                    "La contraseña no es válida o el usuario no tiene contraseña.";
            }

            if (
                errorMessage ==
                "There is no user record corresponding to this identifier. The user may have been deleted."
            ) {
                document.getElementById("error_ingreso").innerHTML =
                    "No existe registro de usuario correspondiente a este identificador. Es posible que el usuario haya sido eliminado.";
            }

            if (
                errorMessage ==
                "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later."
            ) {
                document.getElementById("error_ingreso").innerHTML =
                    "El acceso a esta cuenta se ha inhabilitado temporalmente debido a muchos intentos fallidos de inicio de sesión. Puede restaurarlo inmediatamente restableciendo su contraseña o puede volver a intentarlo más tarde.";
            }
        });

    cierraModal();
}

function cierraModal() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            location.reload();
        } else {
        }
    });
}

observador();

function observador() {
    //var radio = document.getElementById(flexCheckAdmin).checked;
    //console.log(radio);

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            document.getElementById("emailusuario").innerHTML = user.email;
            console.log("existe usuario activo");
            //apareceUser(user);
            console.log(user.emailVerified);

            if (user.emailVerified == false) {

                console.log("no verificado");
                
                contenido.innerHTML = `
                    <div class="container">
                        <h1 id="titulo_usuario" class="text-center"></h1>
                    </div>
                `;
                cerrar();
                alert("Este correo no se encuentra verificado.");
                document.getElementById("titulo_usuario").innerHTML =
                    "no estas verificado.";
            } else {

            
            console.log("verificado");
            console.log(user.email);
                apareceuser();

            }
        }
    });

    contenido.innerHTML = `
                    <div class="container">
                        <div class="row">
                            <div class="col-12 col-lg-6 col-md-6 ">
                                <h1 >Solicite su Acceso</h1>
                                <small>Balck 938. Plataforma para consultar el estado, del colaborador, entregando información clara y detalla a la hora de tomar una decisión.
                                 Black 938. te entregara la información en cualquier parte donde este, con solo tener acceso a internet y las credenciales necesarias para el ingreso.</small>
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
}


  function apareceuser(){
    console.log ("estmos dentro de aparece user")
    document.getElementById("login").style = "display: none";
    document.getElementById("salir").style = "display: online";
    document.getElementById("admin").style = "display: none";
      
    contenido.innerHTML=`
    <div class="container text-center">
        <h2>Formulario de Consulta</h2>
    </div>
    <div class="container">
    <div class="col-12 col-md-12 col-lg-12 col xl-6 xxl-6  alert alert-secondary  ">

        <div class="container-fluid">
            <div class="container-fluid">
                <div class="form-group mb-0">
                <div class="container-fluid">
                    <div class="row">

                        <div class="col-12  ">
                            <div class="input-group input-group-alternative">
                                <span class="input-group-text" id="basic-addon1">
                                    <i class="fas fa-solid fa-id-badge text-big"></i>
                                </span>
                                <div class="form-group w-50">
                            
                                    <form name="miFormulario">
                                        <input
                                        name="rut"
                                        id="rut"
                                        type="text"
                                        class="form-control"
                                        placeholder="Ingrese un RUT"
                                        required oninput="checkRut(this)"
                                        onkeypress="return isNumber(event)"
                                        required ="checkRut(this)"
                                        maxlength="12"
                                        required
                                        
                                        />
                                    </form>
                                </div>
                                    <i id="vbok" class="fa-solid fa-check fa-2x px-3" style="color:green; display:none"></i>
                                    <i id="vbnook" class="fa-solid fa-xmark fa-2x px-3 " style="color:red; display:none" ></i>
                                

                            <div class="col-12  text-left">
                                <p class="py-2"style="font-size: 10px;" id="mensaje">
                                    Ingrese el Rut sin puntos y sin guión.
                                </p>
                            </div>

                            <div class="col-12 my-3 px-auto">
                                <button
                                   id="buscatabla"
                                    type="button"
                                    class="btn btn-primary "
                                    onclick="buscatabla()">
                                    <i class="fas fa-check-circle"></i> Buscar
                                </button>
                            </div>
                        </div>

                        <div class="col-12 col-xl-6 col-lg-6 col-md-6  my-3 px-auto" style="display:none">
                            <div id="alerta" class="alert alert-info   fade show text-center" role="alert">
                                <strong>
                                    Atención!
                                </strong>

                                <small id="mensaje">
                                    Ingrese el Rut sin puntos y sin guión.
                                </small>
                                    
                            </div> 
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        

        <div class="container-fluid">
            <div class="form-group mb-0">
                <div class="container-fluid">
                    <div class="row">

                        <div class="col-auto mx-0 my-2"> 
                        
                            <div class="input-group input-group-alternative">
                                <span class="input-group-text" id="basic-addon1">
                                <i class="fa-solid fa-person"></i>
                                    
                                </span>

                                
                                <input name="nombre" id="inputnombres" type="text"  class=" form-control text-capitalize"    placeholder="Nombres"
                                    data-bs-trigger="hover"
                                    data-bs-toggle="popover"
                                    title="Nombres"
                                    data-bs-content="Ingrese los 2 Nombres del Colaborador.!"
                                    required
                                    disabled/>

                                    

                                <input name="apellido" id="inputapellidos" type="text" class="form-control text-capitalize "  placeholder=" Apellidos" 
                                    data-bs-trigger="hover"
                                    data-bs-toggle="popover"
                                    title="Apellidos"
                                    data-bs-content="Ingrese los 2 Apellidos del Colaborador.!"
                                    disabled
                                    required/>
                                    
                            </div>
                                <p class="px-4" style="font-size: 10px;">
                                    Nombres y Apellidos.
                                </p>
                        </div>



                        <div class="col-auto my-2"> 
                            <div class="input-group input-group-alternative">
                                <span class="input-group-text" id="basic-addon1">
                                <i class="fa-solid fa-calendar-days"></i>
                                </span>

                                <input name="fecha" id="inputfecha" type="text"  class=" form-control"    placeholder="Fecha"
                                    data-bs-trigger="hover"
                                    data-bs-toggle="popover"
                                    title="Fecha"
                                    required
                                    disabled/>
                            </div>
                            <p class="px-4" style="font-size: 10px;">
                                Fecha.
                            </p>
                        </div>





                    </div>
                </div>
            </div> 
        </div>                     

        <div class="container-fluid">
             <div class="form-group mb-0">
                <div class="container-fluid">
                    <div class="row">

                        <div class="col-auto my-2"> 
                            <div class="input-group input-group-alternative">
                                <span class="input-group-text" id="basic-addon1">
                                <i class="fa-regular fa-address-book"></i>
                                </span>
                                <input name="nombre" id="inputcargo" type="text"  class=" form-control text-capitalize"    placeholder="Cargo"
                                    data-bs-trigger="hover"
                                    data-bs-toggle="popover"
                                    title="Cargo"
                                    required
                                    disabled/>
                            </div>
                            <p class="px-4" style="font-size: 10px;">
                                Cargo.
                            </p>
                        </div>

                        <div class="col-auto my-2"> 
                            <div class="input-group input-group-alternative">
                                <span class="input-group-text" id="basic-addon1">
                                <i class="fa-regular fa-address-book"></i>
                                </span>

                                <input name="nombre" id="inputcentrocosto" type="text"  class=" form-control text-capitalize"    placeholder="centro costo"
                                    data-bs-trigger="hover"
                                    data-bs-toggle="popover"
                                    title="Area"
                                    required
                                    disabled/>
                            </div>
                            <p class="px-4" style="font-size: 10px;">
                                Centro Costo.
                            </p>
                        </div>

                        <div class="col-auto my-2"> 
                            <div class="input-group input-group-alternative">
                                <span class="input-group-text" id="basic-addon1">
                                
                                <i class="fa-brands fa-searchengin"></i>   
                                </span>

                                <input name="nombre" id="inputcausa" type="text"  class=" form-control text-capitalize"    placeholder="Causa"
                                    data-bs-trigger="hover"
                                    data-bs-toggle="popover"
                                    title="Causa"
                                    required
                                    disabled/>
                            </div>
                            <p class="px-4" style="font-size: 10px;">
                                Causa.
                            </p>
                        </div>




                        <div class="col-auto my-2"> 
                            <div class="input-group input-group-alternative">
                                <span class="input-group-text" id="basic-addon1">
                                <i class="fa-solid fa-person-military-pointing"></i>
                                </span>

                                <input name="responsable" id="inputresponzable" type="text"  class=" form-control"    placeholder="Responsable"
                                    data-bs-trigger="hover"
                                    data-bs-toggle="popover"
                                    title="Respozable"
                                    required
                                    disabled/>
                            </div>
                            <p class="px-4" style="font-size: 10px;">
                                Responsable.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        

        <div class="container-fluid">
             <div class="form-group mb-0">
                <div class="container-fluid">
                    <div class="row">
                        <div class="input-group input-group-alternative">
                            <span class="input-group-text" id="basic-addon1">
                                Observaciones
                            </span>
                            <textarea class="form-control shadow-lg" id="inputobser" onkeypress="countChars(this);" 
                            onkeydown="countChars(this);"
                            required data-max=300 maxlength=300
                            style="width:100%;
                            height: 200px ;align-items: center;"
                            aria-label="With textarea"
                            disabled
                            ></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    </div>
</div>
                    

                `;
  }

function cerrar() {
    firebase
        .auth()
        .signOut()
        .then(function () {
            console.log("Saliendo. . .");
            document.getElementById("login").style = "display: online";
            document.getElementById("salir").style = "display: none";
            document.getElementById("admin").style = "display: online";
            location.reload();
        })
        .catch(function (error) {
            console.log(error);
        });
}

function apareceadmin(user) {
    contenido.innerHTML = `
                 <div class="container">
            <div class="row">
                <div class="col-12 col-lg-6 col-md-6 ">
                    <h1 >Envío de Correos</h1>
                    <small>nngnhg.</small>
                    <img class="img-fluid" id="ejecutiva" src="assets/img/biometric.jpg ">
                </div>

                <div class="col-12 col-lg-6 col-md-6  alert alert-secondary  ">
                    <form>
                        

                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Correo</label>
                                <input type="email" class="form-control shadow-lg" id="email" placeholder="ejemplo@email.cl">
                            </div>

                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Password</label>
                                <input type="password" class="form-control shadow-lg" id="password" placeholder="">
                            </div>

                            <div class="mb-3" id="nombre" style="display: none;" >
                                <label for="exampleFormControlInput1" class="form-label">Nombre</label>
                                <input type="nombre" class="form-control shadow-lg" id="nombe" placeholder="">
                            </div>
                            <div class="container py-3">
                                <div class="mb-3">
                                    <input name="useradmin" id="asigUser" type="radio" checked onclick="sinnombre()" value="Usuario" ">
                                        <small class="form-label">
                                            Usuario
                                        </small>
                                </div>

                                <div class="mb-3">
                                    <input name="useradmin" id="asigAdmin" type="radio" onclick="nombre()" value="Administrador" ">
                                        <small class="form-label ">
                                            Administrador
                                        </small>
                                </div>
                            </div>

                            <div class="text-end">
                                <button type="button" class="btn btn-success" onclick="registrar()">
                                    
                                    <font style="vertical-align: inherit;">
                                        <font style="vertical-align: inherit;">Autentificar</font>
                                    </font>
                                </button>
                            </div>
                            <div class="container" id="msn_verificacion">
                            </div>
                    </form>
                </div>
            </div>
        </div>
            `;

    document.getElementById("salir").style = "display: online";
    document.getElementById("login").style = "display: none";
    document.getElementById("admin").style = "display: none";
}

function nombre() {
    document.getElementById("nombre").style.display = "inline";
}

function sinnombre() {
    document.getElementById("nombre").style.display = "none";
}





function buscatabla() {
    var rutbuscar = document.getElementById("rut").value;
    console.log(rutbuscar);
    document.getElementById("inputnombres").value = "";
    document.getElementById("inputapellidos").value = "";
    document.getElementById("inputcargo").value = "";
    document.getElementById("inputcentrocosto").value = "";
    document.getElementById("inputresponzable").value = "";
    document.getElementById("inputcausa").value = "";
    document.getElementById("inputobser").value = "";


    db.collection("blacklist").where("rut", "==", rutbuscar)
        .get()
        .then(function(querySnapshot) {

            if (querySnapshot.empty) {

                alert("Este usuario no tiene registros");
                console.log("Este usuario no tiene registros");
               
            } else {
                //guardadatos2();
                console.log("Este Usuario ya se encuentra registrado");
                document.getElementById("inputnombres").value = doc.data().nombres;
                document.getElementById("inputapellidos").value = doc.data().apellidos;
                document.getElementById("inputcargo").value = doc.data().cargo;
                document.getElementById("inputcentrocosto").value = doc.data().centrocosto;
                document.getElementById("inputresponzable").value = doc.data().registra;
                document.getElementById("inputcausa").value = doc.data().causa;
                document.getElementById("inputobser").value = doc.data().observaciones;
                document.getElementById("inputresponzable").value = doc.data().responzable;
                var fecha = doc.data().fecha;
                var nueva = fecha.split(" ")[0];
                var format = nueva.split("-");
                var ultima = format[2] + '-' + format[1] + '-' + format[0]


                document.getElementById("inputfecha").value = ultima;

                console.log(doc.data().fecha);
                console.log(doc.id);
                console.log(doc.data().nombres);
                console.log(doc.data().apellidos);
                console.log(doc.data().responzable);
                console.log(doc.data().fecha);

            }
        })
}
