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
    'ngAria',
    'ngMessages',
    'ngMaterial',
    'datatables',
    'ngGeolocation'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        redirectTo: '/splash'
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
      .when('/rankings', {
        templateUrl: 'views/rankings.html',
        controller: 'RankingsCtrl',
        controllerAs: 'rankings'
    })
      .when('/cartodb', {
        templateUrl: 'views/cartodb.html',
        controller: 'CartodbCtrl',
        controllerAs: 'cartodb'
      })
      .when('/splash', {
        templateUrl: 'views/splash.html',
        controller: 'SplashCtrl',
        controllerAs: 'splash'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
