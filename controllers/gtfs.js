const
  express = require('express'),
  router = express.Router(),
  gtfs = require('../utils/GTFSUtil');

/**
 * Return the GTFS stops listing as a JSON collection
 */
router.get('/stops', async (req, res, next) => {

  try {
    const stops = await gtfs.getStops();
    res.json(stops);

  } catch (e) {
    res.send(404, 'Not found');
  }

});

router.get('/', function (req, res, next) {
  res.json({});
});


module.exports = router;
