
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


//passport routing
function auth(){
    const passport = require('passport');
const cookieSession = require('cookie-session');
require('./passport');
app.use(cookieSession({
    name: 'google-auth-session',
    keys: ['key1', 'key2']
}));
app.use(passport.initialize());
app.use(passport.session());
    
/*
//button 
app.get('/', (req, res) => {
    res.send("<button><a href='/auth'>Login With Google</a></button>")
});
*/

// Auth 
app.get('/auth' , passport.authenticate('google', { scope:
    [ 'email', 'profile' ]
}));
  

// Auth Callback
app.get( '/auth/callback',
    passport.authenticate( 'google', {
        successRedirect: '/auth/callback/success',
        failureRedirect: '/auth/callback/failure'
}));
  
// Success 
app.get('/auth/callback/success' , (req , res) => {
    if(!req.user)
        res.redirect('/auth/callback/failure');
    res.send("Welcome " + req.user.email);
});
  
// failure
app.get('/auth/callback/failure' , (req , res) => {
    res.send("Error");
});

/*
app.listen(3000 , () => {
    console.log("Server Running on port 3000");
});
*/
}

module.exports = { auth };
