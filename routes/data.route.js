var express = require('express');
var dataController = require('../controllers/data.controller');
var dataRoute = express.Router();

/**
 * @openapi
 * /compteurs/live:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
dataRoute.get('/compteurs/live', dataController.getAllDataLive);
/**
 * @openapi
 * /shelly:
 *   post:
 *     description: Welcome to swagger-jsdoc 2!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
dataRoute.post('/shelly', dataController.rufShelly);
/**
 * @openapi
 * /hauptzaehler:
 *   post:
 *     description: Welcome to swagger-jsdoc 3!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
dataRoute.post('/hauptzaehler', dataController.rufHauptzaehler);

module.exports = dataRoute;
