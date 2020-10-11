var productsArray = [];

function calcTotal() {
    let total = 0;
    let subs = document.getElementsByClassName("subTotal");

    for (let i = 0; i < subs.length; i++) {
        total += parseInt(subs[i].innerHTML);
    }
    document.getElementById("subTotal").innerHTML = total;
    calcEnvio();
}

function calcSubtotal(precioUnidad, i) {

    let cantidad = parseInt(document.getElementById(`cantidad${i}`).value);
    let subtotal = cantidad * precioUnidad;

    document.getElementById(`precioSubTotal${i}`).innerHTML = subtotal;
    calcTotal();
}

function cambioMoneda(moneda,precio) {
    if(moneda === "UYU"){
        return precio / 40;
    }else{
        return precio;
    }
}


function showProductsArray(array) {
    let contenido = "";

    for (let i = 0; i < array.length; i++) {

        let producto = array[i];

        let precioMoneda = cambioMoneda(producto.currency,producto.unitCost);
        let sub = producto.count * precioMoneda;

        contenido += `
            <tr>
                <td><img src='${producto.src}' width="50px" ></td>

                <td>${producto.name}</td>

                <td><input style="width:60px;" onchange="calcSubtotal(${producto.unitCost},${i})" 
                type="number" id="cantidad${i}" value="${producto.count}" min="1"></td>

                <th>USD</th>

                <td><span class="subTotal" id="precioSubTotal${i}" style="front-weight:bold;">${sub}</span></td>

            </tr>
        `;

        document.getElementById("list").innerHTML = contenido;
    }
    calcTotal();
}

function calcEnvio() {
    let total = parseInt(document.getElementById("subTotal").innerHTML);
    let envio;

    let elements = document.getElementsByName("envio");
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].checked) {
            envio = parseInt(elements[i].value);
        }
    }
    let costoEnvio = (total * envio)/100 ;
    let totalConEnvio = total + costoEnvio;

    let contenido = `
                    <tr>
                    <td>${total}</td>
                    <td>${costoEnvio}</td>
                    <td>${totalConEnvio}</td>
                    </tr>
                    `
                    document.getElementById("totalTotal").innerHTML= contenido;

}

document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(ALL_CART_BUY_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data.articles;

            showProductsArray(productsArray);
        
            calcEnvio();
        }
    });

    let elements = document.getElementsByName("envio");
    for (var i=0; i<elements.length; i++){
        elements[i].addEventListener("change",function () {
            calcEnvio();
        });
    }

});