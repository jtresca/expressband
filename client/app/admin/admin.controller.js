'use strict';

angular.module('expressbandApp')
  .controller('AdminCtrl', function ($scope, $http, Auth, User, $location, $route, telFilter, $timeout) {
  
  $scope.loginName = Auth.getCurrentUser().name;
  $scope.currencyVal;
  $scope.isVisible = 'adduser';
  $scope.updateMode = false;
  $scope.showdates = {};
  $scope.mailinglist;


  $scope.adminMenu = [{
      'title': 'Add/Remove Users',
      'visible': false,
      'simplename': "adduser"
    },
    {
      'title': 'Add Show Date',
      'visible': false,
      'simplename': "addshow"
    },
    {
      'title': 'Email Fan List',
      'visible': false,
      'simplename': "emailfans"
    }
    ];



  //REFRESH PAGE TO PULL BACK ANY BINDINGS WE MISS IN INTIAL DIGEST CALL
    // $scope.refreshPage = function() {
    //     // $route.reload();
    //     $location.path('/admin');
    // }

    $scope.waitRefresh = function() {
      $scope.refreshShows();
      $scope.refreshEmailList();
    }

    
  //END REFRESH PAGE

    $scope.refreshShows = function() {
    $http.get('/api/showdates').success(function(dates) {
        $scope.showdates = dates;
        console.log("here is what I pulled", $scope.showdates)
      });
    }

    $scope.refreshEmailList = function() {
      $http.get('/api/mailinglist').success(function(maillist) {
          $scope.mailinglist = maillist;
          $scope.mailinglist = _.map($scope.mailinglist, 'email');
          console.log($scope.mailinglist);
      });
    }
   
    $scope.refreshEmailList();
    $scope.refreshShows();
    $scope.showdates.updateMode = false;

    // Use the User $resource to fetch all users
    $scope.adminlocation = $location.path();
    $scope.users = User.query();

    $scope.register = function(form) {
      console.log("register activated", $scope.user.role);
      $scope.submitted = true;

      
        Auth.createUser({
          name: $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password,
          role: $scope.user.role
        })
        .then( function() {
          // Account created, redirect to home
          // $route.reload();
          // Auth.logout();
          $location.path('/admin');
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // // Update validity of form fields that match the mongoose errors
          // angular.forEach(err.errors, function(error, field) {
          //   form[field].$setValidity('mongoose', false);
          //   $scope.errors[field] = error.message;
          // });
        });
      
    };
  

    $scope.adminLocation = function(location) {
        $scope.isVisible = location.simplename;
    }

    $scope.emailUser = function() {
      $http.post('/api/email',{ address: $scope.email.address, name: $scope.email.name, subject: $scope.email.subject, message: $scope.email.message, recipients: $scope.mailinglist });
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

    $scope.setUpdateMode = function(showdate) {
       showdate.updateMode = true;
       // console.log(showdate.updateMode);
    }

    $scope.upDateRecord = function(showdate) {
      console.log('id is:', showdate);
      $http.put('/api/showdates/' + showdate._id, { venue: showdate.venue, 
          street: showdate.street, 
          town: showdate.town,
          zip: showdate.zip,
          date: showdate.date, 
          startTime: showdate.startTime,
          endTime: showdate.endTime,
          phone: showdate.phone, 
          notes: showdate.notes });
          $timeout( function(){ $scope.waitRefresh(); }, 50);
    }

    $scope.deleteShow = function(id) {
      $http.delete('/api/showdates/' + id);
      $scope.refreshShows();
      console.log("show deleted!");
    }

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
          startTime: $scope.newShow.startTime,
          endTime: $scope.newShow.endTime,
          phone: $scope.newShow.phone, 
          notes: $scope.newShow.notes });
       $scope.newShow = '';
       $scope.refreshShows();
    };


  });

//BEGIN TELEPHONE FILTERING
angular.module('expressbandApp').directive('phoneInput', function($filter, $browser) {
  return {
    require: 'ngModel',
    link: function($scope, $element, $attrs, ngModelCtrl) {
      var listener = function() {
        var value = $element.val().replace(/[^0-9]/g, '');
        $element.val($filter('tel')(value, false));
      };

      // This runs when we update the text field
      ngModelCtrl.$parsers.push(function(viewValue) {

        return viewValue.replace(/[^0-9]/g, '').slice(0, 10);
      });

      // This runs when the model gets updated on the scope directly and keeps our view in sync
      ngModelCtrl.$render = function() {
        $element.val($filter('tel')(ngModelCtrl.$viewValue, false));
      };

      $element.bind('change', listener);
      $element.bind('keydown', function(event) {
        var key = event.keyCode;
        // If the keys include the CTRL, SHIFT, ALT, or META keys, or the arrow keys, do nothing.
        // This lets us support copy and paste too
        if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40)) {
          return;
        }
        $browser.defer(listener); // Have to do this or changes don't get picked up properly
      });

      $element.bind('paste cut', function() {
        $browser.defer(listener);
            
      });
    }

  };
});

angular.module('expressbandApp')
.directive("formatDate", function(){
  return {
   require: 'ngModel',
    link: function(scope, elem, attr, modelCtrl) {
      modelCtrl.$formatters.push(function(modelValue){
        return new Date(modelValue);
      })
    }
  }
});

angular.module('expressbandApp').filter('tel', function() {
  return function(tel) {


    if (!tel) {
      return '';
    }

    var value = tel.toString().trim().replace(/^\+/, '');

    if (value.match(/[^0-9]/)) {
      return tel; 
    }

    var country, city, number;

    switch (value.length) {
      case 1:
      case 2:
      case 3:
        city = value;
        break;

      default:
        city = value.slice(0, 3);
        number = value.slice(3);
    }

    if (number) {
      if (number.length > 3) {
        number = number.slice(0, 3) + '-' + number.slice(3, 7);

      } else {
        number = number;
      }

      return ("(" + city + ") " + number).trim();
    } else {
      return "(" + city;
    }

  };

   $scope.$apply();
});

//END TELEPHONE FILTERING



