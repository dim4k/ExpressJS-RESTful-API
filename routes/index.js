const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    const hello = {title:'Hello World', text:'Welcome on my new website'};
    res.render('pages/index.ejs',{hello:hello});
});

module.exports = router;