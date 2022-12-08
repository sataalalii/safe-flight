import React, {Component} from 'react';
import Axios from 'axios';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            place: ""

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        // this.handleClearForm = this.handleClearForm.bind(this);
    }

    /* This life cycle hook gets executed when the component mounts */
    handleChange(e) {
        this.setState({
            place: e.target.value
        });
    }
    handleFormSubmit(e) {
        // Form submission logic
        e.preventDefault();
        const placeDetails = {"place": this.state.place};
        Axios.post("/placesearch", placeDetails)
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
                <input type="text" name = "place" placeholder="Enter a country" onChange={e => this.handleChange(e)} />
                <input type="submit" value="submit" onClick={this.handleFormSubmit}/>
                {/*<input type="submit" value="clear form" onClick={this.handleClearForm}/>*/}
            </form>
        );
    }
}

export default Search;