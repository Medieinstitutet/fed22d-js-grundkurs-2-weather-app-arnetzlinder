/* eslint linebreak-style: ["error", "windows"] */
var electricityPrice = document.querySelector('.electricityPrice');
// let electricityAreaChoice: string;
var electricityArea;
var electricitySaver;
var electricityPrices = [];
var date = new Date();
var time;
function displayElectricityPrice() {
    electricityPrice.innerHTML = '';
    electricityPrice.innerHTML += "\n  <h2> Elpris just nu: ".concat(electricityPrices[2][date.getHours()], " \u00F6re/kWh</h2>\n  ");
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
function getActivityCost() {
    // formel för att omvandla elpriset till motsvarande kostnad
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
            getActivityCost('#');
            break;
        case 'dryer':
            getActivityCost('#');
            break;
        case 'chargeCar':
            getActivityCost('#');
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
    electricitySaver.addEventListener('change', getActivityCost);
}
initFields();
/*
if(elpriset är högre än medel) {
  // Time to freeze!
  let e = document.querySelector(".electricityPriceBackground");
  e.style.backgroundImage = "url(../../public/photos/frost.jpg)";
} */
