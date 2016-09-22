'use strict';

angular.module('imgApp')
  .controller('SignupCtrl', function ($scope, Auth,Modal, $location, $window) {
    $scope.user = {};
    $scope.errors = {};
    $scope.tc=Modal.confirm.termsAndConditions();



    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.createUser({
          name: $scope.user.member1Name,
          email: $scope.user.member1Email,
          phone:$scope.user.member1Phone,
          collegeName:$scope.user.college1Name,
           member2Name: $scope.user.member2Name,
          member2Email: $scope.user.member2Email,
          member2Phone:$scope.user.member2Phone,
          college2Name:$scope.user.college2Name,
           member3Name: $scope.user.member3Name,
          member3Email: $scope.user.member3Email,
          member3Phone:$scope.user.member3Phone,
          college3Name:$scope.user.college3Name,
          teamName:$scope.user.teamName,
          password: $scope.user.password
        })
        .then( function() {
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

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
