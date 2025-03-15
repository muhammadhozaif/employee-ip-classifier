const fs = require("fs");
const http = require("http");
const { json } = require("stream/consumers");

let filenames = [
  "employees1.json",
  "employees2.json",
  "employees3.json",
  "employees4.json",
  "employees5.json",
  "employees6.json",
  "employees7.json",
];

let totalData = filenames.map((filename) => {
  let data = fs.readFileSync(filename, "utf-8");
  return JSON.parse(data);
});

// Combine all the data of the JSON files
let combineData = [
  ...totalData[0],
  ...totalData[1],
  ...totalData[2],
  ...totalData[3],
  ...totalData[4],
  ...totalData[5],
  ...totalData[6],
];

// Make a single file for the combined data
let combineDataString = JSON.stringify(combineData);
fs.writeFileSync("combined.json", combineDataString);

// Prepare the arrays for different class IP addresses
let classAData = [];
let classBData = [];
let classCData = [];
let classDData = [];
let classEData = [];

// Write data to the respective class arrays based on the IP address class
for (let data of combineData) {
  let octects = data.ipAddress.split(".");
  let firstOctect = parseInt(octects[0]);
  let object = JSON.stringify(data);

  if (firstOctect >= 0 && firstOctect <= 126) {
    classAData.push(object);
  }
  if (firstOctect >= 128 && firstOctect <= 191) {
    classBData.push(object);
  }
  if (firstOctect >= 192 && firstOctect <= 223) {
    classCData.push(object);
  }
  if (firstOctect >= 224 && firstOctect <= 239) {
    classDData.push(object);
  }
  if (firstOctect >= 240 && firstOctect <= 255) {
    classEData.push(object);
  }
}

fs.writeFileSync("classA.txt", classAData.join("\n"));
fs.writeFileSync("classB.txt", classBData.join("\n"));
fs.writeFileSync("classC.txt", classCData.join("\n"));
fs.writeFileSync("classD.txt", classDData.join("\n"));
fs.writeFileSync("classE.txt", classEData.join("\n"));

// Create server and routes
http
  .createServer((request, response) => {
    if (request.url === "/favicon.ico") return response.end();
    else if (request.url === "/api/employees/classA") {
      classA = fs.readFileSync("classA.txt", "utf-8");
      response.end(classA);
    } else if (request.url === "/api/employees/classB") {
      classB = fs.readFileSync("classB.txt", "utf-8");
      response.end(classB);
    } else if (request.url === "/api/employees/classC") {
      classC = fs.readFileSync("classC.txt", "utf-8");
      response.end(classC);
    } else if (request.url === "/api/employees/classD") {
      classD = fs.readFileSync("classD.txt", "utf-8");
      response.end(classD);
    } else if (request.url === "/api/employees/classE") {
      classE = fs.readFileSync("classE.txt", "utf-8");
      response.end(classE);
    } else {
      response.end("invalid");
    }
  })
  .listen(8080, () => {
    console.log("listening on port 8080");
  });

// Part2: Remove class E employees
function removeEClassEmployees() {
  let totalCombinedData = fs.readFileSync("combined.json", "utf-8");
  let parsedTotalCombinedData = JSON.parse(totalCombinedData);
  let filteredEClass = parsedTotalCombinedData.filter((data) => {
    let octects = data.ipAddress.split(".");
    let firstOctect = parseInt(octects[0]);
    return !(firstOctect >= 240 && firstOctect <= 255);
  });
  let filteredEClassString = JSON.stringify(filteredEClass);
  fs.writeFileSync("combined.json", filteredEClassString);
}
//update class D employees
function updateClassDEmployees() {
  let totalCombinedData = fs.readFileSync("combined.json", "utf-8");
  let parsedTotalCombinedData = JSON.parse(totalCombinedData);

  for (let data of parsedTotalCombinedData) {
    let octects = data.ipAddress.split(".");
    let firstOctect = parseInt(octects[0]);
    if (firstOctect >= 224 && firstOctect <= 239) {
      data.department = "XYZ CORP";
    }
  }
  let parsedTotalCombinedDataString = JSON.stringify(parsedTotalCombinedData);
  fs.writeFileSync("combined.json", parsedTotalCombinedDataString);
}
// insert new employees
function insertNewEmployees() {
  let data = fs.readFileSync("addedEmployees.json", "utf-8");
  let data2 = fs.readFileSync("combined.json", "utf-8");
  let jsondata = JSON.parse(data);
  let jsondata2 = JSON.parse(data2);
  let data3 = [...jsondata2, ...jsondata];
  let stringversion = JSON.stringify(data3);
  fs.writeFileSync("combined.json", stringversion);
}
// return class C employees
function returnClassCEmployees() {
  let data = fs.readFileSync("combined.json", "utf-8");
  let jsonData = JSON.parse(data);
  let CClass = jsonData.filter((data) => {
    octects = data.ipAddress.split(".");
    firstOctect = parseInt(octects[0]);
    return firstOctect >= 192 && firstOctect <= 223;
  });
}
// let cClass = returnClassCEmployees();
// console.log(cClass);
removeEClassEmployees();
