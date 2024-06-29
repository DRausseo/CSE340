// Needed Resources 
const express = require("express");
const router = express.Router(); 
const inventoryController = require("../controllers/inventory-controller");

// Route to build inventory by classification view
router.get('/vehicle/:id', inventoryController.getVehicleDetails);

module.exports = router;

