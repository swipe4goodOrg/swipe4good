'use strict';

/**
 * @ngdoc function
 * @name swipe4goodApp.controller:SwipeCtrl
 * @description
 * # SwipeCtrl
 * Controller of the swipe4goodApp
 */
angular.module('swipe4goodApp')
  .controller('SwipeCtrl', function ($scope, $http) {
    var url = "https://api.mongolab.com/api/1/databases/swipeforgood/collections/swipeforgood?apiKey=apLxc1c4MaN3o_iALX220Uhj223iDMRW";
	$http({
	    method: 'POST',
	    data: JSON.stringify( { "x" : 222 } ),
	    url: url
	}).
	success(function(status) {
	    //your code when success
	}).
	error(function(status) {
	    //your code when fails
	});

	var url = "https://api.mongolab.com/api/1/databases/swipeforgood/collections/swipeforgood?apiKey=apLxc1c4MaN3o_iALX220Uhj223iDMRW";
	$http({
	    method: 'GET',
	    url: url
	}).
	success(function(data) {
	    console.log(data);
	}).
	error(function(status) {
	    //your code when fails
	});
		/*var frm = $(document.myform);
 		var data = JSON.stringify(frm.serializeArray());*/
  });
