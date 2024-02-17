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
 

// Data Retrieval Functions
GetAllData = expressAsyncHandler(async (req, res) =>{
    try{
        let data = [];

        /* compteur1 */
        /** To avoid SQL injection, use a string literal for the query. */
        //const fluxQuery = 'from(bucket:"sems") |> range(start: 0) |> filter(fn: (r) => r._measurement == "mqtt_consumer") |> filter(fn: (r) => r.device == "shelly-3em-ohs23-01") |> filter(fn: (r) => r.measurement_type == "power")' // |> filter(fn: (r) => r.measurement_type == "power")
        const compteur1 = 'from(bucket:"sems") |> range(start: 2023-09-22T13:00:00.000Z, stop: 2023-09-22T14:00:00.000Z) |> filter(fn: (r) => r._measurement == "mqtt_consumer") |> filter(fn: (r) => r.device == "shelly-3em-ohs23-01")  |> filter(fn: (r) => r.measurement_type == "power")  |> aggregateWindow(every: 10m, fn: mean, createEmpty: false) |> yield(name: "mean")';
            // |> filter(fn: (r) => r.measurement_type == "power")
        /** Execute a query and receive line table metadata and rows. */    
        for await (const {values, tableMeta} of queryApi.iterateRows(compteur1)) {
            const o = tableMeta.toObject(values)
            /*console.log(
            `${o._time} ${o._value}`
            );*/
            data.push(o);
        }

        /* compteur2 */
        /** To avoid SQL injection, use a string literal for the query. */
        const compteur2 = 'from(bucket:"sems") |> range(start: 2023-09-22T13:00:00.000Z, stop: 2023-09-22T14:00:00.000Z) |> filter(fn: (r) => r._measurement == "mqtt_consumer") |> filter(fn: (r) => r.device == "shelly-3em-ohs23-02")  |> filter(fn: (r) => r.measurement_type == "power")  |> aggregateWindow(every: 10m, fn: mean, createEmpty: false) |> yield(name: "mean")';
        /** Execute a query and receive line table metadata and rows. */    
        for await (const {values, tableMeta} of queryApi.iterateRows(compteur2)) {
            const o = tableMeta.toObject(values)
            data.push(o);
        }

        /* compteur3 */
        /** To avoid SQL injection, use a string literal for the query. */
        const compteur3 = 'from(bucket:"sems") |> range(start: 2023-09-22T13:00:00.000Z, stop: 2023-09-22T14:00:00.000Z) |> filter(fn: (r) => r._measurement == "mqtt_consumer") |> filter(fn: (r) => r.device == "shelly-3em-ohs23-03")  |> filter(fn: (r) => r.measurement_type == "power")  |> aggregateWindow(every: 10m, fn: mean, createEmpty: false) |> yield(name: "mean")';
        /** Execute a query and receive line table metadata and rows. */    
        for await (const {values, tableMeta} of queryApi.iterateRows(compteur3)) {
            const o = tableMeta.toObject(values)
            data.push(o);
        }

        /* compteur4 */
        /** To avoid SQL injection, use a string literal for the query. */
        const compteur4 = 'from(bucket:"sems") |> range(start: 2023-09-22T13:00:00.000Z, stop: 2023-09-22T14:00:00.000Z) |> filter(fn: (r) => r._measurement == "mqtt_consumer") |> filter(fn: (r) => r.device == "shelly-3em-ohs23-04")  |> filter(fn: (r) => r.measurement_type == "power")  |> aggregateWindow(every: 10m, fn: mean, createEmpty: false) |> yield(name: "mean")';
        /** Execute a query and receive line table metadata and rows. */    
        for await (const {values, tableMeta} of queryApi.iterateRows(compteur4)) {
            const o = tableMeta.toObject(values)
            data.push(o);
        }

        /* compteur3 */
        /** To avoid SQL injection, use a string literal for the query. */
        const compteur5 = 'from(bucket:"sems") |> range(start: 2023-09-22T13:00:00.000Z, stop: 2023-09-22T14:00:00.000Z) |> filter(fn: (r) => r._measurement == "mqtt_consumer") |> filter(fn: (r) => r.device == "shelly-3em-ohs23-05")  |> filter(fn: (r) => r.measurement_type == "power")  |> aggregateWindow(every: 10m, fn: mean, createEmpty: false) |> yield(name: "mean")';
        /** Execute a query and receive line table metadata and rows. */    
        for await (const {values, tableMeta} of queryApi.iterateRows(compteur5)) {
            const o = tableMeta.toObject(values)
            data.push(o);
        }

           /* compteur6 */
        /** To avoid SQL injection, use a string literal for the query. */
        const compteur6 = 'from(bucket:"sems") |> range(start: 2023-09-22T13:00:00.000Z, stop: 2023-09-22T14:00:00.000Z) |> filter(fn: (r) => r._measurement == "mqtt_consumer") |> filter(fn: (r) => r.device == "shellyem3-485519C9734D")  |> filter(fn: (r) => r.measurement_type == "power")  |> aggregateWindow(every: 10m, fn: mean, createEmpty: false) |> yield(name: "mean")';
        /** Execute a query and receive line table metadata and rows. */    
        for await (const {values, tableMeta} of queryApi.iterateRows(compteur6)) {
            const o = tableMeta.toObject(values)
            data.push(o);
        }


        
        return res.status(200).json(data);
    }catch(err){
        return res.status(501).json("something went wront: ERROR = "+err);
    }
});

