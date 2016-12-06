'use strict';

angular.module('manageUserApp.userlist', ['ngRoute'])
.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/userlist', {
    templateUrl : 'userlist/userlist.html',
    controller : 'userListCtrl'
  });
}])

.controller('userListCtrl', ['$scope', '$routeParams', function($scope, $routeParams){
  var id = $routeParams.id;
  $scope.total = $scope.users.length;

  //Delete User
  $scope.deleteUser = function (id){
    $scope.users.splice(id, 1);
    $scope.total = $scope.users.length;
    localStorage.setItem('users', JSON.stringify($scope.users));
  }

  //Remove LocalStorage
  $scope.removeLocalstorage = function(){
      localStorage.removeItem('users');
    }
}]);
