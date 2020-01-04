const mongoose = require("mongoose");
var booksSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: "Book Name is required"
    },
    bookPrice: {
        type: String,
        required: "Book Name is required"
    },
    bookDescription: {
        type: String,
        required: "Book Name is required"
    },
    bookAuthor: {
        type: String,
        required: "Book Name is required"
    }
});
mongoose.model("Books", booksSchema);