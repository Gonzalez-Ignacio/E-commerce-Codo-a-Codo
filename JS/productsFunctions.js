//funcion que muestra los productos que estan dentro de un array específico
const displayProducts = (productsToShow) => {
    const shopContent = document.querySelector("section.products")
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
            <a href="../individualProducts/${product.link}">
                <h5><span>${product.productName}</span></h5>
            </a>
            <p>$${product.price}</p>`+
            thereIsStock
            
        
        shopContent.append(div)
    })
}
// mostrar todos los productos o filtrarlos por categoria
const containerProd = document.querySelector("section.products")
let productsCategory
if(containerProd.id === "allProducts"){
    productsCategory = listOfProducts
    displayProducts(productsCategory)
}else{
    productsCategory = listOfProducts.filter(product => product.category === containerProd.id)
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
    if(valueMinFilter != "" || valueMaxFilter != ""){

         productsFilterPrice = productsCategory.filter(product => {
            priceProd = parseInt(product.price.replace(".", ""))
            return (valueMinFilter <= priceProd || valueMinFilter == "") && (valueMaxFilter >= priceProd || valueMaxFilter == "")    
        })

        displayProducts(productsFilterPrice)
    }
})