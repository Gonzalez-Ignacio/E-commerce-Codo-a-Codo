const botonBusqueda = document.getElementById("button-search");
const sugerencias = ["velas", "homespray", "difusores"];

// Search
function mostrarBusqueda(event) {
    event.preventDefault();
    let inputSearch = document.getElementById("buscar").value.toLowerCase(); // Convertir el valor de entrada a minúsculas

    if (inputSearch === "") {
        alert("Debe ingresar un valor");
    } else if (inputSearch == "velas") {
        // Utilizar "else if" para evitar evaluaciones innecesarias
        window.location.href = "/products/candles/candles.html";
    } else if (inputSearch == "homespray") {
        window.location.href = "/products/homeSpray/homeSpray.html";
    } else if (inputSearch == "difusores") {
        window.location.href = "products/diffusers/diffusers.html";
    } else {
        alert("No se encontraron resultados para la búsqueda: " + inputSearch); // Agregar una alerta para manejar entradas no válidas
    }
}

botonBusqueda.addEventListener("click", mostrarBusqueda);

// OFFCANVAS
const cards = document.querySelectorAll(".cards");
const btnAgregar = document.querySelectorAll(".btn-agregar");
const carrito = [];
let precioTodosProductos = 0;

// Iterar en cada botón de las cards
btnAgregar.forEach((boton, index) => {
    boton.addEventListener("click", () => {
        // Obtener Link de imagen
        const imgCard = cards[index].querySelector(".main-image-product").src;
        const imagenProduct = imgCard;
        console.log(imagenProduct);

        // Obtener Título
        const titleCard = cards[index].querySelector(".card-title span");
        const titleProduct = titleCard.textContent;
        console.log(titleProduct);

        // Obtener Precio
        const priceCardText = cards[index].querySelector(".product-price");
        const priceText = priceCardText.textContent;
        const priceProduct = parseInt(priceText.replace(/\D/g, ""));
        console.log(priceProduct);

        // Verificamos si el producto ya existe o no
        const productExisting = carrito.findIndex(
            (product) => product.titulo === titleProduct
        );

        if (productExisting !== -1) {
            const amount = carrito[productExisting];
            amount.cantidad++;
        } else {
            // Guardar los productos en el carrito
            carrito.push({
                imagen: imgCard,
                titulo: titleProduct,
                precio: priceProduct,
                cantidad: 1,
            });
        }

        // Eliminar o Agregar clase "fixed" para el botón de Comprar
        claseDeBotonComprar();
        // Agregar "div" Precio Total
        agregarPrecioTotal();
        // Llamar Función para renderizar las cards dentro del carrito de compras.
        renderCard();
    });
});

