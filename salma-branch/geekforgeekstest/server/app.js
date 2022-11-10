const Axios  = require("axios");
const express = require("express");
const app = express();
const request = require("request");
const api_key = "6b33d67d-117b-4a2e-81e3-af38f8f3f51b";
const api_base = "https://airlabs.co/api/v9/flights?api_key=";
// const cors = require("cors");

// app.use(cors);

function apiCall(params) {
    let err= "";
    let res = "";
    let cb = (err, res);
    let method = "ping";
    params.api_key = api_key;
    Axios.post(api_base+api_key+"&", params);
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
    // let {dep_iata_val, arr_iata_val} = req.body.data;
    // let response_val = apiCall({dep_iata: dep_iata_val, arr_iata: arr_iata_val})
    // res.send(response_val)
    console.log(apiCall({dep_iata: 'BOS', arr_iata: 'DMM'}))
    res.send("meow");
    // res.redirect("/");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
