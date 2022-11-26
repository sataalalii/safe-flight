require('dotenv').config();



const request = require("request");
const api_base = "https://airlabs.co/api/v9/";

function apiCall(method, params, cb) {
    params.api_key = process.env.AIRLABS;
    request.post({url: `${api_base}${method}`, form: params}, cb);
}

// apiCall('ping', {param1: 'value1'}, (err, res) => {
//     console.log(res);
// });

