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

module.exports.findUserByName = function(req, res) {
    User.findOne({'name': req.params.name})
        .exec(function(err, users) {
            if(users != null) {
                let lightUsers = [];
                if(Array.isArray(users)) {
                    let i = 0;
                    for (let user of users) {
                        lightUsers[i] = {"email" :user.email};
                        i++;
                    }
                }else{
                    lightUsers[0] = {"email": users.email};
                }
                res.status(200).json(lightUsers);
            }else{
                res.status(200).json({});
            }
        });

};

module.exports.findAllUser = function(req, res) {
    User.find()
        .exec(function(err, users) {
            if(users != null) {
                let lightUsers = [];
                if(Array.isArray(users)) {
                    let i = 0;
                    for (let user of users) {
                        lightUsers[i] = {"email" :user.email};
                        i++;
                    }
                }else{
                    lightUsers[0] = {"email": users.email};
                }
                res.status(200).json(lightUsers);
            }else{
                res.status(200).json({});
            }
        });

};