const products = [
    {
        productName: "Vela Malmo",
        price: '13.000',
        img: "../../images/images-candles/malmo-candle.png",
        alt: "vela-malmo",
        category: 'velas',
        newArticle: 'no',
        stock: 'si'
    },
    {
        productName: "Vela Lagom Blanca",
        price: '12.600',
        img: "../../images/images-candles/white-lagom-candle.jpg",
        alt: "vela-lagom-blanca",
        category: 'velas',
        newArticle: 'no',
        stock: 'si'
    },
    {
        productName: "Vela Brera",
        price: '19.000',
        img: "../../images/images-candles/brera-candle.png",
        alt: "vela-brera",
        category: 'velas',
        newArticle: 'si',
        stock: 'si'
    },
    {
        productName: "Vela Lagom Negra",
        price: '13.600',
        img: "../../images/images-candles/black-lagom-candle.jpg",
        alt: "vela-lagom-negra",
        category: 'velas',
        newArticle: 'no',
        stock: 'si'
    },
    {
        productName: "Vela Lagom Ambar",
        price: '14.250',
        img: "../../images/images-candles/lagom-amber-candle.jpg",
        alt: "vela-lagom-ambar",
        category: 'velas',
        newArticle: 'si',
        stock: 'si'
    },
    {
        productName: "Casitas de Fosforos",
        price: '3.500',
        img: "../../images/images-candles/matchbox.webp",
        alt: "casita-de-fosforos",
        category: 'velas',
        newArticle: 'no',
        stock: 'si'
    },
    {
        productName: "Vela Kokos",
        price: '9.200',
        img: "../../images/images-candles/kokos-candle.jpg",
        alt: "vela-kokos",
        category: 'velas',
        newArticle: 'no',
        stock: 'no'
    },
    {
        productName: "Fosforos Largos",
        price: '4.800',
        img: "../../images/images-candles/long-matches.webp",
        alt: "fosforos-largos",
        category: 'velas',
        newArticle: 'no',
        stock: 'si'
    }
]

const displayProducts = () => {
    const shopContent = document.getElementById("shopContent")

    // shopContent.innerHTML = ""
    // productsToShow.forEach(product => {
    products.forEach(product => {
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
            <a `+classNewProd+` href="../individualProducts/malmoCandle.html">
                <img src="${product.img}" alt="${product.alt}">`+
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
displayProducts()