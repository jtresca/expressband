angular.module('expressbandApp')
  .controller('NavbarCtrl', function ($scope, $location, $document, Auth, $window) {
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

    $scope.navbarData = {
      menuCollapsed: false
    };

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.mobileNavActive = false;

///GET INTIAL WINDOW WIDTH
    if ($window.innerWidth <= 768) {
      $scope.mobileNavActive = true;
    }
    else {
      $scope.mobileNavActive = false;
    }

///CHECK WINDOW WIDTH FOR MOBILE DEVICES
    angular.element($window).bind('resize',function(){
      $scope.$apply(function(){
        if ($window.innerWidth <= 768) {
          console.log("mobileview should be true: ", $scope.mobileNavActive);
          $scope.mobileNavActive = true;
        }
        else {
          console.log("mobileview should be false: ", $scope.mobileNavActive);
          $scope.mobileNavActive = false;
        }
      });
    });


    $scope.logout = function() {
      Auth.logout();
      $location.path('/');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
    $scope.topOfPage = function () {
       var top = 0;
       var duration = 1000;
      $document.scrollTopAnimated(top, duration).then(function() {
      console && console.log('You just scrolled to the top!');
      });
    };
    

  }).value('duScrollOffset', 120);