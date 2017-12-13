'use strict';

/**
 * @ngdoc function
 * @name 9ppWebApp.controller:CurrentGameplayCtrl
 * @description
 * # CurrentGameplayCtrl
 * Controller of the 9ppWebApp
 */
angular.module('9ppWebApp')
    .controller('CurrentGameplayCtrl', function ($scope, $mdDialog, $filter, playerService, penaltyService, gameSessionService) {
        var activePlayers = _.pick($scope.gs.game_details, function (value) {
            return value.active == true;
        });

        gameSessionService.registerCalcCostPerPlayerCallback(function (costs) {
            $scope.player_costs = costs;
        });

        playerService.getAllById(_.keys(activePlayers)).then(function (res) {
            $scope.players = res.docs;
        });

        penaltyService.getAllNonGlobal().then(function (res) {
            $scope.penalties = res.docs;
        });

        $scope.openPenaltyPlayerModal = function (player) {
            $mdDialog
                .show(
                    {
                        scope: $scope,
                        preserveScope: true,
                        templateUrl: 'views/current/penalty_modal.html',
                        locals: {
                            curPlayer: player
                        },
                        clickOutsideToClose: true,
                        controller: function DialogController($scope, $mdDialog, curPlayer) {
                            $scope.curPlayer = curPlayer;
                            $scope.closeDialog = function () {
                                $mdDialog.hide();
                            }
                        }
                    }
                );
        };

        $scope.increase = function (penalty, player) {
            gameSessionService.increasePlayerPenaltyCount($scope.gs, penalty, player._id, $scope.players);
        };

        $scope.decrease = function (penalty, player) {
            gameSessionService.decreasePlayerPenaltyCount($scope.gs, penalty, player._id, $scope.players);
        };
    });
