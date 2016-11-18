const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const auth = jwt({
    secret: 'MY_SECRET',
    userProperty: 'payload'
});

const ctrlProfile = require('../controllers/profile.controller');
const ctrlAuth = require('../controllers/authentication.controller');

// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

/* GET home page.*/
router.get('/', function(req, res, next) {
    const hello = {title:'Hello World', text:'Welcome on my new website'};
    res.render('index/index.ejs',{hello:hello});
});

module.exports = router;