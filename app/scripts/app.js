'use strict';

/**
 * @ngdoc overview
 * @name swipe4goodApp
 * @description
 * # swipe4goodApp
 *
 * Main module of the application.
 */
angular
  .module('swipe4goodApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'datatables',
    'ngGeolocation'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/swipe', {
        templateUrl: 'views/swipe.html',
        controller: 'SwipeCtrl',
        controllerAs: 'swipe'
      })
      .when('/cartodb', {
        templateUrl: 'views/cartodb.html',
        controller: 'CartodbCtrl',
        controllerAs: 'cartodb'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
