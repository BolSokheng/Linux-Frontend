
const API_BASE = "http://localhost/Linux_backend/api/";
// Function to fetch products from the API
async function fetchProducts() {
    try {
        const response = await fetch(API_BASE + "get_product.php");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const products = await response.json();
        if (products && products.length) {
            displayProducts(products);
        } else {
            displayNoProductsFound(); 
        }
    } catch (error) {
    
        console.error("Error fetching products:", error);
        displayError(error); 
}
}

//function to display error message
function displayError(error) {
    const productContainer = document.getElementById("product-container");
    productContainer.innerHTML = `<p class="text-danger">Error fetching products: ${error.message}</p>`;
}
//function to display products in the product container
function displayProducts(products) {
    const productContainer = document.getElementById("product-container");
    productContainer.innerHTML = ""; 

    products.forEach(product => {
        const productCard = createProductCard(product);
        productContainer.appendChild(productCard);
    });
}
//display product in the product container
function createProductCard(product) {
    const productCard = document.createElement("div");
    productCard.classList.add("col-12", "col-sm-6", "col-md-4");

    productCard.innerHTML = `
        <div class="product-card" data-id="${product.pId}">
            <span class="stock-label ${getStockClass(product.stockQty)}">Stock: ${product.stockQty}</span>
            <img src="${product.img}" class="img-fluid" alt="${product.Pname}" style="height: 200px; ">
            <div class="text">
                <h5>${product.Pname}</h5>
                <p>Unit Price: $${product.unitPrice}</p>
            </div>
        </div>
    `;
    productCard.addEventListener("click", function () {
        addToExportList(product);
    });
    return productCard;
}

//add product to export list 
function addToExportList(product) {

    let exportList = document.querySelector(".export-list");
    // Check if product already exists in the export list
    let existingProduct = [...exportList.querySelectorAll(".product-list")].find(p=>
    p.getAttribute("data-id") === String(product.pId));
    if (existingProduct) {
        let qtyInput = existingProduct.querySelector(".export-list .product-list input[name='exportQty[]']");
        let newQty = parseInt(qtyInput.value) + 1;
        if(newQty<= product.stockQty){
            qtyInput.value = newQty;
        }else{
            alert("You can't export more than stock quantity");
        }
            qtyInput.focus();
    } 
    else {
        let productItem = document.createElement("div");
        productItem.classList.add("product-list","d-flex","rounded-3","justify-content-between");
        productItem.style.cssText = "border: 1px solid gray; display: flex; gap: 20px; align-items: center; padding: 10px; font-size: 15px;margin-top: 5px";
        productItem.setAttribute("data-id", product.pId);
        productItem.innerHTML = `
        <input name="pId[]" value="${product.pId}" readonly style="width: 20px;text-align: center;border: none">
          <h6 style="width: 300px; overflow-wrap: break-word; word-break: break-word;">${product.Pname}</h6>
            <input type="number" name="exportQty[]" value="1" min="1" max="${product.stockQty}" required" style="width: 60px; text-align: center;padding: 3px">
             <button class="remove-btn rounded-circle" style="background: red; color: white; border: none; padding: 5px 10px; cursor: pointer;">x</button>
        `;
        productItem.querySelector(".remove-btn").addEventListener("click", function () {
            productItem.remove();
        });
        exportList.appendChild(productItem);
        updateTotalItems();
    }
}

// this function is for display total item export in the export list 
function updateTotalItems() {
    let total = [...document.querySelectorAll('input[name="exportQty[]"]')]
        .reduce((sum, input) => sum + (parseInt(input.value) || 0), 0);
    document.getElementById("total-items").textContent = total;
}

document.addEventListener("input", (e) => {
    if (e.target.matches('input[name="exportQty[]"]')) updateTotalItems();
});

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
        setTimeout(updateTotalItems, 100);
    }
});

