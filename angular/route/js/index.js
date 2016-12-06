var app = angular.module('routeApp', ['ngRoute']);

app.controller("routeAppCtrl", function($scope, $route, $location){
  $scope.$route = $route;
  $scope.$location = $location;
});

