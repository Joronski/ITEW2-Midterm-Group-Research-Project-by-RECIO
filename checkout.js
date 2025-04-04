document.addEventListener("DOMContentLoaded", function () {
    const orderItems = document.getElementById("order-items");
    const orderTotal = document.getElementById("order-total");

    // Get multiple orders from localStorage
    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    function renderOrders() {
        if (orders.length === 0) {
            orderItems.innerHTML = "<p>No orders selected for checkout.</p>";
            orderTotal.textContent = "$0.00";
            return;
        }

        let total = 0;
        orderItems.innerHTML = ""; // Clear previous content

        orders.forEach((item, index) => {
            total += item.price;
            orderItems.innerHTML += `
                <div class="order-item" data-index="${index}">
                    <img src="${item.img}" alt="${item.name}" class="order-img">
                    <div>
                        <h4>${item.name}</h4>
                        <p>Price: $${item.price.toFixed(2)}</p>
                    </div>
                    <button class="remove-item">Remove</button>
                </div>
            `;
        });

        orderTotal.textContent = `$${total.toFixed(2)}`;

        // Attach event listeners to remove buttons
        document.querySelectorAll(".remove-item").forEach((button) => {
            button.addEventListener("click", function () {
                let index = this.parentElement.getAttribute("data-index");
                removeItem(index);
            });
        });
    }

    function removeItem(index) {
        orders.splice(index, 1); // Remove item from array
        localStorage.setItem("orders", JSON.stringify(orders)); // Update localStorage
        renderOrders(); // Re-render items
    }

    // Render orders on page load
    renderOrders();

    // Payment buttons
    document.getElementById("gcash").addEventListener("click", function () {
        processPayment("GCash");
    });

    document.getElementById("credit-card").addEventListener("click", function () {
        processPayment("Credit Card");
    });

    document.getElementById("paypal").addEventListener("click", function () {
        processPayment("PayPal");
    });
});

function processPayment(method) {
    alert(`Payment successful using ${method}!`);
    localStorage.removeItem("orders"); // Clear all selected orders after payment
    window.location.href = "orders.html";
}
