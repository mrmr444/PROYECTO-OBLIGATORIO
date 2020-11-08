

document.addEventListener("DOMContentLoaded", function (e) {
     
    var mostrarDatos = localStorage.getItem('perfil');

    if(mostrarDatos){
        mostrarDatos = JSON.parse(mostrarDatos);

        document.getElementById("perfilNombre").value = mostrarDatos.nombre;
        document.getElementById("perfilApellidos").value = mostrarDatos.apellido;
        document.getElementById("perfilEdad").value = mostrarDatos.edad;
        document.getElementById("perfilEmail").value = mostrarDatos.mail;
        document.getElementById("perfilCelular").value = mostrarDatos.celular;
        document.getElementById("urlPerfil").value = mostrarDatos.imgUrl;

        if(mostrarDatos.imgUrl!=""){

            document.getElementById("imag").src = mostrarDatos.imgUrl;
        }
    }
    

    
    document.getElementById("guardarCambios").addEventListener("click",function (e) {

    let pasoValidacion = true;
    
    let nombre = document.getElementById("perfilNombre");
    let apellido =document.getElementById("perfilApellidos");
    let edad =document.getElementById("perfilEdad");
    let eMail =document.getElementById("perfilEmail");
    let celular =document.getElementById("perfilCelular");
    let imgUrl =document.getElementById("urlPerfil");

    if(nombre.value === ''){
        nombre.classList.add("is-invalid");
        pasoValidacion = false;
    }else{
        nombre.classList.remove("is-invalid");
    }

    if(apellido.value === ''){
        apellido.classList.add("is-invalid");
        pasoValidacion = false;
    }else{
        apellido.classList.remove("is-invalid");
    }

    if(edad.value === ''){
        edad.classList.add("is-invalid");
        pasoValidacion = false;
    }else{
        edad.classList.remove("is-invalid");
    }

    if(eMail.value === ''){
        eMail.classList.add("is-invalid");
        pasoValidacion = false;
    }else{
        eMail.classList.remove("is-invalid");
    }

    if(celular.value === ''){
        celular.classList.add("is-invalid");
        pasoValidacion = false;
    }else{
        celular.classList.remove("is-invalid");
    }

    if(pasoValidacion){
        localStorage.setItem('perfil',JSON.stringify({
            imgUrl: imgUrl.value,
            nombre: nombre.value,
            apellido: apellido.value,
            edad: edad.value,
            mail: eMail.value,
            celular: celular.value
        }));

        window.location ="my-profile.html";
    }

});    
});