/*
* Copyright (C) TodoConK
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

module.exports = function(app) {

    var Books = require('../models/books.js');

    //GET - Return all tvshows in the DB
    findAllBooks = function(req, res) {
        Books.find(function(err, books) {
            if(!err) {
                res.send(books);
            } else {
                console.log('ERROR: ' + err);
            }
        });
    };

    //GET - Return a TVShow with specified ID
    findById = function(req, res) {
        Books.findById(req.param.id, function(err, book) {
            if(!err) {
                res.send(book);
            } else {
                console.log('ERROR: ' + err);
            }
        });
    };

    addBook = function(req, res) {
      console.log('POST');
      console.log(req.body);

      var books = new Books({
        title:    req.body.title,
        author:     req.body.author,
        releaseDate:  req.body.releaseDate,
        keywords:   req.body.keywords
    });

      books.save(function(err) {
        if(!err) {
          console.log('Created');
      } else {
          console.log('ERROR: ' + err);
      }
  });

      res.send(books);
  };

    //PUT - Update a register already exists
    updateBook = function(req, res) {
        Books.findById(req.params.id, function(err, books) {
            books.title =    req.body.title;
            books.author =     req.body.author;
            books.releaseDate =  req.body.releaseDate;
            books.keywords =   req.body.keywords;

            books.save(function(err) {
              if(!err) {
                console.log('Updated');
            } else {
                console.log('ERROR: ' + err);
            }

            res.send(books);
        });
        });
    }

    //DELETE - Delete a TVShow with specified ID
    deleteBook = function(req, res) {
      Books.findById(req.params.id, function(err, books) {
        books.remove(function(err) {
          if(!err) {
            console.log('Removed');
        } else {
            console.log('ERROR: ' + err);
        }
    })
    });
  }

    //GET - Return a TVShow with specified ID
    checkBooks = function(req, res) {
        Books.find(function(err, books) {
            if(!err) {
                if(!books.length){
                    var collection = [
                    { id: 1, title:"JS the good parts", author:"John Doe", releaseDate:"2009", keywords:"JavaScript Programming"},
                    { id: 5, title:"CS the better parts", author:"John Doe", releaseDate:"2010", keywords:"CoffeeScript Programming"},
                    { id: 2, title:"Scala for the impatient", author:"John Doe", releaseDate:"2011", keywords:"Scala Programming"},
                    { id: 3, title:"American Psyco", author:"Bret Easton Ellis", releaseDate:"2012", keywords:"Novel Splatter"},
                    { id: 4, title:"Eloquent JavaScript", author:"John Doe", releaseDate:"2013", keywords:"JavaScript Programming"}
                    ];

                    collection.forEach(function(item){
                        var book = new Books(item);
                        book.save();
                    });
                    res.send("AHORA HAY DATA");
                }else{
                    res.send("HEY HAY DATA");
                }

            } else {
                console.log('ERROR: ' + err);
            }
        });
}
    //GET - Return a TVShow with specified ID
    resetBooks = function(req, res) {
        Books.find(function(err, books) {
            books.forEach(function(item){
                item.remove();
            });
        });
        res.send("YA NO HAY DATA");
    }


    app.get('/books', findAllBooks);
    app.get('/books/check', checkBooks);
    app.get('/books/reset', resetBooks);
    app.get('/books/:id', findById);
    app.post('/books', addBook);
    app.put('/books/:id', updateBook);
    app.delete('/books/:id', deleteBook);
}