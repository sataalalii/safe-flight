const apiCall = require("./API");
const express = require('express');
const bodyparse = require('body-parser');
// const cors = require('cors');
const app = express();


// app.use(cors);
app.use(bodyparse.json());
app.use(bodyparse.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post("/placesearch", (req, res) => {
    console.log(req.body["place"]);
    apiCall.newsCall(req.body["place"])
        .then(response =>
        console.log(response));
    // res.send(apiCall.newsCall(req.body["place"]));
})

app.post("/login", (req, res) => {
    // console.log("I am a mouse");
    console.log(req.body);
    res.send("on log in server side");
    // res.send("Got your password and email.");
});

// 404 Error
app.use((req, res) => {
    res.status(404).send('Error 404!');
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
