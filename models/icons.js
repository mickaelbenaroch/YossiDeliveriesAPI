'use strict';

let db = require('./db'); 

//get all deliverers
exports.getIcons = () => {
    return new Promise(( res, rej) => {
        let profile = db.get().collection('icons');

        profile.find().toArray((err, result) =>{
            if(err || result === undefined || result.length == 0)
                rej("error to get icons")
            else
                res(result);
        });
    });
}

exports.setHour = (model) => {
    return new Promise(( res, rej) => {
        let profile = db.get().collection('user');
        let hour = db.get().collection('hours');

        profile.findOne({email: model.email, phone: model.phone}, (err, result) =>{
            if(err || result === undefined)
                rej("error to get profiles")
            else
                hour.insertOne(model, (err, result) => {
                    if (err) {
                        rej("error to insert hour")
                    }
                    else {
                        res(true);
                    }
                });
        });
    });
}

exports.getHours = (obj) => {
    return new Promise(( res, rej) => {
        let hour = db.get().collection('hours');
        if (obj && obj.isAdmin) {
            hour.find().toArray((err, result) =>{
                if(err || result === undefined || result.length == 0)
                    rej("error to get all hours")
                else
                    res(result);
            });
        } else {
            hour.find({userEmail: obj.userEmail, userPhone: obj.userPhone}).toArray((err, result) =>{
                if(err || result === undefined || result.length == 0)
                    rej("error to get hours for" + obj.userEmail)
                else
                    res(result);
            });
        }
    });
}