const fs = require('fs');

module.exports = {
    addItemPage: (req, res) => {
        res.render('add-item.ejs', {
            title: 'Welcome to Inventory | Add a new item'
            ,message: ''
        });
    },
    addItem: (req, res) => {
        let message = '';
        let name = req.body.name;
        let qty = req.body.qty;
        let amount = req.body.amount;

        let nameQuery = `SELECT * FROM items WHERE item_name = '${name}'`;

        db.query(nameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Item already exists';
                res.render('add-item.ejs', {
                    message,
                    title: "Welcome to Inventory | Add a new item"
                });
            } else {
                        let query = `INSERT INTO items (item_name, qty, amount) VALUES ('${name}', '${qty}', '${amount}');`;
                        db.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            res.redirect('/');
                        });
                }

        });
    },
    editItemPage: (req, res) => {
        let id = req.params.id;
        let query = `SELECT * FROM items WHERE id = '${id}'`;
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-item.ejs', {
                title: 'Edit  Item'
                ,item: result[0]
                ,message: ''
            });
        });
    },
    editItem: (req, res) => {
        let id = req.params.id;
        let name = req.body.name;
        let qty = req.body.qty;
        let amount = req.body.amount;

        let query = `UPDATE items SET item_name = '${name}' , qty = '${qty}' , amount = '${amount}'  WHERE items.id = '${id}'`;
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    deleteItem: (req, res) => {
        let id = req.params.id;
        let deleteItemQuery = `DELETE FROM items WHERE id = '${id}'`;
            db.query(deleteItemQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
    }
};
