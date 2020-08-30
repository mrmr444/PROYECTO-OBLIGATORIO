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

function showCategoriesList(array) {

    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let product = array[i];

        if (((minProducts == undefined) || (minProducts != undefined && parseInt(product.cost) >= minProducts)) &&
            ((maxProducts == undefined) || (maxProducts != undefined && parseInt(product.cost) <= maxProducts))) {

            htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">  
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ product.name + `</h4>
                        <small class="text-muted">` + product.soldCount + ` artículos</small> 
                    </div>
                     <h6 class="mb-1" style="text-align:left;">`+ product.description + `</h6>
                     <h5 class="mb-1" style="text-align:left;">`+ product.currency + product.cost + `</h5>
                </div>
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




