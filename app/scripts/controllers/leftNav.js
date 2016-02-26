angular.module('swipe4goodApp')
  .controller('LeftNavCtrl', function ($scope, $location) {
        $scope.changeView = function(view){
            $location.path(view); // path not hash
        }
  });