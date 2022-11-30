import React, {Component} from 'react';
import Axios from 'axios';

class LogIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        // this.handleClearForm = this.handleClearForm.bind(this);
    }

    /* This life cycle hook gets executed when the component mounts */
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleFormSubmit(e) {
        // Form submission logic
        e.preventDefault();
        const userDetails = {email: this.state.email, password: this.state.password};
        Axios.post("/login", userDetails)
            .then( (res) => {
                console.log(res);
            }).catch( (error) => {
            console.log(error);
        });
    }
    // handleClearForm() {
    //     // Logic for resetting the form
    //     this.setState({email: '', password: ''});
    // }
    render() {
        return (
            <form>
                <input type="text" name = "email" placeholder="email address" onChange={e => this.handleChange(e)} />
                <input type="text" name = "password" placeholder="password"  onChange={e => this.handleChange(e)}/>
                <input type="submit" value="submit" onClick={this.handleFormSubmit}/>
                <input type="button" value="Log in with Google" onClick={auth()}/>
                {/*<input type="submit" value="clear form" onClick={this.handleClearForm}/>*/}
            </form>
        );
    }
}

export default LogIn;

//passport routing
function auth(){
    const express = require('express');
const app = express();
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
  
app.listen(4000 , () => {
    console.log("Server Running on port 4000");
});
}
/*
const express = require('express');
const app = express();
const passport = require('passport');
const cookieSession = require('cookie-session');
require('./passport');
  
app.use(cookieSession({
    name: 'google-auth-session',
    keys: ['key1', 'key2']
}));
app.use(passport.initialize());
app.use(passport.session());
    

//button 
app.get('/', (req, res) => {
    res.send("<button><a href='/auth'>Login With Google</a></button>")
});


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
  
app.listen(4000 , () => {
    console.log("Server Running on port 4000");
});
*/