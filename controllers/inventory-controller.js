const inventorymodels = require('../models/inventory-models');
const { renderVehicleDetails } = require('../utilities');

exports.getVehicleDetails = async (req, res, next) => {
  try {
    const vehicleId = req.params.id;
    const vehicleData = await inventory-models.getVehicleById(vehicleId);
    const vehicleHTML = renderVehicleDetails(vehicleData);
    res.send(vehicleHTML);
  } catch (error) {
    next(error);
  }
};
