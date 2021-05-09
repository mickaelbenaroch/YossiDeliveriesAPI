'use strict';

let db = require('./db'); 

//get all deliverers
exports.getIcons = () => {
    return new Promise(( res, rej) => {
        let icons = db.get().collection('icons');

        icons.find().toArray((err, result) =>{
            if(err || result === undefined || result.length == 0)
                rej("error to get icons")
            else
                res(result);
        });
    });
}

exports.updateCar = (model) => {
    let icon = db.get().collection('icons');
    return new Promise(( res, rej) => {
        icon.updateOne({_id: model._id}, {$set: model}, (err, result) =>{
            if(err || result === undefined || result.length == 0)
                rej("error to update icon")
            else
                res(result);
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