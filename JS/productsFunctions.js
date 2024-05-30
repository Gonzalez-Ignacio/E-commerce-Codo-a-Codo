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
            <a href="../individualProducts/malmoCandle.html">
                <h5>${product.productName}</h5>
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




const filterPrice = document.querySelector(".form-filter")
const buttonFilter = document.querySelector(".btn-price")

filterPrice.addEventListener("submit", (event) => {
    event.preventDefault();

    const valueMinFilter = document.querySelector(".min-number-price").value;
    const valueMaxFilter = document.querySelector(".max-number-price").value;

    if(valueMinFilter != "" || valueMaxFilter != ""){

        productsFilterPrice = productsCategory.filter(product => {
            const priceProd = product.price.replace(".", "")

            priceProd >= valueMinFilter && priceProd <= valueMaxFilter
                
            
        })
        displayProducts(productsFilterPrice)

        
    }
        

    
})


