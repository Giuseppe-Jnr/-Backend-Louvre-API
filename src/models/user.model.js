class User {
    constructor(id, username, email, password, role, created_at) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
        this.created_at = created_at;
    }
}

module.exports = User;
