//-constantes de orden-------------------------------------------------------------------------------------------------

const ORDER_ASC_BY_PPROD = "prod->PROD";
const ORDER_DESC_BY_PROD = "PROD->prod";
const ORDER_DESC_BY_SOLDCOUNT = "SOL->sol";

//---------------------------------------------------------------------------------------------------------------------

var categoriesArray = [];
let maxProducts = undefined;
let minProducts = undefined;

//----------------------------------------------------------------------------------------------------------------------
function sortProducts(criterio, array) {

    if (criterio === ORDER_ASC_BY_PPROD) {
        result = array.sort(function (a, b) {// a y b son elementos del array
            if (a.cost < b.cost) { return -1; } // a y b son objetos dentro del array de elementos. esos elementos son los del all.json
            if (a.cost > b.cost) { return 1; } // cost es una caract de cada objeto del json
            return 0;
        });
                                
    } else if (criterio === ORDER_DESC_BY_PROD) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) {
                return -1;
            }

            if (a.cost < b.cost) {
                return 1;
            }

            return 0;
        });

    } else if (criterio === ORDER_DESC_BY_SOLDCOUNT) {
        result = array.sort(function (a, b) {
            if (a.soldCount > b.soldCount) {
                return -1;
            }

            if (a.soldCount < b.soldCount) {
                return 1;
            }

            return 0;
        });
    }

    return result;
}
//----------------------------------------------------------------------------------------------------------------------

function verProducto(id) {
    localStorage.setItem('producto', JSON.stringify({productoId: id}));
    window.location ='product-info.html';
}

//----------------------------------------------------------------------------------------------------------------------

function showCategoriesList(array) {

    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let product = array[i];

        if (((minProducts == undefined) || (minProducts != undefined && parseInt(product.cost) >= minProducts)) &&
            ((maxProducts == undefined) || (maxProducts != undefined && parseInt(product.cost) <= maxProducts))) {

            htmlContentToAppend +=  `
                                        <div class="col-md-6 col-lg-4 mt-5 card" style="width: 18rem;">
                                            <div class="row m-3">
                                            <img class="card-img-top" src="${product.imgSrc}" alt="Card image cap">
                                            </div>
                                            <div class="card-body">
                                                <h5 class="card-title">${product.name}</h5>
                                                <p class="card-text">${product.description}</p>
                                            </div>
                                                <ul class="list-group list-group-flush">
                                                
                                                    <h5 class="mb-1" style="text-align:center;">`+ product.currency + product.cost + `</h5>
                                                    <small class="text-muted">` + product.soldCount + ` artículos</small> 
                                                
                                                </ul>
                                            <div class="card-body">
                                                <button style="float: center;" onclick="verProducto(` + product.id + ` )">Mas Información</button>
                                            </div>
                                        </div>

                                    `


        }
        document.getElementById("products").innerHTML = htmlContentToAppend;
    }
}

//--------------------------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(LIST_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            categoriesArray = resultObj.data;

            categoriesArray = sortProducts(ORDER_ASC_BY_PPROD, categoriesArray);

            //muestro categorias ordenadas
            showCategoriesList(categoriesArray);
        }
    });


    //----------------------------------------------------------------------------------------------------------------

    document.getElementById("precioAsc").addEventListener("click", function () {

        categoriesArray = sortProducts(ORDER_ASC_BY_PPROD, categoriesArray);

        showCategoriesList(categoriesArray);
    });

    //-----------------------------------------------------------------------------------------------------------------

    document.getElementById("precioDesc").addEventListener("click", function () {

    categoriesArray = sortProducts(ORDER_DESC_BY_PROD, categoriesArray);

        showCategoriesList(categoriesArray);
    });

    //-----------------------------------------------------------------------------------------------------------------

    document.getElementById("vendidoDesc").addEventListener("click", function () {

        categoriesArray = sortProducts(ORDER_DESC_BY_SOLDCOUNT, categoriesArray);

        showCategoriesList(categoriesArray);
    });

    //-----------------------------------------------------------------------------------------------------------------


    document.getElementById("rangeFilterCount").addEventListener("click", function () {

        minProducts = document.getElementById("rangeFilterCountMin").value;
        maxProducts = document.getElementById("rangeFilterCountMax").value;

        if ((minProducts != undefined) && (minProducts != "") && (parseInt(minProducts)) >= 0) {
            minProducts = parseInt(minProducts);
        } else {
            minProducts = undefined;
        }

        if ((maxProducts != undefined) && (maxProducts != "") && (parseInt(maxProducts)) >= 0) {
            maxProducts = parseInt(maxProducts);
        } else {
            maxProducts = undefined;
        }

        showCategoriesList(categoriesArray);
    });


    //------------------------------------------------------------------------------------------------------------------


    document.getElementById("clearRangeFilter").addEventListener("click", function () {

        minProducts = document.getElementById("rangeFilterCountMin").value = "";
        maxProducts = document.getElementById("rangeFilterCountMax").value = "";
        minProducts = undefined;
        maxProducts = undefined;

        showCategoriesList(categoriesArray);
    });

});




