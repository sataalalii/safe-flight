import React, { Component } from 'react';
import Axios from 'axios'

class FlightForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dep_iata: "",
      arr_iata: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

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

  updateFlight(event) {
    this.setState({
      dep_iata: event.target.value,
      arr_iata: event.target.value
    });
  }



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
