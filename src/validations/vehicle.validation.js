const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createVehicle = {
  body: Joi.object().keys({
    modelName: Joi.string().required(),
    manufactureName: Joi.string().required(),
    fuelType: Joi.string().required().valid('ethanol','methanol','gasoline','diesel','hydrogen','biodiese','gas'),
    vehicleColor: Joi.string().required(),
  }),
};

const getVehicles = {
  query: Joi.object().keys({
    modelName: Joi.string(),
    manufactureName: Joi.string(),
    fuelType: Joi.string().valid('ethanol','methanol','gasoline','diesel','hydrogen','biodiese','gas'),
    vehicleColor: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getVehicle = {
  params: Joi.object().keys({
    vehicleId: Joi.string().custom(objectId),
  }),
};

const updateVehicle = {
  params: Joi.object().keys({
    vehicleId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      modelName: Joi.string(),
      manufactureName: Joi.string(),
      fuelType: Joi.string().valid('ethanol','methanol','gasoline','diesel','hydrogen','biodiese','gas'),
      vehicleColor: Joi.string(),
    })
    .min(1),
};

const deleteVehicle = {
  params: Joi.object().keys({
    vehicleId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createVehicle,
  getVehicles,
  getVehicle,
  updateVehicle,
  deleteVehicle,
};
