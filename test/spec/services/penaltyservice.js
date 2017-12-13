'use strict';

describe('Service: penaltyService', function () {

  // load the service's module
  beforeEach(module('9ppWebApp'));

  // instantiate service
  var penaltyService;
  beforeEach(inject(function (_penaltyService_) {
    penaltyService = _penaltyService_;
  }));

  it('should do something', function () {
    expect(!!penaltyService).toBe(true);
  });

});
