//This is a separate file data.route.js that defines routes for the Express application.

//Importing Required Modules
var express = require('express');
var dataController = require('../controllers/data.controller');
var dataRoute = express.Router();

dataRoute.get('/compteurs/live', dataController.GetAllDataLive);

dataRoute.post('/shelly', dataController.rufShelly);

dataRoute.post('/hauptzaehler', dataController.rufHauptzaehler);

//Exporting the configured router so that it can be used in the main server.js fil
module.exports = dataRoute;
