'use strict';

/**
 * @ngdoc function
 * @name swipe4goodApp.controller:CartodbCtrl
 * @description
 * # CartodbCtrl
 * Controller of the swipe4goodApp
 */
angular.module('swipe4goodApp')
    .controller('CartodbCtrl', ['$scope', function($scope) {

        function init() {
            //angular-leaflet helloworld: https://github.com/tombatossals/angular-leaflet-directive
            angular.extend($scope, {
                center: {
                    lat: 51.505,
                    lng: -0.09,
                    zoom: 8
                }
            });
        }

        init();
    }]);
