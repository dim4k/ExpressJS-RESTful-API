const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const auth = jwt({
    secret: 'MY_SECRET',
    userProperty: 'payload'
});

const ctrlUser = require('../controllers/user.controller');
const ctrlAuth = require('../controllers/authentication.controller');

// profile
router.get('/profile', auth, ctrlUser.profileRead);
router.get('/user/:id', ctrlUser.findUserById);
router.get('/users', ctrlUser.findUsers);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

/* GET home page.*/
router.get('/', function(req, res, next) {
    const hello = {title:'Hello World', text:'Welcome on my new website'};
    res.render('index/index.ejs',{hello:hello});
});

module.exports = router;