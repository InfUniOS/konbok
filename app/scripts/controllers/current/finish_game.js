'use strict';

/**
 * @ngdoc function
 * @name 9ppWebApp.controller:CurrentFinishGameCtrl
 * @description
 * # CurrentFinishGameCtrl
 * Controller of the 9ppWebApp
 */
angular.module('9ppWebApp')
    .controller('CurrentFinishGameCtrl', function ($scope, $state, gameSessionService) {
        $scope.gs.end = new Date();
        $scope.gs.end.setSeconds(0);
        $scope.gs.end.setMilliseconds(0);

        $scope.submit = function () {
              gameSessionService.save($scope.gs).then(function () {
                  $state.go('summary', {id: $scope.gs._id});
              });
        };
    });
