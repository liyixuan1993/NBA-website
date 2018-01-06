// Connect string to MySQL
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'finalprojectcis550.c6wetbpb49dv.us-west-2.rds.amazonaws.com',
  user     : 'team9',
  password : '#reCheM=6eDr',
  database : 'nbaSQL'
});



/////
// Query the oracle database, and call output_actors on the results
//
// res = HTTP result object sent back to the client
// name = Name to query for
function query_db(res, fullName, year) {
	query = "select P.* from Player P,PlaysFor F, Season S, Team T where P.Player_ID = F.Player_ID and S.Season_ID = F.Season_ID and T.Team_ID = F.Team_ID and S.Start_Year = " + year + " and T.Name like '%"+fullName+"%'";
  //, (SELECT F.count(*) FROM Friends F WHERE P.login = F.login)
  //A.NF from Person, (select login, count(friend) as NF from Friends F group by login) A where Person.login = A.login";
	//if (fullName) query = query + " WHERE Name='" + fullName + "'";
	connection.query(query, function(err, rows, fields) {
		if (err) console.log(err);
		else {

			output_persons(res, fullName, rows);
		}
	});
}

// ///
// Given a set of query results, output a table
//
// res = HTTP result object sent back to the client
// name = Name to query for
// results = List object of query results
function output_persons(res,fullName,results) {
	res.render('who_in_team.jade',
		   { title: "Players in team of " + fullName,
		     results: results }
	  );
}

/////
// This is what's called by the main app
exports.do_work = function(req1, res){
	query_db(res,req1.query.title, req1.query.name);
};
