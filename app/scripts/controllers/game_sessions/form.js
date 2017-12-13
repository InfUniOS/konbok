'use strict';

/**
 * @ngdoc function
 * @name 9ppWebApp.controller:GameSessionsFormCtrl
 * @description
 * # GameSessionsFormCtrl
 * Controller of the 9ppWebApp
 */
angular.module('9ppWebApp')
    .controller('GameSessionsFormCtrl', function ($scope, $state, $stateParams, gameSessionService) {
        $scope.gs = {};
        $scope.edit = false;

        if ($stateParams.id != undefined) {
            gameSessionService.find($stateParams.id).then(function (res) {
                $scope.gs = res;
                $scope.edit = true;

                $scope.delete = function () {
                    gameSessionService.del($scope.gs)
                        .then(function () {
                            $state.go('game_sessions.list');
                        });
                };

                if ($scope.gs.end == undefined)
                    $scope.gs.end = new Date($scope.gs.start);
                else
                    $scope.gs.end = new Date($scope.gs.end);
            });
        }
        else {
            $scope.gs.start = new Date();
            $scope.gs.start.setMilliseconds(0);
            $scope.gs.start.setSeconds(0);
        }


        $scope.submit = function () {
            gameSessionService.save($scope.gs)
                .then(function () {
                    $state.go('game_sessions.list');
                });
        };
    });
