const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mysql = require('mysql');
const path = require('path');


const app = express();

const {getHomePage} = require('./routes/index');
const {addItemPage, addItem, deleteItem, editItem, editItemPage} = require('./routes/item');

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

app.get('/', getHomePage);
app.get('/add', addItemPage);
app.get('/edit/:id', editItemPage);
app.get('/delete/:id', deleteItem);
app.post('/add', addItem);
app.post('/edit/:id', editItem);

app.listen(port, () => {
    console.log('Server is up and running on port: ' + port);
});
