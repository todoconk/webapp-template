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
    'model/Model'
    ],
    function($, _, Backbone, Model) {

        return Model.extend({
            // We can pass it default values.
            defaults : {
                title:"Some title defaults",
                author:"John Doe",
                releaseDate:"2012",
                keywords:"JavaScript Programming"
            },

            url : function() {
                // Important! It's got to know where to send its REST calls. 
                // In this case, POST to '/donuts' and PUT to '/donuts/:id'
                return this.id ? '/donuts/' + this.id : '/donuts'; 
            } ,
            initialize: function() {

            }
        });
    }
    );