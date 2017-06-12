nsFinal
===
## Environment 
- Ubuntu 16.04LTS(Linux)
- MySQL 5.7.18
- nodejs v4.2.6

## Quick Start
- Start the MySQL server
    `service mysql start`
- Install the dependent modules
    `npm install`
- Start the server 
    `node server.js`
- If you would like to monitor the client-side website, you can open the browser, keying `http://localhost:8080/` in your URL

## Configuration 
- If your MySQL's username, password, database's name are not the same as mine, u need to modify them in the `server.js`
```
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'PASSWORD',
	database: 'sampleDB'
});
```
## Installation
- MySQL server
`sudo apt-get install mysql-server`
- nodejs
`sudo apt-get install nodejs`