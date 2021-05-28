const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const vehicleValidation = require('../../validations/vehicle.validation');
const vehicleController = require('../../controllers/vehicle.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageVehicles'), validate(vehicleValidation.createVehicle), vehicleController.createVehicle)
  .get(auth('getVehicles'), validate(vehicleValidation.getVehicles), vehicleController.getVehicles);

// router
//   .route('/:vehicleId')
//   .get(auth('getVehicles'), validate(vehicleValidation.getVehicle), vehicleController.getVehicle)
//   .patch(auth('manageVehicles'), validate(vehicleValidation.updateVehicle), vehicleController.updateVehicle)
//   .delete(auth('manageVehicles'), validate(vehicleValidation.deleteVehicle), vehicleController.deleteVehicle);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Vehicles
 *   description: Vehicle management and retrieval
 */

/**
 * @swagger
 * path:
 *  /vehicles:
 *    post:
 *      summary: Create a vehicle
 *      description: Only admins can create other vehicles.
 *      tags: [Vehicles]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - modelName
 *                - manufactureName
 *                - fuelType
 *                - vehicleColor
 *              properties:
 *                modelName:
 *                  type: string
 *                manufactureName:
 *                  type: string
 *                fuelType:
 *                  type: string
 *                vehicleColor:
 *                  type: string
 *              example:
 *                modelName: cbr 150 cc
 *                manufactureName: honda
 *                fuelType: gasoline
 *                vehicleColor: red
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Vehicle'
 *        "400":
 *          $ref: '#/components/responses/DuplicateEmail'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *
 *    get:
 *      summary: Get all vehicles
 *      description: Only admins can retrieve all vehicles.
 *      tags: [Vehicles]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: query
 *          name: modelName
 *          schema:
 *            type: string
 *          description: modelName
 *        - in: query
 *          name: manufactureName
 *          schema:
 *            type: string
 *          description: manufactureName
 *        - in: query
 *          name: fuelType
 *          schema:
 *            type: string
 *          description: fuelType
 *        - in: query
 *          name: vehicleColor
 *          schema:
 *            type: string
 *          description: vehicleColor
 *        - in: query
 *          name: sortBy
 *          schema:
 *            type: string
 *          description: sort by query in the form of field:desc/asc (ex. modelName:asc)
 *        - in: query
 *          name: limit
 *          schema:
 *            type: integer
 *            minimum: 1
 *          default: 10
 *          description: Maximum number of vehicles
 *        - in: query
 *          name: page
 *          schema:
 *            type: integer
 *            minimum: 1
 *            default: 1
 *          description: Page number
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  results:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/Vehicle'
 *                  page:
 *                    type: integer
 *                    example: 1
 *                  limit:
 *                    type: integer
 *                    example: 10
 *                  totalPages:
 *                    type: integer
 *                    example: 1
 *                  totalResults:
 *                    type: integer
 *                    example: 1
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 */
