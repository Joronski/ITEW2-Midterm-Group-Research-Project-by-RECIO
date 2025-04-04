// Function to load orders from localStorage and display them
function loadOrders() {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    const ordersList = document.getElementById("orders-list");

    ordersList.innerHTML = ""; // Clear previous content

    // If there are no orders, display a message
    if (orders.length === 0) {
        ordersList.innerHTML = "<p>No orders yet. Proceed with checkout to place an order.</p>";
        return;
    }

    // Render each order item
    orders.forEach(item => {
        ordersList.innerHTML += `
            <div class="order-item">
                <img src="${item.img}" alt="${item.name}" />
                <div class="order-details">
                    <p><strong>${item.name}</strong></p>
                    <p>$${item.price}</p>
                </div>
                <button class="cancel-btn" onclick="cancelOrder(${item.id})">Cancel</button>
            </div>
        `;
    });
}

// Function to cancel an order and move it back to the cart
function cancelOrder(itemId) {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Find the item in orders
    let itemIndex = orders.findIndex(item => item.id === itemId);
    
    if (itemIndex !== -1) {
        // Remove from orders
        let canceledItem = orders.splice(itemIndex, 1)[0];
        
        // Add back to the cart
        cart.push(canceledItem);
        
        // Update localStorage
        localStorage.setItem("orders", JSON.stringify(orders));
        localStorage.setItem("cart", JSON.stringify(cart));

        // Re-render the orders page
        loadOrders();
    }
}

// Call loadOrders() when the page loads
document.addEventListener("DOMContentLoaded", function () {
    loadOrders();
});
