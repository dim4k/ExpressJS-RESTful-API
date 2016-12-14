const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const config = require('../../config/conf.json');

const auth = jwt({
    secret: config.app.enckey,
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
    let routes=[];
    let i=0;
    router.stack.forEach(function (r) {
        if (r.route && r.route.path) {
            const methods = r.route.stack.reduce((result, route) => {
                if (result.indexOf(route.method) === -1) {
                    result.push(route.method);
                }
                return result;
            }, []);
            const routeObj = {};
            routeObj.methods = methods.map(function(method){return method.toUpperCase()});
            routeObj.path = r.route.path;

            routes[i] = routeObj;
            i++;
        }
    });
    res.render('index/index.ejs',{title:title, routes:routes});
});

module.exports = router;