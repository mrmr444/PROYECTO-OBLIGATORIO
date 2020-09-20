var producto = {};
var comentariosArray = [];
var productosArray =[];

//------------------------------------------------------------------------------------------------------------

function showRelatedProducts(arrayProductos, arrayRelacionados){
    let content ='<hr>';

    arrayRelacionados.forEach(function(i) {

        content += 'Título: ' + arrayProductos[i].name + '<br>';
        content += '<img class="img" src="'+ arrayProductos[i].imgSrc +'" width="150px" alt=""><br>';
        content +='Precio: ' + arrayProductos[i].cost +'<br><hr><br>' ;
        
        
    });

    document.getElementById("relacionados").innerHTML= content;
}

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
    document.getElementById("comentarios").innerHTML = comentarios;


    document.getElementById("imag1").src = producto.images[0];
    document.getElementById("imag2").src = producto.images[1];
    document.getElementById("imag3").src = producto.images[2];
    document.getElementById("imag4").src = producto.images[3];
    document.getElementById("imag5").src = producto.images[4];

}
//intervalo-------------------------------------------------------------------------------------------------

$('.carousel').carousel({
    interval: 2000
  })

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

            //muestro producto y comentario
            showProduct(producto, comentariosArray);
        }
    });

    getJSONData(LIST_URL).then(function (resultObj) {
        if (resultObj.status === "ok"){
            productosArray = resultObj.data;

            //muestro productos relacionados
            showRelatedProducts(productosArray, producto.relatedProducts);
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
