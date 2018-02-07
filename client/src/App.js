import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = { stops: [] };
  }

  componentDidMount() {
    fetch('/api/v1/gtfs/stops')
      .then(res => res.json())
      .then(stops => this.setState({ stops }));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <h1>NYC MTA Stops</h1>
        <ul>
          {this.state.stops.map(stop =>
            <li key={stop.stop_id}>{stop.stop_name}</li>
          )}
        </ul>
      </div>
    );
  }
}

export default App;
