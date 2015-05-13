var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var prettyjson = require('prettyjson');
var fs = require("fs");
var queryContext = require('./context_operations/queryContext');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

/* curl variables  */

//var fiwareService = "OpenIoT";


var payload2 = {
	"contextElements": [
        {
            "type": "Room",
            "isPattern": "false",
            "id": "Chocolate Room",
            "attributes": [
              {
                "name": "temperature",
                "type": "float",
                "value": "23"
            },
            {
                "name": "pressure",
                "type": "integer",
                "value": "720"
            },
           {
               "name": "river_level",
               "type": "string",
               "value": "medium"
            },
            {
               "name": "waterfall_speed",
               "type": "float",
               "value": "10"
            }
           ]
       }
   ],
    "updateAction": "UPDATE"
};
   

var payload = {
	"entities": [
    {
        "type": "Room",
        "isPattern": "false",
        "id": "Chocolate Room"
    }
    ]
};
//var ploadString = JSON.stringify(pload);
var payload2String = JSON.stringify(payload2);
var payloadString = JSON.stringify(payload);
/*
var headers = {
  'Content-Type': 'application/json', 
  'Accept': 'application/json',
  'Content-Length': payload.length
};

var options = {
	host: 'localhost',
  	port: '8080',
  	path: '/v1/queryContext',
  	method: 'POST',
  	headers: headers
};


var req = http.request(options, function(res) {
  res.setEncoding('utf-8');
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.on('data', function (data) {
  	console.log(data);
 	fs.writeFile( "entities.json", data);
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

var theJSON = fs.readFileSync('entities.json');
*/
queryContext.getContext(function(result){
	var returnedData = result; 
	console.log(returnedData); 
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(3000, function () {

  console.log('App listening at 3000')

})

module.exports = app;
