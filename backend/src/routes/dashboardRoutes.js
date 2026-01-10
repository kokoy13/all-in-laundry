const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController.js");

router.get("/getoverview", dashboardController.index);
router.get("/getallorder", dashboardController.getAllOrder);
router.get("/getallcustomer", dashboardController.getAllCustomer);
router.get("/getallservice", dashboardController.getAllService);
router.get("/getalltransaction", dashboardController.getAllTransaction)
router.post("/setorderstatus", dashboardController.setOrderStatus)
router.post("/removeorder", dashboardController.removeOrder)
router.post("/settransactionstatus", dashboardController.setTransactionStatus)

module.exports = router;