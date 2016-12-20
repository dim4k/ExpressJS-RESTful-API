const express = require('express');
const router = express.Router();

const ctrlApi = require('../controllers/api.controller');

router.get('/', ctrlApi.index);
router.post('/apidocs', ctrlApi.addApidoc);
router.get('/apidocs', ctrlApi.findApidocs);
router.delete('/apidocs/:idApidoc', ctrlApi.deleteApidoc);
router.get('/apidocs/:idApidoc/delete', ctrlApi.deleteApidoc);
router.post('/apidocs/:idApidocs', ctrlApi.updateApidoc);

module.exports = router;