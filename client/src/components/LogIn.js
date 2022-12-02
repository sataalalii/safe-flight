import React, {Component} from 'react';
import Axios from 'axios';
//import { auth } from './server/server.js';

//const oauth = require('./../../server/server.js');
//const auth_res = oauth.auth();

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
                <input type="submit" value="Log in with Google" onClick={this.handleFormSubmit}/>
                {/*<input type="submit" value="clear form" onClick={this.handleClearForm}/>*/}
            </form>
        );
    }
}

export default LogIn;

