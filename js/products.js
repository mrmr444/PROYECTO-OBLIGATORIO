/*/Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

});
*/

var categoriesArray =[];

function showCategoriesList(array) {
    
    let htmlContentToAppend = "";

    for(let i=0 ; i < array.length ; i++){

        let cateogry = array[i];
     /*htmlContentToAppend +=  '
     <div class="col-md-4">
                <img class="bd-placeholder-img card-img-top"  src="' + cateogry.imgSrc + '"  alt="'+ cateogry.description +'" >
                <h4 class="m-3" >' + cateogry.name + '</h4>
            <div class="card-body">
                  <p class="card-text">Costo :' cateogry.cost + " " + cateogry.currency '</p>
                  <p class="card-text">Vendidos 'cateogry.soldCount'</p>
                </div>
     </div> 
     
     '*/
      
        //probar otro codigo. andar anda.. pero no se que pasa con el array
     

    htmlContentToAppend += cateogry.name + '<br>';
    document.getElementById("products").innerHTML = htmlContentToAppend;        
    }
}

document.addEventListener("DOMContentLoaded",function(e) {
    
    getJSONData(LIST_URL).then(function(resultObj) {
        if (resultObj.status === "ok"){
            categoriesArray = resultObj.data;
            //muestro categorias ordenadas
            showCategoriesList(categoriesArray);
        }
    })
} )



