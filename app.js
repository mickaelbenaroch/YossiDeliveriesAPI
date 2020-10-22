'use strict';

const { send } = require('process');

const { db, server, corss } = require('./configuration/config'), 
express        = require('express'),
app            = express(),
db_model       = db.db_model,
bodyParser     = corss.bodyParser,
cors           = corss.cors_parser,
log            = require('./controllers/API/logger');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: '50mb'}));

//enable corss
app.use(cors());

app.get('ping', (req, res) => {
    res.send("Hello app!!");
});


module.exports = app