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
* The Collection to be extended for concrete Collection.
*/
define(
    [
    'jquery',
    'underscore',
    'backbone'
    ],
    function($, _, Backbone) {

        return Backbone.Collection.extend({
            initialize: function() {

            },
            /*
            fetch: function() {         
                typeof(options) != 'undefined' || (options = {});
                options.success = this.postProcess;
                options.error = this.handleError;
                return Backbone.Collection.prototype.fetch.call(this, options);    
            },
            */
            postProcess: function(data, status, xhr){
                this.models = data.models;
            }, 
            handleError : function (data, status, xhr) {
                alert("UPS!!");
            }
        });
    }
    );