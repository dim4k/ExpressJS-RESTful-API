const mongoose = require('mongoose');
const ApiDoc = mongoose.model('Apidoc');

module.exports.index = function(req, res) {
    const title = {title:'REST API', text:'Reference documentation'};
    const query = ApiDoc.find();
    const promise = query.exec();
    const reqmessage = req.query.reqmessage;
    promise.then(function(apiDocModel){
        res.render('pages/index.twig',{title:title, routes:apiDocModel, reqmessage:reqmessage})
    });
};

module.exports.addApidoc = function(req, res) {
    const apiDoc = new ApiDoc(
        {
            uri:req.body.uri,
            method:req.body.method,
            detail:{shortDescription:req.body.shortDescription}
        }
    );
    apiDoc.save(function(err) {
        if(err){
            console.log(err);
            return;
        }else if(req.body.localApp){
            console.log('ApiDoc inserted!');
            res.redirect('/?reqmessage=' + req.body.localApp);
        }else{
            console.log('ApiDoc inserted!');
            res.status(200);
            res.json({
                "message" : "Insert successful"
            });
        }
    });
};

module.exports.deleteApidoc = function(req, res) {
    ApiDoc.findByIdAndRemove(req.params.idApidoc, function(err) {
        if(err){
            console.log(err);
            return;
        }else if(req.query.localApp != 'undefined'){
            console.log('ApiDoc deleted!');
            res.redirect('/?reqmessage=' + req.query.localApp);
        }else{
            console.log('ApiDoc deleted!');
            res.status(200);
            res.json({
                "message" : "Delete successful"
            });
        }
    });
};

module.exports.findApidocs = function(req, res) {
    //Find all users
    let apiDocModel = ApiDoc.find();
    //Restricting results with URI parameters
    if(typeof req.query != 'undefined'){
        apiDocModel.find(req.query)
    }
    apiDocModel.exec(function(err, ApiDocs) {
        if(ApiDoc != null) {
            res.status(200).json(ApiDocs);
        }else{
            res.status(200).json({});
        }
    });
};

module.exports.updateApidoc = function(req, res) {
    const apiDoc = new ApiDoc(
        {
            _id:req.params.idApidocs,
            uri:req.body.uri,
            method:req.body.method,
            detail:{shortDescription:req.body.shortDescription}
        }
    );
    ApiDoc.findByIdAndUpdate(req.params.idApidocs, apiDoc, function(err, apidoc) {
        if(err){
            console.log(err);
            return;
        }else if(typeof req.body.localApp != 'undefined'){
            console.log('ApiDoc updated!');
            res.redirect('/?reqmessage=' + req.body.localApp);
        }else{
            console.log('ApiDoc updated!');
            res.status(200);
            res.json({
                "message" : "Update successful"
            });
        }
    });
};