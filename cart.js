// Function to load the cart items from localStorage
function loadCartItems() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartList = document.getElementById("cart-list");

    cartList.innerHTML = ""; // Clear any previous content

    // If cart is empty, show a message
    if (cart.length === 0) {
        cartList.innerHTML = "<p>Your cart is empty. Add items to proceed.</p>";
        return;
    }

    // Render each cart item with a checkbox
    cart.forEach(item => {
        cartList.innerHTML += `
            <div class="cart-item">
                <input type="checkbox" class="select-item" data-id="${item.id}" onclick="toggleSelectItem(${item.id})" ${item.selected ? 'checked' : ''} />
                <img src="${item.img}" alt="${item.name}" />
                <div class="item-details">
                    <p><strong>${item.name}</strong></p>
                    <p>$${item.price}</p>
                </div>
            </div>
        `;
    });
}

// Function to toggle item selection when checkbox is clicked
function toggleSelectItem(itemId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let item = cart.find(item => item.id === itemId);

    // Toggle the item's selected state
    item.selected = !item.selected;

    // Save the updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Function to proceed to checkout
function proceedToCheckout() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    // Filter for selected items
    let selectedItems = cart.filter(item => item.selected);

    if (selectedItems.length === 0) {
        alert("Please select at least one item to proceed.");
        return;
    }

    // Move selected items to orders
    orders = orders.concat(selectedItems);

    // Remove selected items from cart
    cart = cart.filter(item => !item.selected);

    // Save updated cart and orders back to localStorage
    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Proceeding to checkout...");

    // Redirect to orders page
    window.location.href = "orders.html";
}

// Call loadCartItems() when the page loads
document.addEventListener("DOMContentLoaded", function () {
    loadCartItems();
});