// Function to display a message when no products are found
function displayNoProductsFound() {
    const productContainer = document.getElementById("product-container");
    productContainer.innerHTML = "<p>No products found.</p>";
}

// Function to determine stock label class
function getStockClass(stockQty) {
    if (stockQty > 100) return "stock-high";
    if (stockQty > 20) return "stock-medium";
    return "stock-low";
}

//check if product export qty is not null and not 0
function CheckExportQty(event) {
    let exportList = document.querySelector(".export-list");
    let invalidInput = [...exportList.querySelectorAll(".product-list")].find(p => {
        let qtyInput = p.querySelector("input[name='exportQty[]']");
        return !qtyInput || qtyInput.value === "0" || qtyInput.value === "";
    });
    if (invalidInput) {
        event.preventDefault(); 
        alert("Please enter a valid quantity for all products.");
        let invalidQtyInput = invalidInput.querySelector("input[name='exportQty[]']");
        if(invalidQtyInput){
            invalidQtyInput.focus(); 
        }
        return false; 
    }else{
        event.preventDefault();  
        let modal = new bootstrap.Modal(document.getElementById("ConfirmSubmit"), {
            backdrop: 'static',
            keyboard: false
        });
        modal.show();
        document.querySelector("#ConfirmSubmit .modal-footer #cancel-btn").onclick=function(){
            modal.hide();
            document.getElementById('ConfirmSubmit').style.display = 'none';
        }
        document.querySelector("#ConfirmSubmit .modal-footer #confirm-export").onclick=function(){
            modal.hide();
            document.getElementById('ConfirmSubmit').style.display = 'none';
            exportProduct(event); 
        }
        return true;
    }
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
        if (response.error) {
        alert(response.error);
    } else {  
        ShowLatestExport();
    }
    });
}
//function to display export report after export product
async function ShowLatestExport(){
    try {
        const response = await fetch(API_BASE + "get_export.php");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const latestProduct = data[data.length - 1]; 
       displayExportReport(latestProduct);
    } catch (error) {
        console.error("Error fetching export data:", error);
        return null;
    }
}

//just make sure that the modal is null before calling this function and then display the export report
let modal = null; 
function displayExportReport(product) {
    if (!product) { l
        console.error("No product data to display.");
        return;
    }
    if (!modal) {
        modal = new bootstrap.Modal(document.getElementById('exportReportModal'), {
            backdrop: 'static',
            keyboard: false
        });
    }
    modal.show();
    let tableRows = "";
    product.exportDetails.forEach((item) => {
        tableRows += `
            <tr>
                <td>${item.pId}</td>
                <td>${item.Pname}</td>
                <td>${item.exportQty}</td>
            </tr>
        `;
    });
    const exportReportContent = document.querySelector("#exportReportModal .modal-dialog");
    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";
    modalContent.innerHTML = `
        <div class="modal-header d-block">
            <h3 class="text-center my-4 fw-bold">Export Report</h3> 
            <div class="mt-4">
                <h6 id="report-no">Report No.${product.exId}</h6>
                <h6 id="report-date">Date: ${product.exportDate}</h6> 
            </div>
        </div>
        <div class="modal-body">
            <table class="table">
                <thead>
                    <tr>
                        <th>ID</th><th>Name</th><th>Qty</th>
                    </tr>
                </thead>
                <tbody id="export-report-body">
                    ${tableRows}
                </tbody>
            </table>
            <p>Total Items: <span id="export-total-items">${product.totalItems}</span></p>
        </div>
        <div class="modal-footer">
            <button class="btn btn-secondary rounded-2" id="closeModalButton" onclick="CloseExportReport()"> Close </button>
        </div>
    `;

    exportReportContent.innerHTML = ''; 
    exportReportContent.appendChild(modalContent);
}

//close export report modal 
function CloseExportReport() {
    if (modal) {
        modal.hide();
        document.getElementById('closeModalButton').style.display = 'none';
        window.location.reload();
    }
}