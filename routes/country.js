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
function query_db(res, country_name) {
	//query = "select * from Player";
	query = "select count(*) as Num_of_Canadian from Player P where P.Nationality = '" + country_name + "' group by P.Nationality" ;

	connection.query(query, function(err, rows, fields) {
		if (err) console.log(err);
		else {
			output_persons(res, country_name, rows);
		}
	});
}

// ///
// Given a set of query results, output a table
//
// res = HTTP result object sent back to the client
// name = Name to query for
// results = List object of query results
function output_persons(res,country,results) {
	res.render('country.jade',
		   { title: "Number of country in " + country,
		     results: results }
	  );
}

/////
// This is what's called by the main app
exports.do_work = function(req, res){
	query_db(res,req.query.name);
};
