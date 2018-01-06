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

	query = "select T.Name, TP.Win_percent from TeamPerformance TP natural join Team T natural join Season S where S.Start_Year = " + fullName + " and TP.Win_percent = (select max(TPS.Win_percent) from(select Win_percent from TeamPerformance natural join Season where Season.Start_Year =" + fullName + ") TPS)";

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
	res.render('win_percent.jade',
		   { title: "highest win_percent in " + fullName,
		     results: results }
	  );
}

/////
// This is what's called by the main app
exports.do_work = function(req1, res){
	query_db(res,req1.query.title);
};
