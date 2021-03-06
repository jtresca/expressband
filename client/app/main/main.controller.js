angular.module('expressbandApp')
    .controller('MainCtrl', function($scope, $http, Auth, $document, $timeout) {
        'use strict';

        //Collapse reading for the 'about section' when on xs devices.
        $scope.isCollapsed = true;
        $scope.toggleCollapsed = function() {
            $scope.isCollapsed = !$scope.isCollapsed;
        };
        $scope.toAboutSection = function() {
            $timeout(function goingToSection3 () {
                // target, offset, duration, easing
                $document.duScrollTo(0,1850);
                console.log('Read more is closed, and scroll position adjusted.');
                }, 100);

        };
            

        // $scope.awesomeThings = [];
        $scope.submitted = false;
        $scope.emailExists = false;

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

        console.log('is the user logged in?', Auth.isLoggedIn());
        console.log('is the user and admin?', Auth.isAdmin());

        $scope.listJoin = function(isValid) {
            $scope.emailExists = false;


            $http.post('/api/mailinglist',{ name: $scope.maillist.name , email: $scope.maillist.email})
            .success(function(data) {
                console.log('add email to db', data.success);
                $scope.listJoinSuccess = data.success;
                console.log('listJoinSuccess', $scope.listJoinSuccess);
            })
            .error(function(data) {
                console.log ('the email exists:',data.exists);
                 $scope.emailExists = data.exists;
                 console.log($scope.emailExists);
            });
            $scope.$apply();
  
     };

     $scope.userMail = function(isValid) {
        $http.post('/api/useremail',{ address: $scope.uemail.address, name: $scope.uemail.name, subject: $scope.uemail.subject, message: $scope.uemail.message })
        .success(function(data){
            console.log('post succeeded-userMail');
            $scope.messageReceived = data.messageRecieved;
            console.log(data.messageRecieved, ': was this true?');
        })
        .error(function(data){
           console.log(data.DUDE); 
        });
     };
      
  });

