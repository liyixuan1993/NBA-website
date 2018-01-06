
/*
 * GET home page, which is specified in Jade.
 */

exports.do_work = function(req, res){
  res.render('player.jade', {
	  title: "welcome to yang's page"
  });
};
