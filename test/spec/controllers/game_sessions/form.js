'use strict';

describe('Controller: GameSessionsFormCtrl', function () {

  // load the controller's module
  beforeEach(module('9ppWebApp'));

  var GameSessionsFormCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GameSessionsFormCtrl = $controller('GameSessionsFormCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
