/* eslint linebreak-style: ["error", "windows"] */
const electricityPrice: HTMLElement = document.querySelector('.electricityPrice') as HTMLElement;
const nowPrice: HTMLElement = document.querySelector('.now') as HTMLElement;
const oneHourPrice: HTMLElement = document.querySelector('.oneHour') as HTMLElement;
const cheapHourPrice: HTMLElement = document.querySelector('.cheapHour') as HTMLElement;
// let electricityAreaChoice: string;
let electricityArea: Element | null;
let electricitySaver: Element | null;
let electricityPrices: string[] = [];
const date = new Date();
let time: number;
let sum: number;
let sum1: number;

function displayElectricityPrice() {
  electricityPrice.innerHTML = '';
  electricityPrice.innerHTML += `
  <h2> Elpris just nu: ${electricityPrices[2][date.getHours()]} öre/kWh</h2>
  `;
}

function displayActivityCost() {
  nowPrice.innerHTML = '';
  nowPrice.innerHTML += `
  ${sum} SEK
  `;
  oneHourPrice.innerHTML = '';
  oneHourPrice.innerHTML += `
  ${sum1} SEK
  `;
}

function getElectricityAreaPrices(area: string) {
  // const response = fetch('https://entsoe-cache.plsh.se/SE3.json');
  // electricityPrices = response.json() as string[];

  fetch('https://entsoe-cache.plsh.se/SE3.json')
    .then((data) => data.json())
    .then((json) => {
      console.table(json);
      electricityPrices = json as string[];
      // return electricityPrices[0][20];
      console.log(electricityPrices[0][9]);
      displayElectricityPrice();
    })
    .catch((err) => {
      console.error('Error fetching electricity prices:', err);
    });
}

function getActivityCost(activity: string) {
  // formel för att omvandla elpriset till motsvarande kostnad för respektive aktivitet
  const activityCost = Number(electricityPrices[2][date.getHours()]);
  const activityCostOneHour = Number(electricityPrices[2][date.getHours() + 1]);
  console.log('activityCost: '.concat(activityCost.toString()));
  if (activity === 'shower') {
    sum = activityCost * 0.05; // kostnaden i kronor för aktiviteten
    sum1 = activityCostOneHour * 0.05; // kostnaden i kronor för aktiviteten
  }
  if (activity === 'dryer') {
    sum = activityCost * 0.05; // kostnaden i kronor för aktiviteten
    sum1 = activityCostOneHour * 0.05; // kostnaden i kronor för aktiviteten
  }
  if (activity === 'chargeCar') {
    sum = activityCost * 0.1; // kostnaden i kronor för aktiviteten
    sum1 = activityCostOneHour * 0.1; // kostnaden i kronor för aktiviteten
  }
  displayActivityCost();
  console.log(sum);
  console.log(activity);
}

function chooseElectricityArea(e: Event) {
  /* Här lägger jag in om kunden väljer område ett visas elprisområde ett osv */
  const element = e.currentTarget as HTMLSelectElement;
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

function chooseActivity(e: Event) {
  // Här lägger jag in att kunden kan vlja vilken aktivitet hen vill utföra
  const element = e.currentTarget as HTMLSelectElement;
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
  electricityArea = document.querySelector('.chooseElectricityArea') as Element;
  electricityArea.addEventListener('change', chooseElectricityArea);
  electricitySaver = document.querySelector('.chooseSpendingMethod') as Element;
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
