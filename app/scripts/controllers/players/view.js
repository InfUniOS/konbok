'use strict';

/**
 * @ngdoc function
 * @name 9ppWebApp.controller:PlayersViewCtrl
 * @description
 * # PlayersViewCtrl
 * Controller of the 9ppWebApp
 */
angular.module('9ppWebApp')
    .controller('PlayersViewCtrl', function ($scope, $stateParams, playerService, penaltyService) {
        $scope.total_cost = 0.0;

        playerService.registerGlobalCostsCallback(function (total) {
            $scope.total_cost = total;
        });

        playerService.find($stateParams.id).then(function (res) {
            $scope.player = res;
        });

        penaltyService.getAllGlobal().then(function (res) {
           $scope.penalties = res.docs;
        });

        $scope.increase = function (penalty) {
            playerService.increaseGlobalPenaltyCount(penalty, $scope.player);
        };

        $scope.decrease = function (penalty) {
            playerService.decreaseGlobalPenaltyCount(penalty, $scope.player);
        };
    });
