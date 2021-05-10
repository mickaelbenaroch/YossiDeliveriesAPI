'use strict';

const express         = require('express');
const route           = express.Router();
const list           = require('../models/icons');

//Details - signup new user
//require - user & pwd 
//return  - boolean, true/false
route.get('/icons', (req, res) => {
    list.getIcons().then((data) => {
        res.status(200).json({data: data});   
        res.end(); 
    }).catch((err) => {
        res.json({isOk: false, error: err})
        res.status(500)
        res.end()
    });
});

route.post('/update', (req, res) => {
    let obj = {
        title: req.body.title,
        description: req.body.description,
        paths: req.body.paths,
        severity: req.body.severity,
        suggestion: req.body.suggestion,
        more: req.body.more
    }
    list.updateCar(obj, req.body._id).then((data) => {
        res.status(200).json({data: data});   
        res.end(); 
    }).catch((err) => {
        res.json({isOk: false, error: err})
        res.status(500)
        res.end()
    });
});

route.post('/missing', (req, res) => {
    let obj = {
        picture: req.body.picture,
        text: req.body.text
    }
    list.updateMissing(obj).then((data) => {
        res.status(200).json({data: data});   
        res.end(); 
    }).catch((err) => {
        res.json({isOk: false, error: err})
        res.status(500)
        res.end()
    });
});

module.exports = route