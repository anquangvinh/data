'use strict';

angular.module('mapGoogle.detail', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/detail/:id/distance/:distance', {
      templateUrl: '../detail/detail.html',
      controller: 'locationDetailCtrl'
    });
  }])
  .controller('locationDetailCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
    var placeID = $routeParams.id;              //get place ID from URL
    var placeDistance = $routeParams.distance;  //get place Distance from URL
    var place;                                  //place - get from $scope.locations by placeID
    var favouriteStored;                        //localstorage - get from client
    $scope.detailArr = [];                      //arr - contain detail of place get from GOOGLE service
    $scope.favourImg = "star1.png";

    getDetailsFromLocalStorage();
    getDetailsFromGoogleService(placeID);
    getObjectFromLocations(placeID); //Iterator $scope.locations arr and Find placeID respectively to GET INFO

    $scope.chooseFavour = function() {
      if ($scope.favourImg == "star1.png") {
        $scope.favourImg = "redStar.png";
        place.isFavourite = true;

        favouriteStored.push(place);
        localStorage.setItem('favouritePlace', JSON.stringify(favouriteStored));
      } else {
        $scope.favourImg = "star1.png";
        if(place !== undefined){
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

    function getDetailsFromGoogleService(id){
      var map = new google.maps.Map(document.getElementById('detail-map'), {
        disableDefaultUI: true,
        zoom: 18
      });

      var infowindow = new google.maps.InfoWindow();
      var service = new google.maps.places.PlacesService(map);

      service.getDetails({
        placeId: id
      }, function(place, status) {
        $scope.detailArr.splice(0, $scope.detailArr.length);
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          var icon = {
              url: "assets/imgs/iconshop.png",
              size: new google.maps.Size(40, 40),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(30, 30)
            };
          var marker = new google.maps.Marker({
            icon: icon,
            map: map,
            position: place.geometry.location
          });
          map.setCenter(place.geometry.location);
          google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent('<div><strong>' + place.name + '</strong></div>');
            infowindow.open(map, this);
          });
          $scope.detailArr.push({
            name: place.name,
            address: place.vicinity,
            phone: place.formatted_phone_number,
            website: place.website,
            distance: placeDistance
          });
          $scope.$apply();
        }
      });
    }

    function getDetailsFromLocalStorage(){
      var dataSaved = localStorage.getItem('favouritePlace');

      if (dataSaved !== null) {
        favouriteStored = JSON.parse(dataSaved);
        for (var i = 0, len = favouriteStored.length; i < len; i++) {
          if (favouriteStored[i].id === placeID) {
            $scope.favourImg = "redStar.png";
            break;
          } else {
            $scope.favourImg = "star1.png";
          }
        }
      } else {
        favouriteStored = [];
        $scope.favourImg = "star1.png";
      }
    }

    function getObjectFromLocations(id){
      for (var i = 0, len = $scope.locations.length; i < len; i++) {
        if ($scope.locations[i].id === id) {
          place = $scope.locations[i];
          break;
        }
      }
    }

  }]);
