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

/**
* Books controller.
*/
define(
    [
    'jquery',
    'underscore',
    'backbone',
    'controller/Controller',
    'collection/BooksCollection',
    'model/BooksModel',
    'view/BooksView'
    ],
    function($, _, Backbone, Controller, BooksCollection, BooksModel, BooksView) {

        return Controller.extend({
            initialize: function(){
                var books = [{title:"JS the good parts", author:"John Doe", releaseDate:"2009", keywords:"JavaScript Programming"},
                {title:"CS the better parts", author:"John Doe", releaseDate:"2010", keywords:"CoffeeScript Programming"},
                {title:"Scala for the impatient", author:"John Doe", releaseDate:"2011", keywords:"Scala Programming"},
                {title:"American Psyco", author:"Bret Easton Ellis", releaseDate:"2012", keywords:"Novel Splatter"},
                {title:"Eloquent JavaScript", author:"John Doe", releaseDate:"2013", keywords:"JavaScript Programming"}];

                this.collection = new BooksCollection(books);
            },
            renderBook: function(item){
                var booksView = new BooksView({
                    $container: $('.watpl-container'),
                    model: item
                }).render();
            },
            index: function() {
                var self = this;
                _.each(this.collection.models, function(item){
                    console.log(item.attributes);
                    self.renderBook(item);
                }, this);
                
            }
        });

}
);