app.controller("routeAppController", function($scope, $route, $routeParams, $location){
  $scope.$route = $route;
  $scope.$location = $location;
  $scope.$routeParams = $routeParams;
});
