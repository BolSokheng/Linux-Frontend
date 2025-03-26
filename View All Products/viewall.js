const API_BASE = "http://localhost/Linux_backend/api/";

//function for add more product
function addMoreProduct(event) {
    console.log("add form work");
    event.preventDefault();
    const formData = new FormData(event.target);

    fetch(API_BASE + "add_product.php", {
        method: "POST",
        body: formData
    })
    .then(res => res.json())
    .then(response => {
        alert(response.message || response.error);
        window.location.reload();
    });
  }
document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector('.row');
    
    const logoutButton = document.querySelector("#logoutbtn");
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            showLogoutConfirmation();
        });
    }

    function showLogoutConfirmation() {
        // Prevent duplicate modals
        if (document.querySelector(".modal-overlay")) return;

        // Create modal overlay
        let modal = document.createElement("div");
        modal.classList.add("modal-overlay");

        modal.innerHTML = `
            <div class="logout-modal">
                <p>Are you sure you want to logout?</p>
                <div class="logout-buttons">
                    <button id="confirm-logout" class="btn-confirm">Yes</button>
                    <button id="cancel-logout" class="btn-cancel">No</button>
                </div>
            </div>
        `;

        // Append modal to the body
        document.body.appendChild(modal);

        // Event listeners for buttons
        document.getElementById("confirm-logout").addEventListener("click", function () {
            window.location.href = "../Login/login.html"; // Redirect to login
        });

        document.getElementById("cancel-logout").addEventListener("click", function () {
            modal.remove(); // Close modal
        });
    }

    const addButton = document.getElementById("addMoreBtn");
    const inputBoxModal = new bootstrap.Modal(document.getElementById("inputBoxContainer"));

    addButton.addEventListener("click", function () {
        inputBoxModal.show();
    });
    function showLogoutConfirmation() {
        // Prevent duplicate modals
        if (document.querySelector(".modal-overlay")) return;
    
        // Create confirmation box elements
        let modal = document.createElement("div");
        modal.innerHTML = `
            <div class="logout-modal">
                <p>Are you sure you want to logout?</p>
                <button id="confirm-logout">Yes</button>
                <button id="cancel-logout">No</button>
            </div>
        `;
        modal.classList.add("modal-overlay");
    
        // Append to body
        document.body.appendChild(modal);
    
        // Add event listeners
        document.getElementById("confirm-logout").addEventListener("click", function () {
            window.location.href = "../Login/login.html"; // Redirect to login
        });
    
        document.getElementById("cancel-logout").addEventListener("click", function () {
            modal.remove(); // Close modal
        });
    }
    // Modify the function to accept productID
    function createProductColumn(stock, imageUrl, productName, unitPrice, productID) {
        const col = document.createElement('div');
        col.classList.add('col-custom-20');

        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.setAttribute('data-id', productID);

    

        // Modify the event listener to pass productID as well
        productCard.addEventListener("click", function () {
            openModal(productName, productID); // Pass productID as well, stock is read from array
        });

        const stockLabel = document.createElement('span');
        stockLabel.classList.add('stock-label');

        if (stock > 100) {
            stockLabel.classList.add('high-stock');
            productCard.classList.add('high-stock-border');
        } else if (stock > 30) {
            stockLabel.classList.add('medium-stock');
            productCard.classList.add('medium-stock-border');
        } else {
            stockLabel.classList.add('low-stock');
            productCard.classList.add('low-stock-border');
        }
        stockLabel.textContent = `Stock: ${stock}`;

        const productImage = document.createElement('img');
        productImage.src = imageUrl;
        productImage.style.height = '200px';
        productImage.classList.add('product-img');
        productImage.alt = 'Product';

        const productDesc = document.createElement('div');
        productDesc.classList.add('product-desc');

        const productNameHeading = document.createElement('h5');
        productNameHeading.textContent = productName;

        const unitPriceParagraph = document.createElement('p');
        unitPriceParagraph.textContent = `Unit Price: ${unitPrice}$`;

        productDesc.appendChild(productNameHeading);
        productDesc.appendChild(unitPriceParagraph);

        productCard.appendChild(stockLabel);
        productCard.appendChild(productImage);
        productCard.appendChild(productDesc);

        col.appendChild(productCard);
        return col;
    }

    // Add product data, including the ID (using the index or a unique value)
    function addProducts() {
        fetch(API_BASE + "get_product.php").then(res=>res.json()).then(data=>{
            data.forEach((product,index) => {
                const productColumn = createProductColumn(
                    product.stockQty,
                    product.img,
                    product.Pname,
                    product.unitPrice,
                    index+1
                );
              
                container.appendChild(productColumn);
            
            });
      //      console.log(data);
        });
    }
    //function for update stock 
    function updateStock(pId, addedStockQty) {
        const formData = new FormData();
        formData.append("pId", pId);
        formData.append("stockQty", addedStockQty);
    
        fetch(API_BASE + "update_stock.php", {
            method: "POST",
            body: formData
        })
        .then(res => res.json())
        .then(response => {
            alert(response.message || response.error);
            window.location.reload();
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Failed to update stock.");
        });
    }
    // Modify openModal to accept productID and products array
    function openModal(title, productID) {
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.querySelector('.modal-body');
        const modalFooter = document.querySelector('.modal-footer');
        const productCard = document.querySelector(`.product-card[data-id='${productID}']`);

        fetch(API_BASE + "get_product.php").then(res=>res.json())
        .then(data=>{
            const product = data.find(p=>p.pId===String(productID));
            if(!product){
                alert("Product not found");
                return;
            }
  
        // Clear previous content
        modalBody.innerHTML = '';
        modalFooter.innerHTML = '';
    
        // Set modal title
        modalTitle.innerHTML = `<strong style="color: #006ABD;font-size:30px;">${title}</strong>`;
    
        // Create outer container with border
        const outerContainer = document.createElement('div');
        outerContainer.style.padding = '10px';
        outerContainer.style.borderRadius = '8px';
        outerContainer.style.width = '500px';
        outerContainer.classList.add('modal-outer-container'); //Add class for media query
    
        // Create product details container
        const productContainer = document.createElement('div');
        productContainer.style.display = 'flex';
        productContainer.style.alignItems = 'center';
        productContainer.style.padding = '10px';
        productContainer.style.marginBottom = '10px';
        productContainer.classList.add('modal-product-container'); //Add class for media query
    
        // Product image
        const productImage = document.createElement('img');
        productImage.src =product.img;
        productImage.style.width = 'auto';
        productImage.style.height = '150px';
        productImage.alt = title;
      //  productImage.classList.add('modal-product-image'); //Add class for media query
    
        // Product details
        const productDetails = document.createElement('div');
        productDetails.style.marginTop = '50px';
        productDetails.style.flex = '1';
        productDetails.classList.add('modal-product-details');  //Add class for media query
    
        const productIDElement = document.createElement('p');
        productIDElement.innerHTML = `<strong>ID:</strong> <span style="color:black; font-weight: bold ; font-size:22px">${productID}</span>`; // Display productID
    
        const price = document.createElement('p');
        price.innerHTML = `<strong>Unit price:</strong> <span style="color:black; font-weight: bold;font-size:22px">${product.unitPrice}$</span>`;
    
        // Get the updated stock from the products array
        const updatedStock = product.stockQty;
    
        const stockInfo = document.createElement('p');
        stockInfo.innerHTML = `<strong>In stock:</strong> <span id="modal-stock-${product.pId}" style="color:black; font-weight: bold;font-size:22px">${updatedStock}</span>`;
    
        productDetails.appendChild(productIDElement);
        productDetails.appendChild(price);
        productDetails.appendChild(stockInfo);
    
        productContainer.appendChild(productImage);
        productContainer.appendChild(productDetails);
    
        // Create input section
        const inputContainer = document.createElement('div');
        inputContainer.style.borderBottom = '2px solid black';
        inputContainer.style.padding = '10px';
        inputContainer.style.marginBottom = '10px';
        inputContainer.style.display = 'flex';
        inputContainer.style.alignItems = 'center';
        inputContainer.style.padding = '20px';
        inputContainer.classList.add('modal-input-container'); //Add class for media query
    
        const stockLabel = document.createElement('label');
        stockLabel.textContent = 'Add new stock';
        stockLabel.style.display = 'block';
        stockLabel.style.marginBottom = '5px';
        stockLabel.style.fontWeight = 'bold';
        stockLabel.style.fontSize = '20px';
        stockLabel.style.color = 'black';
    
        const stockInput = document.createElement('input');
        stockInput.type = 'number';
        stockInput.value = '0';
        stockInput.style.width = '60px';
        stockInput.style.border = '2px solid black';
        stockInput.classList.add('modal-stock-input');  //Add class for media query
    
        inputContainer.appendChild(stockLabel);
        inputContainer.appendChild(stockInput);
    
        // Footer section with buttons
        const buttonContainer = document.createElement('div');
        buttonContainer.style.padding = '10px';
        buttonContainer.style.display = 'flex';
        buttonContainer.style.justifyContent = 'end';
        buttonContainer.style.gap = '10px';
        buttonContainer.classList.add('modal-button-container'); //Add class for media query
    
        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancel';
        cancelButton.style.backgroundColor = '#006ABD';
        cancelButton.style.color = 'white';
        cancelButton.style.padding = '5px 15px';
        cancelButton.style.border = 'none';
        cancelButton.style.borderRadius = '15px';
        cancelButton.style.cursor = 'pointer';
        cancelButton.style.fontSize = '18px';
        cancelButton.addEventListener('click', () => {
            const modalElement = document.getElementById('productModal');
            const modalInstance = bootstrap.Modal.getInstance(modalElement);
            modalInstance.hide();
        });
    
        const updateButton = document.createElement('button');
        updateButton.textContent = 'Update';
        updateButton.style.backgroundColor = '#88C053';
        updateButton.style.color = 'white';
        updateButton.style.padding = '5px 15px';
        updateButton.style.border = 'none';
        updateButton.style.borderRadius = '15px';
        updateButton.style.cursor = 'pointer';
        updateButton.style.fontSize = '18px';
  
        updateButton.addEventListener('click', () => {
          
            const newStock = parseInt(stockInput.value);
            // Get the updated stock from the products array
            updateStock(product.pId, newStock); 
            const updatedStock = parseInt(product.stockQty) + newStock;
    
            // Update the stock in the products array
            product.stockQty = updatedStock;
    
            // Update the stock label text
            const stockLabel = document.querySelector(`.product-card[data-id='${productID}'] .stock-label`);
            stockLabel.textContent = `Stock: ${updatedStock}`;
    
            // Update the "In Stock" paragraph inside the modal
            const modalStockSpan = document.getElementById(`modal-stock-${productID}`);
            if (modalStockSpan) {
                modalStockSpan.textContent = updatedStock;
            }
    
            // Update the stock label and card border color based on the new stock
            if (updatedStock > 100) {
                stockLabel.classList.remove('medium-stock', 'low-stock');
                stockLabel.classList.add('high-stock');
                productCard.classList.remove('medium-stock-border', 'low-stock-border');
                productCard.classList.add('high-stock-border');
            } else if (updatedStock > 30) {
                stockLabel.classList.remove('high-stock', 'low-stock');
                stockLabel.classList.add('medium-stock');
                productCard.classList.remove('high-stock-border', 'low-stock-border');
                productCard.classList.add('medium-stock-border');
            } else {
                stockLabel.classList.remove('high-stock', 'medium-stock');
                stockLabel.classList.add('low-stock');
                productCard.classList.remove('high-stock-border', 'medium-stock-border');
                productCard.classList.add('low-stock-border');
            }
    
            // Optional: Close the modal after updating
            const modalElement = document.getElementById('productModal');
            const modalInstance = bootstrap.Modal.getInstance(modalElement);
            modalInstance.hide();
    
            alert(`New stock updated to: ${updatedStock}`);
        });
        buttonContainer.appendChild(cancelButton);
        buttonContainer.appendChild(updateButton);
    
        outerContainer.appendChild(productContainer);
        outerContainer.appendChild(inputContainer);
        outerContainer.appendChild(buttonContainer);
    
        modalBody.appendChild(outerContainer);
    
        // Show modal
        const modalElement = document.getElementById('productModal');
        const modalInstance = new bootstrap.Modal(modalElement);
        modalInstance.show();
    });
    }

    addProducts();
});