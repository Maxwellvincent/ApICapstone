const userLocation = $('#user_current_location');
const user_key = "AIzaSyDSG6JxsJRLwUirDGdkGlnHMEHcmbpvvuA";
const searchCountry = $('#Country-sel');
const newCountryList = [];
var selectedUserLocation;

const finalCountries = [
    "Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina","Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei Darussalam","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo (Brazzaville)","Congo (Kinshasa)","Costa Rica","Croatia","Cuba","Cyprus","Czech Republic","Côte d'Ivoire","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Fiji","Finland","France","Gabon","Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Holy See (Vatican City State)","Honduras","Hungary","Iceland","India","Indonesia","Iran, Islamic Republic of","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Korea (South)","Kuwait","Kyrgyzstan","Lao PDR","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macedonia, Republic of","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar","Namibia","Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestinian Territory","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Republic of Kosovo","Romania","Russian Federation","Rwanda","Saint Kitts and Nevis","Saint Lucia","Saint Vincent and Grenadines","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Somalia","South Africa","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syrian Arab Republic (Syria)","Taiwan, Republic of China","Tajikistan","Tanzania, United Republic of","Thailand","Timor-Leste","Togo","Trinidad and Tobago","Tunisia","Turkey","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Venezuela (Bolivarian Republic)","Viet Nam","Western Sahara","Yemen","Zambia","Zimbabwe"
];

function getCovidGlobalStats(){
    fetch(`https://api.covid19api.com/summary`)
    .then(response => response.json())
    .then(responsejson => {
        placeStat(responsejson.Global);

        // Generates an array of objects containing countries
        let listOfCountries = responsejson.Countries;
        
        // console.log(listOfCountries.find((data) => console.log(data.Slug)));
        

         listOfCountries.forEach((item) => {
            // create an array, and push each country the API has into the array.
            newCountryList.push(item.Country);
        });
        

    })
    .catch(error => alert(error))
}

function getLocationSpecificCovidStats(country){
    // console.log(country);
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
                        // console.log(data);
                        placeUserspecificLocationStats(data);
                    };
                })

            // console.log(listOfCountries.filter((data) => {
            //     if(data.Slug == country) {
            //         console.log(data)
                    
            //     };
            // }));
        })
    .catch((error) => console.log(error));
    
}

function userSelectedPlaceStats(slug){
    // console.log("This works")
    // console.log(slug);
    fetch(`https://api.covid19api.com/summary`)
    .then(response => response.json())
    // Figure out how to get the users (country) to match the object for the data
    .then(responsejson => 
        {
            // Generates an array of objects containing countries
            let listOfCountries = responsejson.Countries;
            // console.log(listOfCountries.find((data) => console.log(data.Slug)));

            listOfCountries.filter((data) => {
                
                    if(data.Country == slug) {
                        // console.log(data);
                        // create a function to place this data for stats in other Countries

                        // function placeSelectedCountryStats(data){
                            let selCntryTot = data.TotalConfirmed.toLocaleString();
                            let selCntyTotDeaths = data.TotalDeaths.toLocaleString();
                            let selCntryNewCases = data.NewConfirmed.toLocaleString();
                            let selCntryNewDeaths = data.NewDeaths.toLocaleString();
                            // we need total cases = data.TotalConfirmed
                                let text1 = $('<p id="total-cases"></p>').text(`Total cases: ${selCntryTot}`);
                            //  total deaths = data.TotalDeaths
                                let text2 = $('<p id="total-deaths"></p>').text(`Total Deaths: ${selCntyTotDeaths}`);
                            //  new cases = data.NewConfirmed
                                let text3 = $('<p id="new-cases"></p>').text(`New Cases Today: ${selCntryNewCases}`);
                            //  new deaths = data.NewDeaths
                                let text4 = $('<p id="new-deaths"></p>').text(`New Deaths Today: ${selCntryNewDeaths}`);

                                $('.autocomplete-stats').append(text1,text2,text3,text4);
                        // }


                    };
                })

        })
    .catch((error) => alert(error));
}

function placeUserspecificLocationStats(data){
    // data here is in reference to an object, that contains properties as Current Data, NewConfirmed cases, NewDeaths, NewRecovered, Slug, TotalConfirmed, TotalDeaths, TotalRecovered
        // console.log(data);
        let userTotalCases = data.TotalConfirmed.toLocaleString();
        let currentDate = new Date(data.Date);
        // let finalCurrentDate = currentDate.toDateString();
        let userNewCases = data.NewConfirmed.toLocaleString();
        let userDeathsToday = data.NewDeaths.toLocaleString();
        let userCurrentLocation = data.Country;
        let pElement1 = $('<p id="user-current-location"></p>').text(`Your current location is in: ${userCurrentLocation}, `);
        let pElement2 = $('#current-date').text(` ${currentDate}`);
        pElement1.append(" ",pElement2);
        let pElement3 = $('<p id="user-total-cases"></p>').text(`Total cases: ${userTotalCases}`);
        let pElement4 = $('<p id="user-new-cases"></p>').text(`New Cases: ${userNewCases}`);
        let pElement5 = $('<p id="user-new-deaths-today"></p>').text(`New Deaths Today: ${userDeathsToday}`);

        // console.log(userTotalCases);
        // $('#user-current-location').append(` ${userCurrentLocation}`);
        // $('#current-date').append(` ${currentDate}`);
        // $('#user-total-cases').append(` ${userTotalCases}`);
        // $('#user-new-cases').append(` ${userNewCases}`);
        // $('#user-new-deaths-today').append(` ${userDeathsToday}`);

        $('.display_user_stats').append(pElement1,pElement3,pElement4,pElement5);

        // could possibly loop through this data and place all stats.
        setTimeout(`$("#user_current_location").removeAttr("disabled")`, 2000);
}

