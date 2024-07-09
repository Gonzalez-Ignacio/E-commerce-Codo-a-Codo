const containerProducts = document.querySelector("section.products")

let listOfProducts = [];

// Definimos una función async para usar await
async function getProducts() {
    try {
        const response = await fetch('http://localhost:3000/productos');
        const data = await response.json();
        listOfProducts = data.map(product => {

            const priceString = Number(product.precio).toLocaleString('es-ES')
            const price = priceString.length === 4
                ? priceString.slice(0, 1) + '.' + priceString.slice(1)
                : priceString;

            return {
                productName: product.nombre,
                price: price,
                img: product.dirImagen,
                link: product.link,
                alt: product.nombre.toLowerCase().replace(' ', '-'),
                category: product.categoria,
                newArticle: product.nuevoArticulo,
                stock: product.stock,
            };
        });

    } catch (error) {
        console.error('Error al obtener productos:', error);
    }
}


// Llamamos a la función y luego usamos el resultado
getProducts().then(() => {

    //funcion que muestra los productos que estan dentro de un array específico
    const displayProducts = (productsToShow) => {
        containerProducts.innerHTML = ""
        productsToShow.forEach(product => {
            let classNewProd = ''
            let containerNewProd = ''
            let thereIsStock
            let linkProduct
            let linkImage

            // comprueba si el articulo es nuevo o no, y si lo es, agrega contenido en el InnerHTML
            if (product.newArticle == 'si') {
                classNewProd = 'class="new-product"'
                containerNewProd = `
                <div>
                    <span>NUEVO</span>
                </div>
            `
            }

            // dependiendo si hay stock del producto, agrega contenido diferente en el InnerHTML
            if (product.stock == 'si') {
                thereIsStock = '<button type="submit" class="btn-agregar">Agregar al carrito</button>'
            } else {
                thereIsStock = '<div class="exhausted">SIN STOCK</div>'
            }

            // las cards de los productos acceden a los productos individuales con el link que le corresponde
            if (containerProducts.id === "allProducts") {
                linkProduct = "." + product.link
            } else {
                linkProduct = ".." + product.link
            }

            // las cards acceden a la imagen del producto que le corresponde 
            if (containerProducts.id === "allProducts") {
                linkImage = "../images/" + product.img
            } else {
                linkImage = "../../images/" + product.img
            }

            const div = document.createElement("article")
            div.className = 'card-item cards'

            // carga en la página actual la estructura completa de cada producto que corresponde mostrar
            div.innerHTML = `
            <a `+ classNewProd + ` href="` + linkProduct + `">
                <img src="`+ linkImage + `" alt="${product.alt}" class="main-image-product" >` +
                containerNewProd
                + `</a>
            <a href="..product.link">
                <h5 class="card-title"><span>${product.productName}</span></h5>
            </a>
            <p class="product-price">$${product.price}</p>` +
                thereIsStock


            containerProducts.append(div)
        })
    }

    // mostrar todos los productos o filtrarlos por categoria
    let productsCategory
    if (containerProducts.id === "allProducts") {
        productsCategory = listOfProducts
        displayProducts(productsCategory)
    } else {
        productsCategory = listOfProducts.filter(product => product.category === containerProducts.id)
        displayProducts(productsCategory)
    }

    // filtrar productos por precio
    const filterPrice = document.querySelector(".form-filter")

    filterPrice.addEventListener("submit", (event) => {
        event.preventDefault();

        const valueMinFilter = document.querySelector(".min-number-price").value;
        const valueMaxFilter = document.querySelector(".max-number-price").value;
        let priceProd
        let productsFilterPrice
        if (valueMinFilter != "" || valueMaxFilter != "") {

            productsFilterPrice = productsCategory.filter(product => {
                priceProd = parseInt(product.price.replace(".", ""))
                return (valueMinFilter <= priceProd || valueMinFilter == "") && (valueMaxFilter >= priceProd || valueMaxFilter == "")
            })
            displayProducts(productsFilterPrice)
        }
    })

    // ordena los productos dependiendo el tipo de orden seleccionado
    const sortProducts = document.getElementById("sort")

    sortProducts.addEventListener("change", (event) => {

        let orderProducts = productsCategory.slice()

        switch (event.target.value) {

            case "price-ascending":

                orderProducts.sort((a, b) => {
                    let aInt = parseInt(a.price.replace(".", ""))
                    let bInt = parseInt(b.price.replace(".", ""))

                    if (aInt < bInt) {
                        return -1
                    }
                    if (aInt > bInt) {
                        return 1
                    }
                    return 0
                })
                displayProducts(orderProducts)
                break

            case "price-descending":

                orderProducts.sort((a, b) => {
                    let aInt = parseInt(a.price.replace(".", ""))
                    let bInt = parseInt(b.price.replace(".", ""))

                    if (aInt < bInt) {
                        return 1
                    }
                    if (aInt > bInt) {
                        return -1
                    }
                    return 0
                })
                displayProducts(orderProducts)
                break

            case "name-ascending":

                orderProducts.sort((a, b) => {

                    if (a.productName < b.productName) {
                        return -1
                    }
                    if (a.productName > b.productName) {
                        return 1
                    }
                    return 0
                })
                displayProducts(orderProducts)
                break

            case "name-descending":

                orderProducts.sort((a, b) => {

                    if (a.productName < b.productName) {
                        return 1
                    }
                    if (a.productName > b.productName) {
                        return -1
                    }
                    return 0
                })
                displayProducts(orderProducts)
                break

            case "user":

                displayProducts(productsCategory)
                break
        }
    })
});