GetAllDataLive = expressAsyncHandler(async (req, res) =>{
    try{
        let data = [];
        var dateEnd = new Date(Date.now());
        const MS_PER_MINUTE = 60000;
        var dateStart = new Date(dateEnd- 15 * MS_PER_MINUTE);
        dateStart = dateStart.toISOString();
        dateEnd = dateEnd.toISOString();

                /* Hauptzähler 1 */

        const Hauptzähler1 = `from(bucket:"sems") |> range(start: ${dateStart}, stop: ${dateEnd}) |> filter(fn: (r) => r._measurement == "mqtt_consumer") |> filter(fn: (r) => r.device == "XX-06")  |> filter(fn: (r) => r._field == "power")  |> aggregateWindow(every: 15m, fn: mean, createEmpty: false) |> yield(name: "mean")`;
        for await (const {values, tableMeta} of queryApi.iterateRows(Hauptzähler1)) {
            const o = tableMeta.toObject(values)
            /*console.log(
            `${o._time} ${o._value}`
            );*/
            data.push(o);
        }

                /* Hauptzähler 2 */

        const Hauptzähler2 = `from(bucket:"sems") |> range(start: ${dateStart}, stop: ${dateEnd}) |> filter(fn: (r) => r._measurement == "mqtt_consumer") |> filter(fn: (r) => r.device == "XX-07")  |> filter(fn: (r) => r._field == "power")  |> aggregateWindow(every: 15m, fn: mean, createEmpty: false) |> yield(name: "mean")`;
            
        for await (const {values, tableMeta} of queryApi.iterateRows(Hauptzähler2)) {
            const o = tableMeta.toObject(values)
            /*console.log(
            `${o._time} ${o._value}`
            );*/
            data.push(o);
        }

        /* Zähler 1 */
        /** To avoid SQL injection, use a string literal for the query. */
        //const fluxQuery = 'from(bucket:"sems") |> range(start: 0) |> filter(fn: (r) => r._measurement == "mqtt_consumer") |> filter(fn: (r) => r.device == "shelly-3em-ohs23-01") |> filter(fn: (r) => r.measurement_type == "power")' // |> filter(fn: (r) => r.measurement_type == "power")
        const Zähler1 = `from(bucket:"sems") |> range(start: ${dateStart}, stop: ${dateEnd}) |> filter(fn: (r) => r._measurement == "mqtt_consumer") |> filter(fn: (r) => r.device == "shelly-3em-ohs23-01")  |> filter(fn: (r) => r.measurement_type == "power")  |> aggregateWindow(every: 15m, fn: mean, createEmpty: false) |> yield(name: "mean")`;
            // |> filter(fn: (r) => r.measurement_type == "power")
        /** Execute a query and receive line table metadata and rows. */    
        for await (const {values, tableMeta} of queryApi.iterateRows(Zähler1)) {
            const o = tableMeta.toObject(values)
            /*console.log(
            `${o._time} ${o._value}`
            );*/
            data.push(o);
        }

        /* Zähler 2 */
        /** To avoid SQL injection, use a string literal for the query. */
        const Zähler2 = `from(bucket:"sems") |> range(start: ${dateStart}, stop: ${dateEnd}) |> filter(fn: (r) => r._measurement == "mqtt_consumer") |> filter(fn: (r) => r.device == "shelly-3em-ohs23-02")  |> filter(fn: (r) => r.measurement_type == "power")  |> aggregateWindow(every: 15m, fn: mean, createEmpty: false) |> yield(name: "mean")`;
        /** Execute a query and receive line table metadata and rows. */    
        for await (const {values, tableMeta} of queryApi.iterateRows(Zähler2)) {
            const o = tableMeta.toObject(values)
            data.push(o);
        }

        /* Zähler 3 */
        /** To avoid SQL injection, use a string literal for the query. */
        const Zähler3 = `from(bucket:"sems") |> range(start: ${dateStart}, stop: ${dateEnd}) |> filter(fn: (r) => r._measurement == "mqtt_consumer") |> filter(fn: (r) => r.device == "shelly-3em-ohs23-03")  |> filter(fn: (r) => r.measurement_type == "power")  |> aggregateWindow(every: 15m, fn: mean, createEmpty: false) |> yield(name: "mean")`;
        /** Execute a query and receive line table metadata and rows. */    
        for await (const {values, tableMeta} of queryApi.iterateRows(Zähler3)) {
            const o = tableMeta.toObject(values)
            data.push(o);
        }

        /* Zähler 4 */
        /** To avoid SQL injection, use a string literal for the query. */
        const Zähler4 = `from(bucket:"sems") |> range(start: ${dateStart}, stop: ${dateEnd}) |> filter(fn: (r) => r._measurement == "mqtt_consumer") |> filter(fn: (r) => r.device == "shelly-3em-ohs23-04")  |> filter(fn: (r) => r.measurement_type == "power")  |> aggregateWindow(every: 15m, fn: mean, createEmpty: false) |> yield(name: "mean")`;
        /** Execute a query and receive line table metadata and rows. */    
        for await (const {values, tableMeta} of queryApi.iterateRows(Zähler4)) {
            const o = tableMeta.toObject(values)
            data.push(o);
        }

        /* Zähler 5 */
        /** To avoid SQL injection, use a string literal for the query. */
        const Zähler5 = `from(bucket:"sems") |> range(start: ${dateStart}, stop: ${dateEnd}) |> filter(fn: (r) => r._measurement == "mqtt_consumer") |> filter(fn: (r) => r.device == "shelly-3em-ohs23-05")  |> filter(fn: (r) => r.measurement_type == "power")  |> aggregateWindow(every: 15m, fn: mean, createEmpty: false) |> yield(name: "mean")`;
        /** Execute a query and receive line table metadata and rows. */    
        for await (const {values, tableMeta} of queryApi.iterateRows(Zähler5)) {
            const o = tableMeta.toObject(values)
            data.push(o);
        }
   
        return res.status(200).json(data);
    }catch(err){
        return res.status(501).json("something went wront: ERROR = "+err);
    }
});

