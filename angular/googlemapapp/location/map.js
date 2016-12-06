'use strict';

var mapModule = angular.module('mapGoogle.map', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/location/map', {
      templateUrl: 'location/map.html',
      controller: 'mapcontrolCtrl'
    }).when('/location/map/:id', {
      templateUrl: 'location/map.html',
      controller: 'mapcontrolCtrl'
    });
  }])
  .controller('mapcontrolCtrl', ['$scope', '$location', '$routeParams', 'mapService', function($scope, $location, $routeParams, mapService) {
    var map;
    var pos;
    var placeIDStored = [];
    var markers = [];
    var favouriteStored;
    var placeId = $routeParams.id;
    var infowindow = new google.maps.InfoWindow({
      map: map
    });

    map = new google.maps.Map(document.getElementById('map'), {
      disableDefaultUI: true,
      zoom: 13
    });

    //Search Feature
    mapService.searchLocation(map, markers, $scope.locations, placeIDStored);

    if (placeId === undefined) {
      //Get current location
      mapService.getCurrentLocation(map);

      //get PlaceID - push into placeIDStored - use in loadSearchedResult
      mapService.getPlaceIDFromLocalStorage(placeIDStored);

      //load searched result after navigate
      mapService.loadSearchedResult($scope.locations, placeIDStored, markers, map);

    } else {
      mapService.getPlacePositionById(infowindow, placeId, map);
    }

  }])

.directive('pageHeader', function() {
    return {
      templateUrl: '/location/templates/page-header-template.html'
    }
  })
  .directive('listFavouriteBody', function() {
    return {
      templateUrl: '/location/templates/location-list-template.html'
    }
  });
