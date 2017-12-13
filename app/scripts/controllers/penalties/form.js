'use strict';

/**
 * @ngdoc function
 * @name 9ppWebApp.controller:PenaltiesFormCtrl
 * @description
 * # PenaltiesFormCtrl
 * Controller of the 9ppWebApp
 */
angular.module('9ppWebApp')
    .controller('PenaltiesFormCtrl', function ($scope, $state, $stateParams, penaltyService) {
        $scope.penalty = {};
        $scope.penalty.global = false;

        if ($stateParams.id != undefined) {
            penaltyService.find($stateParams.id).then(function (res) {
                $scope.penalty = res;
            });
        }

        $scope.submit = function () {
            penaltyService.save($scope.penalty)
                .then(function () {
                    $state.go('penalties.list');
                });
        };
    });
