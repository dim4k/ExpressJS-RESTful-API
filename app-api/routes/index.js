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
router.get('/user/:idUser', ctrlUser.findUserById);
router.get('/users', ctrlUser.findUsers);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

/* GET home page.*/
router.get('/', function(req, res, next) {
    const title = {title:'REST API', text:'Reference documentation'};
    //TODO : List all get and post methods
    const routes = router.stack.filter(r => r.route).map(r => r.route.path);
    res.render('index/index.ejs',{title:title, routes:routes});
});

module.exports = router;