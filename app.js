const express = require('express');
const ejs = require('ejs');

const app = express();

let port = 1234;

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
})
;
