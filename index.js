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
    fetch("https://optimal-route.vercel.app/getroute").then(x => console.log(x))
}

function onPlaceChanged(){
    place = autocomplete.getPlace();

    if(!place.geometry){
        document.querySelector("#autocomplete").value = "";
    } else {
        document.querySelector(".display").textContent = place.place_id;
    }
}

const routeButton = document.querySelector('#route-button')
routeButton.onclick = () => {
    getOptimalRoute();
}