'use strict';

let db = require('./db'); 
let ObjectId = require('mongodb').ObjectId;

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

exports.getMissingIcons = () => {
    return new Promise(( res, rej) => {
        let icons = db.get().collection('missing');
        icons.find().toArray((err, result) =>{
            if(err || result === undefined || result.length == 0)
                rej("error to get icons")
            else
                res(result);
        });
    });
}

exports.updateCar = (model, id) => {
    let icon = db.get().collection('icons');
    console.log(model + ' ' + id);
    let o_id = new ObjectId(id);
    return new Promise(( res, rej) => {
        icon.updateOne({_id: o_id }, {$set: {title: model.title, description: model.description, suggestion: model.suggestion, paths: model.paths, more: model.more, severity: model.severity}}, (err, result) =>{
            if(err || result === undefined || (result && result.length == 0)) {
                console.log("here error : " + err);
                rej("error to update icon")
            }
            else {
                console.log("no error");
                res(result);
            }
        });
    });
}

exports.createMissing = (obj) => {
    return new Promise(( res, rej) => {
        let reject = rej, response = res;
        let new_car = db.get().collection('missing');
        new_car.insertOne(obj, (err, result) => {
                if(err){
                    reject("error to create new car")
                }
                else{
                    response(true)
                }
            });
    });
}