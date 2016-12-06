'use strict';

angular.module('mapGoogle.favourite',['ngRoute'])
.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/location/favourite', {
    templateUrl : 'location/favourite/favourite.html',
    controller : 'locationFavouriteCtrl'
  });
}])
.controller('locationFavouriteCtrl', ['$scope', 'mapService', function($scope, mapService){
  $scope.locationsList = mapService.getFavourPlacesFromLocalStorage();

  //Action when click to Favourite Star
  $scope.chooseFavourite = function(id){
    for(var i = 0, len = $scope.locationsList.length; i < len; i++){
      if($scope.locationsList[i].id == id){
        console.log('ok');
        console.log($scope.locationsList[i].id)
        $scope.locationsList.splice(i, 1);
        localStorage.setItem('favouritePlace', JSON.stringify($scope.locationsList));
        break;
      }
    }

    //uncheck star in List page
    for(var i = 0, len = $scope.locations.length; i < len; i++){
      if($scope.locations[i].id == id){
        $scope.locations[i].isFavourite = false;
      }
    }
  }

}]);
