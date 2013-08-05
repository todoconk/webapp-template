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
* The BaseView to be extended by concrete views.
*
* @author TodoConK
*/

define(
    [
    'jquery',
    'underscore',
    'backbone',
    'handlebars'
    ],
    function($, _, Backbone, HandleBars) {

        return Backbone.View.extend({

            /**
            * The pre-initialize phase for override
            *
            * @param options
            * @return {*}
            */
            beforeInitialize: function(options) {
                return this;
            },

            /**
            * Initializes the view.
            *
            * @param options the options literal object, usually have: $container, model and appendable attribute.
            */
            initialize: function(options) {

                //the global pubSub channel for all views to share common triggers and event handlers.
                //this is useful when there are many nested views and we want to communicate with top most views.
                //very useful for views' communication.
                //@api experimental
                this.pubSubChannel = Backbone.Events;

                //indicates if the view is rendered or not
                this.rendered = false;

                //the modelBinder instance of Backbone.ModelBinder plugin
                this.modelBinder = new Backbone.ModelBinder();

                this.beforeInitialize.apply(this, arguments);

                _.bind(_ensureValid, this);

                this.$container = this.$container || options.$container || null;
                this.model = this.model || options.model || new Backbone.Model();
                this.appendable = this.appendable || options.appendable || false;

                if (this.textTemplate && !this.template) {
                    this.template = HandleBars.compile(this.textTemplate);
                }

                if (this.template) {
                    var model = this.model.toJSON ? this.model.toJSON() : this.model;
                    this.setElement(this.template(model));
                }

                this.afterInitialize.apply(this, arguments);
            },

            /**
            * The after-initialize phase for override
            *
            * @param options
            * @return {*}
            */
            afterInitialize: function(options) {
                return this;
            },

            /**
            * The pre render phase for override
            *
            * @return {*}
            */
            beforeRender: function() {
                return this;
            },

            container: function(){
                return _.isString(this.$container) ? this.$(this.$container) : this.$container;
            },

            /**
            * Renders the view
            * @return {*}
            */
            render: function() {
                this.beforeRender();

                if (_ensureValid()) {
                    var c = this.container();
                    if (this.appendable) {
                        c.append(this.$el);
                    } else {
                        c.html(this.$el);
                    }
                    this.delegateEvents();
                }

                this.afterRender();
                this.rendered = true;
                return this;
            },
            /**
            * The after render phase for override
            *
            * @return {*}
            */
            afterRender: function() {
                return this;
            },

            update: function(model) {
                this.model = model;
                this.destroy();
                this.initialize();
                this.render();
            },

            event: function(action, methodAction) {
                this.events[action] =  methodAction;
            },

            /**
            * Destroy this view
            * //TODO make sure no memory leak for event handling
            */
            destroy: function() {
                this.$el.remove();
            },
            
            remove : function () {
                if(!confirm("Are you sure?")){
                    return;
                }
                var self = this;
                this.model.destroy({
                    success : function () {
                        this.destroy();
                    },
                    error : function () {
                        throw 'this could not be removed';
                    }
                });
            }
        });

function _ensureValid() {
    if (_.isNull(this.$container) || _.isNull(this.el)) {     
        $.log('this.$container or this.el is null, invalid state');
        return false;
    }
    return true;
}
}
);