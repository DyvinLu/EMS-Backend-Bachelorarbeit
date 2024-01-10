var express = require('express');


var dataController = require('../controllers/data.controller');
var dataRoute = express.Router();


/**
 * @swagger
 * /api/data/mes-donnees:
 * get:
 *      summary: get all data test
 *   
 */
dataRoute.get(
    '/compteurs',
    dataController.GetAllData
);

/**
 * @swagger
 * /api/data/mes-donnees:
 * get:
 *      summary: get all data test
 *   
 */
dataRoute.get(
    '/compteurs/live',
    dataController.GetAllDataLive
);





module.exports = dataRoute;