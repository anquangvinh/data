mapModule.factory('mapService', function() {
  var mapService = {};

  mapService.getCurrentLocation = function(map) {
    if (navigator.geolocation) { //Check if Geolocation is supported (HTML5 geolocation)
      navigator.geolocation.getCurrentPosition(function(position) {
        pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        var marker = new google.maps.Marker({
          icon: {
            url: "assets/imgs/youarehere.png",
            size: new google.maps.Size(30, 30),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(30, 30)
          },
          position: pos,
          map: map, //Specifies the MAP on which to place the marker
          title: 'You are here!'
        });

        map.setCenter(pos);

        //Click marker to Zoom map
        marker.addListener('click', function() {
          map.setZoom(16);
          map.setCenter(pos);
        });
      });
    }
  };

  mapService.searchLocation = function(map, markers, locations, placeIDStored) {
    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(input);

    var service = new google.maps.DistanceMatrixService;
    var detailService = new google.maps.places.PlacesService(map);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
      locations.splice(0, locations.length); //Remove old search result in Array

      var places = searchBox.getPlaces(); //Return places Arr

      if (places.length == 0) {
        return;
      }

      // Clear out the old markers.
      markers.forEach(function(marker) {
        marker.setMap(null); //Remove marker from the map
      });
      markers = [];

      var bounds = new google.maps.LatLngBounds();

      // For each place, get the icon, name and location.
      places.forEach(function(place) {
        var isFavour;
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        /*------- Create Markers and PUSH to Markers Array------ */
        if (placeIDStored.indexOf(place.place_id) != -1) {
          isFavour = true;
          var icon = {
            url: "assets/imgs/favourite.png",
            size: new google.maps.Size(40, 40),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(30, 30)
          };
        } else {
          isFavour = false;
          var icon = {
            url: "assets/imgs/iconshop.png",
            size: new google.maps.Size(40, 40),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(30, 30)
          };
        }

        var marker = new google.maps.Marker({
          icon: icon,
          map: map,
          title: place.name,
          position: place.geometry.location
        });

        markers.push(marker);

        marker.addListener('click', function() {
          infowindow.close();
          infowindow.setContent(place.name);
          infowindow.open(map, marker);
          map.setZoom(18);
          map.setCenter(marker.getPosition());
        });
        /*------- END Create Markers and PUSH to Markers Array------ */

        /*---- Get Distance ----*/
        var destinationsArr = [];
        destinationsArr.push(place.geometry.location);

        var geocoder = new google.maps.Geocoder;

        service.getDistanceMatrix({
          origins: [pos],
          destinations: destinationsArr,
          travelMode: 'DRIVING',
          unitSystem: google.maps.UnitSystem.METRIC
        }, function(response, status) {
          var distance;
          if (status !== 'OK') {
            alert('Error was: ' + status);
          } else {
            var originList = response.originAddresses;
            var destinationList = response.destinationAddresses;

            for (var i = 0; i < originList.length; i++) {
              var results = response.rows[i].elements;
              geocoder.geocode({
                'address': originList[i]
              }, function() {});
              for (var j = 0; j < results.length; j++) {
                geocoder.geocode({
                  'address': destinationList[j]
                }, function() {});
                // console.log(results[j].distance.text);
                distance = results[j].distance.text;
              }
            }

            locations.push({ //Push each place to locations
              id: place.place_id,
              name: place.name,
              address: place.formatted_address,
              geometry: {
                location: place.geometry.location
              },
              distance: distance,
              isFavourite: isFavour
            });
          }
        });
        /*-- END Get Distance --*/

        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport); // Only geocodes have viewport.
        } else {
          bounds.extend(place.geometry.location);
        }
      }); //END places.forEach()
      map.fitBounds(bounds);
    }); //END SEARCH LISTENER
  };

  mapService.loadSearchedResult = function(locations, placeIDStored, markers, map) {
    locations.forEach(function(place) {
      if (placeIDStored.indexOf(place.id) != -1) {
        var icon = {
          url: "assets/imgs/favourite.png",
          size: new google.maps.Size(40, 40),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(30, 30)
        };
      } else {
        var icon = {
          url: "assets/imgs/iconshop.png",
          size: new google.maps.Size(40, 40),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(30, 30)
        };
      }

      var marker = new google.maps.Marker({
        icon: icon,
        map: map,
        title: place.name,
        position: place.geometry.location
      });

      markers.push(marker);

      marker.addListener('click', function() {
        infowindow.close();
        infowindow.setContent(place.name);
        infowindow.open(map, marker);
        map.setZoom(18);
        map.setCenter(marker.getPosition());
      });
    });
  }

  mapService.getPlaceIDFromLocalStorage = function(placeIDStored) {
    var saved = localStorage.getItem('favouritePlace');

    if (saved !== null) {
      var favouriteStored = JSON.parse(saved);
      favouriteStored.forEach(function(favour) {
        placeIDStored.push(favour.id);
      });
    }
  }

  mapService.getFavourPlacesFromLocalStorage = function() {
    var dataSaved = localStorage.getItem('favouritePlace');
    var list;
    if (dataSaved !== null) {
      list = JSON.parse(dataSaved);
    } else {
      list = [];
    }
    return list;
  }

  mapService.getPlacePositionById = function(infowindow, placeId, map) {
    var geocoder = new google.maps.Geocoder;
    geocoder.geocode({
      'placeId': placeId
    }, function(results, status) {
      if (status === 'OK') {
        if (results[0]) {
          map.setZoom(11);
          map.setCenter(results[0].geometry.location);

          var marker = new google.maps.Marker({
            map: map,
            icon: {
              url: "assets/imgs/iconshop.png",
              size: new google.maps.Size(40, 40),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(30, 30)
            },
            position: results[0].geometry.location
          });

          infowindow.setContent(results[0].address_components[0].short_name);
          infowindow.open(map, marker);

          marker.addListener('click', function() {
            infowindow.close();
            infowindow.setContent(results[0].address_components[0].short_name);
            infowindow.open(map, marker);
            map.setZoom(18);
          });
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }

  return mapService;
})
