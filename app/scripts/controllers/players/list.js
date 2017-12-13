'use strict';

/**
 * @ngdoc function
 * @name 9ppWebApp.controller:PlayersListCtrl
 * @description
 * # PlayersListCtrl
 * Controller of the 9ppWebApp
 */
angular.module('9ppWebApp')
    .controller('PlayersListCtrl', function ($scope, $state, playerService) {
        playerService.getAll().then(function (res) {
            $scope.players = res.docs;
        });

        $scope.deletePlayer = function(player) {
            playerService.del(player).then(function () {
                // TODO auto ui refresh with changes()
                $state.reload();
            });
        };
    });
