'use strict';

angular.module('mapGoogle', [
  'ngRoute',
  'mapGoogle.map',
  'mapGoogle.detail',
  'mapGoogle.list',
  'mapGoogle.favourite'])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({
        redirectTo: '/location/map'
    });
}])
.controller('mapGoogleCtrl', ['$scope','$location', function($scope, $location) {
    $scope.locations = [];
    $scope.locationDetail = [];

    $scope.getClass = function (path) {
      return ($location.path().substr(0, path.length) === path) ? 'active' : '';
    }
}]);
