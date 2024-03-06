//This script is the controller (data.controller.js) for handling data-related operations in the Node.js application

//Importing Required Modules
//the express-async-handler module to handle asynchronous errors
//and the InfluxDB module for interacting with InfluxDB
var expressAsyncHandler = require('express-async-handler');
const {InfluxDB} = require('@influxdata/influxdb-client');

//const YOUR_ORG = 'idial'; // we need email
//const YOUR_BUCKET = 'sems';
//const client = new InfluxDB({url: 'http://sems.vms.idial.fh:8086',token:token});
//const queryApi = client.getQueryApi(org);

// Environment variables
// Retrieves environment variables for the InfluxDB connection details
const url = process.env.INFLUX_URL || 'http://sems.vms.idial.fh:8086';
const token = process.env.INFLUX_TOKEN || 'sems_token';
const org = process.env.INFLUX_ORG || 'idial';

/**
 * Instantiate the InfluxDB client
 * with a configuration object.
 *
 * Get a query client configured for your org.
 **/
const queryApi = new InfluxDB({url, token}).getQueryApi(org);



rufHauptzaehler = expressAsyncHandler(async (req, res) =>{
    try{
        const body = req.body;
        const timeRange = body.timeRange * 60; // 1h = 60 minutes
        const haupZaehlerName = body.zaehlerName;

        let data = [];
        var dateEnd = new Date(Date.now());
        const MS_PER_MINUTE = 60000;
        var dateStart = new Date(dateEnd- timeRange * MS_PER_MINUTE);
        dateStart = dateStart.toISOString();
        dateEnd = dateEnd.toISOString();


        /** To avoid SQL injection, use a string literal for the query. */
        const hauptzaehler = `from(bucket:"sems") |> range(start: ${dateStart}, stop: ${dateEnd}) |> filter(fn: (r) => r["_measurement"] == "mqtt_consumer") |> filter(fn: (r) => r["GId"] == ${haupZaehlerName})  |> filter(fn: (r) => r["_field"] == "total") |> aggregateWindow(every: 15m, fn: last, createEmpty: false) |> yield(name: "last")`;
      
        /** Execute a query and receive line table metadata and rows. */    
        for await (const {values, tableMeta} of queryApi.iterateRows(hauptzaehler)) {
            const o = tableMeta.toObject(values)
            data.push(o);
        }
   
        return res.status(200).json(data);
    }catch(err){
        return res.status(501).json("something went wront: ERROR = "+err);
    }
});



rufShelly = expressAsyncHandler(async (req, res) =>{
    try{
        const body = req.body;
        const timeRange = body.timeRange * 60; // 1h = 60 minutes
        const shellyName = body.zaehlerName;

        let data = [];
        var dateEnd = new Date(Date.now());
        const MS_PER_MINUTE = 60000;
        var dateStart = new Date(dateEnd- timeRange * MS_PER_MINUTE);
        dateStart = dateStart.toISOString();
        dateEnd = dateEnd.toISOString();


        /** To avoid SQL injection, use a string literal for the query. */
        const shelly = `from(bucket:"sems") |> range(start: ${dateStart}, stop: ${dateEnd}) |> filter(fn: (r) => r._measurement == "mqtt_consumer") |> filter(fn: (r) => r.device == ${shellyName})  |> filter(fn: (r) => r.measurement_type == "power") |> filter(fn: (r) => r["phase"] == "0" or r["phase"] == "1" or r["phase"] == "2") |> aggregateWindow(every: 15m, fn: last, createEmpty: false) |> yield(name: "last")`;
        /** Execute a query and receive line table metadata and rows. */    
        for await (const {values, tableMeta} of queryApi.iterateRows(shelly)) {
            const o = tableMeta.toObject(values)
            data.push(o);
        }
   
        return res.status(200).json(data);
    }catch(err){
        return res.status(501).json("something went wront: ERROR = "+err);
    }
});


//Exporting Functions
module.exports = {
    
    rufShelly,
    rufHauptzaehler,

}