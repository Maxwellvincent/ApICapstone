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
    .then(responsejson => 
        {
            // Generates an array of objects containing countries
            let listOfCountries = responsejson.Countries;
            // console.log(listOfCountries.find((data) => console.log(data.Slug)));


            listOfCountries.filter((data) => {
                    if(data.Slug == country) {
                        console.log(data);
                        placeUserspecificLocationStats(data);
                    };
                })



            // console.log(listOfCountries.filter((data) => {
            //     if(data.Slug == country) {
            //         console.log(data)
                    
            //     };
            // }));
        })
    .catch((error) => alert(error));
    
}

function placeUserspecificLocationStats(data){
    // data here is in reference to an object, that contains properties as Current Data, NewConfirmed cases, NewDeaths, NewRecovered, Slug, TotalConfirmed, TotalDeaths, TotalRecovered
        let userTotalCases = data.TotalConfirmed;
        let currentDate = data.Date;
        let userNewCases = data.NewConfirmed;
        let userDeathsToday = data.NewDeaths;
        let userCurrentLocation = data.Country;
        console.log(userTotalCases);
        $('#user-current-location').append(` ${userCurrentLocation}`);
        $('#current-date').append(` ${currentDate}`);
        $('#user-total-cases').append(` ${userTotalCases}`);
        $('#user-new-cases').append(` ${userNewCases}`);
        $('#user-new-deaths-today').append(` ${userDeathsToday}`);

        // could possibly loop through this data and place all stats.
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

// Grabs the user's location from browser, user has to allow browser to grab their location.
function getUserLocation(){
    console.log(navigator.geolocation.getCurrentPosition(showCoordinate));
}

// This functions handles the position data the is generated within getCurrentPosition, and grabs long, and latt of the user and sets it to setUserLocation funciton
function showCoordinate(position){
    let long = position.coords.longitude;
    let lati = position.coords.latitude;
    console.log(long);
    console.log(lati);
    setUserLocation(lati,long);
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
            console.log(replacedStr.toLowerCase());
            getLocationSpecificCovidStats(replacedStr.toLowerCase());
        }
        
    });
}


userLocation.on("click", (e) => {
    // Need to clear information if clicked again!!!!
    // function clearData()
    // what do we want to happen when this is clicked?
    // We want to grab the user's current location
    console.log("this was clicked");
    getUserLocation();
});





getCovidGlobalStats()
