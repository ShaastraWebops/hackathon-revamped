'use strict';

angular.module('imgApp')
.service('fileUpload', ['$http', '$location', function ($http, $location) {
    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        fd.append('file', file);
        fd.append('test', 'test');
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
            alert("Successfully Uploaded");
            $location.path("/");
        })
        .error(function(){
            alert("Unsuccessful");
            $location.path("/");
        });
    }
}]);

