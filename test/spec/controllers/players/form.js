'use strict';

describe('Controller: PlayersFormCtrl', function () {

  // load the controller's module
  beforeEach(module('9ppWebApp'));

  var PlayersFormCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PlayersFormCtrl = $controller('PlayersFormCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
