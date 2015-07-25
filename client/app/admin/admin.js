'use strict';

angular.module('expressbandApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/admin', {
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl',
        authenticate: true
      })
      .when('/addshow', {
        templateUrl: 'app/admin/addshow.html',
        controller: 'AdminCtrl',
        authenticate: true
      })
      .when('/email', {
        templateUrl: 'app/admin/email.html',
        controller: 'AdminCtrl',
        authenticate: true
      })
      .when('/addviewusers', {
        templateUrl: 'app/admin/addviewuser.html',
        controller: 'AdminCtrl',
        authenticate: true
      });
  });