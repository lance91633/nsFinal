var http = require('http');
var express = require('express');
var app = express();
var htt = require('http').Server(app);
var io = require('socket.io')(htt);
var nodeadmin = require('nodeadmin');
app.use(nodeadmin(app));
//Load MySQL
var mysql = require('mysql');
//Establish the mysql server 
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'caslab92617',
	database: 'sampleDB',
	multipleStatements: true
});

connection.connect(function (error) {
	if (error) {
		console.log('Error');
	} else {
		console.log('SQL Connected');
	}
});


io.on('connection', function (socket) {
	console.log('socket io is ready');
	/* ===BEGIN===  Socket handler for login.html ===BEGIN=== */
	socket.on('loginHandler', function (data) {
		console.log('username = ' + data.username);
		var pass = '\'' + data.password + '\'';
		var account = '\'' + data.username + '\'';

		connection.query('SELECT * FROM users WHERE username = ' + account, function (err, results) {
			if (err) {
				socket.emit('loginReturn', 'badError');
			}
			else {
				if (results[0] == undefined) {
					socket.emit('loginReturn', 'userError');
				} else {
					if (results[0].password.toString() == data.password.toString()) {
						console.log('correct');
						socket.emit('loginReturn', 'correct');
					} else {
						console.log('error, password = ' + data.password);
						socket.emit('loginReturn', 'passError');
					}
				}
			}
		});
	});
	/*	===END=== Socket handler for login.html ===END=== */
	
});

app.use(express.static(__dirname + '/public'));

app.get('/', function (request, response) {
	response.sendfile('public/login.html');
});

app.get('/ticket', function (req, res) {
	res.sendfile('public/loginPage.html');
});

htt.listen(8080);