Shelly3emOhs2301 = expressAsyncHandler(async (req, res) =>{
    try{
        const body = req.body;
        const timeRange = body.timeRange * 60; // 1h = 60 minutes
        const zaehlerName = body.zaehlerName;

        let data = [];
        var dateEnd = new Date(Date.now());
        const MS_PER_MINUTE = 60000;
        var dateStart = new Date(dateEnd- timeRange * MS_PER_MINUTE);
        dateStart = dateStart.toISOString();
        dateEnd = dateEnd.toISOString();


        /** To avoid SQL injection, use a string literal for the query. */
        const Zähler = `from(bucket:"sems") |> range(start: ${dateStart}, stop: ${dateEnd}) |> filter(fn: (r) => r._measurement == "mqtt_consumer") |> filter(fn: (r) => r.device == "shelly-3em-ohs23-01")  |> filter(fn: (r) => r.measurement_type == "power")  |> aggregateWindow(every: 15m, fn: mean, createEmpty: false) |> yield(name: "mean")`;
        /** Execute a query and receive line table metadata and rows. */    
        for await (const {values, tableMeta} of queryApi.iterateRows(Zähler)) {
            const o = tableMeta.toObject(values)
            data.push(o);
        }
   
        return res.status(200).json(data);
    }catch(err){
        return res.status(501).json("something went wront: ERROR = "+err);
    }
});

