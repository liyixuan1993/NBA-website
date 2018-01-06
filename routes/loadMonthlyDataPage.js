/*
 * GET home page, which is specified in Jade.
 */

exports.do_work = function(req, res){
  res.render('playerMonthlyStats.jade', {
          months: ["October","November","December","January","February","March","April","May","June"]
  }); 
};