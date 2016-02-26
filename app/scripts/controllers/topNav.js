angular.module('swipe4goodApp')
  .controller('TopNavCtrl', function ($scope, $mdSidenav) {
    
    
    $scope.toggleLeftNav = function () {
        console.log("toggled!");
        if($mdSidenav('left').isOpen()){
            $mdSidenav('left').close()
        }else{
            $mdSidenav('left').open()
        }
    };
  });