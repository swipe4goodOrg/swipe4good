angular.module('swipe4goodApp')
  .controller('LeftNavCtrl', function ($scope, $location, $mdSidenav) {
        $scope.changeView = function(view){
            $location.path(view); // path not hash
            $mdSidenav('left').close()
        }
  });