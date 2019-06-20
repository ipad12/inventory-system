var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var path = require('path');
var app = express();

const {getHomePage} = require('./routes/index');
const {addItemPage, addItem, deleteItem, editItem, editItemPage} = require('./routes/item');
const port = 3000;
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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', getHomePage);
app.get('/add', addItemPage);
app.get('/edit/:id', editItemPage);
app.delete('/delete/:id', deleteItem);
app.post('/add', addItem);
app.put('/edit/:id', editItem);

app.listen(port, () => {
    console.log(`Server is up and running on port:  ${port}`);
});
