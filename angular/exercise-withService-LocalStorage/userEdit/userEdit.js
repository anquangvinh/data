'use strict';

angular.module('manageUserApp.userEdit', ['ngRoute'])
.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/useredit/edit/:id', {
    templateUrl : 'useredit/useredit.html',
    controller : 'userEditCtrl'
  });
}])
.controller('userEditCtrl', ['$scope', '$routeParams', 'userServices', function($scope, $routeParams, userServices){
  var userID = $routeParams.id;

  $scope.user = userServices.userDetail($routeParams.id);

  $scope.save = function (){
    if($scope.user.name == null || $scope.user.email == null){
      return false;
    } else {
      $scope.users = userServices.userEdit(userID, $scope.user);
      alert('Edited Successfully!');
    }
  }
}]);
