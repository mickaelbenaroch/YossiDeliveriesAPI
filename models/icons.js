'use strict';

let db = require('./db'); 
let ObjectId = require('mongodb').ObjectId;
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mickaelbenaroch@gmail.com',
    pass: process.env.EMAILP
  }
});

var mailOptions = {
  from: 'mickaelbenaroch@gmail.com',
  to: 'mickaelbenaroch@yahoo.fr',
  subject: 'פנייה חדשה ממשתמש NURICAR',
  text: 'משתמש הוסיף הערה לכבי נורית הזהרה שחסרה. ראה פרטים במערכת הניהול.'
};

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

exports.markAsRead = (model) => {
    let icon = db.get().collection('missing');
    let o_id = new ObjectId(model._id);
    return new Promise(( res, rej) => {
        icon.updateOne({_id: o_id }, {$set: {isNew: model.isNew}}, (err, result) =>{
            if(err || result === undefined || (result && result.length == 0)) {
                console.log("here error : " + err);
                rej("error to update icon missing as read")
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
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                          console.log(error);
                          reject("error to create new car and send email" + error);
                        } else {
                          response(true)
                          console.log('Email sent: ' + info.response);
                        }
                      });
                }
            });
    });
}

