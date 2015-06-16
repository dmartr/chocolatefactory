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
//IdM requirements 
var OAuth2 = require('./oauth2').OAuth2;
var config = require('./config');

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
var subIds = [null];

//var fiwareService = "OpenIoT";
updateContext.updateChocolateRoom();
updateContext.updateInventingRoom();
updateContext.updateTelevisionRoom();
updateContext.updateHall();
updateContext.updateOffice();
updateContext.updateElevator();

/*
queryContext.getContext(function(result){
	var returnedData = result; 
	//console.log('Return:' + returnedData); 
});
*/

app.post("/contextResponseCR", function(req, resp){
    var theJson = req.body.contextResponses[0].contextElement
    var jsonr = JSON.stringify(theJson);
    subID = req.body.subscriptionId;
   console.log(subID);
    var exist = subIds.indexOf(subID);
        if(exist == -1){
            subIds.push(subID);
           //console.log("Id in");
        }

    for(s in sockets){
        sockets[s].emit('updateCR', theJson);
    }
});

app.post("/contextResponseIR", function(req, resp){
    var theJson = req.body.contextResponses[0].contextElement
    var jsonr = JSON.stringify(theJson);
    subID = req.body.subscriptionId;
    var exist = subIds.indexOf(subID);
    console.log(subID);
        if(exist == -1){
            subIds.push(subID);
          // console.log("Id in");
        }

    for(s in sockets){
        sockets[s].emit('updateIR', theJson);
    }

});

app.post("/contextResponseTR", function(req, resp){
    var theJson = req.body.contextResponses[0].contextElement
    var jsonr = JSON.stringify(theJson);
    subID = req.body.subscriptionId;
    var exist = subIds.indexOf(subID);
    console.log(subID);
        if(exist == -1){
            subIds.push(subID);
           console.log("Id in");
        }

    for(s in sockets){
        sockets[s].emit('updateTR', theJson);
    }

});

app.post("/contextResponseHall", function(req, resp){
    var theJson = req.body.contextResponses[0].contextElement
    var jsonr = JSON.stringify(theJson);
    subID = req.body.subscriptionId;
    var exist = subIds.indexOf(subID);
    console.log(subID);
        if(exist == -1){
            subIds.push(subID);
           console.log("Id in");
        }

    for(s in sockets){
        sockets[s].emit('updateHall', theJson);
    }

});

app.post("/contextResponseOffice", function(req, resp){
    var theJson = req.body.contextResponses[0].contextElement
    var jsonr = JSON.stringify(theJson);
    subID = req.body.subscriptionId;
    var exist = subIds.indexOf(subID);
    console.log(subID);
        if(exist == -1){
            subIds.push(subID);
           console.log("Id in");
        }

    for(s in sockets){
        sockets[s].emit('updateOffice', theJson);
    }

});

app.post("/contextResponseElevator", function(req, resp){
    var theJson = req.body.contextResponses[0].contextElement
    var jsonr = JSON.stringify(theJson);
    subID = req.body.subscriptionId;
    var exist = subIds.indexOf(subID);
    console.log(subID);
        if(exist == -1){
            subIds.push(subID);
           console.log("Id in");
        }

    for(s in sockets){
        sockets[s].emit('updateElevator', theJson);
    }

});
    
app.get('/', function (req, res) {    
    res.render('login');
   
});

app.get('/rooms', function(req, res){
    if(subIds.length > 0){
         for(id in subIds){
            subscriptions.unsubscribeContext(subIds[id]);
            subIds.splice(id, 1);
            console.log("Id out");
         }
    }
    subscriptions.subscribeChocolateContext();
    subscriptions.subscribeTelevisionContext();
    subscriptions.subscribeHallContext();
    subscriptions.subscribeOfficeContext();
    subscriptions.subscribeElevatorContext();
    subscriptions.subscribeInventingContext();
    res.render('roomMap');
})
/*
app.post('/unsubscribe', function(req, res){
    console.log(subID);
   
});
*/
/*
for(s in sockets){
    
     sockets[s].on('subscribe', function(data){
        subcriptions.subscribeInventingContext();

    });
}
*/

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
        if(subIds.length > 0){
            for(id in subIds){
                subscriptions.unsubscribeContext(subIds[id]);
                subIds.splice(id, 0);
                console.log("id out");
            }
        }
         subscriptions.subscribeChocolateContext();
    }); 

    socket.on('subinventing', function(data){
        if(subIds.length > 0){
            for(id in subIds){
                subscriptions.unsubscribeContext(subIds[id]);
                subIds.splice(id, 0);
                console.log("id out");
            }
        }
         subscriptions.subscribeInventingContext();   
    });

    socket.on('subtelevision', function(data){
        if(subIds.length > 0){
            for(id in subIds){
                subscriptions.unsubscribeContext(subIds[id]);
                subIds.splice(id, 0);
                console.log("id out");
            }
        }
         subscriptions.subscribeTelevisionContext();   
    });
});

module.exports = app;
