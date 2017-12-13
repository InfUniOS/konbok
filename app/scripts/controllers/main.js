'use strict';

/**
 * @ngdoc function
 * @name 9ppWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the 9ppWebApp
 */
angular.module('9ppWebApp')
    .controller('MainCtrl', function ($scope, gameSessionService) {
        gameSessionService.getAllOpen().then(function (res) {
            $scope.openGs = res.docs;
        });

        gameSessionService.getAllClosed().then(function (res) {
            $scope.closedGs = res.docs;
        });

        $scope.getPlayerCount = function (gs) {
            return _.keys(_.pick(gs.game_details, function (value) {
                return value.active == true;
            })).length;
        };
    });
