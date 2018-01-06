

var mysql = require('mysql');
NBA = require("nba");
var mongodb = require('mongodb');
var uri = "mongodb://owner:clintonyangyixuan@ds121171.mlab.com:21171/cis550";
var players = NBA.players;
var connection = mysql.createConnection({
	host: "finalprojectcis550.c6wetbpb49dv.us-west-2.rds.amazonaws.com",
	user:'team9',
	password: '#reCheM=6eDr',
	database: 'nbaSQL'});
query = "SELECT * FROM Player";


var postToMongoDb = function(playerdata) {};
//get monthly data and filter it
var playermonthlyData = function(playerId,name,sqlId) {
	
	NBA.stats.playerSplits({PlayerID:playerId,Season:"2016-17"}).then(function(result) {
		var mdata = {"name":name,"sqlID":sqlId,result:result.monthPlayerDashboard};
		//push to mongo
		mongodb.MongoClient.connect(uri, function(err, db) {
  			if(err) throw err;
  			var playerMonthlydata = db.collection('playerMonthlydata');
  			playerMonthlydata.insert(mdata, function(err, result) {
  				if (err) console.log(err);
  				else {
  					console.log(name + "posted to db");
  				}
  				 db.close(function (err) {
              		if(err) throw err;
            	});
  			});

  		});
	  	//console.log(mdata); // "Stuff worked!"
	  	
	}, function(err) {
		  //console.log(err); // Error: "It broke"
	});
	
}


var syncData = function(nameIdMap) {
	for(var i = 0,len = players.length; i < len; i++) {
		//console.log(players[i].playerId);
		var mPlayer = players[i];
		var name = mPlayer.firstName + " " + mPlayer.lastName;
		sqlId = nameIdMap.get(name);
		//if the player is in the sql database then push his details to mongo
		if(sqlId) {
			playermonthlyData(mPlayer.playerId,name,sqlId);
		}
		else {
			console.log(name + " is not in the database!")
		}
		
	}

}


connection.query(query,function(err,rows,fields) {
	var nameIdMap = new Map();
	if(err) console.log(err);
	else {
		for (var i = 0; i< rows.length; i++) {
			nameIdMap.set(rows[i].Name,rows[i].Player_ID);
			//console.log(rows[i].Player_ID + "," + rows[i].Name);
		}
		//create playerMonthlydata once connection returns
		//
		syncData(nameIdMap);
		//console.log(nameIdMap);
		
	}
});
connection.end(function(err) {});

