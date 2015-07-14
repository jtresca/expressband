'use strict';

angular.module('expressbandApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .when('/aboutus', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
       .when('/mailinglist', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
        .when('/seeuslive', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
        .when('/contact', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  });