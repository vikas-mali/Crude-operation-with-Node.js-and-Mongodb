const express = require("express");
var fs = require('fs');
var router = express.Router();
const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const Books = mongoose.model("Books");

// img path
var imgPath = '/path/to/some/img.png';

router.get("/", (req, res) => {
    res.render("books/addOrEdit", { viewTitle: "Inser Books" });
});

router.post("/", (req, res) => {
    if (req.body._id == "") {
        insertRecord(req, res);
    } else {
        updateRecord(req, res);
    }
});

function insertRecord(req, res) {
    var books = new Books();
    books.bookName = req.body.bookName;
    books.bookPrice = req.body.bookPrice;
    books.bookDescription = req.body.bookDescription;
    books.bookAuthor = req.body.bookAuthor;
    books.save((err, doc) => {
        if (!err) {
            res.redirect("books/list");
        } else {
            if (err.name == "ValidationError") {
                handlValidationError(err, req.body);
                res.render("books/addOrEdit", {
                    viewTitle: "Inser Books",
                    books: req.body
                });
            } else console.log("Error during record inserted:" + err);
        }
    });
}
router.get("/list", (req, res) => {
    // res.json("from list");
    Books.find((err, docs) => {
        if (!err) {
            res.render("books/list", { list: docs });
        } else {
            console.log("Error in retriving Books list:" + err);
        }
    });
});

function handlValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case "bookName":
                body["bookNameError"] = err.errors[field].message;
                break;
            case "bookPrice":
                body["bookPriceError"] = err.errors[field].message;
                break;
            case "bookDescription":
                body["bookDescError"] = err.errors[field].message;
                break;
            case "bookAuthor":
                body["bookAuthorError"] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get("/:id", (req, res) => {
    Books.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("books/addOrEdit", {
                viewTitle: "Update Book Info",
                books: doc
            });
        }
    });
});

// Update Record from db

function updateRecord(req, res) {
    Books.findOneAndUpdate({ _id: req.body._id },
        req.body, { new: true },
        (err, doc) => {
            if (!err) {
                res.redirect("books/list");
            } else {
                if (err.name == "ValidationError") {
                    handlValidationError(err, req.body);
                    res.render("books/addOrEdit", {
                        viewTitle: "Update Books",
                        books: req.body
                    });
                } else console.log("Error during record Uodate:" + err);
            }
        }
    );
}

// Delete record form db
router.get("/delete/:id", (req, res) => {
    Books.findByIdAndRemove(req.params.id, (req, res) => {
        if (!err) {
            res.redirect("books/list");
        } else {
            console.log("Error in book delete:" + err);
        }
    });
});
module.exports = router;