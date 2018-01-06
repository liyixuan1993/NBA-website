/**
 * Simple Homework 2 application for CIS 550
 */

/**
 * Module dependencies.
 */
var express = require('express')
  , routes = require('./routes')
  , person = require('./routes/person')
  , country = require('./routes/country')
  , mvp_season = require('./routes/mvp_season')
  , mvp_times = require('./routes/mvp_times')
  , highest = require('./routes/highest')
  , coach = require('./routes/coach')
  , champion = require('./routes/champion')
  , final_game = require('./routes/final_game')
  , win_percent = require('./routes/win_percent')
  , most_mvp = require('./routes/most_mvp')
  , who_in_team = require('./routes/who_in_team')
  , average_wh = require('./routes/average_wh')
  , assists = require('./routes/assists')
  , stl = require('./routes/stl')
  , reb = require('./routes/reb')
  , three_pointer = require('./routes/three_pointer')
  , most_in_team = require('./routes/most_in_team')
  , pts = require('./routes/pts')
  , team = require('./routes/team')
  , player = require('./routes/player')
  , loadMonthlyDataPage = require('./routes/loadMonthlyDataPage')
  , querryMonthlyData = require('./routes/mongoDataQuerry')
  , http = require('http')
  , path = require('path')
  , stylus = require("stylus")
  , nib = require("nib")
;

// Initialize express
var app = express();
// .. and our app
init_app(app);

// When we get a request for {app}/ we should call routes/index.js
app.get('/', routes.do_work);
app.get('/player', player.do_work);
app.get('/team', team.do_work);
app.get('/loadMonthlyDataPage', loadMonthlyDataPage.do_work)
app.get('/monthlyPlayerData/:mtype',querryMonthlyData.do_work)
// when we get a request for {app/person} we should call routes/person.js
app.get('/person', person.do_work);
app.get('/who_in_team', who_in_team.do_work);
app.get('/country', country.do_work);
app.get('/mvp_season', mvp_season.do_work);
app.get('/mvp_times', mvp_times.do_work);
app.get('/highest', highest.do_work);
app.get('/assists', assists.do_work);
app.get('/stl', stl.do_work);
app.get('/three_pointer', three_pointer.do_work);
app.get('/coach', coach.do_work);
app.get('/champion', champion.do_work);
app.get('/reb', reb.do_work);
app.get('/pts', pts.do_work);
app.get('/final_game', final_game.do_work);
app.get('/most_mvp', most_mvp.do_work);
app.get('/average_wh', average_wh.do_work);
app.get('/win_percent', win_percent.do_work);
app.get('/most_in_team', most_in_team.do_work);

// Listen on the port we specify
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

///////////////////
// This function compiles the stylus CSS files, etc.
function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
}

//////
// This is app initialization code
function init_app() {
	// all environments
	app.set('port', process.env.PORT || 8080);

	// Use Jade to do views
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');

	app.use(express.favicon());
	// Set the express logger: log to the console in dev mode
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	// Use Stylus, which compiles .styl --> CSS
	app.use(stylus.middleware(
	  { src: __dirname + '/public'
	  , compile: compile
	  }
	));
	app.use(express.static(path.join(__dirname, 'public')));

	// development only
	if ('development' == app.get('env')) {
	  app.use(express.errorHandler());
	}

}
