'use strict';

describe('Controller: CartodbCtrl', function () {

  // load the controller's module
  beforeEach(module('swipe4goodApp'));

  var CartodbCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CartodbCtrl = $controller('CartodbCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CartodbCtrl.awesomeThings.length).toBe(3);
  });
});
