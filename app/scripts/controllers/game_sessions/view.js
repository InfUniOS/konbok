'use strict';

/**
 * @ngdoc function
 * @name 9ppWebApp.controller:GameSessionsViewCtrl
 * @description
 * # GameSessionsViewCtrl
 * Controller of the 9ppWebApp
 */
angular.module('9ppWebApp')
    .controller('GameSessionsViewCtrl', function ($scope, $stateParams, gameSessionService) {
        gameSessionService.find($stateParams.id).then(function (res) {
            $scope.gs = res;
        });
    });
