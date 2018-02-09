const
  chai = require('chai'),
  fileUtil = require('../../utils/FileUtil'),
  config = require('../../config'),
  should = chai.should();


/**
 * Test utils/FileUtil
 */
describe('Test FileUtil...', function () {

  it('should read the stops.txt file', async function () {
    await fileUtil.readFile(`${config.gtfs.path}/stops.txt`);
  });

});
