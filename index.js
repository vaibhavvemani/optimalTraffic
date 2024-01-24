//const api_key = process.env.MAP_API_KEY;

var script = document.createElement('script');
script.type = 'text/javascript';
script.async = ''
script.defer = ''
script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCeEODIjjw3l-PpfsGm0jIOiotmM4aqT7A&loading=async&libraries=places&callback=initAutocomplete';    
document.head.appendChild(script);

let autocomplete;

function initAutocomplete() {
    autocomplete = new google.maps.places.Autocomplete(
        document.querySelector('#autocomplete'),
        {
            types: ['establishment'],
            componentRestrictions: {'country': ['IN']},
            fields: ['place_id', 'geometry', 'name']
        }
    )
    
    autocomplete.addListener('place_changed', onPlaceChanged);
}

function getOptimalRoute() {
    fetch("https://optimal-route.vercel.app/getroute").then(x => x.json()).then(x => console.log(x.routes))
}

function onPlaceChanged(){
    place = autocomplete.getPlace();

    if(!place.geometry){
        document.querySelector("#autocomplete").value = "";
    } else {
        document.querySelector(".display").textContent = place.place_id;
        const center = {lat: place.geometry.location.lat(), lon: place.geometry.location.lng()}
        window.location.href = `/routemap/index.html?lat=${center.lat}&lng=${center.lon}`;
    }
}

const routeButton = document.querySelector('#route-button')
routeButton.onclick = () => {
    getOptimalRoute();
}