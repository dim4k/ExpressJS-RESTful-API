const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ApiDoc = mongoose.model('Apidoc');

const ctrlApi = require('../controllers/api.controller');

router.post('/apidocs', ctrlApi.addApiDoc);
router.get('/apidocs', ctrlApi.findApiDocs);

/* GET home page.*/
router.get('/', function(req, res) {
    const title = {title:'REST API', text:'Reference documentation'};
    const query = ApiDoc.find();
    const promise = query.exec();
    promise.then(function(apiDocModel){
        res.render('index/index.twig',{title:title, routes:apiDocModel})
    });
});

module.exports = router;