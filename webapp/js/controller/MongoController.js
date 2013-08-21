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
    'collection/MongoCollection',
    'model/MongoModel',
    'view/mongo/IndexView',
    'view/mongo/ItemView'
    ],
    function($, _, Backbone, Controller, MongoCollection, MongoModel, IndexView, ItemView) {

        return Controller.extend({
            initialize: function(){
                this.collection = new MongoCollection();
                this.model = new MongoModel();
            },
            renderItem: function(){
                return new ItemView({
                    $container: $('.books'),
                    appendable: true,
                    model: this.model
                });
            },
            index: function() {
                var self = this;

                var indexView = new IndexView({
                    $container: $('.watpl-container')
                }).render();

                this.collection.fetch({ success: function(data, status, xhr){
                    _.each(data.models, function(item){
                        self.model = item;
                        self.renderItem().render();
                    }, this);
                }});
                
            }
        });
    }
    );