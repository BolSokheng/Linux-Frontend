
const API_URL= "http://localhost/Linux_backend/api/get_product.php";
const API_BASE = "http://localhost/Linux_backend/api/";
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


// Function to determine stock label class
function getStockClass(stockQty) {
    if (stockQty > 100) return "stock-high";
    if (stockQty > 20) return "stock-medium";
    return "stock-low";
}

//function to export product
function exportProduct(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    fetch(API_BASE + "export_product.php", {
        method: "POST",
        body: formData
    })
    .then(res => res.json())
    .then(response => {
        alert(response.message || response.error);
        window.location.reload();
    });
}


//export product

//function add product to cart
// function addToCart(product){
//  //   let card = this.closest(".product");
//       let ExportList = document.getElementById("export-report-body");
//       let existingProduct = [...ExportList.querySelectorAll(".product-card")].find(item =>
//         item.getAttribute("data-id") === String(product.pId)
//     );
//     if (existingProduct) {
//         // If product exists, focus on input and increment quantity
//         let qtyInput = existingProduct.querySelector("input[name='exportQty']");
//         let newQty = parseInt(qtyInput.value) + 1;
//         if(newQty<= product.stockQty){
//             qtyInput.value = newQty;
//         }else{
//             alert("You can't export more than stock quantity");
//         }
//             qtyInput.focus();
//     } else{

//     }
// }
// function updateCart() {
//     cartBody.innerHTML = "";
//     let total = 0;
//     cart.forEach(item => {
//         total += item.qty;
//         cartBody.innerHTML += `
//             <tr>
//                 <td>${item.id}</td>
//                 <td>${item.name}</td>
//                 <td>${item.qty}</td>
//                 <td><button class="btn btn-danger btn-sm remove-item" data-id="${item.id}">✖</button></td>
//             </tr>`;
//     });
//     totalItems.innerText = total;

//     // Remove item event listener
//     document.querySelectorAll(".remove-item").forEach(button => {
//         button.addEventListener("click", function () {
//             let productId = this.getAttribute("data-id");
//             cart = cart.filter(item => item.pId !== productId);
//             updateCart();
//         });
//     });
// }

// function addToCart(id){
//     let cart = [];
//     fetch(API_BASE + "get_product.php").then(res=>res.json())
//     .then(data=>{
//         let existingItem = data.find(p=>p.pId===String(id));
//     if (existingItem) {
//         existingItem.stockQty += 10;
//     } else {
//         cart.push({ id: pId, name: Pname, qty: 10 });
//     }
//     updateCart(cart);
// });
// }
// Fetch products when the page loads
document.addEventListener("DOMContentLoaded", fetchProducts);
