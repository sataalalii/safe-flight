import React from "react";

// function callApi() {
//     fetch('http://', { method: 'GET' })
//     .then(data => data.json()) // Parsing the data into a JavaScript object
//     .then(json => alert(JSON.stringify(json))) // Displaying the stringified data in an alert popup
// }
 

const request = require("request");
const api_key = "6b33d67d-117b-4a2e-81e3-af38f8f3f51b";
const api_base = "https://airlabs.co/api/v9/";

function apiCall(method, params, cb) {
    params.api_key = api_key;
    request.post({url: `${api_base}${method}`, form: params}, cb);
}

apiCall('ping', {param1: 'value1'}, (err, res) => {
    console.log(res);
});

export default flight-api