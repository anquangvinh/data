'use strict';

var detailModule = angular.module('mapGoogle.detail', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/detail/:id/distance/:distance', {
      templateUrl: '../detail/detail.html',
      controller: 'locationDetailCtrl'
    });
  }])
  .controller('locationDetailCtrl', ['$scope', '$routeParams', '$location', 'detailServices', function($scope, $routeParams, $location, detailServices) {
    var placeID = $routeParams.id; //get place ID from URL
    var placeDistance = $routeParams.distance; //get place Distance from URL
    var favouriteStored; //localstorage - get from client
    $scope.favourImg;
    $scope.isPhoneEnabled = false;
    $scope.detailObj;

    //get Favour Place to set Favourite Star
    favouriteStored = detailServices.getFavourPlaceFromLocalStorage(placeID);

    //Check if that place was edited or not
    detailServices.checkEditedPlace(placeID, placeDistance);

    //Action when click Edit
    $scope.editPhone = function() {
      $scope.isPhoneEnabled = !$scope.isPhoneEnabled;
    }

    //Action when click Update Button
    $scope.save = function() {
      $scope.detailObj.phone = $scope.phone;
      $scope.isPhoneEnabled = false;

      var list = detailServices.getEditedLocationsFromLocalStorage();
      if (list.length == 0) {
        list.push($scope.detailObj);
        localStorage.setItem('editedLocation', JSON.stringify(list));
      } else {
        var placeIdArr = [];
        list.forEach(function(place) {
          placeIdArr.push(place.id);
        });
        var pos = placeIdArr.indexOf(placeID);
        if (pos != -1) {
          list[pos].phone = $scope.phone;
          localStorage.setItem('editedLocation', JSON.stringify(list));
        } else {
          list.push($scope.detailObj);
          localStorage.setItem('editedLocation', JSON.stringify(list));
        }
      }
    }

    //Action when click Favourite Star
    $scope.chooseFavour = function() {
      //Iterator $scope.locations arr and Find placeID respectively to GET INFO
      var place = detailServices.getObjectFromLocations(placeID, $scope.locations);
      if ($scope.favourImg == "star1.png") {
        $scope.favourImg = "redStar.png";
        place.isFavourite = true;
        place.phone = $scope.detailObj.phone;

        favouriteStored.push(place);
        localStorage.setItem('favouritePlace', JSON.stringify(favouriteStored));
      } else {
        $scope.favourImg = "star1.png";
        if (place !== undefined) {
          place.isFavourite = false;
        }

        for (var i = 0, len = favouriteStored.length; i < len; i++) {
          if (favouriteStored[i].id === placeID) {
            favouriteStored.splice(i, 1);
            localStorage.setItem('favouritePlace', JSON.stringify(favouriteStored));
            break;
          }
        }
      }
    }

    //Action when click "Back To Home" Button
    $scope.goBack = function(){
      window.history.back();
    }
  }]);
