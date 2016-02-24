// Memcached
// https://www.npmjs.com/package/connect-memcached
var express      = require('express')
, session        = require('express-session')
, cookieParser   = require('cookie-parser')
, http           = require('http')
, app            = express()
, MemcachedStore = require('connect-memcached')(session);
 
app.use(cookieParser());
app.use(session({
      secret  : 'CatOnKeyboard'
    , key     : 'test'
    , proxy   : 'true'
    , store   : new MemcachedStore({
        hosts: ['127.0.0.1:11211']
    })
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
