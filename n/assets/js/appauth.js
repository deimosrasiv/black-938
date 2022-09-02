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
                                            <div class="col-12  alert alert-secondary">
                                                <nav>
                                                    <div class="nav nav-tabs pb-4" id="nav-tab" role="tablist">
                                                        <button class="nav-link" id="nav-ingresos-tab" data-bs-toggle="tab" data-bs-target="#nav-ingresos" type="button" role="tab" aria-controls="nav-ingresos" aria-selected="false">Crea User/Admin</button>
                                                        <button class="nav-link active " id="nav-d-tab" data-bs-toggle="tab" data-bs-target="#nav-admin" type="button" role="tab" aria-controls="nav-admin" aria-selected="true">Ingresos</button>
                                                    </div>
                                                </nav>

                                                    <div class="tab-content" id="nav-tabContent">

                                                            <!-- ****** Formulario de creacion de usuarios y administradores **** -->
                                                        <div class="tab-pane fade " id="nav-ingresos" role="tabpanel" aria-labelledby="nav-ingresos-tab">
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

                                                            <!-- ****** Formulario de ingresos de usuarios a Black-938 **** -->
                                                        <div class="tab-pane fade show active" id="nav-admin" role="tabpanel" aria-labelledby="nav-admin-tab">
                                                            
                                                                    <div class="container">
                                                                        <div class="col-12 col-md-12 col-lg-12 col xl-6 xxl-6  alert alert-secondary  ">

                                                                            <div class="container-fluid">
                                                                                <div class="form-group mb-0">
                                                                                    <div class="container-fluid">
                                                                                        <div class="row">

                                                                                            <div class="col-12 col-xl-6 col-lg-6 col-md-6 ">
                                                                                                <div class="input-group input-group-alternative">
                                                                                                    <span class="input-group-text" id="basic-addon1">
                                                                                                        <i class="fas fa-solid fa-id-badge text-big"></i>
                                                                                                    </span>
                                                                                            
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
                                                                                                    <i id="vbok" class="fa-solid fa-check fa-2x px-3" style="color:green; display:none"></i>
                                                                                                    <i id="vbnook" class="fa-solid fa-xmark fa-2x px-3 " style="color:red; display:none" ></i>
                                                                                                </div>

                                                                                                <div class="col-12  text-left">
                                                                                                    <p class="py-2"style="font-size: 10px;" id="mensaje">
                                                                                                        Ingrese el Rut sin puntos y sin guión.
                                                                                                    </p>
                                                                                                </div>

                                                                                                
                                                                                            </div>

                                                                                            <div class="col-12 col-xl-4 col-lg-6 col-md-6  my-3 px-auto" style="display:none">
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
                                                                                                    />

                                                                                                      

                                                                                                    <input name="apellido" id="inputapellidos" type="text" class="form-control text-capitalize "  placeholder=" Apellidos" 
                                                                                                        data-bs-trigger="hover"
                                                                                                        data-bs-toggle="popover"
                                                                                                        title="Apellidos"
                                                                                                        data-bs-content="Ingrese los 2 Apellidos del Colaborador.!"
                                                                                                        required
                                                                                                    />
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
                                                                                                    <input  type="date" id="inputfecha"  name="trip-start"
                                                                                                                                                                                                                                
                                                                                                                required
                                                                                                                >
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
                                                                                                    
                                                                                                    <select
                                                                                                        name="cargo"
                                                                                                        id="inputcargo"
                                                                                                        type="text"
                                                                                                        class="form-control"
                                                                                                        placeholder="Cargo"
                                                                                                        data-bs-trigger="hover"
                                                                                                        data-bs-toggle="popover"
                                                                                                        title="Cargo"
                                                                                                        data-bs-content="Seleccione el Cargo del Colaborador!"
                                                                                                        required
                                                                                                    />
                                                                                                    <option selected>  Seleccione el Cargo del Colaborador  </option>
                                                                                                    <option>	Abogado	</option>
                                                                                                    <option>	Actor y Asistente Show	</option>
                                                                                                    <option>	Administrativo	</option>
                                                                                                    <option>	Administrativo de Compras	</option>
                                                                                                    <option>	Analista Contable	</option>
                                                                                                    <option>	Analista de Procesos	</option>
                                                                                                    <option>	Analista de Reclutamiento y Selección	</option>
                                                                                                    <option>	Analista de Remuneraciones	</option>
                                                                                                    <option>	Analista Seleccion y Capacitacion	</option>
                                                                                                    <option>	Analista Software	</option>
                                                                                                    <option>	Anfitrion Act. Artisticas	</option>
                                                                                                    <option>	Anfitrion de Parque	</option>
                                                                                                    <option>	Aseador	</option>
                                                                                                    <option>	Asesor Senior Mantención	</option>
                                                                                                    <option>	Asistente Bodega	</option>
                                                                                                    <option>	Asistente Central Telefonica	</option>
                                                                                                    <option>	Asistente Comercial	</option>
                                                                                                    <option>	Asistente Contable	</option>
                                                                                                    <option>	Asistente de Alimentos y Bebidas	</option>
                                                                                                    <option>	Asistente de Compras	</option>
                                                                                                    <option>	Asistente de Eventos	</option>
                                                                                                    <option>	Asistente de Logística	</option>
                                                                                                    <option>	Asistente de Obras Civiles Montaje	</option>
                                                                                                    <option>	Asistente de Personas	</option>
                                                                                                    <option>	Asistente de Remuneraciones	</option>
                                                                                                    <option>	Asistente Grandes Cuentas	</option>
                                                                                                    <option>	Asistente Informatica	</option>
                                                                                                    <option>	Asistente MK Digital	</option>
                                                                                                    <option>	Asistente Operador Mantenedor	</option>
                                                                                                    <option>	Asistente Parque	</option>
                                                                                                    <option>	Asistente Servicio Cliente	</option>
                                                                                                    <option>	Auditor Interno	</option>
                                                                                                    <option>	Auxiliar de Casino	</option>
                                                                                                    <option>	Ayudante Contable	</option>
                                                                                                    <option>	Ayudante de Cocina	</option>
                                                                                                    <option>	Ayudante de Recursos Humanos	</option>
                                                                                                    <option>	Ayudante Tesoreria	</option>
                                                                                                    <option>	Brigadista	</option>
                                                                                                    <option>	Cajero	</option>
                                                                                                    <option>	Carpintero Mantencion	</option>
                                                                                                    <option>	Chofer	</option>
                                                                                                    <option>	Consultor Externo BI	</option>
                                                                                                    <option>	Contador	</option>
                                                                                                    <option>	Coordinador Emergencias	</option>
                                                                                                    <option>	Director de Arte	</option>
                                                                                                    <option>	Diseñador Grafico	</option>
                                                                                                    <option>	Electrico	</option>
                                                                                                    <option>	Electronico	</option>
                                                                                                    <option>	Encargado Adm. de Personas y Remuneraciones	</option>
                                                                                                    <option>	Encargado de Bodega	</option>
                                                                                                    <option>	Encargado de Capacitacion	</option>
                                                                                                    <option>	Encargado de Obras Civiles	</option>
                                                                                                    <option>	Encargado de Remuneraciones	</option>
                                                                                                    <option>	Encargado de Seleccion	</option>
                                                                                                    <option>	Encargado Modulo Alimentacion	</option>
                                                                                                    <option>	Experto en Prevención de Riesgos	</option>
                                                                                                    <option>	Guardia de Seguridad	</option>
                                                                                                    <option>	Housekeeper	</option>
                                                                                                    <option>	Housekeeper y Cocinera	</option>
                                                                                                    <option>	Ingeniero Control de Gestion	</option>
                                                                                                    <option>	Ingeniero en Alimentos	</option>
                                                                                                    <option>	Ingeniero Infraestructura TI	</option>
                                                                                                    <option>	Jardinero	</option>
                                                                                                    <option>	Jefe Administración de Personas	</option>
                                                                                                    <option>	Jefe de Informatica	</option>
                                                                                                    <option>	Jefe de Local	</option>
                                                                                                    <option>	Jefe de Remuneraciones	</option>
                                                                                                    <option>	Jefe de Souvenir	</option>
                                                                                                    <option>	Jefe Seguridad	</option>
                                                                                                    <option>	Jefe Servicio Cliente	</option>
                                                                                                    <option>	Jefe Técnico	</option>
                                                                                                    <option>	Junior	</option>
                                                                                                    <option>	Key User	</option>
                                                                                                    <option>	Maestro de Cocina	</option>
                                                                                                    <option>	Mantenedor Equipos A&B	</option>
                                                                                                    <option>	Mantenedor Piscinas	</option>
                                                                                                    <option>	Mecanico	</option>
                                                                                                    <option>	Moldeador Fibra de Vidrio	</option>
                                                                                                    <option>	Operador Alimentacion Senior	</option>
                                                                                                    <option>	Operador Ayudante	</option>
                                                                                                    <option>	Operador Castillo Encantado	</option>
                                                                                                    <option>	Operador de Bodega	</option>
                                                                                                    <option>	Operador Mantenedor	</option>
                                                                                                    <option>	Operador Maquillador	</option>
                                                                                                    <option>	Operador Parque Entretencion	</option>
                                                                                                    <option>	Operador Parque y Bodega	</option>
                                                                                                    <option>	Planificador	</option>
                                                                                                    <option>	Produccion de Eventos	</option>
                                                                                                    <option>	Produccion Escenografica	</option>
                                                                                                    <option>	Programador Analista	</option>
                                                                                                    <option>	Recepcionista	</option>
                                                                                                    <option>	Secretaria	</option>
                                                                                                    <option>	Secretaria Gerencia General	</option>
                                                                                                    <option>	Secretaria Presidencia	</option>
                                                                                                    <option>	Soldador	</option>
                                                                                                    <option>	Sub Administrador	</option>
                                                                                                    <option>	Sub Encargado Modulo Venta	</option>
                                                                                                    <option>	Sub Encargado Servicio al Cliente	</option>
                                                                                                    <option>	Subjefe de Local	</option>
                                                                                                    <option>	Subjefe de Seguridad	</option>
                                                                                                    <option>	Supervisor Control de Procesos y Protocolos	</option>
                                                                                                    <option>	Supervisor de Alimentos y Bebidas	</option>
                                                                                                    <option>	Supervisor de Aseo	</option>
                                                                                                    <option>	Supervisor de Bodega	</option>
                                                                                                    <option>	Supervisor de Compras	</option>
                                                                                                    <option>	Supervisor de Mantencion	</option>
                                                                                                    <option>	Supervisor de Operaciones	</option>
                                                                                                    <option>	Supervisor de Seguridad	</option>
                                                                                                    <option>	Supervisor Zona Seguridad	</option>
                                                                                                    <option>	Técnico Eléctrico Medio Mantención	</option>
                                                                                                    <option>	Técnico Eléctrico Senior Mantención	</option>
                                                                                                    <option>	Técnico Mecánico Medio Mantención	</option>
                                                                                                    <option>	Técnico Mecánico Senior Mantención	</option>
                                                                                                    <option>	Traductor y Protocolo	</option>
                                                                                                    </select>

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
                                                                                          
                                                                                              <select
                                                                                                name="centrocosto"
                                                                                                id="inputcentrocosto"
                                                                                                type="text"
                                                                                                class="form-control"
                                                                                                placeholder="Departamento"
                                                                                                data-bs-trigger="hover"
                                                                                                data-bs-toggle="popover"
                                                                                                title="Centro de Costo"
                                                                                                data-bs-content="Seleccione el Centro de Costo Asignado al Colaborador!"
                                                                                                required
                                                                                              />
                                                                                                <option selected>  Seleccione Centro de Costo  </option>
                                                                                                <option>  Administración Gcia. Gral. Fantasilandia  </option>
                                                                                                <option>  Administración Oficina Corporativa  </option>
                                                                                                <option>  Air Race  </option>
                                                                                                <option>  Akademia  </option>
                                                                                                <option>  Ambulante Moby Dick </option>
                                                                                                <option>  Astro Line  </option>
                                                                                                <option>  Barco Pirata  </option>
                                                                                                <option>  Basketball  </option>
                                                                                                <option>  Black Hole  </option>
                                                                                                <option>  Bodega Fantasilandia  </option>
                                                                                                <option>  Botes Chocadores  </option>
                                                                                                <option>  Buses </option>
                                                                                                <option>  Carpa Eventos </option>
                                                                                                <option>  Carrusel Caballos </option>
                                                                                                <option>  Casino del Personal </option>
                                                                                                <option>  Colegios y Universidades </option>
                                                                                                <option>  Compras Fantasilandia </option>
                                                                                                <option>  Contabilidad - Gcia. Adm. y Finanzas  </option>
                                                                                                <option>  Contraloría </option>
                                                                                                <option>  Contratista </option>
                                                                                                <option>  Control de Gestión  </option>
                                                                                                <option>  Crazy Dance </option>
                                                                                                <option>  Derby </option>
                                                                                                <option>  Down the Clown </option>
                                                                                                <option>  Eventos y Shows </option>
                                                                                                <option>  Evolution </option>
                                                                                                <option>  Fantasy Store </option>
                                                                                                <option>  Football Striker  </option>
                                                                                                <option>  Gasto Oficina Corporativa </option>
                                                                                                <option>  Gcia. RR.HH.  </option>
                                                                                                <option>  Gerencia Comercial  </option>
                                                                                                <option>  Gerencia de Proyectos Parque </option>
                                                                                                <option>  Heladería Savory  </option>
                                                                                                <option>  Johnny Rockets  </option>
                                                                                                <option>  Johnny Rockets Norte </option>
                                                                                                <option>  Kiosko Reloj  </option>
                                                                                                <option>  Mantenimiento </option>
                                                                                                <option>  Marketing y Preventa  </option>
                                                                                                <option>  Mega Disko  </option>
                                                                                                <option>  Mini Bongo  </option>
                                                                                                <option>  Moby Dick </option>
                                                                                                <option>  Montaña Rusa Suspender / Raptor </option>
                                                                                                <option>  Obras Civiles </option>
                                                                                                <option>  Operaciones </option>
                                                                                                <option>  Pesca Milagrosa </option>
                                                                                                <option>  Pirámide / Monga  </option>
                                                                                                <option>  Prevención de Riesgos </option>
                                                                                                <option>  Pushing Ball  </option>
                                                                                                <option>  Rapid River </option>
                                                                                                <option>  Restaurant Arbolito </option>
                                                                                                <option>  Restaurant Palacio de Cristal </option>
                                                                                                <option>  Restaurantoon </option>
                                                                                                <option>  Revenge / Twist & Splash  </option>
                                                                                                <option>  RR HH Parque  </option>
                                                                                                <option>  Rueda de la Fortuna </option>
                                                                                                <option>  Samba Balloon </option>
                                                                                                <option>  Seguridad Portería  </option>
                                                                                                <option>  Servicio Cliente  </option>
                                                                                                <option>  Servicios Generales </option>
                                                                                                <option>  Striker </option>
                                                                                                <option>  Subgerencia Operaciones </option>
                                                                                                <option>  Tagadá  </option>
                                                                                                <option>  Tesorería - Gcia. Adm. y Finanzas </option>
                                                                                                <option>  Tesorería Fantasilandia </option>
                                                                                                <option>  TI Corporativo  </option>
                                                                                                <option>  TI Fantasilandia  </option>
                                                                                                <option>  Top Spin  </option>
                                                                                                <option>  Tren Minero </option>
                                                                                                <option>  Tsunami </option>
                                                                                                <option>  Uniformes </option>
                                                                                                <option>  Venta Interna Alimentos & Bebidas </option>
                                                                                                <option>  Vigilancia  </option>
                                                                                                <option>  Volare  </option>
                                                                                                <option>  Wild Mouse  </option>
                                                                                                
                                                                                              </select>
                                                                                            </div>
                                                                                                <p class="px-4" style="font-size: 10px;">
                                                                                                    Centro Costo
                                                                                                </p>
                                                                                        </div>

                                                                                            

                                                                                        <div class="col-auto my-2"> 
                                                                                            <div class="input-group input-group-alternative">
                                                                                              <span class="input-group-text" id="basic-addon1">
                                                                                                 <i class="fa-regular fa-address-book"></i>
                                                                                              </span>
                                                                                          
                                                                                              <select
                                                                                                name="centrocosto"
                                                                                                id="inputcausa"
                                                                                                type="text"
                                                                                                class="form-control"
                                                                                                placeholder="inputcausa"
                                                                                                data-bs-trigger="hover"
                                                                                                data-bs-toggle="popover"
                                                                                                title="Centro de Costo"
                                                                                                data-bs-content="Seleccione Causa!"
                                                                                                required
                                                                                              />
                                                                                                <option selected>  Seleccione Causa  </option>
                                                                                                <option> Abandona puesto de trabajo </option>
                                                                                                <option> Acoso Sexual </option>
                                                                                                <option> Agresivo </option>
                                                                                                <option> Carece de afinidad con el trabajo </option>
                                                                                                <option> Contesta de mal manera </option>
                                                                                                <option> Desiste </option>
                                                                                                <option> Falta de compromiso </option>
                                                                                                <option> Falta De Probidad, Vías De Hecho, Injurias, Conducta Inmoral </option>
                                                                                                <option> Faltas Injustificadas </option>
                                                                                                <option> Fin de Contrato </option>
                                                                                                <option> Grave error operacional </option>
                                                                                                <option> Incumplimiento Contrato </option>
                                                                                                <option> Incumplimiento Grave De Las Obligaciones Que Impone El Contrato </option>
                                                                                                <option> Ingreso de drogas </option>
                                                                                                <option> Mal desempeño durante funciones </option>
                                                                                                <option> No cumple requisitos del cargo </option>
                                                                                                <option> Solo se presenta a inducción y no a trabajar </option>
                                                                                                <option> Vencimiento </option>>
                                                                                                </select>
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
                                                                                                    <input name="responzable" id="inputresponzable" type="text"  class=" form-control"    placeholder="Responzable"
                                                                                                        data-bs-trigger="hover"
                                                                                                        data-bs-toggle="popover"
                                                                                                        title="Respozable"
                                                                                                        required
                                                                                                        disabled
                                                                                                    />
                                                                                                </div>
                                                                                                    <p class="px-4" style="font-size: 10px;">
                                                                                                        Responzable.
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
                                                                                                        ></textarea>
                                                                                                        <span>
                                                                                                            <p class="mb-0" style="align-content: center; font-size: 10px; color: black;"><small id="txaCount"></small></p>
                                                                                                        </span>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-12  text-end my-3 px-auto">
                                                                        <button
                                                                          id="buscatabla"
                                                                            type="button"
                                                                            class="btn btn-primary "
                                                                            onclick="guardadatos()">
                                                                            <i class="fas fa-check-circle"></i> Guardar
                                                                        </button>
                                                                    </div>

                                                        </div>
                                                 
                                                    </div>    
                                            </div>
                                        </div>
                                    </div>             

            `;
          });
        
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
     
      
      
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
        .then(function() {
            console.log("Saliendo. . .");
            document.getElementById("login").style = "display: online";
            document.getElementById("salir").style = "display: none";
            document.getElementById("admin").style = "display: online";
            location.reload();
        })
        .catch(function(error) {
            console.log(error);
        });
}


// libreria para manejo de mensajes
// Con esta función se muestra el Toast 



function guardadatos() {
    var rutbuscar = document.getElementById("rut").value;
    db.collection("blacklist").where("rut", "==", rutbuscar)
        .get()
        .then(function(querySnapshot) {

            if (querySnapshot.empty) {
                //console.log("Este usuario no tiene registros");
                guardadatos2();
            } else {
                //guardadatos2();
                alert("Este Usuario ya se encuentra registrado");
                console.log("Este Usuario ya se encuentra registrado");
            }
        })
        .catch(function(error) {
        console.log("Error getting documents: ", error);

        });
}





function guardadatos2() {
    console.log("estamos guardando datos");

    document.getElementById("inputresponzable").value = document.getElementById("emailusuario").innerHTML;

    var rut = document.getElementById("rut").value;
    var nombres = document.getElementById("inputnombres").value;
    var apellidos = document.getElementById("inputapellidos").value;
    var fecha = document.getElementById("inputfecha").value;
    var cargo = document.getElementById("inputcargo").value;
    var centrocosto = document.getElementById("inputcentrocosto").value;
    var causa = document.getElementById("inputcausa").value;
    var responzable = document.getElementById("inputresponzable").value;
    var observacion = document.getElementById("inputobser").value;


    if (rut == "") {
        alert("Debe ingresar un rut Válido");
        document.getElementById("rut").focus();
    } else if (nombres == "") {
        alert("Debe ingresar Nombres y Apellidos");
        document.getElementById("inputnombres").focus();

    } else if (apellidos == "") {
        alert("Debe ingresar Nombres y Apellidos");
        document.getElementById("inputapellidos").focus();

    } else if (fecha == "") {
        alert("Debe ingresar fechas del ingreso");
        document.getElementById("inputfecha").focus();

    } else if (cargo == "") {
        alert("Debe ingresar el cargo del Colaborador");
        document.getElementById("inputcargo").focus();

    } else if (centrocosto == "") {
        alert("Debe ingresar el Centro Cosoto, donde se desempeño el colaborador");
        document.getElementById("inputcentrocosto").focus();

    } else if (causa == "") {
        alert("Debe ingresar la Causa que proboco el ingreso del colaborador a Black-938.");
        document.getElementById("inputcausa").focus();

    } else if (observacion == "") {
        alert("Ingresar detalles de la Causa que proboco el ingreso del colaborador a Black-938.");
        document.getElementById("inputobser").focus();

    } else {

        console.log(fecha);
        console.log(cargo);
        console.log(centrocosto);
        console.log(causa);

        db.collection("blacklist").add({
                rut: rut,
                nombres: nombres,
                apellidos: apellidos,
                fecha: fecha,
                cargo: cargo,
                centrocosto: centrocosto,
                causa: causa,
                responzable: responzable,
                observaciones: observacion


            })
            .then(function(docRef) {
                //console.log("acabamos de ingresar los datos")
                //grupo_telegram.close()
                // mostramos mensage que se cargo los datos con exito 
                //console.log("mostraremos mensage");
                //mostrarToast()
                //limpiarpagina();
                //setTimeout(function(){location.reload();},5000);

            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });



        document.getElementById("rut").value = "";
        document.getElementById("inputnombres").value = "";
        document.getElementById("inputapellidos").value = "";
        document.getElementById("inputfecha").value = "";
        document.getElementById("inputcargo").value = "Seleccione el Cargo del Colaborador";
        document.getElementById("inputcentrocosto").value = "Seleccione Centro de Costo";
        document.getElementById("inputcausa").value = "Seleccione Causa";
        document.getElementById("inputresponzable").value = "";
        document.getElementById("inputobser").value = "";
    }



}


