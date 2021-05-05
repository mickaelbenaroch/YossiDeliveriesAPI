//load all controller 
'use strict';

const express = require('express'),
router        = express.Router();

router.use('/cars',        require('./cars'));
router.use('/icons',        require('./icons'));

module.exports = router 