//const api_key = process.env.MAP_API_KEY;

var script = document.createElement('script');
script.type = 'text/javascript';
script.async = ''
script.defer = ''
script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCeEODIjjw3l-PpfsGm0jIOiotmM4aqT7A&loading=async&libraries=places&callback=initAutocomplete';    
document.head.appendChild(script);

let sourc;
let desti;

function initAutocomplete() {
    sourc = new google.maps.places.Autocomplete(
        document.querySelector('#s-autocomplete'),
        {
            types: ['establishment'],
            componentRestrictions: {'country': ['IN', 'US']},
            fields: ['place_id', 'geometry', 'name']
        }
    )
    sourc.addListener('place_changed', onPlaceChangedS);

    desti = new google.maps.places.Autocomplete(
        document.querySelector('#d-autocomplete'),
        {
            types: ['establishment'],
            componentRestrictions: {'country': ['IN', 'US']},
            fields: ['place_id', 'geometry', 'name']
        }
    )
    desti.addListener('place_changed', onPlaceChangedD);
}


const coordArray = ['', ''];
let center;
let placeId = "";

function onPlaceChangedS(){
    let place = sourc.getPlace();
    if(!place.geometry){
        document.querySelector("#autocomplete").value = "";
    } else {
        coordArray[0] = place.place_id;
        placeId = document.querySelector("#s-autocomplete").value;
        console.log(placeId);
        localStorage.setItem('sourc', coordArray[0]);
        center = {lat: place.geometry.location.lat(), lon: place.geometry.location.lng()}
    }
}

function onPlaceChangedD(){
    let place = desti.getPlace();

    if(!place.geometry){
        document.querySelector("#autocomplete").value = "";
    } else {
        coordArray[1] = place.place_id;
        console.log(place.place_id);
        localStorage.setItem('desti', coordArray[1]);
    }
}


const routeButton = document.querySelector('#route-button')
routeButton.onclick = () => {
    if(placeId.charAt(placeId.length - 1) == 'i') {
        placeId="getroute";
        console.log(placeId);
    } else {
        placeId="getusroute";
        console.log(placeId);
    }
    window.location.href = `/routemap/index.html?lat=${center.lat}&lng=${center.lon}&place=${placeId}`;
}
