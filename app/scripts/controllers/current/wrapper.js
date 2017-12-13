'use strict';

/**
 * @ngdoc function
 * @name 9ppWebApp.controller:CurrentWrapperCtrl
 * @description
 * # CurrentWrapperCtrl
 * Controller of the 9ppWebApp
 */
angular.module('9ppWebApp')
    .controller('CurrentWrapperCtrl', function ($scope, $stateParams, gameSessionService, meta) {
        $scope.selectedPlayers = meta.selected_players;
        $scope.gs = meta.gs;
    });
