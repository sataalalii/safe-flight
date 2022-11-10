import React, {Component} from "react";


class App extends Component{
  constructor(props) {
    super(props);

    this.state = {
      item: [],
      isLoaded: false
    }
  }

  componentDidMount() {
    fetch('https://airlabs.co/api/v9/flights?api_key=6b33d67d-117b-4a2e-81e3-af38f8f3f51b&arr_iata=dmm')
    .then(res => res)
    .then(json => {
      this.setState({
        isLoaded: true,
        item: json
      })
    })
  }
  render() {
    var {isLoaded,   item} = this.state;

    if (!isLoaded) {
      return <div> Loading...</div>;
    } else {
      return (
        <div className="App">
          meow
          <ul>
              {item.map(item => (
              <li key = {item.hex}>
              {item.dep_iata | item.arr_iata | item.flight_number}
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }
}

export default App;
