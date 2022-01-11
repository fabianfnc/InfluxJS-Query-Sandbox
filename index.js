console.log("UP AND RUNNING");

const Influx = require("influx");
influx = new Influx.InfluxDB({
  host: "",
  database: "",
  port: 8086,
  username: "",
  password: "",
});

var getData = async function () {
  let query = 'SELECT mean("total_consumption") FROM "engion" WHERE time >= 1641575487000ms and time <= 1641633087000ms GROUP BY *,time(1m) ORDER BY DESC LIMIT 1 SLIMIT 1';
  let res = {};
  try {
    res = await influx.query(query);
  } catch (e) {
    console.log("ERROR: ", e);
  }
  console.log("response:", res);
  return res;
};

let field = "total_consumption";
let measurement = "engion";
let from = "1641575487000";
let to = "1641633087000";

//example to get the first value only
var getFirst = async function (field, measurement) {
  let queryString = 'SELECT first("' + field + '") FROM "' + measurement + '" WHERE time >= ' + from + "ms and time <= " + to + "ms GROUP BY *,time(1m) ORDER BY ASC LIMIT 1 SLIMIT 1";
  let response = await influx.query(queryString);
  console.log("first Value", response);
  return response;
};

//example to get the last value only
var getLast = async function (field, measurement) {
  let queryString = 'SELECT first("' + field + '") FROM "' + measurement + '" WHERE time >= ' + from + "ms and time <= " + to + "ms GROUP BY *,time(1m) ORDER BY DESC LIMIT 1 SLIMIT 1";
  let response = await influx.query(queryString);
  console.log("last Value", response);
  return response;
};

getFirst(field, measurement);
getLast(field, measurement);
