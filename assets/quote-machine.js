"use strict";



define('quote-machine/app', ['exports', 'quote-machine/resolver', 'ember-load-initializers', 'quote-machine/config/environment'], function (exports, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var App = void 0;

  // Ember.MODEL_FACTORY_INJECTIONS = true;

  App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
define('quote-machine/components/canvas-thing', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var WIDTH = 120;
  var HEIGHT = 160;
  var MAX_WIDTH = 100;
  var FONT_SIZE = 15;
  var LINE_HEIGHT = FONT_SIZE + 5;
  var SCALE = 2;

  var CANVAS_WIDTH = WIDTH * SCALE;
  var CANVAS_HEIGHT = HEIGHT * SCALE;
  var MAX_WIDTHX = MAX_WIDTH * SCALE;
  var LINE_HEIGHTX = LINE_HEIGHT * SCALE;
  var FONT_SIZEX = FONT_SIZE * SCALE;
  var TOP = CANVAS_HEIGHT / 2 - HEIGHT;
  var LEFT = CANVAS_WIDTH / 2;

  exports.default = Ember.Component.extend({
    tagName: 'canvas',
    didInsertElement: function didInsertElement() {
      this.draw();
    },
    didUpdateAttrs: function didUpdateAttrs() {
      this.draw();
    },
    draw: function draw() {
      var canvas = this.get('element');
      canvas.width = CANVAS_WIDTH;
      canvas.height = CANVAS_HEIGHT;
      canvas.margin = "5px";
      var ctx = canvas.getContext("2d");
      ctx.beginPath();
      ctx.rect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.fillStyle = this.get('bg');
      ctx.fill();
      ctx.fillStyle = this.get('fg');
      ctx.font = FONT_SIZEX + 'px ' + this.get('font');
      this.wrapText(ctx, this.get('quote'), LEFT, TOP, MAX_WIDTHX, LINE_HEIGHTX);
    },
    wrapText: function wrapText(context, text, x, y, maxWidth, lineHeight) {
      var words = text.split(' ');
      var line = '';

      for (var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = context.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
          context.textAlign = "center";
          context.fillText(line, x, y);
          line = words[n] + ' ';
          y += lineHeight;
        } else {
          line = testLine;
        }
      }
      context.fillText(line, x, y);
    }
  });
});
define('quote-machine/components/large-canvas', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    tagName: 'canvas',
    classNames: ['large-canvas'],
    didInsertElement: function didInsertElement() {
      this.drawCanvas();
    },
    didUpdateAttrs: function didUpdateAttrs() {

      this.drawCanvas();
    },
    wrapText: function wrapText(context, text, x, y, maxWidth, lineHeight) {
      var words = text.split(' ');
      var line = '';

      for (var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = context.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
          context.textAlign = "center";
          context.fillText(line, x, y);
          line = words[n] + ' ';
          y += lineHeight;
        } else {
          line = testLine;
        }
      }
      context.fillText(line, x, y);
    },
    drawCanvas: function drawCanvas() {

      var bg = this.get('bg');
      var fg = this.get('fg');
      var fontSize = this.get('fontSize');
      var font = this.get('font');
      var quote = this.get('quote');
      var lineHeight = Number(fontSize) + 40;

      var canvas = this.get('element');

      canvas.width = 1200;
      canvas.height = 1600;
      canvas.margin = "5px";
      var ctx = canvas.getContext("2d");
      ctx.beginPath();
      ctx.rect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = bg;
      ctx.fill();

      ctx.fillStyle = fg;
      ctx.strokeStyle = fg;
      ctx.lineWidth = 10;
      ctx.strokeRect(50, 50, 1100, 1500);
      // ctx.fillText('"',600,100);
      ctx.font = fontSize + 'px ' + font;
      this.wrapText(ctx, quote, 600, 300, 1000, lineHeight);
    },
    drawRect: function drawRect(ctx, x, y, width, height, bg) {
      ctx.beginPath();
      ctx.rect(x, y, width, height);
      ctx.fillStyle = bg;
      ctx.fill();
    }
  });
});
define('quote-machine/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _welcomePage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
});
define('quote-machine/constants/fonts', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var fonts = ['Roboto', 'Baloo Bhai', 'Kaushan Script', 'Lobster', 'Merienda', 'Pacifico'];

  exports.default = fonts;
});
define("quote-machine/constants/palettes", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var palettes = [{
    name: "Giant Goldfish",
    colors: "#69D2E7,#A7DBD8,#E0E4CC,#F38630,#FA6900"
  }, {
    name: "(???)",
    colors: "#FE4365,#FC9D9A,#F9CDAD,#C8C8A9,#83AF9B"
  }, {
    name: "Thought Provoking",
    colors: "#ECD078,#D95B43,#C02942,#542437,#53777A"
  }, {
    name: "Adrift in Dreams",
    colors: "#CFF09E,#A8DBA8,#79BD9A,#3B8686,#0B486B"
  }, {
    name: "cheer up emo kid",
    colors: "#556270,#4ECDC4,#C7F464,#FF6B6B,#C44D58"
  }, {
    name: "let them eat cake",
    colors: "#774F38,#E08E79,#F1D4AF,#ECE5CE,#C5E0DC"
  }, {
    name: "Terra?",
    colors: "#E8DDCB,#CDB380,#036564,#033649,#031634"
  }, {
    name: "Melon Ball",
    colors: "#D1F2A5,#EFFAB4,#FFC48C,#FF9F80,#F56991"
  }, {
    name: '(?"?)',
    colors: "#490A3D,#BD1550,#E97F02,#F8CA00,#8A9B0F"
  }, {
    name: "i demand a pancake",
    colors: "#594F4F,#547980,#45ADA8,#9DE0AD,#E5FCC2"
  }, {
    name: "Ocean Five",
    colors: "#00A0B0,#6A4A3C,#CC333F,#EB6841,#EDC951"
  }];

  exports.default = palettes;
});
define('quote-machine/controllers/application', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({});
});
define('quote-machine/controllers/enlarge', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    queryParams: ['fg', 'bg', 'font', 'quote'],
    fontSize: 50
  });
});
define('quote-machine/controllers/index', ['exports', 'quote-machine/constants/palettes', 'quote-machine/constants/fonts'], function (exports, _palettes, _fonts) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    palettes: _palettes.default,
    fonts: _fonts.default,
    themes: Ember.computed('currentTheme', function () {
      var palette = this.get('currentTheme');
      var colors = palette.split(",");
      var themes = this.makePairs(colors);
      return themes;
    }),
    init: function init() {
      this.set('currentTheme', _palettes.default[0].colors);
      this.set('font', 'Roboto');
      this.set('quote', 'Make a user interface as consistent and as predictable as possible.');
    },

    actions: {
      setTheme: function setTheme(selected) {
        this.set('currentTheme', selected);
      },
      setFont: function setFont(selected) {
        this.set('font', selected);
      }
    },
    makePairs: function makePairs(a) {
      var pairs = [];

      a.forEach(function (x) {
        var filtered = a.filter(function (y) {
          return x != y;
        });
        filtered.forEach(function (z) {
          var pair = [x, z];
          pairs.push(pair);
        });
      });

      return pairs;
    }
  });
});
define('quote-machine/helpers/app-version', ['exports', 'quote-machine/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _environment, _regexp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appVersion = appVersion;
  function appVersion(_) {
    var hash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var version = _environment.default.APP.version;
    // e.g. 1.0.0-alpha.1+4jds75hf

    // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility
    var versionOnly = hash.versionOnly || hash.hideSha;
    var shaOnly = hash.shaOnly || hash.hideVersion;

    var match = null;

    if (versionOnly) {
      if (hash.showExtended) {
        match = version.match(_regexp.versionExtendedRegExp); // 1.0.0-alpha.1
      }
      // Fallback to just version
      if (!match) {
        match = version.match(_regexp.versionRegExp); // 1.0.0
      }
    }

    if (shaOnly) {
      match = version.match(_regexp.shaRegExp); // 4jds75hf
    }

    return match ? match[0] : version;
  }

  exports.default = Ember.Helper.helper(appVersion);
});
define('quote-machine/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _pluralize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pluralize.default;
});
define('quote-machine/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _singularize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _singularize.default;
});
define('quote-machine/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'quote-machine/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var name = void 0,
      version = void 0;
  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
define('quote-machine/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('quote-machine/initializers/data-adapter', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('quote-machine/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _setupContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
});
define('quote-machine/initializers/export-application-global', ['exports', 'quote-machine/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('quote-machine/initializers/injectStore', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('quote-machine/initializers/store', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('quote-machine/initializers/transforms', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define("quote-machine/instance-initializers/ember-data", ["exports", "ember-data/initialize-store-service"], function (exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: "ember-data",
    initialize: _initializeStoreService.default
  };
});
define('quote-machine/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
define('quote-machine/router', ['exports', 'quote-machine/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {
    this.route('enlarge');
  });

  exports.default = Router;
});
define('quote-machine/routes/enlarge', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    queryParams: {
      fg: {
        refreshModel: true
      },
      bg: {
        refreshModel: true
      },
      font: {
        refreshModel: true
      },
      quote: {
        refreshModel: true
      }
    }

  });
});
define('quote-machine/routes/index', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
define('quote-machine/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
define("quote-machine/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "UdB6YMdv", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"container\"],[13],[0,\"\\n  \"],[11,\"h1\",[]],[13],[0,\"Quotes Machine\"],[14],[0,\"\\n  \"],[1,[26,[\"outlet\"]],false],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "quote-machine/templates/application.hbs" } });
});
define("quote-machine/templates/components/canvas-thing", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "Fa9wfycr", "block": "{\"statements\":[[18,\"default\"],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"hasPartials\":false}", "meta": { "moduleName": "quote-machine/templates/components/canvas-thing.hbs" } });
});
define("quote-machine/templates/components/large-canvas", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "Qmu/JNJ7", "block": "{\"statements\":[[18,\"default\"],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"hasPartials\":false}", "meta": { "moduleName": "quote-machine/templates/components/large-canvas.hbs" } });
});
define("quote-machine/templates/enlarge", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "84/R33ZA", "block": "{\"statements\":[[11,\"input\",[]],[15,\"type\",\"range\"],[15,\"class\",\"form-control\"],[16,\"value\",[26,[\"fontSize\"]],null],[15,\"min\",\"10\"],[15,\"max\",\"200\"],[16,\"oninput\",[33,[\"action\"],[[28,[null]],[33,[\"mut\"],[[28,[\"fontSize\"]]],null]],[[\"value\"],[\"target.value\"]]],null],[13],[14],[0,\"\\n\"],[1,[33,[\"large-canvas\"],null,[[\"fg\",\"bg\",\"font\",\"quote\",\"fontSize\"],[[28,[\"fg\"]],[28,[\"bg\"]],[28,[\"font\"]],[28,[\"quote\"]],[28,[\"fontSize\"]]]]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "quote-machine/templates/enlarge.hbs" } });
});
define("quote-machine/templates/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "mOuRQx3C", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"row\"],[13],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"col-md\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"form-group\"],[13],[0,\"\\n      \"],[11,\"label\",[]],[13],[0,\"Palette:\"],[14],[0,\"\\n      \"],[11,\"select\",[]],[15,\"id\",\"lstPalettes\"],[15,\"class\",\"form-control\"],[16,\"onchange\",[33,[\"action\"],[[28,[null]],\"setTheme\"],[[\"value\"],[\"target.value\"]]],null],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"palettes\"]]],null,{\"statements\":[[0,\"          \"],[11,\"option\",[]],[16,\"value\",[34,[[28,[\"p\",\"colors\"]]]]],[13],[1,[28,[\"p\",\"name\"]],false],[14],[0,\"\\n\"]],\"locals\":[\"p\"]},null],[0,\"      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"col-md-6\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"form-group\"],[13],[0,\"\\n      \"],[11,\"label\",[]],[13],[0,\"Quote:\"],[14],[0,\"\\n      \"],[1,[33,[\"textarea\"],null,[[\"value\",\"class\",\"cols\",\"rows\"],[[28,[\"quote\"]],\"form-control\",\"60\",\"5\"]]],false],[0,\"\\n    \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"col-md\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"form-group\"],[13],[0,\"\\n      \"],[11,\"label\",[]],[13],[0,\"Font:\"],[14],[0,\"\\n      \"],[11,\"select\",[]],[15,\"id\",\"lstFonts\"],[15,\"class\",\"form-control\"],[16,\"onchange\",[33,[\"action\"],[[28,[null]],\"setFont\"],[[\"value\"],[\"target.value\"]]],null],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"fonts\"]]],null,{\"statements\":[[0,\"          \"],[11,\"option\",[]],[16,\"value\",[34,[[28,[\"f\"]]]]],[13],[1,[28,[\"f\"]],false],[14],[0,\"\\n\"]],\"locals\":[\"f\"]},null],[0,\"      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"id\",\"canvas-wrapper\"],[15,\"class\",\"row\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"themes\"]]],null,{\"statements\":[[0,\"      \"],[11,\"div\",[]],[15,\"class\",\"flex-container\"],[13],[0,\"\\n        \"],[1,[33,[\"canvas-thing\"],null,[[\"fg\",\"bg\",\"font\",\"quote\"],[[33,[\"get\"],[[28,[\"t\"]],\"0\"],null],[33,[\"get\"],[[28,[\"t\"]],\"1\"],null],[28,[\"font\"]],[28,[\"quote\"]]]]],false],[0,\"\\n        \"],[6,[\"link-to\"],[\"enlarge\",[33,[\"query-params\"],null,[[\"fg\",\"bg\",\"font\",\"quote\"],[[33,[\"get\"],[[28,[\"t\"]],\"0\"],null],[33,[\"get\"],[[28,[\"t\"]],\"1\"],null],[28,[\"font\"]],[28,[\"quote\"]]]]]],null,{\"statements\":[[0,\"Enlarge\"]],\"locals\":[]},null],[0,\"\\n      \"],[14],[0,\"\\n\"]],\"locals\":[\"t\"]},null],[0,\"  \"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "quote-machine/templates/index.hbs" } });
});


define('quote-machine/config/environment', ['ember'], function(Ember) {
  var prefix = 'quote-machine';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("quote-machine/app")["default"].create({"name":"quote-machine","version":"0.0.0+b2db5577"});
}
//# sourceMappingURL=quote-machine.map
