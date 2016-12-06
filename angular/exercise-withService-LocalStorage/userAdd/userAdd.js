'use strict';

angular.module('manageUserApp.userAdd', ['ngRoute'])
.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/useradd', {
    templateUrl : 'userAdd/userAdd.html',
    controller : 'userAddCtrl'
  });
}])
.controller('userAddCtrl', ['$scope', 'userServices', function($scope, userServices){
  $scope.save = function (){
    if($scope.user.name == null || $scope.user.email == null){
      return false;
    } else {
      $scope.users = userServices.addUser($scope.user);

      alert('Added Successfully!');

      // $location.href =
        $location.path("../userList/userList.html");

      //window.location = "#/userlist";
    }
  }
}]);
