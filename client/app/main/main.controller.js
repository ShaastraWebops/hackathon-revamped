'use strict';

angular.module('imgApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.awesomeThings = [];
 
  jQuery(document).ready(function(){
 
    
            
  jQuery(this).scrollTop(0);
 });


// Scroll To specified tab
jQuery('.nav-scroll').on('click',function(event) {
  event.preventDefault();
  var target = jQuery(this).attr('href');
  
  jQuery('html, body').animate({
    scrollTop: jQuery(target).offset().top-30
  }, 800);
});

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };
    $scope.errors = {};
    $scope.isopen=true;
    $scope.query = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.createUser({
          name: $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then(function() {
          // Account created, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };
    

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  });
