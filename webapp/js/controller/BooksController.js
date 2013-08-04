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
    'view/books/IndexView',
    'view/books/ItemView'
    ],
    function($, _, Backbone, Controller, BooksCollection, IndexView, ItemView) {

        return Controller.extend({
            initialize: function(){
                var books = [
                {id: "1", title:"JS the good parts", author:"John Doe", releaseDate:"2009", keywords:"JavaScript Programming"},
                {id: "2", title:"CS the better parts", author:"John Doe", releaseDate:"2010", keywords:"CoffeeScript Programming"},
                {id: "3", title:"Scala for the impatient", author:"John Doe", releaseDate:"2011", keywords:"Scala Programming"},
                {id: "4", title:"American Psyco", author:"Bret Easton Ellis", releaseDate:"2012", keywords:"Novel Splatter"},
                {id: "5", title:"Eloquent JavaScript", author:"John Doe", releaseDate:"2013", keywords:"JavaScript Programming"}
                ];

                this.collection = new BooksCollection(books);
            },
            renderItem: function(item){
                var itemView = new ItemView({
                    $container: $('.container-fluid'),
                    appendable: true,
                    model: item
                }).render();
            },
            index: function() {
                var indexView = new IndexView({});

                var self = this;
                _.each(this.collection.models, function(item){
                    self.renderItem(item);
                }, this);

                indexView.render();
            }
        });

}
);