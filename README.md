🧠 Employee Data Processor & IP Classifier

This Node.js application processes employee data from multiple JSON files, categorizes them based on IP address classes (A-E), and serves them via a basic HTTP server.

It also includes utilities to:

Insert new employees

Update existing records

Remove specific IP class data

Return filtered data
🚀 How It Works

Combines Multiple JSON Files
Loads data from 7 employees\*.json files and merges them into a single array in combined.json.

Classifies IP Addresses
Based on the first octet of each IP address, data is categorized into:

Class A: 0–126

Class B: 128–191

Class C: 192–223

Class D: 224–239

Class E: 240–255
Each class is saved to its own .txt file.

Creates an HTTP Server
Run the server on port 8080
Supports Extra Features

Remove Class E employees

Update department of Class D employees

Insert new employees from addedEmployees.json

Return Class C employee data (for internal use)
