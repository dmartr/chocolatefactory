var http = require('http');


exports.subscribeChocolateContext = function(callback){

var payload = {
    "entities": [
        {
            "type": "Room",
            "isPattern": "false",
            "id": "Chocolate Room"
        }
    ],
    "attributes": [
        "temperature",
        "pressure",
        "river_level",
        "waterfall_speed"
    ],
    "reference": "http://138.4.7.25:1028/contextResponse",
    "duration": "P1M",
    "notifyConditions": [
        {
            "type": "ONCHANGE",
            "condValues": [
                "temperature",
                "pressure",
                "river_level",
                "waterfall_speed"

            ]
        }
    ],
    "throttling": "PT5S"
};

var payloadString = JSON.stringify(payload);
  var headers = {
  'Content-Type': 'application/json', 
  'Accept': 'application/json',
  'Content-Length': payloadString.length
};

var options = {
  host: 'localhost',
    port: '8080',
    path: '/v1/subscribeContext',
    method: 'POST',
    headers: headers
};


var req = http.request(options, function(res) {
  res.setEncoding('utf-8');
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.on('data', function (data) {
    console.log(data);
  });

  res.on('end', function() {
    console.log("Reponse end");
  });
});

req.on('error', function(e) {
  console.log('Problem with request');
});

req.write(payloadString);
req.end();

};


exports.subscribeInventingContext = function(callback){

	var payload = {
    "entities": [
        {
            "type": "Room",
            "isPattern": "false",
            "id": "Inventing Room"
        }
    ],
   "attributes": [
        "temperature",
        "pressure",
        "experiments_volatility",
        "chewing_gum_size"
    ],
    "reference": "http://138.4.7.25:1028/contextResponse",
    "duration": "P1M",
    "notifyConditions": [
        {
            "type": "ONCHANGE",
            "condValues": [
                "temperature",
                "pressure",
                "experiments_volatility",
                "chewing_gum_size"
            ]
        }
    ],
    "throttling": "PT5S"
};

  var payloadString = JSON.stringify(payload);

  var headers = {
  'Content-Type': 'application/json', 
  'Accept': 'application/json',
  'Content-Length': payloadString.length
};

var options = {
  host: 'localhost',
    port: '8080',
    path: '/v1/subscribeContext',
    method: 'POST',
    headers: headers
};

var req = http.request(options, function(res) {
  res.setEncoding('utf-8');
  //console.log('STATUS: ' + res.statusCode);
  //console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.on('data', function (data) {
   // console.log(data);
  });

  res.on('end', function() {
    console.log("Subcribed to the Inventing Room context");
  });
});

req.on('error', function(e) {
  console.log('Problem with rhe Inventing Room subscription');
});

req.write(payloadString);
req.end();
};

exports.unsubscribeContext = function(subscriptionID){

	var payload = {

		"subscriptionId": subscriptionID
	};

  var payloadString = JSON.stringify(payload);

  var headers = {
  'Content-Type': 'application/json', 
  'Accept': 'application/json',
  'Content-Length': payloadString.length
	};

var options = {
  host: 'localhost',
    port: '8080',
    path: '/v1/unsubscribeContext',
    method: 'POST',
    headers: headers
};

var req = http.request(options, function(res) {
  res.setEncoding('utf-8');
  //console.log('STATUS: ' + res.statusCode);
  //console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.on('data', function (data) {
   // console.log(data);
  });

  res.on('end', function() {
    console.log("Unsubscribed  from the Inventing Room context with ID: " + subscriptionID);
  });
});

req.on('error', function(e) {
  console.log('Problem with rhe Inventing Room unsubscription');
});

req.write(payloadString);
req.end();
};