Shelly3emOhs2302 = expressAsyncHandler(async (req, res) =>{
    try{
        const body = req.body;
        const timeRange = body.timeRange * 60; // 1h = 60 minutes
        const zaehlerName = body.zaehlerName;

        let data = [];
        var dateEnd = new Date(Date.now());
        const MS_PER_MINUTE = 60000;
        var dateStart = new Date(dateEnd- timeRange * MS_PER_MINUTE);
        dateStart = dateStart.toISOString();
        dateEnd = dateEnd.toISOString();


        /** To avoid SQL injection, use a string literal for the query. */
        const Zähler = `from(bucket:"sems") |> range(start: ${dateStart}, stop: ${dateEnd}) |> filter(fn: (r) => r._measurement == "mqtt_consumer") |> filter(fn: (r) => r.device == "shelly-3em-ohs23-02")  |> filter(fn: (r) => r.measurement_type == "power")  |> aggregateWindow(every: 15m, fn: mean, createEmpty: false) |> yield(name: "mean")`;
        /** Execute a query and receive line table metadata and rows. */    
        for await (const {values, tableMeta} of queryApi.iterateRows(Zähler)) {
            const o = tableMeta.toObject(values)
            data.push(o);
        }
   
        return res.status(200).json(data);
    }catch(err){
        return res.status(501).json("something went wront: ERROR = "+err);
    }
});

Shelly3emOhs2303 = expressAsyncHandler(async (req, res) =>{
    try{
        const body = req.body;
        const timeRange = body.timeRange * 60; // 1h = 60 minutes
        const zaehlerName = body.zaehlerName;

        let data = [];
        var dateEnd = new Date(Date.now());
        const MS_PER_MINUTE = 60000;
        var dateStart = new Date(dateEnd- timeRange * MS_PER_MINUTE);
        dateStart = dateStart.toISOString();
        dateEnd = dateEnd.toISOString();


        /** To avoid SQL injection, use a string literal for the query. */
        const Zähler = `from(bucket:"sems") |> range(start: ${dateStart}, stop: ${dateEnd}) |> filter(fn: (r) => r._measurement == "mqtt_consumer") |> filter(fn: (r) => r.device == "shelly-3em-ohs23-03")  |> filter(fn: (r) => r.measurement_type == "power")  |> aggregateWindow(every: 15m, fn: mean, createEmpty: false) |> yield(name: "mean")`;
        /** Execute a query and receive line table metadata and rows. */    
        for await (const {values, tableMeta} of queryApi.iterateRows(Zähler)) {
            const o = tableMeta.toObject(values)
            data.push(o);
        }
   
        return res.status(200).json(data);
    }catch(err){
        return res.status(501).json("something went wront: ERROR = "+err);
    }
});

Shelly3emOhs2304 = expressAsyncHandler(async (req, res) =>{
    try{
        const body = req.body;
        const timeRange = body.timeRange * 60; // 1h = 60 minutes
        const zaehlerName = body.zaehlerName;

        let data = [];
        var dateEnd = new Date(Date.now());
        const MS_PER_MINUTE = 60000;
        var dateStart = new Date(dateEnd- timeRange * MS_PER_MINUTE);
        dateStart = dateStart.toISOString();
        dateEnd = dateEnd.toISOString();


        /** To avoid SQL injection, use a string literal for the query. */
        const Zähler = `from(bucket:"sems") |> range(start: ${dateStart}, stop: ${dateEnd}) |> filter(fn: (r) => r._measurement == "mqtt_consumer") |> filter(fn: (r) => r.device == "shelly-3em-ohs23-04")  |> filter(fn: (r) => r.measurement_type == "power")  |> aggregateWindow(every: 15m, fn: mean, createEmpty: false) |> yield(name: "mean")`;
        /** Execute a query and receive line table metadata and rows. */    
        for await (const {values, tableMeta} of queryApi.iterateRows(Zähler)) {
            const o = tableMeta.toObject(values)
            data.push(o);
        }
   
        return res.status(200).json(data);
    }catch(err){
        return res.status(501).json("something went wront: ERROR = "+err);
    }
});

