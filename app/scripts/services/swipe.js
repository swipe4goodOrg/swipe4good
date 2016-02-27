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
            console.log("cosasaaaaa");
        };
        init();

        function swipeLeft(position,selectedIssue) {
            console.log("cosasx");
        	swipe(false, position,selectedIssue);
        };

        function swipeRight(position,selectedIssue) {
        	console.log("cosasy");
            swipe(true, position,selectedIssue);

        };

        function swipe(isPresent, position, selectedIssue) {
        	//category name from: http://wiki.openstreetmap.org/wiki/Key:ramp
        	var dataModel = {
        		lat: position.lat,
        		long: position.long,
        		timestamp: position.timestamp,
        		swipe: isPresent,
        		//category: 'ramp'
                category: selectedIssue.description
        	};
            console.log(selectedIssue);
        	MongoPOST(dataModel);
            CartodbPOST(dataModel,selectedIssue.type);
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

        function CartodbPOST(data,idIssue){
            var url = "https://swipe4good.cartodb.com/api/v2/sql?q=INSERT INTO pruebapuntosalicante (the_geom,category, lat, long, swipe, timestapm) VALUES (ST_SetSRID(ST_Point("+data.long+","+data.lat+"),4326),"+ idIssue +", "+data.lat+", "+data.long+", "+data.swipe+", 1456504907)&api_key=89fc33018aeabfe97b8d2201f629c93d6233e28b";
            $http({
                method: 'GET',
                data: JSON.stringify(data),
                url: url
            }).
            success(function(status) {
                //your code when success
                console.log('$service swipe - CartoPOST - onSuccess - status:%O', status);
            }).
            error(function(status) {
                //your code when fails
                console.log('$service swipe - CartoPOST - onError - status:%O', status);
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