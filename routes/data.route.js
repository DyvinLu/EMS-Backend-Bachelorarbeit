//This is a separate file data.route.js that defines routes for the Express application.

//Importing Required Modules
var express = require('express');
var dataController = require('../controllers/data.controller');
var dataRoute = express.Router();

//Swagger Documentation
/**
 * @swagger
 * /api/data/mes-donnees:
 * get:
 *      summary: get all data test
 *   
 */
//Defining Routes
dataRoute.get(
    '/compteurs',
    dataController.GetAllData
);

//Swagger Documentation
/**
 * @swagger
 * /api/data/mes-donnees:
 * get:
 *      summary: get all data test
 *   
 */
//Defining Routes
dataRoute.get(
    '/compteurs/live',
    dataController.GetAllDataLive
);

//Exporting the configured router so that it can be used in the main server.js fil
module.exports = dataRoute;