// Div renderizado dentro del div vacío
function renderCard() {
    const cardProduct = carrito
        .map(
            (product) => `
                <div class="container-carrito">
                    <div class="columna-carrito">
                        <img class="imagen-producto" src="${product.imagen}">
                    </div>
                    <div class="columna-carrito">
                        <div class="fila-carrito">
                            <h3 class="titulo-producto">${product.titulo}</h3>
                        </div>
                        
                        <div class="fila-carrito">
                            <p class="precio-producto">${
                                product.precio * product.cantidad
                            }</p>
                        </div>
                        
                        <div class="fila-carrito">
                            <div id="carrito-cantidad">
                                <button class="cantidad-restar">-</button>
                                <span class="cantidad-producto">${
                                    product.cantidad
                                }</span>
                                <button class="cantidad-sumar">+</button>
                            </div>
                        </div>
                    </div>
                    <div class="">
                        <img class="imagen-eliminar" src="https://cdn-icons-png.flaticon.com/512/1214/1214594.png">
                    </div>
                </div>
            `
        )
        .join("");
    // Renderizar el producto dentro del div vacío
    const productEat = document.querySelector(".producto-comida");
    productEat.innerHTML = cardProduct;

    // Llamar botón de restar y sumar la cantidad de productos
    const btnRestar = document.querySelectorAll(".cantidad-restar");
    const btnSumar = document.querySelectorAll(".cantidad-sumar");
    const btnEliminar = document.querySelectorAll(".imagen-eliminar");

    // Restar Producto
    btnRestar.forEach((btnRestarProducto, index) => {
        btnRestarProducto.addEventListener("click", () => {
            const amount =
                document.querySelectorAll(".cantidad-producto")[index]; // [index] para que itere en todas las cards y no solo la primera
            let amountProduct = parseInt(amount.textContent);
            // Mientras que sea mayor a uno (para que el producto no diga "0")
            if (amountProduct > 1) {
                amountProduct--;
                amount.textContent = amountProduct;
                carrito[index].cantidad = amountProduct;
                const precioTotalProducto =
                    carrito[index].cantidad * carrito[index].precio;
                // Actualiza el precio en el HTML
                const precioElement =
                    document.querySelectorAll(".precio-producto")[index];
                precioElement.textContent = `$${precioTotalProducto}`;
                agregarPrecioTotal();
            }
        });
    });

    // Sumar Producto
    btnSumar.forEach((btnSumaProducto, index) => {
        btnSumaProducto.addEventListener("click", () => {
            carrito[index].cantidad++;
            const precioTotalProducto =
                carrito[index].cantidad * carrito[index].precio;
            // Actualiza el precio en el HTML
            const priceRender =
                document.querySelectorAll(".precio-producto")[index];
            priceRender.textContent = `$${precioTotalProducto}`;
            const amountRender =
                document.querySelectorAll(".cantidad-producto")[index];
            amountRender.textContent = carrito[index].cantidad;
            agregarPrecioTotal();
        });
    });

    // Eliminar Producto
    btnEliminar.forEach((btnEliminarProducto, index) => {
        btnEliminarProducto.addEventListener("click", () => {
            // Eliminación de contenedor
            const deleteElement =
                document.querySelectorAll(".container-carrito")[index];
            deleteElement.remove();
            // Actualiza el carrito y el precio total
            carrito.splice(index, 1);
            agregarPrecioTotal();
            claseDeBotonComprar();
        });
    });

    // Actualizar clase del botón "Carrito de Compras Vacío"
    claseDeBotonComprar();
}

// Guardar Precio Total
function agregarPrecioTotal() {
    const divPrecioTotal = document.getElementById("precio-total");
    if (carrito.length > 0) {
        precioTodosProductos = 0;

        for (const productosTotal of carrito) {
            precioTodosProductos += productosTotal.precio * productosTotal.cantidad
        }
        const renderPrecioTotal = () => {
            return `
            <div class="container-precio-total"> 
                <span class="texto-precio-total"> Precio Total: </span>
                <span class="precio-total"> $${precioTodosProductos} </span>
            </div>
            `
        }
        divPrecioTotal.innerHTML = renderPrecioTotal(precioTodosProductos)
    } else {
        divPrecioTotal.innerHTML = ""
    }
    renderCard()
}

// Eliminar o agregar clase de boton comprar
function claseDeBotonComprar() {
    const btnCarritoVacio = document.querySelector(".carrito-vacio");
    if (carrito.length === 0) {
        btnCarritoVacio.classList.remove("fixed");
        btnCarritoVacio.classList.add("btn-carrito")
        btnCarritoVacio.textContent = "Carrito de Compras Vacío"
    } else {
        btnCarritoVacio.classList.remove("btn-carrito")
        btnCarritoVacio.classList.add("fixed");
        btnCarritoVacio.textContent = "Finalizar Compra"
    }
}


// Boton Comprar
const comprarButton = document.querySelector(".carrito-vacio");
comprarButton.addEventListener("click", () => {
    const totalCompra = carrito.reduce(
        (acc, product) => acc + product.precio * product.cantidad,
        0
    );

    if (totalCompra > 0) {
        // fetch a tabla itemsPedidos
        console.log("Probando")
    }
});