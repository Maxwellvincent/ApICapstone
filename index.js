const userLocation = $('#user_current_location');
const user_key = "AIzaSyDSG6JxsJRLwUirDGdkGlnHMEHcmbpvvuA";
var selectedUserLocation;

function getCovidGlobalStats(){
    fetch(`https://api.covid19api.com/summary`)
    .then(response => response.json())
    .then(responsejson => placeStat(responsejson.Global))
    .catch(error => alert(error))
}

function getLocationSpecificCovidStats(country){
    console.log(country);
    fetch(`https://api.covid19api.com/summary`)
    .then(response => response.json())
    // Figure out how to get the users (country) to match the object for the data
    .then(responsejson => console.log(responsejson));
    
}

function placeStat(stat){
    
    console.log(Object.entries(stat));

    let newDeath = Object.entries(stat)[2][0];
    let newDeathNum = Object.entries(stat)[2][1];
    let newConf = Object.entries(stat)[0][0];
    let newConfNum = Object.entries(stat)[0][1];
    let totalConf = Object.entries(stat)[1][0];
    let totalConfNum = Object.entries(stat)[1][1];
    let totalDeaths = Object.entries(stat)[3][0];
    let totalDeathsNum = Object.entries(stat)[3][1];
    let totalRecovered = Object.entries(stat)[5][0];
    let totalRecoveredNum= Object.entries(stat)[5][1];
    // to get yesterdays deaths, subtract new deaths from today, from total deaths

    
    // $('#covid-div').replaceWith(`<strong>${newConf} cases:</strong> ${newConfNum}`);
    $('#covid-div').append(`<div><strong>${newConf} cases:</strong> ${newConfNum}</div>`);
    $('#covid-div').append(`<div><strong>${totalConf} cases:</strong> ${totalConfNum}</div>`);
    $('#covid-div').append(`<div><strong>${newDeath} cases:</strong> ${newDeathNum}</div>`);
    $('#covid-div').append(`<div><strong>${totalDeaths} cases:</strong> ${totalDeathsNum}</div>`);
    $('#covid-div').append(`<div><strong>${totalRecovered} cases:</strong> ${totalRecoveredNum}</div>`);
}

function getUserLocation(){
    console.log(navigator.geolocation.getCurrentPosition(showCoordinate));
}

function setUserLocation(latitude,longitude){
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${user_key}`)
    .then(response => response.json())
    .then(responsejson => {
        // console.log(responsejson.results[9].address_components[0].long_name);
        selectedUserLocation = responsejson.results[9].address_components[0].long_name;
        console.log(selectedUserLocation);
        // getLocationSpecificCovidStats(selectedUserLocation);
        if(selectedUserLocation.includes(' ')){
            let replacedStr = selectedUserLocation.split(' ').join('-');
            console.log(replacedStr);
            getLocationSpecificCovidStats(replacedStr);
        }
        
    });
}


function showCoordinate(position){
    let long = position.coords.longitude;
    let lati = position.coords.latitude;
    console.log(long);
    console.log(lati);
    setUserLocation(lati,long);
}

userLocation.on("click", (e) => {
    // what do we want to happen when this is clicked?
    // We want to grab the user's current location
    console.log("this was clicked");
    getUserLocation();
});





getCovidGlobalStats()
