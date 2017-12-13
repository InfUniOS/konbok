'use strict';

/**
 * @ngdoc function
 * @name 9ppWebApp.controller:PlayersFormCtrl
 * @description
 * # PlayersFormCtrl
 * Controller of the 9ppWebApp
 */
angular.module('9ppWebApp')
    .controller('PlayersFormCtrl', function ($scope, $state, $stateParams, playerService) {
        $scope.player = {};

        if ($stateParams.id != undefined) {
            playerService.find($stateParams.id).then(function (res) {
                $scope.player = res;
            });
        }

        $scope.submit = function () {
            playerService.save($scope.player)
                .then(function () {
                    $state.go('players.list');
                });
        };
    });
