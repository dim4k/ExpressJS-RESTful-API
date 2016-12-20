const mongoose = require('mongoose');
const ApiDoc = mongoose.model('Apidoc');

module.exports.add = function(req, res) {
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

module.exports.delete = function(req, res) {
    console.log(req.params.idApidoc);
    ApiDoc.findByIdAndRemove(req.params.idApidoc, function(err) {
        if(err){
            console.log(err);
            return;
        }else if(req.query.localApp != 'undefined'){
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

module.exports.find = function(req, res) {
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