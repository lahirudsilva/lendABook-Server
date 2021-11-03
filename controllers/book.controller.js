const Validator = require('fastest-validator');
const models = require('../models');
const { req, res} = require('express');

//Add books 
function addBooks(req, res){
    const newBook = {
        ISBN: req.body.ISBN,
        title: req.body.title,
        bookCover: req.body.bookCover,
        summary: req.body.summary,
        category: req.body.category,
        author: req.body.author,
        publisher: req.body.publisher,
        status: req.body.status,
        numberOfCopies: req.body.numberOfCopies,
        rating: req.body.rating
    }
    //data validation
    const schema = {
        ISBN: {type:"number", optional: false},
        title: {type:"string", optional: false, max: "255"},
        summary: {type:"string", optional: false, max: "255"},
        category: {type:"string", optional: false, max: "255"},
        author: {type:"string", optional: false, max: "255"},
        publisher: {type:"string", optional: true, max: "255"},
        status: {type:"string", optional: false, max: "255"},
        numberOfCopies: {type:"number", optional: false},
        rating: {type:"number", optional: true},
    }

    const v = new Validator();
    const validationResponse = v.validate(newBook, schema);

    if(validationResponse !== true){
        return res.status(400).json({
            message: "validation failed.",
            errors: validationResponse
        });
    }

    models.Book.create(newBook).then(result =>{
        res.status(201).json({
            message: " Book added successfully",
            book: result
        });

    }).catch(error => {
        res.status(500).json({
            message: " somehting went wrong!",
            error: error
        });

    });
}



//Get A single book
function getBook(req, res){
    const ISBN = req.params.ISBN;

    models.Book.findByPk(ISBN).then(result => {
        if(result){
            res.status(200).json(result)
        }else{
            res.status(404).json({
                message: "Book not found!"
            })  
        }
        
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong!"
        })  
    });
    
}

//Get all the posts
function getAllBooks(req,res){
    models.Book.findAll().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: "something went wrong!"
        });    
    });
}

//update books details
function updateBookDetails(req, res){
    const ISBN = req.params.ISBN;
    const updatedBook = {
        ISBN: req.body.ISBN,
        title: req.body.title,
        bookCover: req.body.bookCover,
        summary: req.body.summary,
        category: req.body.category,
        author: req.body.author,
        publisher: req.body.publisher,
        status: req.body.status,
        numberOfCopies: req.body.numberOfCopies,
        rating: req.body.rating
    }

    //data validation
    const schema = {
        title: {type:"string", optional: true, max: "255"},
        summary: {type:"string", optional: true, max: "255"},
        category: {type:"string", optional: true, max: "255"},
        author: {type:"string", optional: true, max: "255"},
        publisher: {type:"string", optional: true, max: "255"},
        status: {type:"string", optional: true, max: "255"},
        numberOfCopies: {type:"number", optional: true},
        rating: {type:"number", optional: true},
    }

    const v = new Validator();
    const validationResponse = v.validate(updatedBook, schema);

    if(validationResponse !== true){
        return res.status(400).json({
            message: "validation failed.",
            errors: validationResponse
        });
    }

    models.Book.update(updatedBook, {where: {ISBN:ISBN}}).then(result => {
        res.status(200).json({
            message: "Book details updated successfully..",
            book: updatedBook
        });
    }).catch(error => {
        res.status(500).json({
            message: "something went wrong!",
            error: error
        })
    })
}

//delete a book
function deleteBook(req, res){
    const ISBN = req.params.ISBN;

    models.Book.destroy({where:{ISBN:ISBN}}).then(result => {
        res.status(200).json({
            message: "book deleted sucessfully.."
        })
    }).catch(error => {
        res.status(500).json({
            message: "something went wrong!",
            error: error
        })

    })
}

module.exports = {
    addBooks: addBooks,
    getBook: getBook,
    getAllBooks: getAllBooks,
    updateBookDetails: updateBookDetails,
    deleteBook: deleteBook
    
}