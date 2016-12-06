'use strict';

angular.module('mapGoogle.list', ['ngRoute'])
.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/location/list', {
    templateUrl : 'location/list/list.html',
    controller : 'locationListCtrl'
  });
}])
.controller('locationListCtrl', ['$scope', 'mapService', function($scope, mapService){
  $scope.locationsList =  $scope.locations;

  //Action when click to Favourite Star
  $scope.chooseFavourite = function(id){
    for(var i = 0, len = $scope.locationsList.length; i < len; i++){
      if($scope.locationsList[i].id == id){
       $scope.locationsList[i].isFavourite = false;
      }
    }

    var favourList = mapService.getFavourPlacesFromLocalStorage();
    for(var i = 0, len = favourList.length; i < len; i++){
      if(favourList[i].id == id){
        favourList.splice(i, 1);
        localStorage.setItem('favouritePlace', JSON.stringify(favourList));
      }
    }
  }

}]);
