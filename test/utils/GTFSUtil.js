const
  chai = require('chai'),
  gtfsUtil = require('../../utils/GTFSUtil'),
  config = require('../../config'),
  should = chai.should();


/**
 * Test utils/GTFSUtil
 */
describe('Test GTFSUtil...', function () {

  it('should return a JSON array of 1503 stops', async function () {
    const stops = await gtfsUtil.getStops();
    stops.should.be.a('array');
    stops.length.should.be.eql(1503);
  });

});
