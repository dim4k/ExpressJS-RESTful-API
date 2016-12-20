const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ApiDoc = mongoose.model('Apidoc');

const ctrlApi = require('../controllers/api.controller');

router.post('/apidocs', ctrlApi.addApidoc);
router.get('/apidocs', ctrlApi.findApidocs);
router.delete('/apidocs/:idApidoc', ctrlApi.deleteApidoc);
router.get('/apidocs/:idApidoc/delete', ctrlApi.deleteApidoc);
router.post('/apidocs/:idApidocs', ctrlApi.updateApidoc);

/* GET home page.*/
router.get('/', function(req, res) {
    const title = {title:'REST API', text:'Reference documentation'};
    const query = ApiDoc.find();
    const promise = query.exec();
    const reqmessage = req.query.reqmessage;
    promise.then(function(apiDocModel){
        res.render('index/index.twig',{title:title, routes:apiDocModel, reqmessage:reqmessage})
    });
});

module.exports = router;