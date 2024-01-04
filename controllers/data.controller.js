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
        /** To avoid SQL injection, use a string literal for the query. */
        const fluxQuery = 'from(bucket:"sems") |> range(start: 0) |> filter(fn: (r) => r._measurement == "mqtt_consumer") |> filter(fn: (r) => r.device == "shelly-3em-ohs23-01") |> filter(fn: (r) => r.measurement_type == "power")' // |> filter(fn: (r) => r.measurement_type == "power")

        const myQuery = async () => {
        for await (const {values, tableMeta} of queryApi.iterateRows(fluxQuery)) {
            const o = tableMeta.toObject(values)
            console.log(
            `${o._time} ${o._measurement}: ${o._value}`
            )
        }
        }

        /** Execute a query and receive line table metadata and rows. */
        myQuery();


        /*let csv = []
        const query =
        `from(bucket: "sems")
        |> range(start: -5m)
        |> filter(fn: (r) => r["_device"] == "shelly-3em-ohs23-01")
        |> filter(fn: (r) => r["_device"] == "power")
        |> yield(name: "mean")`

        queryApi.queryRows(query, {
            next(row,tableMeta){
                o = tableMeta.toObject(row)
                csv.push(o)
                console.log(`${o._time} ${o._neasurement}: ${o._field}=${o._value}`)
            },
            error(error) {
                console.error(error)
                res.end()
            },
            complete() {
                res.json(csv)
            },
        })*/


    }catch(err){
        return res.status(501).json("something went wront: ERROR = "+err);
    }
});


module.exports = {
    GetAllData
}