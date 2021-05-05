'use strict';

const express         = require('express');
const route           = express.Router();
const cars           = require('../models/cars');


route.post('/newcar', (req, res) => {
    let car = {
        title:              req.body.title, 
        modelName:          req.body.modelName,
        years:              req.body.years,
        icons:              req.body.icons,
        isHybrid:           req.body.isHybrid,
        englishModelName:   req.body.englishModelName,
        notes:              req.body.notes
    };

    cars.createCar(car).then((data) => {
        res.status(200).json({data: data});   
        res.end(); 
    }).catch((err) => {
        res.json({isOk: false, error: err})
        res.status(500)
        res.end()
    });
});

route.get('/cars', (req, res) => {
    list.getCars().then((data) => {
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