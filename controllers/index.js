const
  express = require('express'),
  router = express.Router(),
  gtfs = require('./gtfs');

/**
 * Main controller
 */

// GTFS router
router.use('/gtfs', gtfs);

// Default router redirect to API doc
router.get('/', function (req, res, next) {
  res.redirect('/api-docs');
});

module.exports = router;
