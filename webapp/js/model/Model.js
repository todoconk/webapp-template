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
* The Model to be extended for concrete model.
*/
define(
    [
    'jquery',
    'underscore',
    'backbone',
    ],
    function($, _, Backbone) {
        
        Backbone.emulateHTTP = false;
        
        return Backbone.Model.extend({

            __initialize: function () {
                var self = this; 
                this.socket = io.connect('http://localhost');
                this.socket.on('connected', function () {
                    console.log("Hey I'm connected!");
                });
                this.socket.on('news', function (data) {
                    console.log("Response: " + data.hello);
                    self.set( "name", data.hello );
                    console.log("Verify: " +  self.get("name"));
                });
            },
            handle_news: function(){
                console.log("Good News!!!");
            },
            initialize: function() {
                this.__initialize();

                this.bind("news", this.handle_news, this);

                this.bind("change", function(){
                    console.log("Emitting: " + this.get("name"));
                    this.socket.emit('news', { hello: this.get("name") });
                });
            }
        });
    }
    );