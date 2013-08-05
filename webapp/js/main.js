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

 (function() {
  'use strict';

  var root = this,
  require = root.require;

  //fake 'has' if it's not available
  var has = root.has = root.has || function() {
    return false;
};

  // Require.js allows us to configure shortcut alias
  require.config({
    paths: {
      'domReady': 'lib/require/plugins/domReady-2.0.1',
      'text': 'lib/require/plugins/text-2.0.3',
      'handlebars': 'lib/handlebars/handlebars-1.0.rc.1',
      'json2': 'lib/json/json2',
      'jquery': 'lib/jquery/jquery-1.7.1',
      'underscore': 'lib/underscore/underscore-1.4.2',
      'backbone': 'lib/backbone/backbone-0.9.2',
      'Backbone.ModelBinder': 'lib/backbone/plugins/Backbone.ModelBinder-0.1.5',
      //'socketio': '/socket.io/socket.io',
      'bootstrap': 'lib/jquery/plugins/bootstrap-2.1.1',
      'jquery.log': 'lib/jquery/plugins/jquery.log-0.1.0',
      //'console': 'lib/window/console'
  },

    waitSeconds: has('prod') ? 2000 : 2, //2000 seconds for prod mode on bootstrap and 2 seconds for dev mode

    shim: {
/*
        'console': {
            exports: 'console'
        },

        'socketio': {
            exports: 'io'
        },
*/
        json2: {
            exports: 'JSON'
        },

        underscore: {
            exports: '_'
        },

        backbone: {
            deps:
            [
            'underscore',
            'jquery'
            ],
            exports: 'Backbone'
        },

        'Backbone.ModelBinder': {
            deps: ['backbone'],
            exports: 'Backbone.ModelBinder'
        },

        handlebars: {
            exports: 'Handlebars'
        },

        //jquery plugins
        'bootstrap': ['jquery'],

        'jquery.log': {
            deps: ['jquery'],
            exports: 'jQuery.fn.log'
        }
    }

});

  //this requires dom ready to update on ui, so this function expression
  //will be implemented later when domReady.
  var updateModuleProgress = function(context, map, depMaps) {
    //when dom is not ready, do something more useful?
    var console = root.console;
    if (console && console.log) {
      console.log('loading: ' + map.name + ' at ' + map.url);
  }
};


require.onResourceLoad = function(context, map, depMaps) {
    updateModuleProgress(context, map, depMaps);
};



require(['domReady'], function(domReady) {
    domReady(function() {
      //re-implement updateModuleProgress here for domReady
      updateModuleProgress = function(context, map, depMaps) {
        var document = root.document;
        var loadingStatusEl = document.getElementById('loading-status'),
        loadingModuleNameEl = document.getElementById('loading-module-name');

        //first load
        if (loadingStatusEl && loadingModuleNameEl) {
          loadingStatusEl.innerHTML = loadingStatusEl.innerHTML += '.'; //add one more dot character
          loadingModuleNameEl.innerHTML = map.name + (map.url ? ' at ' + map.url : '') ;
      } else {

          //TODO later load, must have loading indicator for this then
      }
  };
});
});

  //load jquery plugins, backbone plugins //TODO this is a bit ugly
  require(
    [
    'jquery',
    'bootstrap',
    'jquery.log',
    'backbone',
    'Backbone.ModelBinder'
    ],
    function($) {

      //if it's prod mode, set log level to 'info'
      if (has('prod')) {
        $.log.setLevel($.log.LEVEL.INFO);
    }

      //boot the application
      
      require(['app'], function(app) {
        app.initialize();
    });
  }
  );

}).call(this);





