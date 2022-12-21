/* eslint linebreak-style: ["error", "windows"] */
const electricityPrice: HTMLElement = document.querySelector('.electricityPrice') as HTMLElement;
const nowPrice: HTMLElement = document.querySelector('.now') as HTMLElement;
const oneHourPrice: HTMLElement = document.querySelector('.oneHour') as HTMLElement;
const cheapHourTime: HTMLElement = document.querySelector('.cheapHour') as HTMLElement;
const cheapHourPrice: HTMLElement = document.querySelector('.cheapPrice') as HTMLElement;
// let electricityAreaChoice: string;
let electricityArea: Element | null;
let electricitySaver: Element | null;
let electricityPrices: string[] = [];
const date = new Date();
let cheapHour: number;
let cheapPrice: number;
let sumNow: number;
let sumOneHour: number;
let sumCheapHour: number;
let averageElectricityPrice = 0;

function displayElectricityPrice() {
  electricityPrice.innerHTML = '';
  electricityPrice.innerHTML += `
  <h2> Elpris just nu: ${electricityPrices[2][date.getHours()]} öre/kWh</h2>
  `;
  // Här räknas det billigaste priset ut samt vilken timme det är
  for (let i = 0; i < 24; i++) {
    if (Number(electricityPrices[2][i]) < cheapPrice || (typeof cheapPrice === 'undefined')) {
      cheapPrice = Number(electricityPrices[2][i]);
      cheapHour = i;
    }
    averageElectricityPrice += Number(electricityPrices[2][i]);
  }
  averageElectricityPrice /= 24;
  if (Number(electricityPrices[2][date.getHours()]) > averageElectricityPrice) {
    const e: HTMLElement = document.querySelector('.electricityPriceBackground') as HTMLElement;
    e.style.backgroundImage = 'url(../../public/photos/frost.jpg)';
    e.style.opacity = '0.7';
    document.body.classList.add('highPrice');
  }
}

function displayActivityCost() {
  const sumToPrint = sumNow.toPrecision(4);
  const sumToPrintOneHour = sumOneHour.toPrecision(4);
  const sumToPrintCheapHour = sumCheapHour.toPrecision(4);
  nowPrice.innerHTML = '';
  nowPrice.innerHTML += `
  ${sumToPrint} SEK
  `;
  oneHourPrice.innerHTML = '';
  oneHourPrice.innerHTML += `
  ${sumToPrintOneHour} SEK
  `;
  cheapHourTime.innerHTML = '';
  cheapHourTime.innerHTML += `
  ${cheapHour} är priset
  `;
  cheapHourPrice.innerHTML = '';
  cheapHourPrice.innerHTML += `
  ${sumToPrintCheapHour} SEK
  `;
}

function getElectricityAreaPrices(area: string) {
  // const response = fetch('https://entsoe-cache.plsh.se/SE3.json');
  // electricityPrices = response.json() as string[];

  fetch('https://entsoe-cache.plsh.se/'.concat(area, '.json'), { cache: 'no-cache' })
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
  const activityCostCheapHour = Number(electricityPrices[2][cheapHour]);
  console.log('activityCost: '.concat(activityCost.toString()));
  if (activity === 'shower') {
    sumNow = activityCost * 0.05; // kostnaden i kronor för aktiviteten
    sumOneHour = activityCostOneHour * 0.05; // kostnaden i kronor för aktiviteten
    sumCheapHour = activityCostCheapHour * 0.05; // kostnaden för aktiviteten i kronor
  }
  if (activity === 'dryer') {
    sumNow = activityCost * 0.05; // kostnaden i kronor för aktiviteten
    sumOneHour = activityCostOneHour * 0.05; // kostnaden i kronor för aktiviteten
    sumCheapHour = activityCostCheapHour * 0.05; // kostnaden för aktiviteten i kronor
  }
  if (activity === 'chargeCar') {
    sumNow = activityCost * 0.1; // kostnaden i kronor för aktiviteten
    sumOneHour = activityCostOneHour * 0.1; // kostnaden i kronor för aktiviteten
    sumCheapHour = activityCostCheapHour * 0.1; // kostnaden för aktiviteten i kronor
  }
  displayActivityCost();
  console.log(sumNow);
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
    x Skriv funktion för att beräkna medelelpris för ett dygn

*/
