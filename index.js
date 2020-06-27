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
        // let newCountryList = [];

         listOfCountries.forEach((item) => {
            // create an array, and push each country the API has into the array.
            newCountryList.push(item.Country);
        });
        

    })
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
    .catch((error) => alert(error));
    
}

function userSelectedPlaceStats(slugform){
    console.log("This works")
    console.log(slugForm);
    fetch(`https://api.covid19api.com/summary`)
    .then(response => response.json())
    // Figure out how to get the users (country) to match the object for the data
    .then(responsejson => 
        {
            // Generates an array of objects containing countries
            let listOfCountries = responsejson.Countries;
            // console.log(listOfCountries.find((data) => console.log(data.Slug)));

            listOfCountries.filter((data) => {
                    if(data.Slug == slugForm) {
                        console.log(data);
                        // create a function to place this data for stats in other Countries
                    };
                })

        })
    .catch((error) => alert(error));
}

function placeUserspecificLocationStats(data){
    // data here is in reference to an object, that contains properties as Current Data, NewConfirmed cases, NewDeaths, NewRecovered, Slug, TotalConfirmed, TotalDeaths, TotalRecovered
        console.log(data);
        let userTotalCases = data.TotalConfirmed;
        let currentDate = data.Date;
        let userNewCases = data.NewConfirmed;
        let userDeathsToday = data.NewDeaths;
        let userCurrentLocation = data.Country;
        let pElement1 = $('<p id="user-current-location"></p>').text(`Your current location is in: ${userCurrentLocation}`);
        let pElement2 = $('#current-date').text(`${currentDate}`);
        pElement1.append(" ",pElement2);
        let pElement3 = $('<p id="user-total-cases"></p>').text(`Total cases: ${userTotalCases}`);
        let pElement4 = $('<p id="user-new-cases"></p>').text(`New Cases: ${userNewCases}`);
        let pElement5 = $('<p id="user-new-deaths-today"></p>').text(`Total Deaths: ${userDeathsToday}`);

        // console.log(userTotalCases);
        // $('#user-current-location').append(` ${userCurrentLocation}`);
        // $('#current-date').append(` ${currentDate}`);
        // $('#user-total-cases').append(` ${userTotalCases}`);
        // $('#user-new-cases').append(` ${userNewCases}`);
        // $('#user-new-deaths-today').append(` ${userDeathsToday}`);

        $('.display_user_stats').append(pElement1,pElement3,pElement4,pElement5);

        // could possibly loop through this data and place all stats.
}

function placeStat(stat){
    
    // console.log(Object.entries(stat));

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

function clearStats(){
    $('.display_user_stats').empty();
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
    // clears current html
    clearStats();
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
    }

    outputHTML(matches)
}

// takes the array of matches, and inputs it on the page in html
function outputHTML(matches){

    const html = matches.map(match => 
        `
            <div class="sel-country">
                <h4>${match}</h4>
            </div>
        `
        ).join('');
    console.log(html);
    $('.match-list').html(html);

}

$('.match-list').on("click", function(e){
    console.log(e.target);
    userSearch.val(e.target.innerText); 
    let slug = userSearch.val().toLowerCase().split(' ').join('-');
    console.log(slug);
    console.log(userSearch.val());

    // Need to pass the slug into function that brings back results for that country!
})

const userSearch = $('#country-sel');
userSearch.on("input", function(e){
    let userIn = this.value.toLowerCase();
    console.log(userIn);
    filterArry(userIn)

    // newCountryList.filter(function(item,e) {
    //     console.log(this.value);
    //     let divEle = $(`<div>${item}</div>`)
    //     if(item.toLowerCase().indexOf(userIn) > - 1){
            
    //         divEle.css("display", "block");
    //         $('.autocomplete').append(divEle);
    //     } else {

    //         divEle.css("display", "none");
    //         $('.autocomplete').append(divEle); 
    //     }
    // });


    // this works but is not hiding the elements after full search
    // newCountryList.forEach((country) => {
    //     // Create a div element for each country
    //     let divEle = $(`<div>${country}</div>`)
    //     if(country.toLowerCase().indexOf(this.value.toLowerCase()) > -1){
    //         console.log(country);
    //         // need to create element to store 
    //         // add a display of block
    //         $('.autocomplete').append(divEle.css("display","block"));
    //     } else {
    //         // need to hide other elements. 
    //         // add display style of none
    //         $('.autocomplete').append(divEle.css("display","none"));
    //     }
    //     console.log(divEle);
    // });
})




// May not use this either
// function filterCountries(inp,arr){
//     console.log(inp);
//     console.log(arr);
//     inp.on('input', function(e) {
//         console.log(this.id);
//         let a,b,i;
//         let userInput = this.value;
//         console.log(userInput);
        
//         a = `<div id="${this.id} autocomplete-list" class="autocomplete-items"></div>`;
//     $('.autocomplete').append(a);       

//         for(i = 0; i < arr.length; i++){
//             if(arr[i].substr(0,userInput.length).toUpperCase() == userInput.toUpperCase()){
//                 b = `
//                 <div>
//                 <strong>${arr[i].substr(0,userInput.length)}</strong>
//                 ${arr[i].substr(userInput.length)}
//                 <input type="hidden" value="${arr[i]}">
//                 </div>`;
//                 console.log(b);
                
//             }
//         }
//         $('.autocomplete-items').append(b);
//         console.log(typeof b);
//         b.on("click", function(e){
//             console.log(e.currentTarget);
//         });
//     });
    
//     function closeList(ele){
//         let x = $('.autocomplete-items');
//         console.log(x.length);
//         for (i = 0; i < x.length; i++){
//             if(ele != x[i] && ele != inp){
//                 x[i].parentNode.removeChild(x[i]);
//             }
//         }
//     }
// }


// filterCountries(searchCountry,newCountryList)

// This grabs the search bar, and adds a keyup event
// we want the user to filter through a list of Countries, 
// to select the one that they want to view stats on. 
// searchCountry.on("keyup", function grabUserInput(e){
//     // This works
//     console.log("this works");
//     // List of countries works
//     console.log(newCountryList);




// //     e.preventDefault();
// //     let userInputData = e.target.value;
// //     let arryOfCountry = [];
// //     fetch(`https://api.covid19api.com/summary`)
// //     .then(response => response.json())
// //     .then(responsejson => {
// //         let listOfCountries = responsejson.Countries;
        
// //         listOfCountries.forEach((item) => {
// //            arryOfCountry.push(item.Country.toLowerCase());
// //         })
// //         // console.log(arryOfCountry);
// //         // console.log(userInputData);

// //         for(i = 0; i < arryOfCountry.length; i++){
// //             if(arryOfCountry[i].indexOf(userInputData) > -1){

// //                 if(arryOfCountry[i] == userInputData){
// //                     $('#country-choices').append(`<option value="${arryOfCountry[i]}"${arryOfCountry[i]}</option>`);
// //                 }
                
// //             } 
// //         }
// //     });

// //    let userValue = $('#Country-sel').val()
// //    console.log(userValue);
// //    if(userValue.includes(' ')){
// //        let slugForm = userValue.split(' ').join('-');
// //        console.log(slugForm);
// //    }
    
// });





getCovidGlobalStats()

