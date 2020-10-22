const express = require('express');
const app = express();
const port = 3000;

app.listen(port, function() {
    console.log('Listenning to port: ' + port);
});

app.get('/ping', (req, res) => {
    res.send("of Course I am still awake");
});