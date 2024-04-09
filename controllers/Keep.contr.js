// Datenverarbeitungsfunktion für die Berechnung der Differenz und des Durchschnitts
const calculateDifferenceAndAverage = (startDate, endDate, startValue, endValue) => {
  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);
  const timeDiffMinutes = Math.abs(endDateObj - startDateObj) / (1000 * 60); // Differenz in Minuten
  const timeDiffHours = timeDiffMinutes / 60; // Differenz in Stunden
  const consumptionDifference = endValue - startValue; // Differenz der Verbrauchswerte
  const averageConsumption = consumptionDifference / timeDiffHours; // Durchschnittlicher Verbrauch pro Stunde
  return averageConsumption;
};

// Funktion zum Verarbeiten der Anfrage für Shelly
rufShelly = expressAsyncHandler(async (req, res) =>{
  try{
      const body = req.body;
      const shellyName = body.zaehlerName;
      const startDate = body.dateStart;
      const endDate = body.dateEnd;
      const timeInterval = body.timeInterval || '15m'; // Standardmäßig 15 Minuten, kann angepasst werden

      // Datenbankabfrage für Shelly mit angegebenen Zeitrahmen
      const shellyQuery = `from(bucket:"sems") |> range(start: ${startDate}, stop: ${endDate}) |> filter(fn: (r) => r._measurement == "mqtt_consumer") |> filter(fn: (r) => r.device == ${shellyName})  |> filter(fn: (r) => r.measurement_type == "total") |> filter(fn: (r) => r["phase"] == "0" or r["phase"] == "1" or r["phase"] == "2") |> aggregateWindow(every: ${timeInterval}, fn: last, createEmpty: false) |> yield(name: "last")`;

      let data = [];
      // Durchführen der Datenbankabfrage und Verarbeitung der Ergebnisse
      for await (const {values, tableMeta} of queryApi.iterateRows(shellyQuery)) {
          const o = tableMeta.toObject(values);
          data.push(o);
      }

      // Wenn genügend Daten vorhanden sind, berechnen Sie die Differenz und den Durchschnitt
      if (data.length >= 2) {
          const startValue = data[0]._value;
          const endValue = data[data.length - 1]._value;
          const averageConsumption = calculateDifferenceAndAverage(startDate, endDate, startValue, endValue);
          return res.status(200).json({averageConsumption});
      } else {
          return res.status(404).json("Insufficient data for calculation");
      }
  } catch(err) {
      return res.status(501).json("Something went wrong: ERROR = " + err);
  }
});


// Funktion zum Verarbeiten der Anfrage für Hauptzähler
rufHauptzaehler = expressAsyncHandler(async (req, res) =>{
  try{
      const body = req.body;
      const haupZaehlerName = body.zaehlerName;
      const startDate = body.dateStart;
      const endDate = body.dateEnd;
      const timeInterval = body.timeInterval || '15m'; // Standardmäßig 15 Minuten, kann angepasst werden

      // Datenbankabfrage für Hauptzähler mit angegebenen Zeitrahmen
      const hauptzaehlerQuery = `from(bucket:"sems") |> range(start: ${startDate}, stop: ${endDate}) |> filter(fn: (r) => r["_measurement"] == "mqtt_consumer") |> filter(fn: (r) => r["GId"] == ${haupZaehlerName})  |> filter(fn: (r) => r["_field"] == "total") |> aggregateWindow(every: ${timeInterval}, fn: last, createEmpty: false) |> yield(name: "last")`;

      let data = [];
      // Durchführen der Datenbankabfrage und Verarbeitung der Ergebnisse
      for await (const {values, tableMeta} of queryApi.iterateRows(hauptzaehlerQuery)) {
          const o = tableMeta.toObject(values);
          data.push(o);
      }

      // Wenn genügend Daten vorhanden sind, berechnen Sie die Differenz und den Durchschnitt
      if (data.length >= 2) {
          const startValue = data[0]._value;
          const endValue = data[data.length - 1]._value;
          const averageConsumption = calculateDifferenceAndAverage(startDate, endDate, startValue, endValue);
          return res.status(200).json({averageConsumption});
      } else {
          return res.status(404).json("Insufficient data for calculation");
      }
  } catch(err) {
      return res.status(501).json("Something went wrong: ERROR = " + err);
  }
});


