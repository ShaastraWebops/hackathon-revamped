'use strict';

angular.module('imgApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.awesomeThings = [];
   
   jQuery(document).ready(function() {
var i=0;
  jQuery(document).on("keydown", function(e) {
       if (e.keyCode == 40) { 
                     console.log(jQuery(this).find('.content:nth-child('+i+')').id);
                     var target = jQuery(this).find('.content:nth-child(0)').next();

  
  jQuery('html, body').animate({
    scrollTop: jQuery(target).offset().top-30
  }, 800);     
  i++;
               }
           });
       }
  );
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

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  });
