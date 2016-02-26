'use strict';

describe('Service: swipe', function () {

  // load the service's module
  beforeEach(module('swipe4goodApp'));

  // instantiate service
  var swipe;
  beforeEach(inject(function (_swipe_) {
    swipe = _swipe_;
  }));

  it('should do something', function () {
    expect(!!swipe).toBe(true);
  });

});
