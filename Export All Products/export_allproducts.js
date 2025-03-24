const API_URL = "http://localhost:8080/Linux_backend/api/get_product.php";

// Function to fetch products from the API
async function fetchProducts() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const products = await response.json();
        if (products && products.length) {
            displayProducts(products);
        } else {
            displayNoProductsFound(); // Handle case when no products are returned
        }
    } catch (error) {
        console.error("Error fetching products:", error);
        displayError(error); // Display a message in case of an error
    }
}

// Function to display an error message to the user
function displayError(error) {
    const productContainer = document.getElementById("product-container");
    productContainer.innerHTML = `<p class="text-danger">Error fetching products: ${error.message}</p>`;
}

// Function to display a message when no products are found
function displayNoProductsFound() {
    const productContainer = document.getElementById("product-container");
    productContainer.innerHTML = "<p>No products found.</p>";
}

// Function to display products dynamically
function displayProducts(products) {
    const productContainer = document.getElementById("product-container");
    productContainer.innerHTML = ""; // Clear existing content

    products.forEach(product => {
        const productCard = createProductCard(product);
        productContainer.appendChild(productCard);
    });
}

// Function to create a product card element dynamically
function createProductCard(product) {
    const productCard = document.createElement("div");
    productCard.classList.add("col-12", "col-sm-6", "col-md-4");

    productCard.innerHTML = `
        <div class="product-card">
            <span class="stock-label ${getStockClass(product.stockQty)}">Stock: ${product.stockQty}</span>
            <img src="../UploadImg/${product.img}" class="img-fluid" alt="${product.Pname}">
            <div class="text">
                <h5>${product.Pname}</h5>
                <p>Unit Price: $${product.unitPrice}</p>
            </div>
        </div>
    `;
    return productCard;
}

// Function to determine stock label class
function getStockClass(stockQty) {
    if (stockQty > 100) return "stock-high";
    if (stockQty > 20) return "stock-medium";
    return "stock-low";
}

// Fetch products when the page loads
document.addEventListener("DOMContentLoaded", fetchProducts);
