var express = require('express');
var router = express.Router();
var db = require('../database');

router.get("/all", (req, resp) => {
    db.Book.findAll().then( books => {
        resp.status(200).send(JSON.stringify(books));
    })
    .catch( err => {
        resp.status(500).send(JSON.stringify(err));
    });
});

router.put("/", (req, resp) => {
    db.Book.create({
        name: req.body.name,
        authorName: req.body.authorName
    }).then( book => {
        resp.status(200).send(JSON.stringify(book));
    })
    .catch( err => {
        resp.status(500).send(JSON.stringify(err));
    });
});

module.exports = router