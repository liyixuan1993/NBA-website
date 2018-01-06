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

	query = "select Name from Player where Player_ID=(select MVP_counts.Player_ID from (select M.Player_ID, count(M.Player_ID) num_MVP from MVP M group by M.Player_ID) MVP_counts where MVP_counts.num_MVP = (select max(MVP_max.num_MVP) from (select M.Player_ID, count(M.Player_ID) num_MVP from MVP M group by M.Player_ID) MVP_max))";
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
	res.render('most_mvp.jade',
		   { title: "Player who won most MVP awards since 1980" + fullName,
		     results: results }
	  );
}

/////
// This is what's called by the main app
exports.do_work = function(req, res){
	query_db(res,req.query.name);
};
