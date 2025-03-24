document.addEventListener("DOMContentLoaded", function () {
    const cartBody = document.getElementById("cart-body");
    const totalItems = document.getElementById("total-items");
    const submitOrder = document.getElementById("submit-order");
    const exportReportBody = document.getElementById("export-report-body");
    const exportTotalItems = document.getElementById("export-total-items");

    let cart = [];

    // Add product to cart
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            let card = this.closest(".product");
            let productId = card.getAttribute("data-id");
            let productName = card.getAttribute("data-name");

            let existingItem = cart.find(item => item.id === productId);
            if (existingItem) {
                existingItem.qty += 10;
            } else {
                cart.push({ id: productId, name: productName, qty: 10 });
            }
            updateCart();
        });
    });

    // Update Cart UI
    function updateCart() {
        cartBody.innerHTML = "";
        let total = 0;
        cart.forEach(item => {
            total += item.qty;
            cartBody.innerHTML += `
                <tr>
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.qty}</td>
                    <td><button class="btn btn-danger btn-sm remove-item" data-id="${item.id}">✖</button></td>
                </tr>`;
        });
        totalItems.innerText = total;

        // Remove item event listener
        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", function () {
                let productId = this.getAttribute("data-id");
                cart = cart.filter(item => item.id !== productId);
                updateCart();
            });
        });
    }

    // Submit Order
    submitOrder.addEventListener("click", function () {
        exportReportBody.innerHTML = "";
        let total = 0;
        cart.forEach(item => {
            total += item.qty;
            exportReportBody.innerHTML += `
                <tr>
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.qty}</td>
                </tr>`;
        });
        exportTotalItems.innerText = total;

        // Show modal
        let modal = new bootstrap.Modal(document.getElementById("exportReportModal"));
        modal.show();
    });
});
