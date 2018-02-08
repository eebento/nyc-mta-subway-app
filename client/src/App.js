import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PropTypes from 'prop-types'
import { Map, TileLayer, Marker, Popup, PropTypes as MapPropTypes } from 'react-leaflet'

/**
 * App client
 */

// Subway stops are loaded one time then added on the map depending on their visibility
let stops = [];

// Marker template
const MyPopupMarker = ({ label, position }) => (
  <Marker position={position}>
    <Popup>
      <span>{label}</span>
    </Popup>
  </Marker>
)

// Marker typecheck with prop-types
MyPopupMarker.propTypes = {
  label: MapPropTypes.children,
  position: MapPropTypes.latlng,
}

// Marker list template
const MyMarkersList = ({ markers, zoom }) => {

  // If there is more than 200 markers within the map bounds
  // we don't show them. The user should zoom in.
  if (!markers.length || markers.length > 200 || zoom < 15)
    return <div></div>;

  const items = markers.map(({ stop_id, stop_name, position }) => (
    <MyPopupMarker key={stop_id} label={stop_name} position={position} />
  ))

  return <div style={{ display: 'none' }}>{items}</div>
}

MyMarkersList.propTypes = {
  markers: PropTypes.array.isRequired,
}

// Main class containing the Leaflet map
class App extends Component {

  // Setting initial state
  // The map is centered on Manhattan
  constructor() {
    super();
    this.state = {
      center: {
        lat: 40.716,
        lng: -74
      },
      markers: [],
      zoom: 15
    };
  }

  // The component has been mounted
  componentDidMount() {

    // When the component is mounted, the subway stop list
    // is requested with an Ajax call.
    fetch('/api/v1/gtfs/stops')
      .then(res => res.json())
      .then(stopList => { stops = stopList })
      .then(this.filterMarkers);
  }

  // This function filters markers that must be visible on the map.
  // The Subway contains 1500+ stops so adding them all would
  // slow down the UI.
  filterMarkers = () => {

    const map = this.refs.map.leafletElement;
    const markerSubset = stops.filter(stop => map.getBounds().contains(stop.position));

    this.setState({ markers: markerSubset, zoom: map.getZoom() });

  }

  render() {

    // UI rendering
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">NYC MTA Subway stops</h1>
        </header>
        <Map
          center={this.state.center}
          zoom={this.state.zoom}
          onMoveEnd={this.filterMarkers}
          ref='map'
        >
          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MyMarkersList markers={this.state.markers} zoom={this.state.zoom} />
        </Map>

      </div>
    );
  }
}

export default App;
