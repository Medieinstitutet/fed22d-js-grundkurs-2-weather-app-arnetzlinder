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

function displayElectricityPrice() {
  electricityPrice.innerHTML = '';
  electricityPrice.innerHTML += `
  <h2> Elpris just nu: ${electricityPrices[2][date.getHours()]} öre/kWh</h2>
  `;
}

/* function displayActivityCost() {
  nowPrice.innerHTML = '';
  nowPrice.innerHTML += `
  `;
} */

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
  // formel för att omvandla elpriset till motsvarande kostnad
  const activityCost = Number('electricityPrices[2][date.getHours()]');
  // const activityCostHour =
  // const aktivityCostCheapHour =
  if (activity === 'shower') {
    sum = activityCost * 5;
  }
  if (activity === 'dryer') {
    sum = activityCost * 5;
  }
  if (activity === 'chargeCar') {
    sum = activityCost * 10;
  }
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
      getActivityCost();
      break;
    case 'dryer':
      getActivityCost();
      break;
    case 'chargeCar':
      getActivityCost();
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
