//const api_key = process.env.MAP_API_KEY;

var script = document.createElement('script');
script.type = 'text/javascript';
script.async = ''
script.defer = ''
script.src = 'https://maps.google.com/maps/api/js?key=AIzaSyCeEODIjjw3l-PpfsGm0jIOiotmM4aqT7A&libraries=geometry&callback=initMap';    
document.head.appendChild(script);

const urlParams = new URLSearchParams(window.location.search);
const lat = urlParams.get('lat');
const lng = urlParams.get('lng');

const coordArray = [localStorage.getItem('sourc'), localStorage.getItem('desti')]

function initMap() {
    const centerCoords = new google.maps.LatLng(lat, lng);
    const mapOptions = {
        zoom: 5,
        center: centerCoords,
        streetViewControl: false,
        zoomControl: false,
        mapTypeControl: false,
        styles: 
          [
            {
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#212121"
                }
              ]
            },
            {
              "elementType": "labels.icon",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#212121"
                }
              ]
            },
            {
              "featureType": "administrative",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "featureType": "administrative.country",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#9e9e9e"
                }
              ]
            },
            {
              "featureType": "administrative.land_parcel",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "administrative.locality",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#bdbdbd"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#181818"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#616161"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#1b1b1b"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#2c2c2c"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#8a8a8a"
                }
              ]
            },
            {
              "featureType": "road.arterial",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#373737"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#3c3c3c"
                }
              ]
            },
            {
              "featureType": "road.highway.controlled_access",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#4e4e4e"
                }
              ]
            },
            {
              "featureType": "road.local",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#616161"
                }
              ]
            },
            {
              "featureType": "transit",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#000000"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#3d3d3d"
                }
              ]
            }
          ]
        //mapTypeId: google.maps.MapTypeId.ROADMAP,
    }
    const map = new google.maps.Map(document.querySelector("#map"), mapOptions);
    const decodedLevels = decodeLevels("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB");

    fetch(`https://optimal-route.vercel.app/getroute?o_place=${coordArray[0]}&d_place=${coordArray[1]}`).then(x => x.json()).then(x => {
      const decodedPath = google.maps.geometry.encoding.decodePath(x.routes[0].polyline.encodedPolyline);

      let setRegion = new google.maps.Polyline({
          path: decodedPath,
          levels: decodedLevels,
          strokeColor: "#fff",
          strokeOpacity: 1.0,
          strokeWeight: 5,
          map: map
      });
    })
}

function decodeLevels(encodedLevelsString) {
    const decodedLevels = [];
    for (let i = 0; i < encodedLevelsString.length; ++i) {
        let level = encodedLevelsString.charCodeAt(i) - 63;
        decodedLevels.push(level);
    }
    return decodedLevels;
}

