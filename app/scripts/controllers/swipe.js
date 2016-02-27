'use strict';

/**
 * @ngdoc function
 * @name swipe4goodApp.controller:SwipeCtrl
 * @description
 * # SwipeCtrl
 * Controller of the swipe4goodApp
 */
angular.module('swipe4goodApp')
    .controller('SwipeCtrl', ['$scope', '$http', '$geolocation', '$mdToast', 'swipe', function ($scope, $http, $geolocation, $mdToast, swipe) {



        function init() {
            //testMongoPOST();
            //testMongoGET();
            
            
            
            $scope.getGeoLocation = getGeoLocation;

            $scope.swipe = {};
            $scope.swipe.value = 50;

            $scope.issuesButtonExpanded = false;

            $scope.buttonIconIndex = 0;
            $scope.buttonIcon = [];
            $scope.buttonIcon[0] = "images/chevron-up.svg";
            $scope.buttonIcon[1] = "images/chevron-down.svg";

            $scope.selectedButtonIcon = $scope.buttonIcon[$scope.buttonIconIndex];

            $scope.issues = [];
            $scope.issues[0] = {
                type: 0,
                src: "images/type1.svg",
                label: "Action 1",
                description: "Generic Issue"
            };
            $scope.issues[1] = {
                type: 1,
                src: "images/type2.svg",
                label: "Action 2",
                description: "Ramp"
            };
            $scope.issues[2] = {
                type: 2,
                src: "images/type3.svg",
                label: "Action 3",
                description: "Narrow Pass"
            };
            $scope.issues[3] = {
                type: 3,
                src: "images/type4.svg",
                label: "Action 4",
                description: "Semaphore Sound"
            };

            $scope.recentIssues = [];
            $scope.recentIssues[0] = $scope.issues[0];
            $scope.recentIssues[1] = $scope.issues[1];
            $scope.recentIssues[2] = $scope.issues[2];
            $scope.recentIssues[3] = $scope.issues[3];

            $scope.selectedIssue = $scope.issues[0];

            $scope.changeIssue = function (issue) {
                $scope.selectedIssue = issue;
            }

            $scope.tagYes = function (issue) {
getGeoLocation().then(function (position) {
        		var myPosition = transformPosition(position);
        		swipe.right($scope.myPosition);
        	});
            }

            $scope.tagNo = function (issue) {
                getGeoLocation().then(function (position) {
        		var myPosition = transformPosition(position);
        		swipe.left(myPosition);	
        	});
            }

            $scope.toggleIssuesButton = function () {
                console.log("toggleIssues: " + $scope.issuesButtonExpanded);

                if ($scope.issuesButtonExpanded === true) {
                    $scope.issuesButtonExpanded = false;
                } else {
                    $scope.issuesButtonExpanded = true;
                }

                if ($scope.buttonIconIndex === 0) {
                    $scope.buttonIconIndex = 1;
                } else {
                    $scope.buttonIconIndex = 0;
                }

                $scope.selectedButtonIcon = $scope.buttonIcon[$scope.buttonIconIndex];
                console.log($scope.buttonIcon[$scope.buttonIconIndex]);
            }

            $scope.showSimpleToast = function (msg) {

                $mdToast.show($mdToast.simple().textContent(msg));
            };

            $scope.tagFeedbackWait = false;

            $scope.swipeValueChanged = function () {
                $("#green-cover").css("display", "block");
                $("#red-cover").css("display", "block");
                if ($scope.swipe.value < 5) {
                    console.log("toast!");
                    $scope.tagYes($scope.selectedIssue);
                    $scope.showSimpleToast("Location Tagged Successfully!");
                    $scope.tagFeedbackTag = true;
                    window.setTimeout(function () {

                        $scope.tagFeedbackTag = false;
                        $scope.swipeMouseUp();

                    
                    }, 2000);
                } else if ($scope.swipe.value > 95) {
                    console.log("toast2!");
                    $scope.tagFeedbackTag = true;
                    $scope.tagYes($scope.selectedIssue);
                    $scope.showSimpleToast("Location Tagged Successfully!");
                    $scope.tagFeedbackWait = true;

                    window.setTimeout(function () {

                        $scope.tagFeedbackTag = false;
                        $scope.swipeMouseUp();


                    }, 2000);
                }

                
                
                if ($scope.swipe.value <= 50) {
                    $("#red-cover").width('' + ($scope.swipe.value - 50) * -2 + '%');
                    $("#green-cover").width('0%');
                    console.log("red: " + '' + ($scope.swipe.value - 50) * -2 + '%');
                } else {
                    $("#green-cover").width('' + ($scope.swipe.value - 50) * 2 + '%');
                    $("#red-cover").width('0%');
                    console.log("green: " + '' + ($scope.swipe.value - 50) * 2 + '%');
                }
            }


            $scope.swipeMouseUp = function () {
                console.log("mouseup ");
                if (!$scope.tagFeedbackTag) {
                    window.setTimeout(function () {
                        $scope.swipe.value = 50;
                        $("#slide").val($scope.swipe.value);
                        $scope.swipeValueChanged();
                    }, 200);
                } else {
                    $("#green-cover").fadeOut(2000);
                    $("#red-cover").fadeOut(2000);
                }
            }

            $scope.animateSlide = function () {
                console.log("animate");
                if ($scope.swipe.value < 50) {
                    $scope.swipe.value = $scope.swipe.value + 1;
                    $("#slide").val($scope.swipe.value);
                    $scope.swipeValueChanged();
                    window.setTimeout($scope.animateSlide, 100);
                    console.log("minor " + $scope.swipe.value);
                } else if ($scope.swipe.value > 50) {
                    $scope.swipe.value = $scope.swipe.value - 1;
                    $("#slide").val($scope.swipe.value);
                    $scope.swipeValueChanged();
                    window.setTimeout($scope.animateSlide, 100);
                    console.log("major " + $scope.swipe.value);
                }
            }
        };
        init();



        function getGeoLocation() {
            var promise = $geolocation.getCurrentPosition({
                timeout: 60000
            });

            promise.then(function (position) {
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
                data: JSON.stringify({
                    "x": 222
                }),
                url: url
            }).
            success(function (status) {
                //your code when success
            }).
            error(function (status) {
                //your code when fails
            });
        };

        function testMongoGET() {
            var url = "https://api.mongolab.com/api/1/databases/swipeforgood/collections/swipeforgood?apiKey=apLxc1c4MaN3o_iALX220Uhj223iDMRW";
            $http({
                method: 'GET',
                url: url
            }).
            success(function (data) {
                console.log('SwipeCtrl - Mongo GET - onSuccess - data:%O', data);
            }).
            error(function (status) {
                //your code when fails
            });
            /*var frm = $(document.myform);
 		var data = JSON.stringify(frm.serializeArray());*/
        };

    }]);
