let fullname = document.getElementById('fullname');
let email = document.getElementById('email');
let userType = document.getElementById('userType');
let password = document.getElementById('password');
let confirmPassword = document.getElementById('confirm-password');
let btnSubmit = document.querySelector("button[type='submit']");
let togglePasswordIcon = document.getElementById('togglePassword');
let toggleConfirmPasswordIcon = document.getElementById('toggleConfirmPassword');

function togglePasswordVisibility(inputField, iconElement) {
    if (inputField.type === "password") {
        inputField.type = "text";
        iconElement.classList.remove("fa-eye");
        iconElement.classList.add("fa-eye-slash");
    } else {
        inputField.type = "password";
        iconElement.classList.remove("fa-eye-slash");
        iconElement.classList.add("fa-eye");
    }
}

// Attach event listeners to toggle icons
togglePasswordIcon.addEventListener("click", function() {
    togglePasswordVisibility(password, togglePasswordIcon);
});

toggleConfirmPasswordIcon.addEventListener("click", function() {
    togglePasswordVisibility(confirmPassword, toggleConfirmPasswordIcon);
});

btnSubmit.onclick = function(event) {
    event.preventDefault(); // Prevent form submission

    let fullnameValue = fullname.value.trim();
    let emailValue = email.value.trim();
    let userTypeValue = userType.value;
    let passwordValue = password.value;
    let confirmPasswordValue = confirmPassword.value;

    // Validate form inputs
    if (fullnameValue === "") {
        alert("❌ Please enter your full name!");
        fullname.focus();
        return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
        alert("❌ Invalid email format! Please enter a valid email.");
        email.focus();
        return;
    }
    if (userTypeValue === "") {
        alert("❌ Please select a user type!");
        return;
    }
    if (passwordValue === "" || confirmPasswordValue === "") {
        alert("❌ Please enter your password and confirm it!");
        return;
    }
    if (passwordValue !== confirmPasswordValue) {
        alert("❌ Passwords do not match!");
        return;
    }

    // Create a new User object
    let newUser = {
        fullname: fullnameValue,
        email: emailValue,
        userType: userTypeValue,
        password: passwordValue,
    };

    // Retrieve existing users from localStorage or initialize empty array
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Add the new user to the array
    users.push(newUser);

    // Save the updated array to localStorage
    localStorage.setItem('users', JSON.stringify(users));

    alert("Registration successful!");

    // Redirect to login page
    setTimeout(function() {
        window.location.href = "login.html"; // Delay before redirecting
    }, 1000); // 1 second delay
};