Shelly3emOhs2305 = expressAsyncHandler(async (req, res) =>{
    try{
        const body = req.body;
        const timeRange = body.timeRange * 60; // 1h = 60 minutes
        const zaehlerName = body.zaehlerName;

        let data = [];
        var dateEnd = new Date(Date.now());
        const MS_PER_MINUTE = 60000;
        var dateStart = new Date(dateEnd- timeRange * MS_PER_MINUTE);
        dateStart = dateStart.toISOString();
        dateEnd = dateEnd.toISOString();


        /** To avoid SQL injection, use a string literal for the query. */
        const Zähler = `from(bucket:"sems") |> range(start: ${dateStart}, stop: ${dateEnd}) |> filter(fn: (r) => r._measurement == "mqtt_consumer") |> filter(fn: (r) => r.device == "shelly-3em-ohs23-05")  |> filter(fn: (r) => r.measurement_type == "power")  |> aggregateWindow(every: 15m, fn: mean, createEmpty: false) |> yield(name: "mean")`;
        /** Execute a query and receive line table metadata and rows. */    
        for await (const {values, tableMeta} of queryApi.iterateRows(Zähler)) {
            const o = tableMeta.toObject(values)
            data.push(o);
        }
   
        return res.status(200).json(data);
    }catch(err){
        return res.status(501).json("something went wront: ERROR = "+err);
    }
});

XX06 = expressAsyncHandler(async (req, res) =>{
    try{
        const body = req.body;
        const timeRange = body.timeRange * 60; // 1h = 60 minutes
        const zaehlerName = body.zaehlerName;

        let data = [];
        var dateEnd = new Date(Date.now());
        const MS_PER_MINUTE = 60000;
        var dateStart = new Date(dateEnd- timeRange * MS_PER_MINUTE);
        dateStart = dateStart.toISOString();
        dateEnd = dateEnd.toISOString();


        /** To avoid SQL injection, use a string literal for the query. */
        const Zähler = `from(bucket:"sems") |> range(start: ${dateStart}, stop: ${dateEnd}) |> filter(fn: (r) => r._measurement == "mqtt_consumer") |> filter(fn: (r) => r.device == "xx-06")  |> filter(fn: (r) => r.measurement_type == "power")  |> aggregateWindow(every: 15m, fn: mean, createEmpty: false) |> yield(name: "mean")`;
        /** Execute a query and receive line table metadata and rows. */    
        for await (const {values, tableMeta} of queryApi.iterateRows(Zähler)) {
            const o = tableMeta.toObject(values)
            data.push(o);
        }
   
        return res.status(200).json(data);
    }catch(err){
        return res.status(501).json("something went wront: ERROR = "+err);
    }
});


XX07 = expressAsyncHandler(async (req, res) =>{
    try{
        const body = req.body;
        const timeRange = body.timeRange * 60; // 1h = 60 minutes
        const zaehlerName = body.zaehlerName;

        let data = [];
        var dateEnd = new Date(Date.now());
        const MS_PER_MINUTE = 60000;
        var dateStart = new Date(dateEnd- timeRange * MS_PER_MINUTE);
        dateStart = dateStart.toISOString();
        dateEnd = dateEnd.toISOString();


        /** To avoid SQL injection, use a string literal for the query. */
        const Zähler = `from(bucket:"sems") |> range(start: ${dateStart}, stop: ${dateEnd}) |> filter(fn: (r) => r._measurement == "mqtt_consumer") |> filter(fn: (r) => r.device == "xx-07")  |> filter(fn: (r) => r.measurement_type == "power")  |> aggregateWindow(every: 15m, fn: mean, createEmpty: false) |> yield(name: "mean")`;
        /** Execute a query and receive line table metadata and rows. */    
        for await (const {values, tableMeta} of queryApi.iterateRows(Zähler)) {
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
    GetAllData,
    GetAllDataLive,
    
    Shelly3emOhs2301,
    Shelly3emOhs2302,
    Shelly3emOhs2303,
    Shelly3emOhs2304,
    Shelly3emOhs2305,
    
    XX06,
    XX07,

}