class User {
    constructor(fullname, username, password, role) {
        this.fullname = fullname;
        this.username = username;
        this.password = password;
        this.role = role;
    }

    // Getter and Setter for fullname
    getFullname() {
        return this.fullname;
    }
    setFullname(newFullname) {
        this.fullname = newFullname;
    }

    // Getter and Setter for username
    getUsername() {
        return this.username;
    }
    setUsername(newUsername) {
        this.username = newUsername;
    }

    // Getter and Setter for password
    getPassword() {
        return this.password;
    }
    setPassword(newPassword) {
        this.password = newPassword;
    }
a
    // Getter and Setter for role
    getRole() {
        return this.role;
    }
    setRole(newRole) {
        this.role = newRole;
    }
}