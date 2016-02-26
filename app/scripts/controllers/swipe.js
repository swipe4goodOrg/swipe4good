'use strict';

/**
 * @ngdoc function
 * @name swipe4goodApp.controller:SwipeCtrl
 * @description
 * # SwipeCtrl
 * Controller of the swipe4goodApp
 */
angular.module('swipe4goodApp')
    .controller('SwipeCtrl', ['$scope', '$http', '$geolocation', function($scope, $http, $geolocation) {

        function init() {
            testMongoPOST();
            testMongoGET();
            $scope.getGeoLocation = getGeoLocation;
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

        function testMongoPOST() {
            var url = "https://api.mongolab.com/api/1/databases/swipeforgood/collections/swipeforgood?apiKey=apLxc1c4MaN3o_iALX220Uhj223iDMRW";
            $http({
                method: 'POST',
                data: JSON.stringify({ "x": 222 }),
                url: url
            }).
            success(function(status) {
                //your code when success
            }).
            error(function(status) {
                //your code when fails
            });
        };

        function testMongoGET() {
            var url = "https://api.mongolab.com/api/1/databases/swipeforgood/collections/swipeforgood?apiKey=apLxc1c4MaN3o_iALX220Uhj223iDMRW";
            $http({
                method: 'GET',
                url: url
            }).
            success(function(data) {
                console.log('SwipeCtrl - Mongo GET - onSuccess - data:%O', data);
            }).
            error(function(status) {
                //your code when fails
            });
            /*var frm = $(document.myform);
 		var data = JSON.stringify(frm.serializeArray());*/
        };

    }]);