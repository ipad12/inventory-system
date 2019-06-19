const express = require('express');
const ejs = require('ejs');
const mysql = require('mysql');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const port = 1234;

const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'inventory'
});

db.connect((err) => {
    if (err) {
        throw err;
    } console.log('Connected to database');
});
global.db = db;

app.set('port', process.env.port || port); 
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs'); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 
app.use(express.static(path.join(__dirname, 'public'))); 

app.listen(port, () => {
    console.log('Server is up and running on port: ' +port);
});
