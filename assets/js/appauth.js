var db = firebase.firestore();

window.addEventListener("scroll", function () {
  var header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 0);
});

function registrar() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(function () {
      verificar();
    })

    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      msn_verificacion.innerHTML = `
      <div class="container mt-5">
    <div class="alert alert-warning" role="alert">
    <small class="alert-heading" >${error.message}</small>
    `;
      // ...
    });
}

function verificar() {
  var user = firebase.auth().currentUser;
  user
    .sendEmailVerification()
    .then(function () {
      // Email sent.
      console.log("Enviendo Correo...");
      msn_verificacion.innerHTML = `
    <div class="container mt-5">
    <div class="alert alert-success" role="alert">
    <small class="alert-heading">Hemos enviado un correo a ${user.email}, favor de confirmar tu cuenta, para acceder a la pagina.  </small>
    `;
    })
    .catch(function (error) {
      // An error happened.
      console.log(error);
    });
}

function ingresa() {
  var modal = "modalmensajes";

  modalcontenido.innerHTML = `
            <div class="modal-header">
                <h5 class="modal-title text-center" >Autentificación del Administrador</h5>
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
  console.log("logeando al user");

  var email = document.getElementById("signup-email").value;
  var contrasena = document.getElementById("signup-password").value;
  var error = document.getElementById("error_ingreso");

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
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      document.getElementById("emailusuario").innerHTML = user.email;
      var emailusuario = document.getElementById("emailusuario").innerHTML;
      console.log("existe usuario activo");

      if (user.emailVerified) {
        //console.log("Verificado: "+user.emailVerified);
        //console.log(user.email);
      }
      db.collection("admin")
        .where("email", "==", user.email)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, " => ", doc.data());
            document.getElementById("login").style = "display: none";
            document.getElementById("salir").style = "display: online";
            document.getElementById("admin").style = "display: none";
            contenido.innerHTML = `
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
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
      //console.log("no es 3");
    }

    document.getElementById("login").style = "display: online";
    document.getElementById("salir").style = "display: none";
    document.getElementById("admin").style = "display: online";
    contenido.innerHTML = `
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
                    <img class="img-fluid" id="ejecutiva" src="assets/img/biometric.jpg ">
                </div>

                
            </div>
        </div>
        `;
  });
}


function nombre() {
  document.getElementById("nombre").style.display = "inline";
}

function sinnombre() {
  document.getElementById("nombre").style.display = "none";
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