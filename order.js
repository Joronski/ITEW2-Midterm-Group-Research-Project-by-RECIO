// Function to load orders from localStorage and display them
function loadOrders() {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    const ordersList = document.getElementById("orders-list");

    ordersList.innerHTML = ""; // Clear previous content

    if (orders.length === 0) {
        ordersList.innerHTML = "<p>No orders yet. Proceed with checkout to place an order.</p>";
        return;
    }

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

// Hamburger menu functionality
function setupHamburgerMenu() {
    const hamburgerMenu = document.getElementById("hamburger-menu");
    const navMenu = document.getElementById("nav-menu");

    if (hamburgerMenu) {
        // Toggle hamburger menu
        hamburgerMenu.addEventListener("click", function() {
            hamburgerMenu.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        // Close menu when clicking on a menu item (for mobile)
        document.querySelectorAll("#nav-menu a").forEach(link => {
            link.addEventListener("click", function() {
                hamburgerMenu.classList.remove("active");
                navMenu.classList.remove("active");
            });
        });

        // Close menu when clicking outside (for mobile)
        document.addEventListener("click", function(event) {
            if (!event.target.closest("#nav-menu") && 
                !event.target.closest("#hamburger-menu") && 
                navMenu.classList.contains("active")) {
                hamburgerMenu.classList.remove("active");
                navMenu.classList.remove("active");
            }
        });

        // Check window resize and reset menu state
        window.addEventListener("resize", function() {
            if (window.innerWidth > 768 && navMenu.classList.contains("active")) {
                hamburgerMenu.classList.remove("active");
                navMenu.classList.remove("active");
            }
        });
    }
}

// Call functions when the page loads
document.addEventListener("DOMContentLoaded", function () {
    loadOrders();
    setupHamburgerMenu();
});

// Function to save an order and associate it with a user
function saveOrder(userId, order) {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    
    order.userId = userId; // Attach user ID to the order
    order.id = orders.length + 1; // Assign a unique order ID
    
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));
}