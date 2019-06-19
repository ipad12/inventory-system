module.exports = {
    getHomePage: (req, res) => {
        let query = "SELECT * FROM `items` ORDER BY id ASC"; // query database to get all the items

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('index.ejs', {
                title: 'Welcome To Inventory | View Items'
                ,items: result
            });
        });
    },
};
