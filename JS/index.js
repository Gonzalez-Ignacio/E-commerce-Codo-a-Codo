const botonBusqueda = document.getElementById("button-search");
const sugerencias = ["velas", "home-spray", "difusores"];

// Search
function mostrarBusqueda(event) {
    event.preventDefault();
    let inputSearch = document.getElementById("buscar").value.toLowerCase(); // Convertir el valor de entrada a minúsculas

    if (inputSearch === "") {
        alert("Debe ingresar un valor");
    } else if (inputSearch == "velas") {
        // Utilizar "else if" para evitar evaluaciones innecesarias
        window.location.href = "/productos/velas/velas.html";
    } else if (inputSearch == "homespray") {
        window.location.href = "/productos/home-spray/home-spray.html";
    } else if (inputSearch == "difusores") {
        window.location.href = "/productos/difusores/difusores.html";
    } else {
        alert("No se encontraron resultados para la búsqueda: " + inputSearch); // Agregar una alerta para manejar entradas no válidas
    }
}

botonBusqueda.addEventListener("click", mostrarBusqueda);

// OffCanvas
const cards = document.querySelectorAll(".card-article");
const btnAgregar = document.querySelectorAll(".btn-agregar");
const carrito = [];

function crearCards(imgProduct, titleProduct, priceProduct, countProduct, index) {
    // Div
    const $createDiv = document.createElement("div");
    $createDiv.classList.add("cards-carrito");
    $createDiv.setAttribute("data-index", index);
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
    $createDivCantidad = document.createElement("div");
    $createDivCantidad.classList.add("carrito-card-count");

    $createButtonRestarCantidad = document.createElement("button");
    $createButtonRestarCantidad.classList.add("btn-restar-carrito");
    $createButtonRestarCantidad.textContent = "-";

    $createSpanCantidad = document.createElement("span");
    $createSpanCantidad.classList.add("span-cantidad-carrito");
    $createSpanCantidad.textContent = countProduct;

    $createButtonSumarCantidad = document.createElement("button");
    $createButtonSumarCantidad.classList.add("btn-sumar-carrito");
    $createButtonSumarCantidad.textContent = "+";
    
    //Agregar boton Eliminar
    $createButtonEliminar = document.createElement("button");
    $createButtonEliminar.classList.add("btn-eliminar-carrito");
    $createButtonEliminar.innerHTML = '<i class="bi bi-trash"></i>';


    //Agregar items al Div del carrito
    $createDiv.appendChild($createImg);
    $createDiv.appendChild($createTitle);
    $createDiv.appendChild($createPrice);
    $createDiv.appendChild($createDivCantidad);
    $createDiv.appendChild($createButtonEliminar);
    

    // Agregar items al Div de "Cantidad"
    $createDivCantidad.appendChild($createButtonRestarCantidad);
    $createDivCantidad.appendChild($createSpanCantidad);
    $createDivCantidad.appendChild($createButtonSumarCantidad);


    //Mostrar en Carrito
    document.querySelector("#carrito-card-container").appendChild($createDiv);
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
        const priceProduct = parseInt(
            cards[index].querySelector(".card-article p span").textContent
        );
        console.log(priceProduct);

        //Verificar que exista el producto
        const productExisting = carrito.findIndex(
            (product) => product.title === titleProduct
        );
        if (productExisting !== -1) {
            //Sumar en 1 la cantidad del producto
            amount = carrito[productExisting];
            amount.count++;
            console.log(carrito);
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
            crearCards(imgProduct, titleProduct, priceProduct, product.count, index);
        }

        // Controlar botones de Sumar y Restar cantida de productos
        buttonsCarrito()
    });
});



function buttonsCarrito() {
  // Boton Sumar y Restar cantidad de productos
  const btnRestar = document.querySelectorAll(".btn-restar-carrito");
  const btnSumar = document.querySelectorAll(".btn-sumar-carrito");
  const cantidad = document.querySelectorAll(".span-cantidad-carrito");
  
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
          console.log(cantidad[index].textContent);
          console.log("hola");
      });
  });

  // Eliminar Div Carrito
  const btnEliminar = document.querySelectorAll(".btn-eliminar-carrito");
  btnEliminar.forEach((btnEliminar, index) => {
    btnEliminar.addEventListener("click", () => {
        // Eliminar Div
        const deleteElement = btnEliminar.closest('.cards-carrito');
        deleteElement.remove();
        // Eliminar de la lista Carrito
        carrito.splice(index, 1);
        // Actualizar data-index de los elementos restantes
        document.querySelectorAll('.cards-carrito').forEach((card, newIndex) => {
            card.setAttribute('data-index', newIndex);
        });
        // Volver a enlazar los eventos de los botones con los nuevos índices
        buttonsCarrito();
    });
});
}
