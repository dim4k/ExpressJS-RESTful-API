const mongoose = require('mongoose');
const ApiDoc = mongoose.model('Apidoc');

module.exports.addApiDoc = function(req, res) {
    const apiDoc = new ApiDoc(
        {
            uri:req.body.uri,
            method:req.body.method,
            detail:req.body.detail,
        }
    );
    apiDoc.save(function(err) {
        if(err){
            console.log(err);
            return;
        }else if(req.body.localApp){
            res.redirect('/?reqmessage=' + req.body.uri);
        }else{
            res.status(200);
            res.json({
                "message" : "Insert successful"
            });
        }
    });
};

module.exports.createOrUpdate = function(req, res) {
    const apiDoc = new Apidoc();
    apiDoc.findOneAndUpdate({route:req.body.uri,method:req.body.method},{$set:{"detail.shortDescription":req.body.shortDescription,"detail.description":req.body.description}}, {new: true}, function(err, doc){
        if(err){
            console.log("Something wrong when updating data!");
        }
        console.log(doc);
    });
};

module.exports.findApiDocs = function(req, res) {
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