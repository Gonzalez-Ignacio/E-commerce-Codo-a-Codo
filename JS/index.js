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

// OffCanvas
const cards = document.querySelectorAll(".card-article");
const btnAgregar = document.querySelectorAll(".btn-agregar");
const carrito = [];

function crearCards(
    imgProduct,
    titleProduct,
    priceProduct,
    countProduct,
    index
) {
    // Div Contenedor de Card
    const $createDivContainerCard = document.createElement("div");
    $createDivContainerCard.classList.add("cards-carrito-container");
    $createDivContainerCard.classList.add("row");
    $createDivContainerCard.classList.add("mt-2");
    $createDivContainerCard.setAttribute("data-index", index);
    // $createDivContainerCard.setAttribute("data-price", price);
    // $createDivContainerCard.setAttribute("data-count", count);

    // Div contenedor de Imagen, titulo y botones sumar/restar
    $createDivProduct = document.createElement("div");
    $createDivProduct.classList.add("row");
    $createDivProduct.classList.add("col-7");


    $createDivImg = document.createElement("div");
    $createDivImg.classList.add("col-4");

    $createDivTitleCount = document.createElement("div");
    $createDivTitleCount.classList.add("col-8");


    //Div contenedor de Boton Eliminar y Precio
    $createDivSubTotal = document.createElement("div");
    $createDivSubTotal.classList.add("row");
    $createDivSubTotal.classList.add("col-5");

    $createDivPrice = document.createElement("div");
    $createDivPrice.classList.add("col-9");
    
    $createDivBtnEliminar = document.createElement("div");
    $createDivBtnEliminar.classList.add("col-3");


    // Img
    $createImg = document.createElement("img");
    $createImg.classList.add("carrito-card-img");
    $createImg.setAttribute("src", imgProduct);
    // Title
    $createTitle = document.createElement("h5");
    $createTitle.classList.add("carrito-card-title");
    $createTitle.textContent = titleProduct;
    // Price
    $createPrice = document.createElement("p");
    $createPrice.classList.add("carrito-card-price");
    $createPrice.textContent = "$ " + priceProduct;
    // Count
    $createDivContainerCardCantidad = document.createElement("div");
    $createDivContainerCardCantidad.classList.add("carrito-card-count");
    $createDivContainerCardCantidad.classList.add("text-center");


    $createButtonRestarCantidad = document.createElement("button");
    $createButtonRestarCantidad.classList.add("btn-restar-carrito");
    $createButtonRestarCantidad.textContent = "-";

    $createSpanCantidad = document.createElement("span");
    $createSpanCantidad.classList.add("span-cantidad-carrito");
    $createSpanCantidad.classList.add("px-1");
    $createSpanCantidad.textContent = countProduct;

    $createButtonSumarCantidad = document.createElement("button");
    $createButtonSumarCantidad.classList.add("btn-sumar-carrito");
    $createButtonSumarCantidad.textContent = "+";

    //Agregar boton Eliminar
    $createButtonEliminar = document.createElement("button");
    $createButtonEliminar.classList.add("btn-eliminar-carrito");
    $createButtonEliminar.innerHTML = '<i class="bi bi-trash"></i>';

    //Agregar items al Div del carrito
    $createDivContainerCard.appendChild($createDivProduct);
    $createDivContainerCard.appendChild($createDivSubTotal);
    
    //Agregar imagen, title, price y count
    $createDivProduct.appendChild($createDivImg);
    $createDivProduct.appendChild($createDivTitleCount);

    $createDivImg.appendChild($createImg);
    $createDivTitleCount.appendChild($createTitle);
    $createDivTitleCount.appendChild($createDivContainerCardCantidad);
    // $createDivContainerCard.appendChild($createDivProduct);
    
    //Agregar BotonEliminar a respectivo Div
    $createDivSubTotal.appendChild($createDivPrice);
    $createDivSubTotal.appendChild($createDivBtnEliminar);
    
    $createDivPrice.appendChild($createPrice);
    $createDivBtnEliminar.appendChild($createButtonEliminar);
    

    // Agregar items al Div de "Cantidad"
    $createDivContainerCardCantidad.appendChild($createButtonRestarCantidad);
    $createDivContainerCardCantidad.appendChild($createSpanCantidad);
    $createDivContainerCardCantidad.appendChild($createButtonSumarCantidad);

    //Mostrar en Carrito
    document.querySelector("#carrito-card-container").appendChild($createDivContainerCard);
}

