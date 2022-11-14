const Axios  = require("axios");
const express = require("express");
const app = express();
const request = require("request");
const api_key = "6b33d67d-117b-4a2e-81e3-af38f8f3f51b";
const api_base = "https://airlabs.co/api/v9/";
const bodyparse = require('body-parser');
// const cors = require("cors");


app.use(bodyparse.json());
app.use(bodyparse.urlencoded({extended: true}));
// app.use(cors);

function apiCall(method, params, cb) {
    params.api_key = api_key;
    request.post({url: `${api_base}${method}`, form: params}, cb);
  }

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post("/post", (req, res) => {
    console.log("connected to React");
    res.redirect("/results");
});

app.post("/results", (req, res) => {
    console.log("on results page");
    let data = req.body;
    data.api_key = api_key;
    console.log(data);
    apiCall('flights', data, (e, r) => {
        res.send(r);
    });
    
});

// apiCall('ping', {param1: 'value1'}, (err, res) => {
//     console.log(res);
//   });

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
