'use strict';

angular.module('mapGoogle.favourite',['ngRoute'])
.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/location/favourite', {
    templateUrl : 'location/favourite/favourite.html',
    controller : 'locationFavouriteCtrl'
  });
}])
.controller('locationFavouriteCtrl', ['$scope', function($scope){
  var dataSaved = localStorage.getItem('favouritePlace');

  if (dataSaved !== null) {
    $scope.favouriteStored = JSON.parse(dataSaved);
  } else {
    $scope.favouriteStored = [];
  }
}]);