btnAgregar.forEach((button, index) => {
    button.addEventListener("click", () => {
        // Obtener link img
        const imgProduct = cards[index].querySelector(".card-article img").src;
        console.log(imgProduct);

        //Obtener title
        const titleProduct =
            cards[index].querySelector(".card-article h5").textContent;
        console.log(titleProduct);

        // Obtener Precio
        const priceProductText = cards[index].querySelector(".card-article p span").textContent;
        const priceProduct = parseInt(priceProductText.replace(/\D/g, ''));
        console.log(priceProduct);

        //Verificar que exista el producto
        const productExisting = carrito.findIndex(
            (product) => product.title === titleProduct
        );
        if (productExisting !== -1) {
            // Mostrar offCanvas si el producto ya existe
            mostrarOffcanvas();
        } else {
            carrito.push({
                image: imgProduct,
                title: titleProduct,
                price: priceProduct,
                count: 1,
            });

            //Buscar en el Carrito para pasar "product.count"
            const product = carrito.find(
                (product) => product.title === titleProduct
            );
            //Crear Cards
            crearCards(
                imgProduct,
                titleProduct,
                priceProduct,
                product.count,
                index
            );
            // Controlar botones de Sumar y Restar cantidad de productos
            buttonsCarrito();
        }
    });
});

function buttonsCarrito() {
    // Boton Sumar y Restar cantidad de productos
    const btnRestar = document.querySelectorAll(".btn-restar-carrito");
    const btnSumar = document.querySelectorAll(".btn-sumar-carrito");
    const cantidad = document.querySelectorAll(".span-cantidad-carrito");
    const precio = document.querySelectorAll(".carrito-card-price");

    btnRestar.forEach((btnRestarProducto, index) => {
        btnRestarProducto.addEventListener("click", () => {
            if (carrito[index].count > 1) {
                carrito[index].count--;
                cantidad[index].textContent = carrito[index].count;
                $createPrice.textContent =
                    "$ " + carrito[index].price * carrito[index].count;
            }
        });
    });

    btnSumar.forEach((btnSumarProducto, index) => {
        btnSumarProducto.addEventListener("click", () => {
            carrito[index].count++;
            cantidad[index].textContent = carrito[index].count;
            $createPrice.textContent =
                "$ " + carrito[index].price * carrito[index].count;
            console.log("btn Sumar -->",cantidad[index].textContent);
        });
    });

    // Eliminar Div Carrito
    const btnEliminar = document.querySelectorAll(".btn-eliminar-carrito");
    btnEliminar.forEach((btnEliminar, index) => {
        btnEliminar.addEventListener("click", () => {
            // Eliminar Div
            const deleteElement = btnEliminar.closest(".cards-carrito-container");
            deleteElement.remove();
            // Eliminar de la lista Carrito
            carrito.splice(index, 1);
            // Actualizar data-index de los elementos restantes
            document
                .querySelectorAll(".cards-carrito-container")
                .forEach((card, newIndex) => {
                    card.setAttribute("data-index", newIndex);
                });
            // Volver a enlazar los eventos de los botones con los nuevos índices
            buttonsCarrito();
        });
    });
}

function mostrarOffcanvas() {
    // Mostrar Carrito de compras
    const offcanvas = new bootstrap.Offcanvas(
        document.getElementById("offcanvasWithBothOptions")
    );
    offcanvas.show();
}
