




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
                <h5 class="modal-title">Autentificación del Usuario</h5>
                <!--<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>-->
              </div>
              <div class="modal-body">
              <form id="login-form">
              <div class="form-group">
               <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label ">Nombre Apellidos</label>
                                <input type="email" class="form-control shadow-lg " id="login-email" placeholder="Juan Quintanilla Paredes" required>
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Email</label>
                                <input type="password" class="form-control shadow-lg" id="login-password" placeholder="ejemplo@email.cl" required>
                            </div>
              </div>
              </div>
              </form>
              <div class="modal-footer">
                <button type="submit" class="btn btn-secondary btn-block">Login</button>
                <!-- <button type="submit"  onclick="login()" class="btn btn-secondary btn-block">Login</button>-->
            </div>
            `

        $('#' + modal).modal('show');
    
}

const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");

const loginCheck = (user) => {
  if (user) {
    loggedInLinks.forEach((link) => (link.style.display = "block"));
    loggedOutLinks.forEach((link) => (link.style.display = "none"));
  } else {
    loggedInLinks.forEach((link) => (link.style.display = "none"));
    loggedOutLinks.forEach((link) => (link.style.display = "block"));
  }
};

// SignUp
const signUpForm = document.querySelector("#signup-form");
signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = signUpForm["signup-email"].value;
  const password = signUpForm["signup-password"].value;

  // Authenticate the User
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // clear the form
      signUpForm.reset();
      // close the modal
      $("#signupModal").modal("hide");
    });
});

// Logout
const logout = document.querySelector("#logout");

logout.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    console.log("signup out");
  });
});

// SingIn
const signInForm = document.querySelector("#login-form");

signInForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = signInForm["login-email"].value;
  const password = signInForm["login-password"].value;

  // Authenticate the User
  auth.signInWithEmailAndPassword(email, password).then((userCredential) => {
    // clear the form
    signInForm.reset();
    // close the modal
    $("#signinModal").modal("hide");
  });
});

// Posts
const postList = document.querySelector(".posts");
const setupPosts = (data) => {
  if (data.length) {
    let html = "";
    data.forEach((doc) => {
      const post = doc.data();
      const li = `
      <li class="list-group-item list-group-item-action">
        <h5>${post.title}</h5>
        <p>${post.content}</p>
      </li>
    `;
      html += li;
    });
    postList.innerHTML = html;
  } else {
    postList.innerHTML = '<h4 class="text-white">Login to See Posts</h4>';
  }
};


// events
// list for auth state changes
auth.onAuthStateChanged((user) => {
    if (user) {
      console.log("signin");
      fs.collection("posts")
        .get()
        .then((snapshot) => {
          setupPosts(snapshot.docs);
          loginCheck(user);
        });
    } else {
      console.log("signout");
      setupPosts([]);
      loginCheck(user);
    }
  });
