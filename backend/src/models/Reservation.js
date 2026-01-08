const db = require('../../config/db')

class Reservation{
    static async insertReservation(user_id, service_id, name, phone, address, quantity, total_amount, notes){
        return await db.query("INSERT INTO orders (user_id, service_id, name, phone, address, quantity, total_amount, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [user_id, service_id, name, phone, address, quantity, total_amount, notes])
    }

    static async getAllService(){
        const [rows] = await db.query("SELECT * FROM services");
        return rows
    } 

    static async getOrderByUserId(userId){
        const [rows] = await db.query("SELECT * FROM orders WHERE user_id = ?", [userId])
        return rows
    }
}

module.exports = Reservation