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
	query = "select P.Name, S.Start_Year from MVP M natural join Player P natural join Season S";
    if (fullName) query = query + " where S.Start_Year = "+fullName+"";
	connection.query(query, function(err, rows, fields) {
		if (err) console.log(err);
		else {

			output_personss(res, fullName, rows);
		}
	});
}

// ///
// Given a set of query results, output a table
//
// res = HTTP result object sent back to the client
// name = Name to query for
// results = List object of query results
function output_personss(res,fullName,results) {
	res.render('mvp_season.jade',
		   { title: "MVP in " + fullName,
		     results: results }
	  );
}

/////
// This is what's called by the main app
exports.do_work = function(req, res){
	query_db(res,req.query.name);
};
