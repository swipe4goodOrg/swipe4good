'use strict';

/**
 * @ngdoc function
 * @name swipe4goodApp.controller:OpendataCtrl
 * @description
 * # OpendataCtrl
 * Controller of the swipe4goodApp
 */
angular.module('swipe4goodApp')
    .controller('OpendataCtrl', ['$scope', '$http', function($scope, $http) {

        function init() {
            document.getElementById("btnExport").disabled = true;
            var url = "https://api.mongolab.com/api/1/databases/swipeforgood/collections/swipes?apiKey=apLxc1c4MaN3o_iALX220Uhj223iDMRW";
            $http({
                method: 'GET',
                url: url
            }).
            success(function(data) {
                convertDate(data);
                $scope.swipes = data;
                document.getElementById("btnExport").disabled = false;
            }).
           error(function(status) {
               //your code when fails
            });
        };
        init();

        function convertDate(swipes){
            for (var i in swipes) {
                delete swipes[i]._id;
                /*Convert data*/
                var date = new Date(swipes[i].timestamp*1000);
                //var year = date.getFullYear();
                var year = 2016;
                var month = date.getMonth();
                var day = date.getDate();
                // Hours part from the timestamp
                var hours = date.getHours();
                // Minutes part from the timestamp
                var minutes = "0" + date.getMinutes();
                // Seconds part from the timestamp
                var seconds = "0" + date.getSeconds();

                // Will display time in 10:30:23 format
                var formattedTime = year+'/'+month+'/'+day+' '+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
                swipes[i].timestamp = formattedTime;
            }
        }

    }]);