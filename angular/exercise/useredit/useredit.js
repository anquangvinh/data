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

  $scope.username = $scope.userArr[id].name;
  $scope.email = $scope.userArr[id].email;

  $scope.save = function(){
    if($scope.username == null || $scope.email == null){
      return false;
    }else {
      $scope.userArr[id].name = $scope.username;
      $scope.userArr[id].email = $scope.email;
    }
  }
}]);


