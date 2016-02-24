// Memmory
// https://www.npmjs.com/package/express-session
var express      = require('express')
, session        = require('express-session')
, http           = require('http')
, app            = express();
 
app.use(session({
      secret  : 'CatOnKeyboard', 
      key     : 'test'
}));
 
app.get('/', function(req, res){
    if(req.session.views) {
        ++req.session.views;
    } else {
        req.session.views = 1;
    }
    res.send('Viewed <strong>' + req.session.views + '</strong> times.');
});
 
http.createServer(app).listen(9341, function() {
    console.log("Listening on %d", this.address().port);
});