function placeStat(stat){
    
    // console.log(Object.entries(stat));

    let newDeath = Object.entries(stat)[2][0];
    let newDeathNum = Object.entries(stat)[2][1].toLocaleString();
    let newConf = Object.entries(stat)[0][0];
    let newConfNum = Object.entries(stat)[0][1].toLocaleString();
    let totalConf = Object.entries(stat)[1][0];
    let totalConfNum = Object.entries(stat)[1][1].toLocaleString();
    let totalDeaths = Object.entries(stat)[3][0];
    let totalDeathsNum = Object.entries(stat)[3][1].toLocaleString();
    let totalRecovered = Object.entries(stat)[5][0];
    let totalRecoveredNum= Object.entries(stat)[5][1].toLocaleString();
    // to get yesterdays deaths, subtract new deaths from today, from total deaths

    
    // $('#covid-div').replaceWith(`<strong>${newConf} cases:</strong> ${newConfNum}`);
    $('#covid-div').append(`<div><strong>${newConf} cases:</strong> ${newConfNum}</div>`);
    $('#covid-div').append(`<div><strong>${totalConf} cases:</strong> ${totalConfNum}</div>`);
    $('#covid-div').append(`<div><strong>${newDeath} cases:</strong> ${newDeathNum}</div>`);
    $('#covid-div').append(`<div><strong>${totalDeaths} cases:</strong> ${totalDeathsNum}</div>`);
    $('#covid-div').append(`<div><strong>${totalRecovered} cases:</strong> ${totalRecoveredNum}</div>`);
}

function clearStats(){
    $('.display_user_stats').empty();
    
}
function clearRandomCountryStat(){
    $('.autocomplete-stats').empty();
}
// Grabs the user's location from browser, user has to allow browser to grab their location.
function getUserLocation(){
    navigator.geolocation.getCurrentPosition(showCoordinate);
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
        console.log()
        selectedUserLocation = responsejson.results[responsejson.results.length -1].address_components[0].long_name;
        // console.log(selectedUserLocation);
        // getLocationSpecificCovidStats(selectedUserLocation);
        if(selectedUserLocation.includes(' ')){
            let replacedStr = selectedUserLocation.split(' ').join('-');
            // console.log(replacedStr.toLowerCase());
            getLocationSpecificCovidStats(replacedStr.toLowerCase());
        }
        
    });
}


userLocation.on("click", (e) => {
    e.target.disabled = true;
    clearStats();
    // console.log(e.target);
    // clears current html
    
    // Need to clear information if clicked again!!!!
    // function clearData()
    // what do we want to happen when this is clicked?
    // We want to grab the user's current location
    // console.log("this was clicked");
    getUserLocation();
});


// filters through fetch data of countries, and matches it to the searchtxt of the user. 
function filterArry(searchText){
    console.log(searchText.length);
    let matches = newCountryList.filter(function(country){
        const reg = new RegExp(`^${searchText}`,`gi`);
        return country.match(reg);
    });
    console.log(matches);
    if(searchText.length === 0){
        matches = [];
        console.log(matches);
        clearRandomCountryStat();
    }

    outputHTML(matches)
}

// takes the array of matches, and inputs it on the page in html
function outputHTML(matches){

    const html = matches.map(match => 
        `
            <button class="sel-country">
                <h4>${match}</h4>
            </button>
        `
        ).join('');
    console.log(html);
    $('.match-list').html(html);

}

$('.match-list').on("click", function(e){
    console.log(e.target);
    userSearch.val(e.target.innerText); 
    // Dont need slug, just need to match it to the country 
    // let slug = userSearch.val().toLowerCase().split(' ').join('-');

    // console.log(slug);
    console.log(userSearch.val());

    // Need to pass the slug into function that brings back results for that country!
    userSelectedPlaceStats(userSearch.val());
    $('.match-list').empty();
})

const userSearch = $('#country-sel');

userSearch.on("input keydown submit click", function(e){
    
    let key = e.keyCode;
    if(key == 8){
        clearStats();
    }
    let userIn = this.value.toLowerCase();
    // console.log(userIn);
    filterArry(userIn)
    

})








getCovidGlobalStats()

