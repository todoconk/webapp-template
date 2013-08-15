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
 * The Books view
 */
 define(
    [
    'jquery',
    'underscore',
    'backbone',
    'view/BaseView',
    'text!../../template/books/FormTemplate.html'
    ],
    function($, _, Backbone, BaseView, textTemplate) {

        return BaseView.extend({
            textTemplate: textTemplate,
            events : {
                'submit': 'save'
            },
            afterRender: function() {
                //this.model.on('change', this.render, this);
                this.modelBinder.bind(this.model, this.$el);
            },
            save: function(event){
                event.preventDefault();
                console.log(this.$el.siblings("form"));
                console.log(this.$el.siblings("form").serializeArray());
                //
                var arr = this.$el.serializeArray();
                var data = _(arr).reduce(function(acc, field) {
                  acc[field.name] = field.value;
                  return acc;
              }, {});
            }
        });
}
);