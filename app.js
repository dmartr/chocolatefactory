var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http').Server(app);

var prettyjson = require('prettyjson');
var fs = require("fs");
var updateContext = require('./context_operations/updateContext');
var queryContext = require('./context_operations/queryContext');
var subscriptions = require('./context_operations/subscription');
var routes = require('./routes/index');
//var users = require('./routes/users');

var app = express();
var sockets = [];
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

//app.use('/', routes);
//app.use('/users', users);

/* ContextBroker variables  */
var subID; 

//var fiwareService = "OpenIoT";
updateContext.updateChocolateRoom();
updateContext.updateInventingRoom();

/*
queryContext.getContext(function(result){
	var returnedData = result; 
	//console.log('Return:' + returnedData); 
});
*/


app.post("/contextResponse", function(req, resp){
    var theJson = req.body.contextResponses[0].contextElement
    var jsonr = JSON.stringify(theJson);
    subID = req.body.subscriptionId;
    //io.emit("update", jsonr);
    //console.log(jsonr);
    console.log(subID);
    for(s in sockets){
        sockets[s].emit('update', theJson);
    }

});

    
app.get('/', function (req, res) {    
    res.render('index');
   
});
/*
app.post('/unsubscribe', function(req, res){
    console.log(subID);
   
});
*/

for(s in sockets){
    
     sockets[s].on('subscribe', function(data){
        subcriptions.subscribeInventingContext();
    });
}


// catch 404 and forward to error handler
/*
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
/*
// error handlers

// development error handler
// will print stacktrace
/*
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
*/


// production error handler
// no stacktraces leaked to user
/* app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
*/

var server = app.listen(1028, function () {
  console.log('App listening at 1028');
});

var io = require('socket.io').listen(server);

io.on("connection", function(socket){
    sockets.push(socket);
    socket.on('subchocolate', function(data){
    if(subID!=undefined) subscriptions.unsubscribeContext(subID);
        subscriptions.subscribeChocolateContext();
    }); 
    socket.on('subinventing', function(data){
    if(subID!=undefined) subscriptions.unsubscribeContext(subID);
        subscriptions.subscribeInventingContext();   
    });
});

module.exports = app;
