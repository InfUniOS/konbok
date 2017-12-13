'use strict';

/**
 * @ngdoc function
 * @name 9ppWebApp.controller:CurrentPlayerSelectCtrl
 * @description
 * # CurrentPlayerSelectCtrl
 * Controller of the 9ppWebApp
 */
angular.module('9ppWebApp')
    .controller('CurrentPlayerSelectCtrl', function ($scope, $stateParams, $state, gameSessionService, playerService) {
        // $scope.gs loaded on parent resolve
        if($scope.gs.game_details != undefined && !$stateParams.from_game)
            $state.go('current.game');

        playerService.getAll().then(function (res) {
            $scope.players = res.docs;

            // add default value for non selected players
            _.each($scope.players, function (player) {
                if($scope.selectedPlayers[player._id] == undefined)
                    $scope.selectedPlayers[player._id] = false;
            });
        });

        $scope.savePlayerRelation = function () {
            gameSessionService.savePlayerRelation($scope.gs, $scope.selectedPlayers);
        };
    });
