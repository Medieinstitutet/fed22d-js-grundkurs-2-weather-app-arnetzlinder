/* eslint linebreak-style: ["error", "windows"] */
var electricityPrice = document.querySelector('.electricityPrice');
var nowPrice = document.querySelector('.now');
var oneHourPrice = document.querySelector('.oneHour');
var cheapHourTime = document.querySelector('.cheapHour');
var cheapHourPrice = document.querySelector('.cheapPrice');
// let electricityAreaChoice: string;
var electricityArea;
var electricitySaver;
var electricityPrices = [];
var date = new Date();
var cheapHour;
var cheapPrice;
var sumNow;
var sumOneHour;
var averageElectricityPrice = 0;
function displayElectricityPrice() {
    electricityPrice.innerHTML = '';
    electricityPrice.innerHTML += "\n  <h2> Elpris just nu: ".concat(electricityPrices[2][date.getHours()], " \u00F6re/kWh</h2>\n  ");
    // Här räknas det billigaste priset ut samt vilken timme det är
    for (var i = 0; i < 24; i++) {
        if (Number(electricityPrices[2][i]) < cheapPrice || (typeof cheapPrice === 'undefined')) {
            cheapPrice = Number(electricityPrices[2][i]);
            cheapHour = i;
        }
        averageElectricityPrice += Number(electricityPrices[2][i]);
    }
    averageElectricityPrice /= 24;
    if (Number(electricityPrices[2][date.getHours()]) > averageElectricityPrice) {
        var e = document.querySelector('.electricityPriceBackground');
        e.style.backgroundImage = 'url(../../public/photos/frost.jpg)';
    }
    console.log('detta är medelpriset' + averageElectricityPrice);
}
function displayActivityCost() {
    var sumToPrint = sumNow.toPrecision(4);
    var sumToPrintOneHour = sumOneHour.toPrecision(4);
    var cheapPriceKronor = Number(cheapPrice * 0.01).toPrecision(4);
    nowPrice.innerHTML = '';
    nowPrice.innerHTML += "\n  ".concat(sumToPrint, " SEK\n  ");
    oneHourPrice.innerHTML = '';
    oneHourPrice.innerHTML += "\n  ".concat(sumToPrintOneHour, " SEK\n  ");
    cheapHourTime.innerHTML = '';
    cheapHourTime.innerHTML += "\n  ".concat(cheapHour, " \u00E4r priset\n  ");
    cheapHourPrice.innerHTML = '';
    cheapHourPrice.innerHTML += "\n  ".concat(cheapPriceKronor, " SEK\n  ");
}
function getElectricityAreaPrices(area) {
    // const response = fetch('https://entsoe-cache.plsh.se/SE3.json');
    // electricityPrices = response.json() as string[];
    fetch('https://entsoe-cache.plsh.se/SE3.json')
        .then(function (data) { return data.json(); })
        .then(function (json) {
        console.table(json);
        electricityPrices = json;
        // return electricityPrices[0][20];
        console.log(electricityPrices[0][9]);
        displayElectricityPrice();
    })["catch"](function (err) {
        console.error('Error fetching electricity prices:', err);
    });
}
function getActivityCost(activity) {
    // formel för att omvandla elpriset till motsvarande kostnad för respektive aktivitet
    var activityCost = Number(electricityPrices[2][date.getHours()]);
    var activityCostOneHour = Number(electricityPrices[2][date.getHours() + 1]);
    console.log('activityCost: '.concat(activityCost.toString()));
    if (activity === 'shower') {
        sumNow = activityCost * 0.05; // kostnaden i kronor för aktiviteten
        sumOneHour = activityCostOneHour * 0.05; // kostnaden i kronor för aktiviteten
    }
    if (activity === 'dryer') {
        sumNow = activityCost * 0.05; // kostnaden i kronor för aktiviteten
        sumOneHour = activityCostOneHour * 0.05; // kostnaden i kronor för aktiviteten
    }
    if (activity === 'chargeCar') {
        sumNow = activityCost * 0.1; // kostnaden i kronor för aktiviteten
        sumOneHour = activityCostOneHour * 0.1; // kostnaden i kronor för aktiviteten
    }
    displayActivityCost();
    console.log(sumNow);
    console.log(activity);
}
function chooseElectricityArea(e) {
    /* Här lägger jag in om kunden väljer område ett visas elprisområde ett osv */
    var element = e.currentTarget;
    switch (element.value) {
        case 'electricityArea1':
            getElectricityAreaPrices('SE1');
            break;
        case 'electricityArea2':
            getElectricityAreaPrices('SE2');
            break;
        case 'electricityArea3':
            getElectricityAreaPrices('SE3');
            break;
        case 'electricityArea4':
            getElectricityAreaPrices('SE4');
            break;
        default:
    }
    console.log(chooseElectricityArea);
}
function chooseActivity(e) {
    // Här lägger jag in att kunden kan vlja vilken aktivitet hen vill utföra
    var element = e.currentTarget;
    switch (element.value) {
        case 'shower':
            getActivityCost('shower');
            break;
        case 'dryer':
            getActivityCost('dryer');
            break;
        case 'chargeCar':
            getActivityCost('chargeCar');
            break;
        default:
    }
    console.log(chooseActivity);
}
function initFields() {
    // Function to declare fields
    electricityArea = document.querySelector('.chooseElectricityArea');
    electricityArea.addEventListener('change', chooseElectricityArea);
    electricitySaver = document.querySelector('.chooseSpendingMethod');
    electricitySaver.addEventListener('change', chooseActivity);
}
initFields();
/*
if(elpriset är högre än medel) {
  // Time to freeze!
  let e = document.querySelector(".electricityPriceBackground");
  e.style.backgroundImage = "url(../../public/photos/frost.jpg)";
} */
/*

Plan för elprisappen

Funktioner
- Hämta aktuella elpriser från externt API
- Räkna ut medelpris/dygn aktuellt dygn och säga om priset är högt/lågt i förhållande till det
- Ha ett tema för högt pris och ett för lågt pris
- Visar aktuellt elpris i ett visst område - klart
- En ruta som berättar vad det kostar att ladda bilen/torktumla/något annat som drar mycket el just nu
  och hur mycket du sparar om du väntar till dygnets billigaste timme - 2/3 klart
- En notis som meddelar användaren när det är möjligt att duscha för en viss summa exempelvis

    TODO
    x Göra en wireframe
    x Göra bas-HTML/CSS
    x Leta reda på bilder för olika teman
    x Fundera på vilka funktioner som ska finnas i JS
    * Ta reda på var API för elpriser finns
    * Skriv funktion för att beräkna medelelpris för ett dygn

*/
