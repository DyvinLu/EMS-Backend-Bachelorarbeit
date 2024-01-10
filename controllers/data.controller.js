var expressAsyncHandler = require('express-async-handler');

const {InfluxDB} = require('@influxdata/influxdb-client');

//const YOUR_ORG = 'idial'; // we need email
//const YOUR_BUCKET = 'sems';
//const client = new InfluxDB({url: 'http://sems.vms.idial.fh:8086',token:token});
//const queryApi = client.getQueryApi(org);

/** Environment variables **/
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
 

// cette function renvoie un string
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

        /* compteur1 */
        /** To avoid SQL injection, use a string literal for the query. */
        //const fluxQuery = 'from(bucket:"sems") |> range(start: 0) |> filter(fn: (r) => r._measurement == "mqtt_consumer") |> filter(fn: (r) => r.device == "shelly-3em-ohs23-01") |> filter(fn: (r) => r.measurement_type == "power")' // |> filter(fn: (r) => r.measurement_type == "power")
        const compteur1 = `from(bucket:"sems") |> range(start: ${dateStart}, stop: ${dateEnd}) |> filter(fn: (r) => r._measurement == "mqtt_consumer") |> filter(fn: (r) => r.device == "shelly-3em-ohs23-01")  |> filter(fn: (r) => r.measurement_type == "power")  |> aggregateWindow(every: 10m, fn: mean, createEmpty: false) |> yield(name: "mean")`;
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
        const compteur2 = `from(bucket:"sems") |> range(start: ${dateStart}, stop: ${dateEnd}) |> filter(fn: (r) => r._measurement == "mqtt_consumer") |> filter(fn: (r) => r.device == "shelly-3em-ohs23-02")  |> filter(fn: (r) => r.measurement_type == "power")  |> aggregateWindow(every: 10m, fn: mean, createEmpty: false) |> yield(name: "mean")`;
        /** Execute a query and receive line table metadata and rows. */    
        for await (const {values, tableMeta} of queryApi.iterateRows(compteur2)) {
            const o = tableMeta.toObject(values)
            data.push(o);
        }

        /* compteur3 */
        /** To avoid SQL injection, use a string literal for the query. */
        const compteur3 = `from(bucket:"sems") |> range(start: ${dateStart}, stop: ${dateEnd}) |> filter(fn: (r) => r._measurement == "mqtt_consumer") |> filter(fn: (r) => r.device == "shelly-3em-ohs23-03")  |> filter(fn: (r) => r.measurement_type == "power")  |> aggregateWindow(every: 10m, fn: mean, createEmpty: false) |> yield(name: "mean")`;
        /** Execute a query and receive line table metadata and rows. */    
        for await (const {values, tableMeta} of queryApi.iterateRows(compteur3)) {
            const o = tableMeta.toObject(values)
            data.push(o);
        }

        /* compteur4 */
        /** To avoid SQL injection, use a string literal for the query. */
        const compteur4 = `from(bucket:"sems") |> range(start: ${dateStart}, stop: ${dateEnd}) |> filter(fn: (r) => r._measurement == "mqtt_consumer") |> filter(fn: (r) => r.device == "shelly-3em-ohs23-04")  |> filter(fn: (r) => r.measurement_type == "power")  |> aggregateWindow(every: 10m, fn: mean, createEmpty: false) |> yield(name: "mean")`;
        /** Execute a query and receive line table metadata and rows. */    
        for await (const {values, tableMeta} of queryApi.iterateRows(compteur4)) {
            const o = tableMeta.toObject(values)
            data.push(o);
        }

        /* compteur3 */
        /** To avoid SQL injection, use a string literal for the query. */
        const compteur5 = `from(bucket:"sems") |> range(start: ${dateStart}, stop: ${dateEnd}) |> filter(fn: (r) => r._measurement == "mqtt_consumer") |> filter(fn: (r) => r.device == "shelly-3em-ohs23-05")  |> filter(fn: (r) => r.measurement_type == "power")  |> aggregateWindow(every: 10m, fn: mean, createEmpty: false) |> yield(name: "mean")`;
        /** Execute a query and receive line table metadata and rows. */    
        for await (const {values, tableMeta} of queryApi.iterateRows(compteur5)) {
            const o = tableMeta.toObject(values)
            data.push(o);
        }

           /* compteur6 */
        /** To avoid SQL injection, use a string literal for the query. */
        const compteur6 = `from(bucket:"sems") |> range(start: ${dateStart}, stop: ${dateEnd}) |> filter(fn: (r) => r._measurement == "mqtt_consumer") |> filter(fn: (r) => r.device == "shellyem3-485519C9734D")  |> filter(fn: (r) => r.measurement_type == "power")  |> aggregateWindow(every: 10m, fn: mean, createEmpty: false) |> yield(name: "mean")`;
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



module.exports = {
    GetAllData,
    GetAllDataLive,
}