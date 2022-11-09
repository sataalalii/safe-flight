import React, {Component} from 'react';
import './App.css';
import flightApi from './components/flight-api';
import Search from './components/Search'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Search />
        <button onClick={flightApi.callApi}>Call API</button>
      </header>
    </div>
  );
}



export default App;
