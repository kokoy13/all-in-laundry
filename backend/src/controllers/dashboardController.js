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