var express = require('express'),
	bodyParser = require('body-parser'),
	nunjucks = require('nunjucks'),
	MongoClient = require('mongodb').MongoClient,
	assert = require('assert'),
	UserDAO = require('./userdao').UserDAO,
	request = require('request'),
	ENV = process.env;
var jwt = require('jwt-express');
var router = express.Router();
var uri = ENV.MONGODB_URI || 'mongodb://localhost:27017/playerpre';


router.use(bodyParser.json());
MongoClient.connect(uri, function(err, db) {


	var users = new UserDAO(db);


	router.get("/users", function(req, res) {
		var query ={};
		var sort ={"_id":1};
		users.getPlayer(query,0,100,sort,function(playersdata){
			res.send(playersdata);
		});

	});
	router.post("/login", function(req, res) {
		console.log(req.body);
		
		var query ={username: req.body.uname||'',
				password: req.body.pass||''};
		
		users.getPlayerCountUser(query,function(err,user){
			if(user!=null){
				res.jwt(jwt.create('footballiq-secret',user));
				res.send('Success');
			}
			else{
				res.send("Error");
			}
			});
	
		

	});
	
	router.post("/mydetails",jwt.active(), function(req, res) {
		res.send(req.jwt.payload);
	});
	

	router.post("/register", function(req, res) {
		var query= {};
		query['_id']=req.body.email;
		query['username']=req.body.email;
		query['password']=req.body.pass;
		query['fullname']=req.body.name;
		if(req.body.email==null || req.body.pass==null ||req.body.name==null){
			res.send('ERROR');
		}else if(req.body.email=='' || req.body.pass=='' ||req.body.name==''){
			res.send('ERROR');
		}
		else{
			console.log(query);
			users.savePlayers(query,function(err,d){
				if(err!=null){
					res.send(err);
				}else{
					res.send(d);
				}
				
			});
		}
		
		
	});

});

module.exports = router;