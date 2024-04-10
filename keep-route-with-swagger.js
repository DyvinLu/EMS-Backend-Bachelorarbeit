// //This is a separate file data.route.js that defines routes for the Express application.

// //Importing Required Modules
// var express = require('express');
// var dataController = require('../controllers/data.controller');
// var dataRoute = express.Router();

// /**
//  * @swagger
//  *  components:
//  *      schemas:
//  *          ShellyModel:
//  *              type: object
//  *              properties:
//  *                  zaehlerName:
//  *                      type: string
//  *                  timeRange:
//  *                      type: number
//  *
//  */

// /**
//  * @swagger
//  *  components:
//  *      schemas:
//  *          ShellyResponseModel:
//  *              type: object
//  *              properties:
//  *                  result:
//  *                      type: string
//  *                  table:
//  *                      type: number
//  *                  _start:
//  *                      type: string
//  *                  _stop:
//  *                      type: string
//  *                  _time:
//  *                      type: string
//  *                  _value:
//  *                      type: number
//  *                  _field:
//  *                      type: string
//  *                  _measurement:
//  *                      type: string
//  *                  device:
//  *                      type: string
//  *                  host:
//  *                      type: string
//  *                  measurement_type:
//  *                      type: string
//  *                  phase:
//  *                      type: string
//  *                  topic:
//  *                      type: string
//  *
//  */

// /**
//  * @swagger
//  * /api/data/mes-donnees:
//  * get:
//  *      summary: get all data test
//  *
//  */
// //Defining Routes
// dataRoute.get('/compteurs/live', dataController.GetAllDataLive);

// /**
//  * @swagger
//  * /api/data/shelly:
//  *  post:
//  *      tags:
//  *          - ShellyModel
//  *      summary: this endpoint is to take information concerning a shellyZaehler.
//  *      consumes:
//  *          application/json
//  *      description: prendre les donnees d'un compteur
//  *      requestBody:
//  *          required: false
//  *          content:
//  *              applicaton/json:
//  *                  schema:
//  *                      $ref: '#components/schemas/ShellyModel'
//  *      responses:
//  *          200:
//  *              description: Les donnees pris avec success
//  *              content:
//  *                  applicaton/json:
//  *                      schema:
//  *                          type: array
//  *                          items:
//  *                              $ref: '#components/schemas/ShellyResponseModel'
//  *
//  */
// dataRoute.post('/shelly', dataController.rufShelly);

// /**
//  * @swagger
//  * /api/data/hauptzaehler:
//  *  post:
//  *      tags:
//  *          - ShellyModel
//  *      summary: this endpoint is to take information concerning a hauptzaehler.
//  *      description: prendre les donnees d'un compteur
//  *      requestBody:
//  *          required: true
//  *          content:
//  *              applicaton/json
//  *      responses:
//  *          200:
//  *              description: Les donnees pris avec success
//  *
//  */
// dataRoute.post('/hauptzaehler', dataController.rufHauptzaehler);

// //Exporting the configured router so that it can be used in the main server.js fil
// module.exports = dataRoute;
