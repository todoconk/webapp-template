/*
 * Copyright (C) hoatle
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
 * The Default controller if there is no controller matching by the router.
 */
define(
  [
    'jquery',
    'underscore',
    'backbone',
    'controller/Controller',
    'view/DefaultView'
  ],
  function($, _, Backbone, Controller, DefaultView) {

    return Controller.extend({

      index: function(params) {
        var defaultView = new DefaultView({
          $container: $('.watpl-container')
        });
        defaultView.render();
      }
    });

  }
);