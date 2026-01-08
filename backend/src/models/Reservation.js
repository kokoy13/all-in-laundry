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

    static async getTotalOrder(){
        return await db.query("SELECT count(*) as total FROM orders ORDER BY id")
    }

    static async getAllOrder(){
        return await db.query("SELECT * from orders ORDER BY id")
    }

    static async getAllCustomer(){
        return await db.query("SELECT id, name, email, role, created_at from users ORDER BY id")
    }

    static async getTotalRevenue(){
        return await db.query("SELECT count(total_amount) as total FROM orders WHERE status = 'completed' ORDER BY id")
    }

    static async getCompletedOrder(){
        return await db.query("SELECT count(*) as total FROM orders WHERE status = 'completed' ORDER BY id")
    }

    static async getProgressOrder(){
        return await db.query("SELECT count(*) as total FROM orders WHERE status = 'progress' ORDER BY id")
    }

    static async getRecentOrder(){
        return await db.query("SELECT * FROM orders ORDER BY id DESC LIMIT 5")
    }
}

module.exports = Reservation