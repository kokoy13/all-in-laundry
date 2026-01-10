const db = require('../../config/db')

class Reservation{
    static async insertReservation(user_id, service_id, name, phone, address, quantity, total_amount, notes){
        return await db.query("INSERT INTO orders (user_id, service_id, name, phone, address, quantity, total_amount, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [user_id, service_id, name, phone, address, quantity, total_amount, notes])
    }

    static async removeOrder(order_id){
        return await db.query("DELETE from orders WHERE id = ?", [order_id])
    }

    static async insertTransaction(order_id){
        const order = await this.getOrderById(order_id)
        return await db.query("INSERT transactions (order_id, amount, transaction_date, notes) VALUES (?, ?, ?, ?)", [order_id, order[0].total_amount, order[0].updated_at, order[0].notes])
    }

    static async setOrderStatus(order_id, condition){
        var status = null
        if(condition === "approve"){
            status = "completed"
            await this.insertTransaction(order_id)
        }else if(condition == "disapprove"){
            status = "cancelled"
        }
        var message = `Berhasil ${condition} order`
        
        await db.query("UPDATE orders SET status = ? WHERE id = ?", [status, order_id])
        return message
    }

    static async setTransactionStatus(transaction_id, condition){
        var status = null
        if(condition === "approve"){
            status = "completed"
        }else if(condition == "disapprove"){
            status = "cancelled"
        }
        var message = `Berhasil ${condition} transaction`
        
        await db.query("UPDATE transactions SET status = ? WHERE id = ?", [status, transaction_id])
        return message
    }

    static async getAllTransaction(){
        return await db.query("SELECT * FROM transactions ORDER BY id");
    } 

    static async getAllService(){
        return await db.query("SELECT * FROM services ORDER BY id");
    } 

    static async getOrderByUserId(userId){
        const [rows] = await db.query("SELECT * FROM orders WHERE user_id = ?", [userId])
        return rows
    }

    static async getOrderById(order_id){
        const [rows] = await db.query("SELECT * FROM orders WHERE id = ?", [order_id])
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
        return await db.query("SELECT SUM(amount) as total FROM transactions WHERE status = 'completed' ORDER BY id")
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