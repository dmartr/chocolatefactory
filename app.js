var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var prettyjson = require('prettyjson');
var fs = require("fs");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var updateContext = require('./context_operations/updateContext');
var queryContext = require('./context_operations/queryContext');
var subscriptions = require('./context_operations/subscription');


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
app.use(session({
    secret: "skjghskdjfhbqigohqdiouk"
}));
//app.use('/', routes);
//app.use('/users', users);

/* ContextBroker variables  */
var subID; 
var subIds = [null];

// Config data from config.js file
var client_id = config.client_id;
var client_secret = config.client_secret;
var idmURL = config.idmURL;
var callbackURL = config.callbackURL;

// Creates oauth library object with the config data
var oa = new OAuth2(client_id,
                    client_secret,
                    idmURL,
                    '/oauth2/authorize',
                    '/oauth2/token',
                    callbackURL);

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
   if(!req.session.access_token) {
        res.render('login');
    //If auth_token is stored in a session cookie it sends a button to get user info
    } else {
        res.redirect("/index");
        console.log(req.session.access_token);
    }
});

app.get('/index', function(req, res) {
     var url = config.idmURL + '/user/';
     //res.render('index');
      oa.get(url, req.session.access_token, function (e, response) {
        var user = JSON.parse(response);
        //console.log(user); 
        //res.send("Welcome " + user.displayName + "<br> Your email address is " + user.email + " and your role " + user.roles[0].name + " <br><br><button onclick='window.location.href=\"/logout\"'>Log out</button>");
     if(user.roles[0].name == "Factory Owner"){
     	res.redirect('/admin-menu');
     } else if(user.roles[0].name == "Television Room Oompa Loompa") {
     	res.redirect('/televisionroom')
     } else if(user.roles[0].name == "Chocolate Room Oompa Loompa") {
     	res.redirect('/chocolateroom')
     } else if(user.roles[0].name == "Inventing Room Oompa Loompa") {
     	res.redirect('/inventingroom');
     }
    });
})

app.get('/login', function(req, res){
    // Using the access code goes again to the IDM to obtain the access_token
    oa.getOAuthAccessToken(req.query.code, function (e, results){
        // Stores the access_token in a session cookie
        req.session.access_token = results.access_token;
        res.redirect('/index');
    });
});

app.get('/auth', function(req, res){
    var path = oa.getAuthorizeUrl();
    res.redirect(path);
});

app.get('/logout', function(req, res){
    var url = config.idmURL + '/auth/logout';
    req.session.access_token = undefined;  
    var request = new XMLHttpRequest();
    request.open("POST", url, true);
    res.redirect('/');
});

app.get('/admin-map', function(req, res){
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

app.get('/admin-menu', function(req, res){
    res.render('adminMenu');
});

app.get('/admin-rooms', function(req, res){
    if(subIds.length > 0){
         for(id in subIds){
            subscriptions.unsubscribeContext(subIds[id]);
            subIds.splice(id, 1);
            console.log("Id out");
         }
    }
    subscriptions.subscribeChocolateContext();
    res.render('roomsAdmin');
});

app.get('/televisionroom', function(req, res){
    res.render('televisionRoom');
});

app.get('/inventingroom', function(req, res){
    res.render('inventingRoom');
});

app.get('/chocolateroom', function(req, res){
    res.render('chocolateRoom');
});

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
