//validate

module.exports = {
    server: {
      host: 'localhost',
      port: process.env.PORT || 3030
    },
    db: {
      client:   'MongoDB',
      db_model:  require('../models/db'),
      connection: {
        uri:      'mongodb+srv://sapo:shenkar_4@cluster0-nxqzu.mongodb.net/test?retryWrites=true&w=majority',
        database: 'yoss-deliveries',
      }
    },
    corss: {
      bodyParser:   require('body-parser'),
      cors_parser:  require('cors')
    }
  };