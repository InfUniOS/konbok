'use strict';

/**
 * @ngdoc function
 * @name 9ppWebApp.controller:PenaltiesViewCtrl
 * @description
 * # PenaltiesViewCtrl
 * Controller of the 9ppWebApp
 */
angular.module('9ppWebApp')
    .controller('PenaltiesViewCtrl', function ($scope, $stateParams, penaltyService) {
        penaltyService.find($stateParams.id).then(function (res) {
            $scope.penalty = res;
        });
    });
