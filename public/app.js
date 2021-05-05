'use strict';

const { db, server, corss } = require('../configuration/config'), 
express        = require('express'),
app            = express(),
db_model       = db.db_model,
bodyParser     = corss.bodyParser,
cors           = corss.cors_parser

//app.use(express.static('public'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: '50mb'}));

//enable corss
app.use(cors());

//route to all controller
app.use(require('../controllers'));

//connect to mongodb
db_model.connect(db.connection.uri, (err) => {
   if(err){
        console.log('Unable to connect to MongoDB.');
        process.exit(1)
   }else{
        app.listen(server.port, () => {
            console.log(`app running on http://${server.host}:${server.port}`);
        });
   }
});

module.exports = app
