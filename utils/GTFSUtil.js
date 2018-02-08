const
  config = require('../config'),
  fileUtil = require('./FileUtil'),
  GTFSUtil = {};

/**
 * Parse the GTFS file to a JSON collection
 * @param filename the name of the file to be parsed
 */
async function parseGTFSFile(filename) {

  // Get the file content
  const data = await fileUtil.readFile(`${config.gtfs.path}/${filename}`);
  // convert file content to an array of lines
  const lines = data.length ? data.split(/\r?\n/) : [];
  // extract and store the headers in an array
  const headers = lines.length > 0 ? lines.shift().split(',') : [];

  // this function map each line of the GTFS file to an object
  // e.g.:
  //      101,,Van Cortlandt Park - 242 St,,40.889248,-73.898583,,,1,
  // is mapped to
  // {
  //   "stop_id": "101",
  //   "stop_code": "",
  //   "stop_name": "Van Cortlandt Park - 242 St",
  //   "stop_desc": "",
  //   "stop_lat": "40.889248",
  //   "stop_lon": "-73.898583",
  //   "zone_id": "",
  //   "stop_url": "",
  //   "location_type": "1",
  //   "parent_station": ""
  // }
  const mapLineToObject = line => {

    const lineValues = line.split(',');
    const geoPoint = { position: {} };

    // if the number of values doesn't match with the number of headers,
    // just skip the line
    if (lineValues.length !== headers.length)
      return null;

    // pair the value with the corresponding key
    // if the value is lat/long, parse to float
    headers.forEach((header, i) => {
      if (header === 'stop_lat') {
        geoPoint.position.lat = parseFloat(lineValues[i]);
      } else if (header === 'stop_lon') {
        geoPoint.position.lon = parseFloat(lineValues[i]);
      } else {
        geoPoint[header] = lineValues[i];
      }
    });

    return geoPoint;

  }

  // Apply mapper to line array and remove possible null values
  return lines.map(mapLineToObject).filter(line => line !== null);

}

// Exposed functions
GTFSUtil.getStops = async () => {
  return await parseGTFSFile('stops.txt');
};

module.exports = GTFSUtil;
