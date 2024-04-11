var expressAsyncHandler = require('express-async-handler');
const { InfluxDB } = require('@influxdata/influxdb-client');

const url = process.env.INFLUX_URL || 'http://sems.vms.idial.fh:8086';
const token = process.env.INFLUX_TOKEN || 'sems_token';
const org = process.env.INFLUX_ORG || 'idial';
const standardInterval = '15m';

const queryApi = new InfluxDB({ url, token }).getQueryApi(org);
const hauptzaehlerNamen = ['"ITRON"', '"EBZDD3"'];
const shellyNamen = [
  '"shelly-3em-ohs23-01"',
  '"shelly-3em-ohs23-02"',
  '"shelly-3em-ohs23-03"',
  '"shelly-3em-ohs23-04"',
  '"shelly-3em-ohs23-05"',
];

const getQueryForHauptzaehler = (name, start, end, interval) => {
  return `from(bucket:"sems") |> range(start: ${start}, stop: ${end}) |> filter(fn: (r) => r["_measurement"] == "mqtt_consumer") |> filter(fn: (r) => r["GId"] == ${name})  |> filter(fn: (r) => r["_field"] == "total") |> aggregateWindow(every: ${interval}, fn: last, createEmpty: false) |> yield(name: "last")`;
};
const getQueryForShelly = (name, start, end, interval) => {
  return `from(bucket:"sems") |> range(start: ${start}, stop: ${end}) |> filter(fn: (r) => r._measurement == "mqtt_consumer") |> filter(fn: (r) => r.device == ${name})  |> filter(fn: (r) => r["measurement_type"] == "total")|> filter(fn: (r) => r["phase"] == "0" or r["phase"] == "1" or r["phase"] == "2") |> aggregateWindow(every: ${interval}, fn: last, createEmpty: false) |> yield(name: "last")`;
};

const queryDatabase = async (query) => {
  const data = [];
  try {
    for await (const { values, tableMeta } of queryApi.iterateRows(query)) {
      const o = tableMeta.toObject(values);
      data.push(o);
    }
    return data;
  } catch (error) {
    console.error('Fehler beim Abrufen der Daten:', error);
    throw error;
  }
};

const rufHauptzaehler = expressAsyncHandler(async (req, res) => {
  try {
    const { zaehlerName, dateStart, dateEnd, timeInterval } = req.body;
    const start = new Date(dateStart).toISOString();
    const end = new Date(dateEnd).toISOString(); // ceci peut etre ll'instant T ou' on se trouve
    const interval = timeInterval || standardInterval; // Standardmäßig 15 Minuten, kann angepasst werden

    /** To avoid SQL injection, use a string literal for the query. */
    const query = getQueryForHauptzaehler(zaehlerName, start, end, interval);
    const data = await queryDatabase(query);

    return res.status(200).json(data);
  } catch (err) {
    return res.status(501).json('something went wront: ERROR = ' + err);
  }
});

const rufShelly = expressAsyncHandler(async (req, res) => {
  try {
    //console.log("req",req.body)

    const { zaehlerName, dateStart, dateEnd, timeInterval } = req.body;
    const start = new Date(dateStart).toISOString();
    const end = new Date(dateEnd).toISOString();
    const interval = timeInterval || standardInterval; // Standardmäßig 15 Minuten, kann angepasst werden

    /** To avoid SQL injection, use a string literal for the query. */
    const query = getQueryForShelly(zaehlerName, start, end, interval);
    const data = await queryDatabase(query);

    return res.status(200).json(data);
  } catch (err) {
    return res.status(501).json('something went wront: ERROR = ' + err);
  }
});

const getAllDataLive = expressAsyncHandler(async (req, res) => {
  try {
    const MS_PER_MINUTE = 60000;
    const data = [];
    const end = new Date(Date.now()).toISOString();
    const start = new Date(
      new Date(Date.now()).getTime() - 15 * MS_PER_MINUTE
    ).toISOString();
    const interval = standardInterval; // Standardmäßig 15 Minuten, kann angepasst werden

    for (const name of hauptzaehlerNamen) {
      const tmp = await queryDatabase(
        getQueryForHauptzaehler(name, start, end, interval)
      );
      data.push(tmp);
    }

    for (const name of shellyNamen) {
      const tmp = await queryDatabase(
        getQueryForShelly(name, start, end, interval)
      );
      data.push(tmp);
    }
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(501).json('something went wront: ERROR = ' + err);
  }
});

//Exporting Functions
module.exports = {
  rufShelly,
  rufHauptzaehler,
  getAllDataLive,
};
