'use strict';

const express         = require('express');
const route           = express.Router();
const login           = require('../models/login');

//Details - signup new user
//require - user & pwd 
//return  - boolean, true/false
route.post('/newuser', (req, res) => {
    let profile = {
        phone:       req.body.phone, 
        firstname: req.body.firstname,
        lastname:  req.body.lastname,
        age:        req.body.age,
        photo:      req.body.photo,
        address:       req.body.address,
        email:          req.body.email,
        salaryPerHour: req.body.salaryPerHour,
        creationdate: new Date(),
        pass: req.body.pass,
        isAdmin: req.body.isAdmin,
        notes: req.body.notes
    };

    login.signup(profile).then((data) => {
        res.status(200).json({data: data});   
        res.end(); 
    }).catch((err) => {
        res.json({isOk: false, error: err})
        res.status(500)
        res.end()
    });
});

//Details - upload new picture of user
//require - picture 
//return  - boolean, true/fals & user profile
// route.post('/upload', check('picture').not().isEmpty(), (req, res) => {

//     let validat_result = valid_class.valid_chack(req);

//     if(validat_result.next().value == false){
//         res.status(422).json({ errors: valid_class.error_valid(validat_result.next().value[0].param) });
//     }else{
//         login.picture(req.body.email, req.body.picture).then((data) => {
//             res.status(200).json({isTrue: data});   
//             res.end(); 
//         }).catch((err) => {
//             res.json({isTrue: false, error: err})
//             res.status(500)
//             res.end()
//         });
//     }
// });

//Details - check user and password for user login
//require - email & pass 
//return  - boolean, true/fals & user profile
route.post('/', (req, res)=>{
    let user_query = req.body.email;
    let pass_query = req.body.pass;

    login.login(user_query, pass_query).then((data) => {
        res.status(200).json({data: data});   
        res.end(); 
    }).catch(err => {
        res.json({isOk: false, error: err})
        res.status(500)
        res.end()
    })
    
});


module.exports = route