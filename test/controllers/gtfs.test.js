var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../../app');
var should = chai.should();

chai.use(chaiHttp);

/**
 * Test /api/v1/gtfs/stops
 */
describe('Test gtfs controller...', function () {
  let stop = {};

  it('should list ALL 1503 stops on /api/v1/gtfs/stops GET', function (done) {
    chai.request(app)
      .get('/api/v1/gtfs/stops')
      .end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(1503);
        stop = res.body[0];
        done();
      });
  });

  it('first stop should have required properties', function (done) {
    stop.should.have.property('stop_id');
    stop.should.have.property('stop_name');
    stop.should.have.property('position');
    stop.position.should.have.property('lat');
    stop.position.should.have.property('lon');
    stop.position.lat.should.be.a('number');
    stop.position.lon.should.be.a('number');
    done();
  });

});
