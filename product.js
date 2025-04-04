// Product Data
class Product {
    constructor(id, name, price, img) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.img = img;
    }

    createProductElement() {
        const productElement = document.createElement("div");
        productElement.classList.add("product");

        const img = document.createElement("img");
        img.src = this.img;
        img.alt = this.name;

        const title = document.createElement("h3");
        title.textContent = this.name;

        const description = document.createElement("p");
        description.textContent = "High-quality product for your needs.";

        const priceTag = document.createElement("span");
        priceTag.textContent = `$${this.price.toFixed(2)}`;

        const addToCartBtn = document.createElement("button");
        addToCartBtn.classList.add("addToCart");
        addToCartBtn.dataset.id = this.id;
        addToCartBtn.textContent = "Add to Cart";
        addToCartBtn.addEventListener("click", () => addToCart(this.id));

        productElement.append(img, title, description, priceTag, addToCartBtn);
        return productElement;
    }
}

const products = [
    new Product(1, "Smart Watch", 89.99, "img/watch.jpg"),
    new Product(2, "Wireless Headphones", 49.99, "img/head.jpg"),
    new Product(3, "Gaming Mouse", 29.99, "img/mouse.png"),
    new Product(4, "Mechanical Keyboard", 79.99, "img/keyboard.jpg"),
    new Product(5, "Gaming Laptop", 999.99, "img/laptop.jpg"),
    new Product(6, "4K Monitor", 349.99, "img/monitor.jpg"),
    new Product(7, "Smartphone", 699.99, "img/phone.jpg"),
    new Product(8, "Tablet", 499.99, "img/tablet.jpg"),
    new Product(9, "Bluetooth Speaker", 59.99, "img/speaker.jpg")
];

// Function to Display Products
function displayProducts(filteredProducts = products) {
    const productList = document.querySelector(".product-grid");
    while (productList.firstChild) {
        productList.removeChild(productList.firstChild);
    }
    filteredProducts.forEach(product => {
        productList.appendChild(product.createProductElement());
    });
}

// Function to Add to Cart
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${product.name} has been added to the cart!`);
    }
}

// Search Functionality
function searchProducts() {
    const searchTerm = document.getElementById("searchBar").value.toLowerCase();
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm));
    displayProducts(filteredProducts);
}

// Hamburger Menu Toggle Functionality
function toggleHamburgerMenu() {
    const hamburger = document.getElementById("hamburgerBtn");
    const navMenu = document.getElementById("navMenu");
    
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("show");
}

// Event Listeners
document.getElementById("searchBar").addEventListener("input", searchProducts);
document.getElementById("searchBtn").addEventListener("click", searchProducts);
document.getElementById("hamburgerBtn").addEventListener("click", toggleHamburgerMenu);

// Close mobile menu when clicking a navigation link
document.querySelectorAll("nav ul li a").forEach(link => {
    link.addEventListener("click", () => {
        const navMenu = document.getElementById("navMenu");
        const hamburger = document.getElementById("hamburgerBtn");
        
        // Only close if it's mobile view (hamburger is visible)
        if (window.getComputedStyle(hamburger).display !== "none") {
            navMenu.classList.remove("show");
            hamburger.classList.remove("active");
        }
    });
});

// Initialize Page
displayProducts();

// Check if window is resized and handle navigation display accordingly
window.addEventListener("resize", () => {
    const hamburger = document.getElementById("hamburgerBtn");
    const navMenu = document.getElementById("navMenu");
    
    // If screen size is larger than mobile breakpoint, ensure menu is visible
    if (window.innerWidth > 768) {
        navMenu.classList.remove("show");
        hamburger.classList.remove("active");
    }
});