// Funktion zum Verarbeiten der Anfrage für Shelly
rufShelly = expressAsyncHandler(async (req, res) =>{
  try{
      const body = req.body;
      const shellyName = body.zaehlerName;
      const startDate = body.dateStart;
      const endDate = body.dateEnd;
      const timeInterval = body.timeInterval || '15m'; // Standardmäßig 15 Minuten, kann angepasst werden

      // Datenbankabfrage für Shelly mit angegebenen Zeitrahmen
      const shellyQuery = `from(bucket:"sems") |> range(start: ${startDate}, stop: ${endDate}) |> filter(fn: (r) => r._measurement == "mqtt_consumer") |> filter(fn: (r) => r.device == ${shellyName})  |> filter(fn: (r) => r.measurement_type == "total") |> filter(fn: (r) => r["phase"] == "0" or r["phase"] == "1" or r["phase"] == "2") |> aggregateWindow(every: ${timeInterval}, fn: last, createEmpty: false) |> yield(name: "last")`;

      let data = [];
      // Durchführen der Datenbankabfrage und Verarbeitung der Ergebnisse
      for await (const {values, tableMeta} of queryApi.iterateRows(shellyQuery)) {
          const o = tableMeta.toObject(values);
          data.push(o);
      }

      // Wenn genügend Daten vorhanden sind, berechnen Sie die Differenz und den Durchschnitt
      if (data.length >= 2) {
          const startValue = data[0]._value;
          const endValue = data[data.length - 1]._value;
          const averageConsumption = calculateDifferenceAndAverage(startDate, endDate, startValue, endValue);
          return res.status(200).json({averageConsumption});
      } else {
          return res.status(404).json("Insufficient data for calculation");
      }
  } catch(err) {
      return res.status(501).json("Something went wrong: ERROR = " + err);
  }
});


// Funktion zum Verarbeiten der Anfrage für Hauptzähler
rufHauptzaehler = expressAsyncHandler(async (req, res) =>{
  try{
      const body = req.body;
      const haupZaehlerName = body.zaehlerName;
      const startDate = body.dateStart;
      const endDate = body.dateEnd;
      const timeInterval = body.timeInterval || '15m'; // Standardmäßig 15 Minuten, kann angepasst werden

      // Datenbankabfrage für Hauptzähler mit angegebenen Zeitrahmen
      const hauptzaehlerQuery = `from(bucket:"sems") |> range(start: ${startDate}, stop: ${endDate}) |> filter(fn: (r) => r["_measurement"] == "mqtt_consumer") |> filter(fn: (r) => r["GId"] == ${haupZaehlerName})  |> filter(fn: (r) => r["_field"] == "total") |> aggregateWindow(every: ${timeInterval}, fn: last, createEmpty: false) |> yield(name: "last")`;

      let data = [];
      // Durchführen der Datenbankabfrage und Verarbeitung der Ergebnisse
      for await (const {values, tableMeta} of queryApi.iterateRows(hauptzaehlerQuery)) {
          const o = tableMeta.toObject(values);
          data.push(o);
      }

      // Wenn genügend Daten vorhanden sind, berechnen Sie die Differenz und den Durchschnitt
      if (data.length >= 2) {
          const startValue = data[0]._value;
          const endValue = data[data.length - 1]._value;
          const averageConsumption = calculateDifferenceAndAverage(startDate, endDate, startValue, endValue);
          return res.status(200).json({averageConsumption});
      } else {
          return res.status(404).json("Insufficient data for calculation");
      }
  } catch(err) {
      return res.status(501).json("Something went wrong: ERROR = " + err);
  }
});
