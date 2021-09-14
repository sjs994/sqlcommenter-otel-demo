var express = require('express');
var router = express.Router();
var db = require('../database');
const Sequelize = require("sequelize");

router.get("/all", (req, resp) => {
    db.Book.findAll().then( books => {
        resp.status(200).send(JSON.stringify(books));
    })
    .catch( err => {
        resp.status(500).send(JSON.stringify(err));
    });
});

router.get("/id/:id", (req, resp) => {
    let book_id = parseInt(req.params["id"]);
    db.Book.findByPk(book_id).then( books => {
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

router.put("/updateCount", (req, resp) => {
   let book_id = parseInt(req.body.id);
   let count = parseInt(req.body.count);
   console.log("updateCount api: " + book_id + " : " + count);
   db.Book.update({ count: count }, 
    { 
        where: { id: book_id }
    })
   .then( book => {
        resp.status(200).send(JSON.stringify(book));
   })
   .catch( err => {
        resp.status(500).send(JSON.stringify(err));
   });
});

module.exports = router