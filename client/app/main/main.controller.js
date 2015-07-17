'use strict';

angular.module('expressbandApp')
  .controller('MainCtrl', function ($scope, $http, Auth) {
    $scope.awesomeThings = [];
  

    $http.get('/api/showdates').success(function(dates) {
      $scope.showdates = dates;
    });


    // $scope.addThing = function() {
    //   if($scope.newThing === '') {
    //     return;
    //   }
    //   $http.post('/api/things', 
    //     { venue: $scope.newThing, 
    //       address: $scope.newThing, 
    //       date: $scope.newThing, 
    //       time: $scope.newThing,
    //       phone: $scope.newThing, 
    //       notes: $scope.newThing });
    //   $scope.newThing = '';
    // };

    // $scope.deleteThing = function(thing) {
    //   $http.delete('/api/things/' + thing._id);
    // };

    console.log("is the user logged in?", Auth.isLoggedIn());
     console.log("is the user and admin?", Auth.isAdmin());
      
  });
