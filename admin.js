let users = JSON.parse(localStorage.getItem('users')) || [];
let fullname = document.getElementById("fullname");
let email = document.getElementById("email");
let userType = document.getElementById("userType");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirm-password");
let tblUsers = document.getElementById("tblUsers");
let adminSearchUser = document.getElementById("adminSearchUser");

// Function to add user
function addUser(event) {
    event.preventDefault();  // Prevent form submission

    if (!fullname.value || !email.value || !userType.value || !password.value || !confirmPassword.value) {
        alert("Please enter all details correctly.");
        return;
    }

    if (password.value !== confirmPassword.value) {
        alert("Passwords do not match!");
        return;
    }

    let user = {
        fullname: fullname.value,
        email: email.value,
        userType: userType.value,
        password: password.value
    };

    // Add the user to the array and store it in localStorage
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    // Update the table display
    displayUsers();

    // Clear input fields
    fullname.value = "";
    email.value = "";
    userType.value = "";
    password.value = "";
    confirmPassword.value = "";
}

// Function to display users in a table
function displayUsers(filteredUsers = users) {
    tblUsers.innerHTML = "";  // Clear the table

    filteredUsers.forEach((user, index) => {
        let rowHTML = `
            <tr id="row-${index}">
                <td>
                    <span id="name-${index}">${user.fullname}</span>
                    <input type="text" id="edit-name-${index}" value="${user.fullname}" style="display:none;">
                </td>
                <td>
                    <span id="email-${index}">${user.email}</span>
                    <input type="email" id="edit-email-${index}" value="${user.email}" style="display:none;">
                </td>
                <td id="userType-${index}">${user.userType}</td>
                <td>
                    <button class="edit-btn" onclick="editUser(${index})" id="edit-btn-${index}">Edit</button>
                    <button class="save-btn" onclick="saveUser(${index})" id="save-btn-${index}" style="display:none;">Save</button>
                    <button class="delete-btn" onclick="deleteUser(${index})">Delete</button>
                </td>
            </tr>
        `;
        tblUsers.innerHTML += rowHTML;
    });
}

// Function to filter users based on the search input
function searchUsers() {
    let searchQuery = adminSearchUser.value.toLowerCase();
    let filteredUsers = users.filter(user => {
        return user.fullname.toLowerCase().includes(searchQuery) || user.email.toLowerCase().includes(searchQuery);
    });
    
    // Debugging: Check filtered users array
    console.log(filteredUsers);
    
    // Update table with filtered users
    displayUsers(filteredUsers);
}

// Event listener for search input
adminSearchUser.addEventListener("input", searchUsers);

// Function to edit a user (toggle input fields for editing)
function editUser(index) {
    document.getElementById(`name-${index}`).style.display = "none";
    document.getElementById(`edit-name-${index}`).style.display = "inline";
    document.getElementById(`email-${index}`).style.display = "none";
    document.getElementById(`edit-email-${index}`).style.display = "inline";

    document.getElementById(`edit-btn-${index}`).style.display = "none";
    document.getElementById(`save-btn-${index}`).style.display = "inline";
}

// Function to save the edited user
function saveUser(index) {
    let newName = document.getElementById(`edit-name-${index}`).value;
    let newEmail = document.getElementById(`edit-email-${index}`).value;

    if (!newName || !newEmail) {
        alert("Please enter all details correctly.");
        return;
    }

    // Update the user data in the array
    users[index].fullname = newName;
    users[index].email = newEmail;

    // Save updated data to localStorage
    localStorage.setItem('users', JSON.stringify(users));

    // Refresh the display
    displayUsers();
}

// Function to delete a user
function deleteUser(index) {
    // Remove the user from the array
    users.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(users));

    // Refresh the display
    displayUsers();
}

// Function to clear all data from localStorage
function clearStorage() {
    // Clear users from localStorage
    localStorage.removeItem('users');

    // Clear the users array
    users = [];

    // Refresh the table display to show no users
    displayUsers();
}

function signOut() {
    alert("Signing Out...");
    window.location.href = "login.html"; 
}

// Event listener for the "Clear Storage" button
document.getElementById("clearStorageBtn").addEventListener("click", clearStorage);
document.getElementById("signOutBtn").addEventListener("click", signOut);

// Display users when the page loads
document.addEventListener('DOMContentLoaded', function() {
    displayUsers();
});

// Event listener for the form submission
document.getElementById("registerForm").addEventListener("submit", addUser);
