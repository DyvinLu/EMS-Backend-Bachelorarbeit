var express = require('express');
var dataController = require('../controllers/data.controller');
var dataRoute = express.Router();

dataRoute.get('/compteurs/live', dataController.getAllDataLive);
dataRoute.post('/shelly', dataController.rufShelly);
dataRoute.post('/hauptzaehler', dataController.rufHauptzaehler);

module.exports = dataRoute;
