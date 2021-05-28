const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginateCache } = require('./plugins');

const vehicleSchema = mongoose.Schema(
  {
    modelName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    manufactureName: {
      type: String,
      required: true,
      trim: true,
    },
    fuelType: {
      type: String,
      enum: ['ethanol','methanol','gasoline','diesel','hydrogen','biodiese','gas'],
      default: 'gasoline',
    },
    vehicleColor: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
vehicleSchema.plugin(toJSON);
vehicleSchema.plugin(paginateCache);

/**
 * Check if modelName is taken
 * @param {string} modelName - The vehicle's modelName
 * @param {ObjectId} [excludevehicleId] - The id of the vehicle to be excluded
 * @returns {Promise<boolean>}
 */
 vehicleSchema.statics.isModelName = async function (modelName, excludevehicleId) {
  const vehicle = await this.findOne({ modelName, _id: { $ne: excludevehicleId } });
  return !!vehicle;
};

/**
 * @typedef vehicle
 */
const vehicle = mongoose.model('vehicle', vehicleSchema);

module.exports = vehicle;
