var http = require('http');

exports.updateContext = function(callback){

	function randomNumber(low, high){
		return Math.random()*(high-low)+low;
	}

	function randomInt(low, high){
		return Math.floor(Math.random() * (high - low)) + low;
	}

	function changelevel(){
		var n = randomInt(0, 2);
		if(n===0){
			return "low";
		} else if(n===1){
			return "medium";
		} else {
			return "high";
		}
	}

	var temperature = randomNumber(20, 30);
	var pressure = randomNumber(725, 7);
	var rlevel = changelevel();
	var wspeed = randomNumber(10, 50);

	var payload = {
	"contextElements": [
        {
            "type": "Room",
            "isPattern": "false",
            "id": "Chocolate Room",
            "attributes": [
              {
                "name": "temperature",
                "type": "float",
                "value": temperature
            },
            {
                "name": "pressure",
                "type": "integer",
                "value": pressure
            },
           {
               "name": "river_level",
               "type": "string",
               "value": rlevel
            },
            {
               "name": "waterfall_speed",
               "type": "float",
               "value": wspeed
            }
           ]
       }
   ],
    "updateAction": "UPDATE"
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
    path: '/v1/updateContext',
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
    console.log("Updated context");
  });
});

req.on('error', function(e) {
  console.log('Problem with request');
});

req.write(payloadString);
req.end();

};
