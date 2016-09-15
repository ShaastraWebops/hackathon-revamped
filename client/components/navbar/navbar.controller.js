'use strict';

angular.module('imgApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    
jQuery('.nav-scroll').on('click',function(event) {
  event.preventDefault();
  var target = jQuery(this).attr('href');
  
  jQuery('html, body').animate({
    scrollTop: jQuery(target).offset().top-30
  }, 800);
});


    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });