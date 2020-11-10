'use strict';

let db = require('./db'); 

//get all deliverers
exports.getDeliverers = () => {
    return new Promise(( res, rej) => {
        let profile = db.get().collection('user');

        profile.find().toArray((err, result) =>{
            if(err || result === undefined || result.length == 0)
                rej("error to get profiles")
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