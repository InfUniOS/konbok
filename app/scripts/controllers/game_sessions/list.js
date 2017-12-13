'use strict';

/**
 * @ngdoc function
 * @name 9ppWebApp.controller:GameSessionsListCtrl
 * @description
 * # GameSessionsListCtrl
 * Controller of the 9ppWebApp
 */
angular.module('9ppWebApp')
    .controller('GameSessionsListCtrl', function ($scope, gameSessionService) {
        gameSessionService.getAll().then(function (res) {
            $scope.gameSessions = res.docs;
        });
    });
