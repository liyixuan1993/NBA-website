
/*
 * GET home page, which is specified in Jade.
 */

 exports.do_work = function(req, res){
   res.render('team.jade', {
 	  title: "Team info"
   });
 };
