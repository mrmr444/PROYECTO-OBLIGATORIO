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


function cambioMoneda(moneda, precio) {
    if (moneda === "UYU") {
        return precio / 40;
    } else {
        return precio;
    }
}


function showProductsArray(array) {
    let contenido = "";


    for (let i = 0; i < array.length; i++) {

        let producto = array[i];

        let precioMoneda = cambioMoneda(producto.currency, producto.unitCost);
        let sub = producto.count * precioMoneda;

        contenido += `
            <tr>
                <td><img src='${producto.src}' width="90px" ></td>

                <td>${producto.name}</td>   

                <td> ${producto.currency} ${producto.unitCost}</td>

                <td><input style="width:60px;" onchange="calcSubtotal(${precioMoneda},${i})" 
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
    let costoEnvio = (total * envio) / 100;
    let totalConEnvio = total + costoEnvio;

    let contenido = `
                    <tr>
                    <td>${total}</td>
                    <td>${costoEnvio}</td>
                    <td>${totalConEnvio}</td>
                    </tr>
                    `
    document.getElementById("totalTotal").innerHTML = contenido;

}

function seleccionarPago() {

    var tipoPago = document.getElementsByName("formaPago");

    for (var i = 0; i < tipoPago.length; i++) {
        if (tipoPago[i].checked && tipoPago[i].value == "1") {
            document.getElementById("datosTarjeta").classList.remove("d-none");
            document.getElementById("datosBanco").classList.add("d-none");
        } else if (tipoPago[i].checked && tipoPago[i].value == "2") {
            document.getElementById("datosTarjeta").classList.add("d-none");
            document.getElementById("datosBanco").classList.remove("d-none");
        }
    }
}

function pagoValidado() {
    let formaPago = document.getElementsByName("formaPago");
    let numTarjeta = document.getElementById("numTarjeta").value;
    let titularTarjeta = document.getElementById("titularTarjeta").value;
    let codigoTarjeta = document.getElementById("codigoTarjeta").value;
    let cuenta = document.getElementById("cuenta").value;
    let sucursal = document.getElementById("sucursal").value;
    let titularCuenta = document.getElementById("titularCuenta").value;
    let pagoValido = true;

    for (var i = 0; i < formaPago.length; i++) {
        if (formaPago[i].checked && (formaPago[i].value) == "1") {
            if (numTarjeta == "" || titularTarjeta == "" || codigoTarjeta == "") {
                pagoValido = false;
            } else {
                pagoValido = true;
            }

        } else if (formaPago[i].checked && (formaPago[i].value) == "2") {
            if (cuenta == "" || sucursal == "" || titularCuenta == "") {
                pagoValido = false;
            } else {
                pagoValido = true;
            }
        }

    }
    return pagoValido;
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
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener("change", function () {
            calcEnvio();
        });
    }

    let tipoPago = document.getElementsByName("formaPago");
    for (var i = 0; i < tipoPago.length; i++) {
        tipoPago[i].addEventListener("change", function () {
            seleccionarPago();
        });
    }



    let form = document.getElementById('needs-validation');
  


    form.addEventListener('submit', function(e) {

        if (form.checkvalidity() === false) {
            e.preventDefault();
            e.stopPropagation();

            if (pagoValidado()) {
                document.getElementById("btn-modal").classList.remove("btn-primary");
                document.getElementById("btn-modal").classList.remove("btn-danger");
                document.getElementById("btn-modal").classList.add("btn-success");

                document.getElementById("datosValidados").innerHTML = `
                <div class="alert alert alert-success" role="alert">
                <strong>Forma de pago ingresada!</strong>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
                `;

            } else {
                e.preventDefault();
                e.stopPropagation();

                document.getElementById("btn-modal").classList.remove("btn-primary");
                document.getElementById("btn-modal").classList.add("btn-danger");
                document.getElementById("btn-modal").classList.remove("btn-success");

                document.getElementById("datosValidados").innerHTML = `

                <div class="alert alert alert-danger" role="alert">
                <strong>Debe ingresar una forma de pago!</strong>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
                `;
            }


        } else {

            if (pagoValidado()) {
                document.getElementById("contenidoCarrito").innerHTML = `
            <div class="alert alert alert-success" role="alert">
            <strong>Felicitaciones!</strong> La compra se ha realizado con exito.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div> 
            `;

            } else {
                e.preventDefault();
                e.stopPropagation();

                document.getElementById("btn-modal").classList.remove("btn-primary");
                document.getElementById("btn-modal").classList.add("btn-danger");
                document.getElementById("btn-modal").classList.remove("btn-success");

                document.getElementById("datosValidados").innerHTML = `
                <div class="alert alert alert-danger" role="alert">
                <strong>Debe ingresar una forma de pago!</strong>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
                `;

            }


        }

        form.classList.add('was-validated');

    });


});