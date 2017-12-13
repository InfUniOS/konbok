'use strict';

describe('Service: gameSessionService', function () {

  // load the service's module
  beforeEach(module('9ppWebApp'));

  // instantiate service
  var gameSessionService;
  beforeEach(inject(function (_gameSessionService_) {
    gameSessionService = _gameSessionService_;
  }));

  it('should do something', function () {
    expect(!!gameSessionService).toBe(true);
  });

});
