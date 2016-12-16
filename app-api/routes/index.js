const express = require('express');
const async = require('async');
const router = express.Router();
const jwt = require('express-jwt');
const config = require('../../config/conf.json');
const mongoose = require('mongoose');
const ApiDoc = mongoose.model('Apidoc');

const auth = jwt({
    secret: config.app.jwtkey,
    userProperty: 'payload'
});

const ctrlUser = require('../controllers/user.controller');
const ctrlAuth = require('../controllers/authentication.controller');
const ctrlApi = require('../controllers/api.controller');

// profile
router.get('/profile', auth, ctrlUser.profileRead);
router.get('/users/:idUser', ctrlUser.findUserById);
router.get('/users', ctrlUser.findUsers);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

// apiDoc
router.post('/apidocs', ctrlApi.addApiDoc);
router.get('/apidocs', ctrlApi.findApiDocs);

/* GET home page.*/
router.get('/', function(req, res) {
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

            methods.forEach(function(method){
                routeObj.method = method;
                routeObj.uri = r.route.path;
                routes[i] = routeObj;
                i++;
            });
        }
    });
    //TODO add details from apidocs to routes
    async.each(routes, function(route, callback){
        let apiDocModel = ApiDoc.find();
        apiDocModel.findOne(route);
        apiDocModel.exec(function(err, apiDocs) {
            if(apiDocs != null && typeof routes != 'undefined') {
                route.detail = apiDocs.detail;
            }else{
                route.detail = '';
            }
        });
        callback();
    }, function(err) {
        res.render('index/index.ejs',{title:title, routes:routes});
    });
});

module.exports = router;