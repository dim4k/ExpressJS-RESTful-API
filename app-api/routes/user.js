const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const config = require('../../config/conf.json');
const ctrlUser = require('../controllers/user.controller.js');

const auth = jwt({
    secret: config.app.jwtkey,
    userProperty: 'payload'
});


router.get('/profile', auth, ctrlUser.profileRead);
router.get('/users/:idUser', ctrlUser.findUserById);
router.get('/users', ctrlUser.findUsers);

module.exports = router;