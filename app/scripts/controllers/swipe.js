'use strict';

/**
 * @ngdoc function
 * @name swipe4goodApp.controller:SwipeCtrl
 * @description
 * # SwipeCtrl
 * Controller of the swipe4goodApp
 */
angular.module('swipe4goodApp')
    .controller('SwipeCtrl', ['$scope', '$http', '$geolocation', 'swipe', function($scope, $http, $geolocation, swipe) {

        function init() {
            $scope.getGeoLocation = getGeoLocation;
            $scope.swipeLeft = swipeLeft;
            $scope.swipeRight = swipeRight;
        };
        init();

        function getGeoLocation() {
            var promise = $geolocation.getCurrentPosition({
                timeout: 60000
            });

            promise.then(function(position) {
            	var originalPosition = position;
            	var myPosition = transformPosition(originalPosition);
                $scope.myPosition = myPosition;
                console.log('SwipeCtrl - getGeoLocation() - onSuccess - originalPosition:%O, myPosition:%O', originalPosition, myPosition);
            });

            return promise;
        }

        function transformPosition(position) {
        	var myPosition = {
        		lat: position.coords.latitude,
        		long: position.coords.longitude,
        		timestamp: position.timestamp,
        		accuracy: position.coords.accuracy,
        	}
        	return myPosition;
        };

        function swipeLeft() {
        	getGeoLocation().then(function (position) {
        		var myPosition = transformPosition(position);
        		swipe.left(myPosition);	
        	});
        }

        function swipeRight() {
        	getGeoLocation().then(function (position) {
        		var myPosition = transformPosition(position);
        		swipe.right($scope.myPosition);
        	});
        }

    }]);