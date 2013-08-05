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
    'view/books/IndexView',
    'text!../../template/books/ItemTemplate.html'
    ],
    function(IndexView, textTemplate) {

        return IndexView.extend({
            textTemplate: textTemplate,
            events : {
                'click button.btn-remove' : 'removeItem',
                'click button.btn-edit' : 'editItem'
            },
            editItem : function () {
                
            },
            removeItem : function () {
                if(!confirm("Are you sure?")){
                    return;
                }
                this.destroy();
            },
            afterRender: function() {
                this.modelBinder.bind(this.model, this.$el);
            }
        });
    }
    );