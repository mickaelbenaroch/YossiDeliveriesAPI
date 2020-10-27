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