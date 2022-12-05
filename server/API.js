

require('dotenv').config();
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.NEWS);
const request = require("request");
const api_base = "https://airlabs.co/api/v9/";



function processAirlineSearch(dict) {
    if (dict == null) {
        return null;
    } else {
        let country = "", city = "", airport = "";
        if ("country" in dict) {
            country = dict["country"];
        }
        if (city in dict) {
            city = dict["city"];
        }
        if (airport in dict) {
            airport = dict["airport"];
        }
        let newDict = {"country": country, "city": city, "airport": airport};
        return Airlabs_apiCall("airports", newDict);
    }
}
function Airlabs_apiCall(method, params, cb) {
    params.api_key = process.env.AIRLABS;
    return request.post({url: `${api_base}${method}`, form: params}, cb);
}

function getAirportsDB() {
    Airlabs_apiCall('airports', {}, (err, res) => {
        let unprocessedJSON = JSON.parse(res.body)["response"];
        let airports = [];
        for (let i = 0; i < unprocessedJSON.length; i++) {
            let elem = unprocessedJSON[i];
            let dict = {"Name": elem.name, "IATA_code": elem.iata_code};
            airports.push(dict);
        }
        return airports;
    });
}
// apiCall('ping', {param1: 'value1'}, (err, res) => {
//     console.log(res);
// });


function newsCall(place) {
        return newsapi.v2.everything({
            q: place,
            // from: '22-1-1',
            // language: 'en',
            // sortBy: 'relevancy',
            // page: 2
        })
            // .then(response => {
            //     return response;
            //     /*
            //       {
            //         status: "ok",
            //         articles: [...]
            //       }
            //     */
            // });
    }
module.exports = {newsCall, processAirlineSearch, Airlabs_apiCall, getAirportsDB};