// imports made here
import React, { Component } from 'react'; // Primary use of React and Components package in it.
import Axios from 'axios' // allows for HTTP requests (POST/GET...)


import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages';
import About from './pages/about';
import Events from './pages/events';
import AnnualReport from './pages/annual';
import Teams from './pages/team';
import Blogs from './pages/blogs';
import SignUp from './pages/signup';

// made a class called FlightForm as basic display of a form taking in flight destination and departure.
class FlightForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dep_iata: "",
      arr_iata: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateFlight = this.updateFlight.bind(this);
  }

  // handles submission of arr_iata and dep_iata on page.
  handleSubmit(event) {
    event.preventDefault();
    const url = '../../results';
    const flightData = {arr_iata: this.state.arr_iata, dep_iata: this.state.dep_iata};
    
    Axios.post(url, flightData)
      .then( (res) => {
          console.log(res);
      }).catch( (error) => {
          console.log(error);
      })
  }

  // method called by handleSubmit to update dep_iata and arr_iata.
  updateFlight(event) {
    this.setState({
      dep_iata: event.target.value,
      arr_iata: event.target.value
    });
  }


  // currently keeping this bit of code below in case it helps for future reference.

  // render() {
  //   return (
  //     <div className="App">
  //       <form action="../../post" method="post"
  //         className="form">
  //       <button type="submit">Connected?</button>
  //       </form>


  //       <form action="../../results" method="post"
  //         className="form">
  //       <input type = "text" name = "arrival iata" id="arr_iata" />
  //       <input type = "text" name = "departure iata" id = "dep_iata" />
  //       <button type="submit">get results?</button>
  //       </form>

  //     </div>
  //   );
  // }

  App() {
    return (
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact component={Home} />
          <Route path='/about' component={About} />
          <Route path='/events' component={Events} />
          <Route path='/annual' component={AnnualReport} />
          <Route path='/team' component={Teams} />
          <Route path='/blogs' component={Blogs} />
          <Route path='/sign-up' component={SignUp} />
        </Routes>
      </Router>
    );
  }


  // method that displays form on page.
  render() {
    return (
        
        <form onSubmit={this.handleSubmit}>
            <p className="title">Flights</p>
            <p className="subtitle">Get flights by entering departure city iata and arrival city iata</p>
            <div className="field">
                <label className="label">Depature_iata</label>
                <div className="control">
                    <input
                        className="input"
                        type="text"
                        placeholder="Type departure iata name here"
                        onChange={e => this.updateFlight(e)} />
                </div>
            </div>
            <div className="field">
                <label className="label">Arrival_iata</label>
                <div className="control">
                    <input
                        className="input"
                        type="text"
                        placeholder="Type arrival iata name here"
                        onChange={e => this.updateFlight(e)} />
                </div>
            </div>

            <div className="field">
                <div className="control">
                    <input
                        type='submit'
                        value='Search' />
                </div>
            </div>
        </form>
        
    )
}

}

export default FlightForm;
