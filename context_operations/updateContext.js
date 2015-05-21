var http = require('http');

var clientMatrix = {}
clientMatrix.a = {
  a:0.2,
  x:0.3,
  b:1,
};
clientMatrix.b = {
  a:0.3,
  b:0.5,
  c:0.7,
  d:0.8,
  e:1
};
clientMatrix.c = {
  a:0,
  b:0.1,
  c:0.8,
  d:0.9,
  e:1
};
clientMatrix.d = {
  a:0,
  b:0.5,
  c:0.6,
  d:0.7,
  e:0.8,
  f:1
};

clientMatrix.e = {
  a:0,
  c:0.6,
  d:0.7,
  e:0.8,
  f:1
};

clientMatrix.f = {
  e:0.3,
  f:1,
};

exports.updateChocolateRoom = function(callback){
	setInterval(function(){
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

  function movePeople(x){
    var dice = randomInt(0,1);
    if(dice == 0) x+=1;
    else x-=1;
  }

	var temperature = randomNumber(20, 30);
	var pressure = randomNumber(725, 7);
	var rlevel = changelevel();
	var wspeed = randomNumber(10, 50);
  var occupation = 100 - randomInt(0,6);
  console.log(occupation);

	var payload = {
	"contextElements": [
        {
            "type": "Room",
            "isPattern": "false",
            "id": "Chocolate Room",
            "attributes": [
              {
                "name": "Temperature",
                "type": "float",
                "value": temperature
            },
            {
                "name": "Pressure",
                "type": "integer",
                "value": pressure
            },
           {
               "name": "River level",
               "type": "string",
               "value": rlevel
            },
            {
               "name": "Waterfall speed",
               "type": "float",
               "value": wspeed
            },
            {
              "name": "Occupation",
              "type": "integer",
              "value": occupation
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
    console.log("Updated context for Chocolate Room");
  });
});

req.on('error', function(e) {
  console.log('Problem with request in the Chocolate Room');
});

req.write(payloadString);
req.end();
},2000);
};

exports.updateInventingRoom = function(callback){
  setInterval(function(){
  function randomNumber(low, high){
    return Math.random()*(high-low)+low;
  }

  function randomInt(low, high){
    return Math.floor(Math.random() * (high - low)) + low;
  }

  function changeVolatility(){
    var n = randomInt(0, 500);
    if(n > 300){
      return "low";
    } else if(n < 300 && n < 400){
      return "medium";
    } else if(n > 400 && n > 480) {
      return "high";
    } else { 
      return "Max";
    }
  }

  var temperature = randomNumber(20, 30);
  var pressure = randomNumber(725, 7);
  var expVol = changeVolatility();
  var chSz = randomNumber(10, 50);

  var payload = {
  "contextElements": [
        {
            "type": "Room",
            "isPattern": "false",
            "id": "Inventing Room",
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
               "name": "experiments_volatility",
               "type": "string",
               "value": expVol
            },
            {
               "name": "chewing_gum_size",
               "type": "float",
               "value": chSz
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
    console.log("Updated context for Inventing Room");
  });
});

req.on('error', function(e) {
  console.log('Problem with request in the Inventing Room');
});

req.write(payloadString);
req.end();
},2000);
};