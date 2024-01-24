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
            componentRestrictions: {'country': ['IN']},
            fields: ['place_id', 'geometry', 'name']
        }
    )
    
    sourc.addListener('place_changed', onPlaceChanged);

    desti = new google.maps.places.Autocomplete(
        document.querySelector('#d-autocomplete'),
        {
            types: ['establishment'],
            componentRestrictions: {'country': ['IN']},
            fields: ['place_id', 'geometry', 'name']
        }
    )
    
    desti.addListener('place_changed', onPlaceChanged);
}

function getOptimalRoute() {
    fetch("https://optimal-route.vercel.app/getroute").then(x => x.json()).then(x => 
        console.log(x.routes))
    window.location.href = `/routemap/index.html?lat=${center.lat}&lng=${center.lon}`;
}

const coordArray = ['', ''];
let center;

function onPlaceChangedS(){
    let place = sourc.getPlace();

    if(!place.geometry){
        document.querySelector("#autocomplete").value = "";
    } else {
        coordArray[0] = place.place_id;
        center = {lat: place.geometry.location.lat(), lon: place.geometry.location.lng()}
    }
}

function onPlaceChangedD(){
    let place = desti.getPlace();

    if(!place.geometry){
        document.querySelector("#autocomplete").value = "";
    } else {
        coordArray[1] = place.place_id;
    }
}

const routeButton = document.querySelector('#route-button')
routeButton.onclick = () => {
    getOptimalRoute();
}