const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.profileRead = function(req, res) {

    if (!req.payload._id) {
        res.status(401).json({
            "message" : "UnauthorizedError: private profile"
        });
    } else {
        User.findById(req.payload._id)
            .exec(function(err, user) {
                res.status(200).json(user);
            });
    }

};

module.exports.findUserById = function(req, res) {
    User.findById(req.params.idUser)
        .exec(function(err, users) {
            if(users != null) {
                let lightUsers = [];
                if(Array.isArray(users)) {
                    let i = 0;
                    for (let user of users) {
                        lightUsers[i] = {"email" :user.email,"username":user.username};
                        i++;
                    }
                }else{
                    lightUsers[0] = {"email": users.email,"username":users.username};
                }
                res.status(200).json(lightUsers);
            }else{
                res.status(200).json({});
            }
        });

};

module.exports.findUsers = function(req, res) {
    //Find all users
    let userModel = User.find();
    //Restricting results with URI parameters
    if(typeof req.query != 'undefined'){
        userModel.find(req.query)
    }
    userModel.exec(function(err, users) {
            if(users != null) {
                let lightUsers = [];
                if(Array.isArray(users)) {
                    let i = 0;
                    for (let user of users) {
                        lightUsers[i] = {"id" : user._id,"email" :user.email,"username":user.username};
                        i++;
                    }
                }else{
                    lightUsers[0] = {"id" : user._id,"email": users.email,"username":users.username};
                }
                res.status(200).json(lightUsers);
            }else{
                res.status(200).json({});
            }
        });
};