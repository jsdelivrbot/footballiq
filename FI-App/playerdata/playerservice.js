var express = require('express'),
	bodyParser = require('body-parser'),
	nunjucks = require('nunjucks'),
	MongoClient = require('mongodb').MongoClient,
	assert = require('assert'),
	PlayerDAO = require('./playerdao').PlayerDAO,
	request = require('request'),
	ENV = process.env;
var router = express.Router();
var uri = ENV.MONGODB_URI || 'mongodb://localhost:27017/playerpre';


router.use(bodyParser.json());
MongoClient.connect(uri, function(err, db) {
console.log(err);

	var players = new PlayerDAO(db);


	router.get("/players", function(req, res) {
		var query ={};
		var sort ={"_id":1};
		players.getPlayerMax(1,function(a){
			res.send(a);
		})
//		/*players.getPlayer(query,0,100,sort,function(playersdata){
//			res.send(playersdata);
//		})*/;
		

	});
	
	router.post('/playerattrupdate',function(req,res){
		console.log(req.body);
		players.findAndUpdate(req.body,function(res){
			
		});
		res.send(req.body);
	})
	
	router.get("/playerupdate",function(req,res){
		players.updatePlayerData();
		res.send();
	});
	router.post("/players", function(req, res) {
		console.log(req.params);
		var query ={};
		var sort ={};
		players.getPlayerCount(req.body.script,function(count){
			sort[req.body.sortCriteria.sorttype]=req.body.sortCriteria.sortorder;
			players.getPlayer(req.body.script,req.body.pageno,50,sort,function(playersdata){
				var resp={
						players :playersdata,
						total:count
				}
				res.send(resp);
			});
		})
		

	});
	router.post("/player/:playerid", function(req, res) {
		console.log(req.body);
		var query ={ _id : req.params.playerid};
		var sort ={ name : 1};
			players.getPlayerOne(query,function(playersdata){
				var resp={
						playerprofile :playersdata
						
				}
				res.send(resp);
			});
		
		

	});

	router.post("/Addplayers", function(req, res) {
		var query= req.body;
		console.log(query);
		players.savePlayers(query,function(d){
			res.send(d);
		});
		
	});

});

module.exports = router;