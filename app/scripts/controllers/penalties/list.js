'use strict';

/**
 * @ngdoc function
 * @name 9ppWebApp.controller:PenaltiesListCtrl
 * @description
 * # PenaltiesListCtrl
 * Controller of the 9ppWebApp
 */
angular.module('9ppWebApp')
    .controller('PenaltiesListCtrl', function ($scope, $state, penaltyService) {
        penaltyService.getAll().then(function (res) {
            $scope.penalties = res.docs;
        });

        $scope.deletePenalty = function(penalty) {
            penaltyService.del(penalty).then(function () {
                // TODO auto ui refresh with changes()
                $state.reload();
            });
        };
    });
