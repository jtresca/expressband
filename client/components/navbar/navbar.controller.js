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

    $scope.navbarData = {
      menuCollapsed: false
    };

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.mobileNavActive = false;
    var top = 400;
    var duration = 2000;

///ADDED WINDOW CODE
    $(window).on("resize.doResize", function (){
        alert(window.innerWidth);

     $scope.$apply(function(){
          if (window.innerWidth <= 768) {
            $scope.mobileNavActive = true;
           //do something to update current scope based on the new innerWidth and let angular update the view.
          }
      });
    });

    $scope.$on("$destroy",function (){
         $(window).off("resize.doResize"); //remove the handler added earlier
    });
///ADDED WINDOW CODE

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