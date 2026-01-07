const express = require("express");
const router = express.Router();
const reservationController = require('../controllers/reservationController')

router.post("/create", reservationController.create);
router.get("/getallservice", reservationController.getAllService);

module.exports = router;