var producto = {};
var comentariosArray = [];
//------------------------------------------------------------------------------------------------------------
function showProduct(producto, arrayComments) {


    let contenido = "";
    let imgs = "";
    let comentarios = "<hr>";

    contenido += `
        <h1> ${producto.name} </h1><br>
        <p> ${producto.description} </p><br>
        <strong> ${producto.currency}  ${producto.cost} </strong><br><br>
        <small styile="float:left;"> Categoria:  ${producto.category} </small>
        <small styile="float:right;"> Vendidos:  ${producto.soldCount}  </small>
        `;


    imgs += `
            <img class="img" src="${producto.images[0]}"  width="150px" height="150px" alt="">
            <img class="img" src="${producto.images[1]}"  width="150px" height="150px" alt="">
            <img class="img" src="${producto.images[2]}"  width="150px" height="150px" alt="">
            <img class="img" src="${producto.images[3]}"  width="150px" height="150px" alt="">
            <img class="img" src="${producto.images[4]}"  width="150px" height="150px" alt="">
         `;

    arrayComments.forEach(function (comment) {
        let puntos = "";

        comentarios += `
                <strong> ${comment.user} </strong> dice: <br>
                <p> ${comment.description} </p>
                `;


        for (let i = 1; i <= comment.score; i++) {
            puntos += ` <span class="fa fa-star checked"></span> `;
        }

        for (let i = comment.score + 1; i <= 5; i++) {
            puntos += ` <span class="fa fa-star"></span> `;
        }

        comentarios += ` <sub> ${comment.dateTime} </sub><br> `;

        comentarios += ` <div style="text-align: right"> ${puntos} </div><br><hr> `;
    });

    document.getElementById("contenido").innerHTML = contenido;
    document.getElementById("imagenes").innerHTML = imgs;
    document.getElementById("comentarios").innerHTML = comentarios;

}


//-------------------------------------------------------------------------------------------------------------


document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            comentariosArray = resultObj.data;

        }
    });

    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            producto = resultObj.data;

            //muestro categorias ordenadas
            showProduct(producto, comentariosArray);
        }
    });


    //---------------------------------------------------------------------------------------------------------------

    let userLogged = localStorage.getItem('User-Logged');
    if (userLogged) {
        document.getElementById("nuevoComentario").style = "display:inline-block; width:100%;";
    }

    document.getElementById("enviarComentario").addEventListener("click", function () {
        let now = new Date();

        let dateTime = ` ${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} `;
        dateTime += ` ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} `;

        let newComment = {
            score: parseInt(document.getElementById("nuevaCalificacion").value),
            description: document.getElementById("newComment").value,
            user: JSON.parse(localStorage.getItem('User-Logged')).email,
            dateTime: dateTime
        }

        comentariosArray.push(newComment);
        showProduct(producto, comentariosArray);


    });

});
