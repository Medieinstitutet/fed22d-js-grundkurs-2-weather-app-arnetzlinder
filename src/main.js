var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
/* eslint linebreak-style: ["error", "windows"] */
var electricityPrice = document.querySelector('.electricityPrice');
// let electricityAreaChoice: string;
var electricityArea;
var electricityPrices = [];
function getElectricityAreaPrices(area) {
    // const response = fetch('https://entsoe-cache.plsh.se/SE3.json');
    // electricityPrices = response.json() as string[];
    fetch('https://entsoe-cache.plsh.se/SE3.json')
        .then(function (data) { return data.json(); })
        .then(function (json) {
        console.table(json);
        electricityPrices = json;
    })["catch"](function (err) {
        console.error('Error fetching electricity prices:', err);
    });
}
// Kolla upp hur du gör innerHTML i typescript
function displayElectricityPrice() {
    electricityPrice.innerHTML = '';
    electricityPrice.innerHTML += "\n  <h2> Elpris just nu: ".concat(electricityPrices[0]);
    .2;
}
/h2>(__makeTemplateObject([";\n}\n\nfunction chooseElectricityArea(e: Event) {\n  /* H\u00E4r l\u00E4gger jag in om kunden v\u00E4ljer omr\u00E5de ett visas elprisomr\u00E5de ett osv */\n  const element = e.currentTarget as HTMLSelectElement;\n  switch (element.value) {\n    case 'electricityArea1':\n      electricityPrice = getElectricityAreaPrices('SE1');\n      break;\n    case 'electricityArea2':\n      electricityPrice = getElectricityAreaPrices('SE2');\n      break;\n    case 'electricityArea3':\n      electricityPrice = getElectricityAreaPrices('SE3');\n      break;\n    case 'electricityArea4':\n      electricityPrice = getElectricityAreaPrices('SE4');\n      break;\n    default:\n     // displayElectricityPrice();\n  }\n\n  console.log(chooseElectricityArea);\n}\n\nfunction initFields() {\n// Function to declare fields\n  electricityArea = document.querySelector('.chooseElectricityArea') as Element;\n  electricityArea.addEventListener('change', chooseElectricityArea);\n}\n\ninitFields();\n\n/*\nif(elpriset \u00E4r h\u00F6gre \u00E4n medel) {\n  // Time to freeze!\n  let e = document.querySelector(\".electricityPriceBackground\");\n  e.style.backgroundImage = \"url(../../public/photos/frost.jpg)\";\n} */\n"], [";\n}\n\nfunction chooseElectricityArea(e: Event) {\n  /* H\u00E4r l\u00E4gger jag in om kunden v\u00E4ljer omr\u00E5de ett visas elprisomr\u00E5de ett osv */\n  const element = e.currentTarget as HTMLSelectElement;\n  switch (element.value) {\n    case 'electricityArea1':\n      electricityPrice = getElectricityAreaPrices('SE1');\n      break;\n    case 'electricityArea2':\n      electricityPrice = getElectricityAreaPrices('SE2');\n      break;\n    case 'electricityArea3':\n      electricityPrice = getElectricityAreaPrices('SE3');\n      break;\n    case 'electricityArea4':\n      electricityPrice = getElectricityAreaPrices('SE4');\n      break;\n    default:\n     // displayElectricityPrice();\n  }\n\n  console.log(chooseElectricityArea);\n}\n\nfunction initFields() {\n// Function to declare fields\n  electricityArea = document.querySelector('.chooseElectricityArea') as Element;\n  electricityArea.addEventListener('change', chooseElectricityArea);\n}\n\ninitFields();\n\n/*\nif(elpriset \u00E4r h\u00F6gre \u00E4n medel) {\n  // Time to freeze!\n  let e = document.querySelector(\".electricityPriceBackground\");\n  e.style.backgroundImage = \"url(../../public/photos/frost.jpg)\";\n} */\n"]));
