'use strict';

angular.module('manageUserApp.useradd', ['ngRoute'])
.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/add', {
    templateUrl : 'useradd/useradd.html',
    controller : 'userAddCtrl'
  });
}])
.controller('userAddCtrl', ['$scope', function($scope){
  $scope.save = function(){
    if($scope.username == null || $scope.email == null){
      return false;
    }else {
      $scope.users.push({name : $scope.username, email: $scope.email});
      localStorage.setItem('users', JSON.stringify($scope.users));
    }
  }
}]);
