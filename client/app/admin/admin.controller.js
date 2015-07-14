'use strict';

angular.module('expressbandApp')
  .controller('AdminCtrl', function ($scope, $http, Auth, User, $location) {

    // if(!Auth.isAdmin()) {
    //     $location.path('/')
    //     console.log("Blocked!");
    // }

    // Use the User $resource to fetch all users
    $scope.users = User.query();

    $scope.emailUser = function() {
      $http.post('/api/email',{ address: $scope.email.address, name: $scope.email.name, subject: $scope.email.subject, message: $scope.email.message });
      console.log("post succeeded")
    }


    $scope.delete = function(user) {
      User.remove({ id: user._id });
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    };

     $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/showdates', 
        { venue: $scope.newThing.venue, 
          address: $scope.newThing.address, 
          date: $scope.newThing.date, 
          time: $scope.newThing.time,
          phone: $scope.newThing.phone, 
          notes: $scope.newThing.notes });
       $scope.newThing = '';
    };


  });
