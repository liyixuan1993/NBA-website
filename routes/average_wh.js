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
function query_db(res, fullName) {

	query = "select avg(Age) as Avg_age, avg(Height) as Avg_height, avg(Weight) as Avg_weight from Player";
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
	res.render('average_wh.jade',
		   { title: "average age, height, and weight for the players" + fullName,
		     results: results }
	  );
}

/////
// This is what's called by the main app
exports.do_work = function(req, res){
	query_db(res,req.query.name);
};
