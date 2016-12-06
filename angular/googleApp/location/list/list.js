'use strict';

angular.module('mapGoogle.list', ['ngRoute'])
.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/location/list', {
    templateUrl : 'location/list/list.html',
    controller : 'locationListCtrl'
  });
}])
.controller('locationListCtrl', ['$scope', function($scope){

}]);
