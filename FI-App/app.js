const 	express = require('express'),
		nunjucks = require('nunjucks'),
		MongoClient = require('mongodb').MongoClient,
		assert = require('assert'),
		crypto = require('crypto'),
		env = process.env,
		https = require('https'),  
		request = require('request'),
		bodyParser = require('body-parser'),
		cookieParser = require('cookie-parser'),
		playerservice= require('./playerdata/playerservice'),
		authservice= require('./userdata/authservice'),
		userservice= require('./userdata/userservice');
var jwt = require('jwt-express');



var app = express();
//app.set('port', env.PORT || 5000);
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser.json());


app.use(jwt.init('footballiq-secret'));
app.use(express.static('static'));
app.use(authservice);
app.use('/playersercice',jwt.active(),playerservice)
app.use('/userservice',userservice)
app.get('/report',function(req,res){
	 jsreport.render({ 
	       template: { 
	           content: '<h1>Hello {{:foo}}</h1>', 
	           engine: 'jsrender', 
	           recipe: 'phantom-pdf'
	        }, 
	        data: { 
	            foo: "world"
	        }
	    }).then(function(resp) {
	     res.send(resp);
	     console.log(resp.content.toString())
	   });
});
app.get('/home',jwt.active(),function(req,res){
	res.sendfile('home.html');
});
app.get('/logout',function(req,res){
	jwt.clear();
	res.sendfile('static/index.html');
});

app.get('/health',function(req,res){
	console.log('Request Recieved ');
	res.send(200);
});
app.use(function (err, req, res, next) {
	  console.error(err.stack)
	 if (err.name == 'JWTExpressError') {
        // user is unauthorized
        res.status(401).send('You are Unauthorized Login Again Please');
        
    } else {
    	  res.status(500).send('Something broke!');
    }
	
	});

app.listen(env.PORT || 5005 , function () {
	  console.log(`Application worker started...`);
	});

module.exports = app;