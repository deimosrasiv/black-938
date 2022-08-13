function registrar(){
  
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(function(){
    verificar()
  })

  .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      msn_verificacion.innerHTML=`
      <div class="container mt-5">
    <div class="alert alert-warning" role="alert">
    <small class="alert-heading" >${error.message}</small>
    `;
      // ...
    });
}



function verificar(){
    var user = firebase.auth().currentUser;
  user.sendEmailVerification().then(function() {
    // Email sent.
     console.log('Enviendo Correo...');
    msn_verificacion.innerHTML=`
    <div class="container mt-5">
    <div class="alert alert-success" role="alert">
    <small class="alert-heading">Hemos enviado un correo a ${user.email}, favor de confirmar tu cuenta, para acceder a la pagina.  </small>
    `;

  }).catch(function(error) {
    // An error happened.
    console.log(error);
    
  });
}


