// These are all the packages currently installed for the program to work

const Axios  = require("axios");  // allows for handling HTTP requests (POST/GET...)
const express = require("express"); // Package interconnected with Node allows for routing
const app = express();
const request = require("request"); // used by Airlabs API\
const bodyparse = require('body-parser'); // processes req.body (parses so not empty/null)
app.use(bodyparse.json());
app.use(bodyparse.urlencoded({extended: true}));

// const cors = require("cors"); // may be used for Cross-origin resource sharing
// app.use(cors);


// constants used by Airlabs API call.
const api_key = "6b33d67d-117b-4a2e-81e3-af38f8f3f51b";
const api_base = "https://airlabs.co/api/v9/";

/* Airlabs API call from their website */
function apiCall(method, params, cb) {
    params.api_key = api_key;
    request.post({url: `${api_base}${method}`, form: params}, cb);
  }


// Routes below were used to test functionality of this app.js

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

// Checks that this server/end is running by logging a string of the port it listens on.

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
