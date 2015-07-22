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

     $scope.addShow = function() {
      if($scope.newShow === '') {
        return;
      }
      $http.post('/api/showdates', 
        { venue: $scope.newShow.venue, 
          street: $scope.newShow.street, 
          town: $scope.newShow.town,
          zip: $scope.newShow.zip,
          date: $scope.newShow.date, 
          time: $scope.newShow.time,
          phone: $scope.newShow.phone, 
          notes: $scope.newShow.notes });
       $scope.newShow = '';
    };


  });
