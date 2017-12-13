'use strict';

/**
 * @ngdoc function
 * @name 9ppWebApp.controller:AppCtrl
 * @description
 * # AppCtrl
 * Controller of the 9ppWebApp
 */
angular.module('9ppWebApp')
    .controller('AppCtrl', function ($scope, $mdSidenav) {
        $scope.toggleSidenav = function (menuId) {
            $mdSidenav(menuId).toggle();
        };

        $scope.closeNav = function () {
            $mdSidenav('left').close();
        };

        $scope.navLinks = [
            {
                name: 'Players',
                url: 'players.list'
            },
            {
                name: 'Game Sessions',
                url: 'game_sessions.list'
            },
            {
                name: 'Penalties',
                url: 'penalties.list'
            }
        ];
    });
