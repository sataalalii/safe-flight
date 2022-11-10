const request = require("request");
const Axios = require("axios");
const api_key = "6b33d67d-117b-4a2e-81e3-af38f8f3f51b";
const api_base = "https://airlabs.co/api/v9/flights?api_key=";
// const cors = require("cors");

// app.use(cors);

function apiCall(params) {
    let err= "";
    let res = "";
    let url = api_base+api_key+"&dep_iata="+params.dep_iata;
    let cb = (err, res);
    let method = "ping";
    params.api_key = api_key;
    request.post(url);
}

console.log(apiCall({dep_iata: 'DMM', arr_iata: 'DMM'}));