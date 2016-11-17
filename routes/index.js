var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var hello = new Object();
    hello.title = 'Hello World';
    hello.text = 'Welcome on my new website'
    res.render('pages/index.ejs',{hello:hello});
});

module.exports = router;