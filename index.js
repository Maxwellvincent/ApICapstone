function getRandomJoke(){
    fetch(`https://api.covid19api.com/summary`)
    .then(response => response.json())
    .then(responsejson => placeStat(responsejson.Global))
    .catch(error => alert(error))
}

function placeStat(stat){
    console.log(Object.keys(stat));
    console.log(Object.values(stat));
    console.log(Object.entries(stat)[0][0]);
    let newConf = Object.entries(stat)[0][0];
    let newConfnum = Object.entries(stat)[0][1];
    
    $('#covid-div').replaceWith(`<strong>${newConf} cases:</strong> ${newConfnum}`);
}







getRandomJoke()