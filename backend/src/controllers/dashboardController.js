const Reservation = require("../models/Reservation")

exports.index = async(req, res) =>{
    try {
        const totalOrder = await Reservation.getTotalOrder()
        const revenue = await Reservation.getTotalRevenue()
        const completedOrder = await Reservation.getCompletedOrder()
        const progressOrder = await Reservation.getProgressOrder()
        const recentOrders = await Reservation.getRecentOrder()

        return res.status(200).json({
            totalOrder: totalOrder[0][0].total, 
            revenue: revenue[0][0].total, 
            completedOrder: completedOrder[0][0].total, 
            progressOrder: progressOrder[0][0].total,
            recentOrders: recentOrders[0]
        })
    } catch (error) {
        return res.status(400).json({
            message: `Error ${error}`
        })
    }
}

exports.removeOrder = async(req, res) =>{
    const {order_id} = req.body

    try {
        await Reservation.removeOrder(order_id)
        return res.status(200).json({
            message: "Berhasil menghapus order"
        })
    } catch (error) {
        return res.status(400).json({
            message: `Error ${error}`
        })
    }
}

exports.setOrderStatus = async(req, res) =>{
    const {order_id, condition} = req.body
    try {
        const orders = await Reservation.setOrderStatus(order_id, condition)
        return res.status(200).json({
            message: orders
        })
    } catch (error) {
        return res.status(400).json({
            message: `Error ${error}`
        })
    }
}

exports.setTransactionStatus = async(req, res) =>{
    const {transaction_id, condition} = req.body
    try {
        const transactions = await Reservation.setTransactionStatus(transaction_id, condition)
        return res.status(200).json({
            message: transactions
        })
    } catch (error) {
        return res.status(400).json({
            message: `Error ${error}`
        })
    }
}

exports.getAllOrder = async(req, res) =>{
    try {
        const orders = await Reservation.getAllOrder()
        return res.status(200).json({
            orders: orders[0],
        })
    } catch (error) {
        return res.status(400).json({
            message: `Error ${error}`
        })
    }
}

exports.getAllTransaction = async(req, res)=>{
    try {
        const transactions = await Reservation.getAllTransaction()
        return res.status(200).json({
            transactions: transactions[0],
        })
    } catch (error) {
        return res.status(400).json({
            message: `Error ${error}`
        })
    }
}

exports.getAllService = async(req, res) =>{
    try {
        const services = await Reservation.getAllService()
        return res.status(200).json({
            services: services[0],
        })
    } catch (error) {
        return res.status(400).json({
            message: `Error ${error}`
        })
    }
}

exports.getAllCustomer = async(req, res) =>{
    try {
        const customers = await Reservation.getAllCustomer()
        return res.status(200).json({
            customers: customers[0],
        })
    } catch (error) {
        return res.status(400).json({
            message: `Error ${error}`
        })
    }
}