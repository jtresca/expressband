angular.module('expressbandApp')
  .controller('NavbarCtrl', function ($scope, $location, $document, Auth) {
    'use strict';
    $scope.menu = [{
      'title': 'Welcome',
      'link': '#section-1'
    },
    {
      'title': 'About Us',
      'link': '#section-2'
    },
    {
      'title': 'See Us Live',
      'link': '#section-3'
    },
    {
      'title': 'Book/Contact Us',
      'link': '#section-4'
    }
    ];
    $scope.navbarToggle = function () {
      
    };
    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    var top = 400;
    var duration = 2000;


    $scope.logout = function() {
      Auth.logout();
      $location.path('/');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };

    // $document.scrollTop(top, duration).then(function() {
    //   console && console.log('You just scrolled to the top!');
    // });

  }).value('duScrollOffset', 50);