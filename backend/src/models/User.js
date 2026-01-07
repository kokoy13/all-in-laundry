const db = require('../../config/db')

class User{
    static async getUserByEmail(email){
        return await db.query("SELECT id, password, role FROM users WHERE email = ?", [email])
    }

    static async createUser(name, email, password){
        return await db.query("INSERT INTO users (name, password, email) VALUES (?, ?, ?)", [name, password, email])
    }
}

module.exports = User