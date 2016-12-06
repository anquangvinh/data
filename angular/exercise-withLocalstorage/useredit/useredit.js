'use strict';

angular.module('manageUserApp.useredit', ['ngRoute'])

.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/useredit/edit/:id', {
    templateUrl : 'useredit/useredit.html',
    controller : 'usereditCtrl'
  });
}])
.controller('usereditCtrl', ['$scope', '$routeParams', function($scope, $routeParams){
  var id = $routeParams.id;

  $scope.username = $scope.users[id].name;
  $scope.email = $scope.users[id].email;

  $scope.save = function(){
    if($scope.username == null || $scope.email == null){
      return false;
    }else {
      $scope.users[id].name = $scope.username;
      $scope.users[id].email = $scope.email;
      localStorage.setItem('users', JSON.stringify($scope.users));
    }
  }
}]);


