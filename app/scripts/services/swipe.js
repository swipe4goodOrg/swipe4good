'use strict';

/**
 * @ngdoc service
 * @name swipe4goodApp.swipe
 * @description
 * # swipe
 * Service in the swipe4goodApp.
 */
angular.module('swipe4goodApp')
    .service('swipe', ['$http' ,function($http) {
        var self = this;

        function init() {
        	self.left = swipeLeft;
        	self.right = swipeRight;
        };
        init();

        function swipeLeft(position) {
        	swipe(false, position);
        };

        function swipeRight(position) {
        	swipe(true, position);
        };

        function swipe(isPresent, position) {
        	//category name from: http://wiki.openstreetmap.org/wiki/Key:ramp
        	var dataModel = {
        		lat: position.lat,
        		long: position.long,
        		timestamp: position.timestamp,
        		swipe: isPresent,
        		category: 'ramp'
        	};

        	MongoPOST(dataModel);
        };

        function MongoPOST(data) {
            var url = "https://api.mongolab.com/api/1/databases/swipeforgood/collections/swipes?apiKey=apLxc1c4MaN3o_iALX220Uhj223iDMRW";
            $http({
                method: 'POST',
                data: JSON.stringify(data),
                url: url
            }).
            success(function(status) {
                //your code when success
                console.log('$service swipe - MongoPOST - onSuccess - status:%O', status);
            }).
            error(function(status) {
                //your code when fails
                console.log('$service swipe - MongoPOST - onError - status:%O', status);
            });
        };
        /*
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
            //var frm = $(document.myform);
 			//var data = JSON.stringify(frm.serializeArray()); 		
        };
        */
    }]);