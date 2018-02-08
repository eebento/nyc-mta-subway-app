import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PropTypes from 'prop-types'
import { Map, TileLayer, Marker, Popup, PropTypes as MapPropTypes } from 'react-leaflet'

let stops = [];

const MyPopupMarker = ({ label, position }) => (
  <Marker position={position}>
    <Popup>
      <span>{label}</span>
    </Popup>
  </Marker>
)

MyPopupMarker.propTypes = {
  label: MapPropTypes.children,
  position: MapPropTypes.latlng,
}

const MyMarkersList = ({ markers, zoom }) => {

  if (!markers.length || markers.length > 199 || zoom < 15)
    return <div></div>;

  const items = markers.map(({ stop_id, stop_name, position }) => (
    <MyPopupMarker key={stop_id} label={stop_name} position={position} />
  ))

  return <div style={{ display: 'none' }}>{items}</div>
}

MyMarkersList.propTypes = {
  markers: PropTypes.array.isRequired,
}

class App extends Component {
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

  componentDidMount() {

    fetch('/api/v1/gtfs/stops')
      .then(res => res.json())
      .then(stopList => { stops = stopList })
      .then(this.filterMarkers);
  }

  filterMarkers = () => {

    const map = this.refs.map.leafletElement;
    const markerSubset = stops.filter(stop => map.getBounds().contains(stop.position));

    this.setState({ markers: markerSubset, zoom: map.getZoom() });

  }

  render() {

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
