require('dotenv').config();
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.NEWS);
const request = require("request");
const api_base = "https://airlabs.co/api/v9/";


// function apiCall(method, params, cb) {
//     params.api_key = process.env.AIRLABS;
//     request.post({url: `${api_base}${method}`, form: params}, cb);
// }

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
module.exports = {newsCall};