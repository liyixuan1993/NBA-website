var mongodb = require('mongodb');
var uri = "mongodb://owner:clintonyangyixuan@ds121171.mlab.com:21171/cis550";

var getTopMonthlyStats = function(stat, month,callback) {
	var sortKey = "result."+stat;
	var matchvar = {"result.groupValue":month};
	var projectvar = {"name":1};
	projectvar[sortKey] = 1;
	var sortvar = {}
	sortvar[sortKey] = -1;

	console.log(sortvar);
	console.log(sortKey);
	mongodb.MongoClient.connect(uri, function(err, db) {
  	if(err) throw err;
  	var col = db.collection("playerMonthlydata");
	col.aggregate([{$unwind:"$result"},
									{$sort:sortvar},
									{$match:matchvar},
									{$limit:10},
									{$project:projectvar}],function(err,result){
										if(err) console.log(err);
										else {
											//console.log(result);
											callback(err,result);
										}
										db.close();
									});

});
};

function output_results(res,stat,results) {
	res.render("monthlyStats.jade",
	 {title: "Person with assists " + fullName,
                      results: results})
}

getTopMonthlyStats("ast","February",function(err,result) {
	console.log(result);
});

exports.do_work = function(req, res){
	console.log(req.params.mtype);
	var mMap = {"ast":"Assist","pts":"points","blk":"Blocks"};
	var localmtype = req.params.mtype;
	var longmtype = mMap[localmtype]
	var mtitle = longmtype +" Leaders for the Month of " + req.query.month;

	getTopMonthlyStats(req.params.mtype,req.query.month,function(err,result) {
		if(err) console.log(err)
		else {
			res.render("monthlyStats.jade",
			{title:mtitle, results:result,mtype:localmtype,colName:longmtype});
		}
	});
	
	
	
	//res.json({"requested":req.params.mtype});
        //query_dbs(res,req.query.name);
};
