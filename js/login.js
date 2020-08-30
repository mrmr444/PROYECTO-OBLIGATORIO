//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    /* function validarEmail() {
         var elemento = document.getElementById("mail");
         if (!elemento.checkValidity()){
             error (elemento);
             return false;
         }
         return true;
     }
 
     function validarPassword () {
         var elemento = document.getElementById("contraseña");
         if(!elemento.checkValidity()){
             error(elemento);
             return false;
         }
         return true;
     }
 
     function validar(e) {
         if (validarEmail() && validarPassword()){
             return true;
         }else{
             e.preventDefault();
             return false;
         }
         
     }
 
     function error(elemento) {
         document.getElementById("error").innerHTML +=elemento.validationMessage;
         elemento.className="mensajeError";
         elemento.focus();
     }
 
 
     function borrarError() {
      var formualrio =  document.forms[0];
 
      for (var i=o; i<formualrio.elements.length; i++){
          formualrio.elements[i].className="";
      }
 
 
 
         
     }
 
     //El resultado no es el esperado. Por razones de tiempo la validacion queda dada
     //por html y css. Planteare mis dudas en la clase de consulta.*/

    // TOMA 2: ACCION-----------------------------------------------------------------------------------------------------------------------------
    document.getElementById("enviarDatos").addEventListener("click", function (e) {


        let inputEmail = document.getElementById("mail");
        let inputPassword = document.getElementById("contraseña");
        let inputUser = document.getElementById("usuarioLogueado");
        let camposOk = true;

        if (inputEmail.value === '') {
            inputEmail.classList.add("invalid");
            camposOk = false;
        }

        if (inputPassword.value === '') {
            inputPassword.classList.add("invalid");
            camposOk = false;
        }

        if (inputUser.value === '') {
            inputUser.classList.add("invalid");
            camposOk = false;
        }


        if (camposOk) {

            localStorage.setItem('User-Logged', JSON.stringify({ email: inputUser.value }));
            window.location = 'cover.html';

        } else {
            alert("¡Debes ingresar los datos solicitados!");
        }

    });

});
