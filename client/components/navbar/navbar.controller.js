'use strict';

angular.module('expressbandApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
      'title': 'Welcome',
      'link': '/'
    },
    {
      'title': 'About Us',
      'link': '/aboutus'
    },
    {
      'title': 'Mailing List',
      'link': '/mailinglist'
    },
    {
      'title': 'See Us Live',
      'link': '/seeuslive'
    },
    {
      'title': 'Book/Contact Us',
      'link': '/contact'
    }
    ];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });