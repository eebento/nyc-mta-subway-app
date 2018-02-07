const
  express = require('express'),
  router = express.Router(),
  gtfs = require('./gtfs');

/**
 * Main controller
 */

// GTFS router
router.use('/gtfs', gtfs);

// Default router
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
