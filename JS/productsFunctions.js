//funcion que muestra los productos que estan dentro de un array específico
const displayProducts = (productsToShow) => {
    const shopContent = document.querySelector("section.products")
    console.log(shopContent)
    shopContent.innerHTML = ""
    productsToShow.forEach(product => {
        let classNewProd = ''
        let containerNewProd = ''
        let thereIsStock
        if(product.newArticle == 'si'){
            classNewProd = 'class="new-product"'
            containerNewProd = `
                <div>
                    <span>NUEVO</span>
                </div>
            `
        }
        if(product.stock == 'si'){
            thereIsStock = '<button type="submit">Agregar al carrito</button>'
        }else{
            thereIsStock = '<div class="exhausted">SIN STOCK</div>'
        }

        const div = document.createElement("article")
        div.className = 'card-item'
        div.innerHTML = `
            <a `+classNewProd+` href="../individualProducts/${product.link}">
                <img src="../../images/${product.img}" alt="${product.alt}">`+
                containerNewProd
            +`</a>
            <a href="../individualProducts/malmoCandle.html">
                <h5>${product.productName}</h5>
            </a>
            <p>$${product.price}</p>`+
            thereIsStock
            
        
        shopContent.append(div)
    })
}
// mostrar todos los productos o filtrarlos por categoria
const filterCategory = () => {
    const containerProd = document.querySelector("section.products")
    if(containerProd.id === "allProducts"){
        displayProducts(listOfProducts)
    }else{
        const productsCategory = listOfProducts.filter(product => product.category === containerProd.id)
        displayProducts(productsCategory)
    }
 }
 filterCategory()


// let valueMinFilter = document.getElementById("min-filter").value;
// let valueMaxFilter = document.getElementById("max-filter").value;
// let filterValues = document.getElementById("filter-price");

// console.log(valueMinFilter);