'use strict';

describe('Controller: PenaltiesListCtrl', function () {

  // load the controller's module
  beforeEach(module('9ppWebApp'));

  var PenaltiesListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PenaltiesListCtrl = $controller('PenaltiesListCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
