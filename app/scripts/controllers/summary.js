'use strict';

/**
 * @ngdoc function
 * @name 9ppWebApp.controller:SummaryCtrl
 * @description
 * # SummaryCtrl
 * Controller of the 9ppWebApp
 */
angular.module('9ppWebApp')
    .controller('SummaryCtrl', function ($scope, $stateParams, gameSessionService, playerService, penaltyService) {
        $scope.player_infos = [];
        $scope.total = 0;

        playerService.registerTotalGameSessionCostCallback(function (res) {
            $scope.total = res;
        });

        gameSessionService.find($stateParams.id).then(function (res) {
            $scope.gs = res;

            playerService.getPlayersWithGameSessionDetails(res).then(function (res) {
                $scope.player_infos = res;
            });
        });
    });
