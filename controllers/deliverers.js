'use strict';

const express         = require('express');
const route           = express.Router();
const list           = require('../models/deliverers');

//Details - signup new user
//require - user & pwd 
//return  - boolean, true/false
route.get('/list', (req, res) => {
    list.getDeliverers().then((data) => {
        res.status(200).json({data: data});   
        res.end(); 
    }).catch((err) => {
        res.json({isOk: false, error: err})
        res.status(500)
        res.end()
    });
});

module.exports = route