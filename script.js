const fs = require("fs");
const http = require("http");
let filenames = [
  "employees1.json",
  "employees2.json",
  "employees3.json",
  "employees4.json",
  "employees5.json",
  "employees6.json",
  "employees7.json",
];

//read files
let totalData = filenames.map((filename) => {
  let data = fs.readFileSync(filename, "utf-8");
  return JSON.parse(data);
});
//combine all the data of the json files
let combineData = [
  ...totalData[0],
  ...totalData[1],
  ...totalData[2],
  ...totalData[3],
  ...totalData[4],
  ...totalData[5],
  ...totalData[6],
];
//make a single file for the combined data
combineDataString = JSON.stringify(combineData);
fs.writeFileSync("combined.json", combineDataString);

//make the files for different class ip addresses
fs.writeFileSync("classA.txt", "");
fs.writeFileSync("classB.txt", "");
fs.writeFileSync("classC.txt", "");
fs.writeFileSync("classD.txt", "");
fs.writeFileSync("classE.txt", "");
//write data to files based on the class
for (let data of combineData) {
  let octects = data.ipAddress.split(".");
  firstOctect = parseInt(octects[0]);
  let object = JSON.stringify(data);
  if (firstOctect >= 0 && firstOctect <= 126) {
    fs.appendFileSync("classA.txt", `${object} \n`);
  }
  if (firstOctect >= 128 && firstOctect <= 191) {
    fs.appendFileSync("classB.txt", `${object} \n`);
  }
  if (firstOctect >= 192 && firstOctect <= 223) {
    fs.appendFileSync("classC.txt", `${object} \n`);
  }
  if (firstOctect >= 224 && firstOctect <= 239) {
    fs.appendFileSync("classD.txt", `${object} \n`);
  }
  if (firstOctect >= 240 && firstOctect <= 255) {
    fs.appendFileSync("classE.txt", `${object} \n`);
  }
}
// //create server and routes
http
  .createServer((request, response) => {
    if (request.url === "favicon/icon") return response.end();
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
