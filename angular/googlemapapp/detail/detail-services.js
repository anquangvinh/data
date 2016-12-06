detailModule.factory('detailServices', ['$rootScope', function($rootScope) {
  var detailServices = {};

  detailServices.getDetailsFromGoogleService = function(id, distance) {
    var map = new google.maps.Map(document.getElementById('detail-map'), {
      disableDefaultUI: true,
      zoom: 18
    });

    var infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);

    service.getDetails({
      placeId: id
    }, function(place, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        var marker = new google.maps.Marker({
          icon: {
            url: "assets/imgs/iconshop.png",
            size: new google.maps.Size(40, 40),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(30, 30)
          },
          map: map,
          position: place.geometry.location
        });

        map.setCenter(place.geometry.location);

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent('<div><strong>' + place.name + '</strong></div>');
          infowindow.open(map, this);
        });

        $rootScope.detailObj = {
          id: id,
          name: place.name,
          address: place.vicinity,
          phone: place.formatted_phone_number,
          distance: distance
        };

        // $rootScope.$apply();
        $rootScope.$digest();
      }
    });
  }

  detailServices.checkEditedPlace = function(id, placeDistance) {
    var editedPlacesList = this.getEditedLocationsFromLocalStorage();
    var placeIdArr = [];
    editedPlacesList.forEach(function(place) {
      placeIdArr.push(place.id);
    });

    if (placeIdArr.indexOf(id) != -1) {
      $rootScope.detailObj = editedPlacesList[placeIdArr.indexOf(id)];
    } else {
      this.getDetailsFromGoogleService(id, placeDistance);
    }
  }

  detailServices.getEditedLocationsFromLocalStorage = function() {
    var dataSaved = localStorage.getItem('editedLocation');
    var list;
    if (dataSaved !== null) {
      list = JSON.parse(dataSaved);
    } else {
      list = [];
    }
    return list;
  }

  detailServices.getFavourPlaceFromLocalStorage = function(placeID) {
    var dataSaved = localStorage.getItem('favouritePlace');
    if (dataSaved !== null) {
      var favouriteStored = JSON.parse(dataSaved);
      if (favouriteStored.length > 0) {
        for (var i = 0, len = favouriteStored.length; i < len; i++) {
          if (favouriteStored[i].id === placeID) {
            $rootScope.favourImg = "redStar.png";
            break;
          } else {
            $rootScope.favourImg = "star1.png";
          }
        }
      }else {
        $rootScope.favourImg = "star1.png";
      }
    } else {
      var favouriteStored = [];
      $rootScope.favourImg = "star1.png";
    }
    return favouriteStored;
  }

  detailServices.getObjectFromLocations = function(placeID, locations) {
    var place;
    for (var i = 0, len = locations.length; i < len; i++) {
      if (locations[i].id == placeID) {
        place = locations[i];
        return place;
      }
    }
    return place;
  }

  return detailServices;
}])
