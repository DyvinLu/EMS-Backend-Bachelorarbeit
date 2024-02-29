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

dataRoute.post(
    '/compteurs/Shelly3emOhs2305',
    dataController.Shelly3emOhs2305
);
dataRoute.post(
    '/compteurs/Shelly3emOhs2304',
    dataController.Shelly3emOhs2304
);
dataRoute.post(
    '/compteurs/Shelly3emOhs2303',
    dataController.Shelly3emOhs2303
);
dataRoute.post(
    '/compteurs/Shelly3emOhs2302',
    dataController.Shelly3emOhs2302
);
dataRoute.post(
    '/compteurs/Shelly3emOhs2301',
    dataController.Shelly3emOhs2301
);
dataRoute.post(
    '/compteurs/EBZDD3',
    dataController.EBZDD3
);
dataRoute.post(
    '/compteurs/ITRON',
    dataController.ITRON
);


//Exporting the configured router so that it can be used in the main server.js fil
module.exports = dataRoute;