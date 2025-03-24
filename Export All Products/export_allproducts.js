
    const API_URL = "http://localhost:8081/Linux_backend/api/get_product.php";

    // Function to fetch products from the API
    async function fetchProducts() {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const products = await response.json();
            displayProducts(products);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }

    // Function to display products
    function displayProducts(products) {
        const productContainer = document.getElementById("product-container");
        productContainer.innerHTML = ""; // Clear existing content

        products.forEach(product => {
            const productCard = `
                <div class="col-12 col-sm-6 col-md-4">
                    <div class="product-card">
                        <span class="stock-label ${getStockClass(product.stockQty)}">Stock: ${product.stockQty}</span>
                        <img src="../UploadImg/${product.img}" class="img-fluid" alt="${product.Pname}">
                        <div class="text">
                            <h5>${product.Pname}</h5>
                            <p>Unit Price: $${product.unitPrice}</p>
                        </div>
                    </div>
                </div>
            `;
            productContainer.insertAdjacentHTML("beforeend", productCard);
        });
    }

    // Function to determine stock label class
    function getStockClass(stockQty) {
        if (stockQty > 100) return "stock-high";
        if (stockQty > 20) return "stock-medium";
        return "stock-low";
    }

    // Fetch products when the page loads
    fetchProducts();


// const API_URL = "http://localhost:8081/Linux_backend/api/get_product.php";

// // Function to fetch products from the API
// async function fetchProducts() {
//     try {
//         const response = await fetch(API_URL);
//         if (!response.ok) {
//             throw new Error("Network response was not ok");
//         }
//         const products = await response.json();
//         displayProducts(products);
//     } catch (error) {
//         console.error("Error fetching products:", error);
//     }
// }

// // Function to display products
// function displayProducts(products) {
//     const productContainer = document.getElementById("product-container");
//     productContainer.innerHTML = ""; // Clear existing content

//     products.forEach(product => {
//         const productCard = `
//             <div class="col-12 col-sm-6 col-md-4">
//                 <div class="product-card">
//                     <span class="stock-label ${getStockClass(product.stockQty)}">Stock: ${product.stockQty}</span>
//                     <img src="../UploadImg/${product.img}" class="img-fluid" alt="${product.Pname}">
//                     <div class="text">
//                         <h5>${product.Pname}</h5>
//                         <p>Unit Price: $${product.unitPrice}</p>
//                     </div>
//                 </div>
//             </div>
//         `;
//         productContainer.insertAdjacentHTML("beforeend", productCard);
//     });
// }

// // Function to determine stock label class
// function getStockClass(stockQty) {
//     if (stockQty > 100) return "stock-high";
//     if (stockQty > 20) return "stock-medium";
//     return "stock-low";
// }

// // Fetch products when the page loads
// fetchProducts();
