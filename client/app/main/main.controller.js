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
        // $document.scrollToElement('#section-3', duration).then(function() {
        //             console && console.log('Scrolling to #section-3');
        //         });

            

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

        console.log("is the user logged in?", Auth.isLoggedIn());
        console.log("is the user and admin?", Auth.isAdmin());

        $scope.listJoin = function(isValid) {
            $scope.emailExists = false;
            // if (isValid && $scope.submitted == false) {
            $http.post('/api/mailinglist', {
                    name: $scope.maillist.name,
                    email: $scope.maillist.email
                })
                .success(function() {
                    console.log("add email to db")
                })
                .error(function(data) {
                    console.log("the email exists:", data.exists)
                    $scope.emailExists = data.exists;
                    console.log($scope.emailExists);
                })
                // $scope.submitted = true;
                // console.log("submitted to db!");
                // }
                // else {
                //     console.log("sorry there was an error or you've already submitted");
                //     $scope.submitted = false;
                // }
        }

        $scope.userMail = function() {
            $http.post('/api/useremail', {
                    address: $scope.uemail.address,
                    name: $scope.uemail.name,
                    subject: $scope.uemail.subject,
                    message: $scope.uemail.message
                })
                .success(function() {
                    console.log("post succeeded-userMail");
                })
                .error(function(data) {
                    console.log(data.DUDE);
                });
        }

    });
