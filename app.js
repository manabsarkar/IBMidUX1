/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// Manabs code starts from here
var https = require('https');
console.log("MANAB");
app.get('/manab', function (req, res) {

	var options = {
		host : 'api.github.com',
		path : '/users/manabsarkar/repos',
		headers : {
			'User-Agent' : 'request'
		}

	};

	var reposData = '';

	https.get(options, function (resp) {
		console.log("Received response: " + res.statusCode);
		console.log("Got response: " + res.statusCode);
		console.log("RESPONSE1 : " + res.headers);
		console.log("RESPONSE2 : " + res.httpVersion);
		console.log("RESPONSE3 : " + res.headers);
		resp.on('data', function (chunk) {

			reposData += chunk;
			console.log('BODY: ' + chunk);
			
				res.send('<H1>Hello</H1> MANAB GITHUB REPOS!!! <p>' + reposData + '</p>');

		});
		
	}).on('error', function (e) {
		console.log("Got error: " + e.message);
	});
	


});

//Manab code ends here

// start server on the specified port and binding host
app.listen(appEnv.port, function () {

	// print a message when the server starts listening
	console.log("server starting on " + appEnv.url);
});
