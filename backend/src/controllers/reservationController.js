const Reservation = require("../models/Reservation")


exports.create = async(req, res) =>{
    const {formData, userId} = req.body
    try {
        await Reservation.insertReservation(
            userId,
            formData.service_id, 
            formData.name, 
            formData.phone, 
            formData.address, 
            formData.quantity, 
            formData.total_amount, 
            formData.notes
        )

        return res.status(200).json({
            message: `Berhasil melakukan reservasi`
        })
    } catch (error) {
        return res.status(400).json({
            message: `Error: ${error}`
        })
    }
}

exports.getAllService = async(req, res) =>{
    try {
        const services = await Reservation.getAllService()
        return res.status(200).json({
            services: services[0]
        })
    } catch (error) {
        return res.status(400).json({
            message: `Error gan: ${error}`
        })
    }
}

exports.getOrderByUserId = async(req, res) =>{
    const {userId} = req.query

    try {
        const orders = await Reservation.getOrderByUserId(userId)
        return res.status(200).json({
            orders: orders
        })
    } catch (error) {
        return res.status(400).json({
            message: `Error gan: ${error}`
        })
    }
}