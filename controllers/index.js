//load all controller 
'use strict';

const express = require('express'),
router        = express.Router();

router.use('/login',        require('./login'))

module.exports = router