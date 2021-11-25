'use strict';

const express         = require('express');
const route           = express.Router();
const list           = require('../models/icons');

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

route.get('/missing', (req, res) => {
    list.getMissingIcons().then((data) => {
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

route.post('/createIcon', (req, res) => {
    let obj = {
        title: req.body.title,
        description: req.body.description,
        paths: req.body.paths,
        severity: req.body.severity,
        suggestion: req.body.suggestion,
        more: req.body.more
    }
    list.createIcon(obj).then((data) => {
        res.status(200).json({data: data});   
        res.end(); 
    }).catch((err) => {
        res.json({isOk: false, error: err})
        res.status(500)
        res.end()
    });
});

route.post('/markasread', (req, res) => {
    let obj = {
        _id: req.body._id,
        isNew: req.body.isNew
    }
    list.markAsRead(obj).then((data) => {
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
        text: req.body.text,
        date: req.body.date,
        isNew: req.body.isNew
    }
    list.createMissing(obj).then((data) => {
        res.status(200).json({data: data});   
        res.end(); 
    }).catch((err) => {
        res.json({isOk: false, error: err})
        res.status(500)
        res.end()
    });
});

module.exports = route