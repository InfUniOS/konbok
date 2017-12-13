'use strict';

describe('Controller: GameSessionsListCtrl', function () {

  // load the controller's module
  beforeEach(module('9ppWebApp'));

  var GameSessionsListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GameSessionsListCtrl = $controller('GameSessionsListCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
