let emailInput = document.getElementById("email");
let userType = document.getElementById("userType");
let passwordInput = document.getElementById("password");
let icon = document.getElementById("toggleIcon");
let loginForm = document.getElementById("loginForm");
let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let toggleIcon = document.getElementById("toggleIcon");

function togglePassword() {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleIcon.classList.remove("fa-eye");
        toggleIcon.classList.add("fa-eye-slash");
    } else {
        passwordInput.type = "password";
        toggleIcon.classList.remove("fa-eye-slash");
        toggleIcon.classList.add("fa-eye");
    }
}

loginForm.addEventListener("submit", function(event) {
    event.preventDefault(); 
    handleLogin();
});

function handleLogin() {
    let emailValue = emailInput.value.trim();
    let userTypeValue = userType.value;
    let passwordValue = passwordInput.value.trim();

    // Validate user type
    if (userTypeValue === "") {
        alert("❌ Please select a user type!");
        return;
    }

    // Validate email format
    if (!emailPattern.test(emailValue)) {
        alert("❌ Invalid email format! Please enter a valid email.");
        emailInput.focus();
        return;
    }

    // Check if user exists in localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(u => u.email === emailValue);

    if (!user) {
        alert("❌ No account found with this email.");
        return;
    }

    // Check if the user type matches the stored user type
    if (user.userType !== userTypeValue) {
        alert(`❌ This account is not for ${userTypeValue}s.`);
        return;
    }

    // Check if password matches
    if (user.password !== passwordValue) {
        alert("❌ Incorrect password!");
        return;
    }

    // Redirect based on user type
    if (userTypeValue === "customer") {
        window.location.href = "user.html"; 
    } else if (userTypeValue === "admin") {
        window.location.href = "admin.html"; 
    }
}