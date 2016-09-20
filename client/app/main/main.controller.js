'use strict';

angular.module('imgApp')
  .controller('MainCtrl', function ($scope, $http, socket,$location) {
    $scope.awesomeThings = [];
 
  jQuery(document).ready(function(){
 
         
  jQuery(this).scrollTop(0);
 });
// jQuery(document).keydown(function(e){
//   var current = jQuery('div.current').data('section');
//     if (e.keyCode == 40) {
//         //SCROLL DOWN
//         var next = current + 1;
//         $('.section'+current).removeClass('current');
//       $('body').scrollTo('.section'+next, {duration:600}, {queue:true});
//       $('.section'+next).addClass('current');
//         e.preventDefault();
//         return false;
//       } 
 
//   else if (e.keyCode == 38) {
//         //SCROLL UP
//         var prev = current - 1;
//         $('.section'+current).removeClass('current');
//         $('body').scrollTo( '.section' + prev, 600, {queue:true} );
//         $('.section'+prev).addClass('current');
//         e.preventDefault();
//         return false;
//       }
// });

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
    
    $scope.isopen=true;
    
    $scope.querySubmit = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
              $http.post('/api/imgs/query', { 
                qname: $scope.query.name,
                queryEmail:$scope.query.email,
                query:$scope.user.query,
              })
              .then( function() {
          // Account created, redirect to home
          $location.path('/');
          console.log("Successfully submitted")
                      } )
               .catch( function(err) {
                  err = err.data;
                  $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
                angular.forEach(err.errors, function(error, field) {
                form[field].$setValidity('mongoose', false);
                $scope.errors[field] = error.message;
          });
        }); 
              ;


              }
    };
    

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  });
