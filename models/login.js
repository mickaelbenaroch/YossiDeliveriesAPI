'use strict';

let db = require('./db'); 

//Details - signup new user
exports.signup = (user) => {
    return new Promise(( res, rej) => {
        let reject = rej, response = res;
        
        let profile = db.get().collection('user');
        profile.insertOne(user, (err, result) => {
                if(err){
                    //log.log_error(`Signup new user - ${info.user} `);
                    reject("error to signup user or ")
                }
                else{
                    response(true)
                }
            });
    });
}

//Details - check user and password for user login
exports.login = (email, password) => {
    return new Promise((res, rej) => {
        let user = db.get().collection('user');
        user.findOne({email: email, pass: password}, (err, result) => {
            if(err || result === null || result === undefined) {
                rej('Email or Password is incorrect');
            } 
            else {  
                let resObj = {  
                    phone: result.phone,  
                    salaryPerHour: result.salaryPerHour,
                    address: result.address,
                    firstname: result.firstname,
                    lastname: result.lastname,
                    age: result.age,
                    photo: result.photo,
                    email: result.email,
                    creationdate: result.creationdate,
                    isAdmin: result.isAdmin,
                    notes: result.notes
                };
                res(resObj);
            }
        });   
    })   
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