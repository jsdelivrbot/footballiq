var MongoClient = require('mongodb').MongoClient,
assert = require('assert');

function UserDAO(database){
	
	this.db= database;

	this.getPlayer=function(query,page,itemsPerpage,sort,callback){
		var skip=(page-1)*itemsPerpage;
		var pageItems=[];
		
		var docs = this.db.collection('user').find(query);
		docs.skip(skip);
		docs.limit(itemsPerpage);
		docs.sort(sort);
		docs.toArray(function(err,players){
		
if(players.length>0){
			players.forEach( function(doc){
				var pageItem = doc;
				pageItems.push(pageItem)
				//console.log(pageItem);
			});
}
			callback(pageItems);

		});

	};
	
	this.getPlayerCount=function(query,callback){
		console.log('count :'+query.uname +query.pass);
		this.db.collection('user').count(query,function(err,count){
			
			console.log('count :'+count);
			callback(count);
		});
		
	}
	this.getPlayerCountUser=function(query,callback){
		console.log('count :'+query.username +query.password);
		var docs = this.db.collection('user').find(query);
		docs.toArray(function(err,user){
			if(err!=null){
				console.log('ERROR :'+err);
				callback(err,null);
			}else if(user!=null && user!=''){
				console.log('count :'+user);
				callback(null,user);
			}else{
				callback('ERROR',null);
			}
			
		
		});
	}
	
	this.savePlayers=function(query,callback){
		
		this.db.collection('user').insert(query,function(err,docs){
			if(err==null){
				callback(null,'SUCCESS');
			}
			else{
				callback('DupError',null);
			}
			
		});
		
		

	}

}

module.exports.UserDAO = UserDAO;