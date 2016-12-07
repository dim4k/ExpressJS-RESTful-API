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
    const title = {title:'REST API', text:'Reference documentation'};
    //TODO : List all get and post methods
    res.render('index/index.ejs',{title:title});
});

module.exports = router;