const mongoose = require("mongoose");
mongoose.connect(
    "mongodb://localhost:27017/BooksDB", { useNewUrlParser: true, useUnifiedTopology: true },
    err => {
        if (!err) {
            console.log("Mongodb Connected successful.");
        } else {
            console.log("Error connecting DataBase" + err);
        }
    }
);
require("./books.model");