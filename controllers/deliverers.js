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

route.post('/sethour', (req, res) => {
    let obj = {
        dayOfWeek: req.body.dayOfWeek,
        day: req.body.day,
        month: req.body.month,
        year: req.body.year,
        startHour: req.body.startHour,
        endHour: req.body.endHour,
        total: req.body.total,
        userPhone: req.body.userPhone,
        userEmail: req.body.userEmail
    }
    list.setHour(obj).then((data) => {
        res.status(200).json({data: data});   
        res.end(); 
    }).catch((err) => {
        res.json({isOk: false, error: err})
        res.status(500)
        res.end()
    });
});

module.exports = route