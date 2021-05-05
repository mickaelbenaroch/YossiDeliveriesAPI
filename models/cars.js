'use strict';

let db = require('./db'); 

//Details - signup new user
exports.createCar = (car) => {
    return new Promise(( res, rej) => {
        let reject = rej, response = res;
        
        let new_car = db.get().collection('cars');
        new_car.insertOne(car, (err, result) => {
                if(err){
                    reject("error to create new car")
                }
                else{
                    response(true)
                }
            });
    });
}

exports.getCars = () => {
    return new Promise(( res, rej) => {
        let icons = db.get().collection('cars');

        icons.find().toArray((err, result) =>{
            if(err || result === undefined || result.length == 0)
                rej("error to get cars")
            else
                res(result);
        });
    });
}

//user picture
// exports.picture = (email, picture) => {
//     return new Promise((res, rej) => {
//         let profile = db.get().collection('profile');
//          try {
//             profile.updateOne({"user":email},{$set: {"picture": picture}},(suc,err) => {
//                 //log.log_info(`'${email}' - Upload new picture `);
//                 res(suc)
//             });
//         }catch (error) {
//             //log.log_error(`'${email}' - Upload picture failed `);
//             rej('error on pic upload');
//         }
//     })
// }