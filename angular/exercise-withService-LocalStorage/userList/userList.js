'use strict';

angular.module('manageUserApp.userList', ['ngRoute'])
.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/userList', {
    templateUrl : 'userList/userList.html',
    controller : 'userListCtrl'
  });
}])
.controller('userListCtrl', ['$scope', 'userServices', function($scope, userServices){
  $scope.users = userServices.getUsers();

  //Delete User
  $scope.deleteUser = function(id){
    $scope.users = userServices.deleteUser(id);
  }
}]);
