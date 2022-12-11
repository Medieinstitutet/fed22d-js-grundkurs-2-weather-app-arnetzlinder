// import './style/style.scss';
// export {};
/* eslint linebreak-style: ["error", "windows"] */
var electricityPrice;
var electricityAreaChoice;
var electricityArea;
function getElectricityAreaPrices(area) {
    fetch('https://entsoe-cache.plsh.se/SE3.json')
        .then(function (data) { return data.json(); })
        .then(function (json) {
        console.table(json);
    })["catch"](function (err) {
        console.error('Error fetching electricity prices:', err);
    });
}
function chooseElectricityArea(e) {
    /* Här lägger jag in om kunden väljer område ett visas elprisområde ett osv */
    var element = e.currentTarget;
    switch (element.value) {
        case 'electricityArea1':
            electricityPrice = getElectricityAreaPrices('SE1');
            break;
        case 'electricityArea2':
            electricityPrice = getElectricityAreaPrices('SE2');
            break;
        case 'electricityArea3':
            electricityPrice = getElectricityAreaPrices('SE3');
            break;
        case 'electricityArea4':
            electricityPrice = getElectricityAreaPrices('SE4');
            break;
        default:
    }
    console.log(chooseElectricityArea);
}
function initFields() {
    // Function to declare fields
    electricityArea = document.querySelector('.chooseElectricityArea');
    electricityArea.addEventListener('change', chooseElectricityArea);
}
initFields();
/*
if(elpriset är högre än medel) {
  // Time to freeze!
  let e = document.querySelector(".electricityPrice::before");
  e.style.backgroundImage = "url(../../public/photos/frost.jpg)";
} */
