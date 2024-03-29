(() => {
  // app/main/components/PostModel.js
  var PostModel = class {
    id = 0;
    name = null;
    child = null;
  };

  // app/main/components/UserModel.js
  var UserModel = class {
    id = null;
    name = null;
  };

  // app/main/components/ExampleInterceptor.js
  var ExampleInterceptor = class {
    request(request, handler) {
      var $this = this;
      var newRequest = request.withHeader("X-Test-ID", "mytoken");
      handler.next(newRequest);
    }
    response(response, handler) {
      var $this = this;
      var nextResponse = response.withBody("Access denied").withStatus(400);
      handler.next(nextResponse);
    }
  };

  // app/main/resources/index.js
  var resources = {
    componentsPath: "/assets/viewi-demo/viewi.demo.json",
    publicPath: "/assets/viewi-demo/",
    name: "demo",
    minify: false,
    combine: false,
    appendVersion: false,
    build: "I6mUEKDi",
    version: "2.0.0"
  };

  // viewi/core/di/register.ts
  var register = window.ViewiApp ? window.ViewiApp[resources.name].register : {};

  // app/main/components/SessionInterceptor.js
  var HttpClient = register.HttpClient;
  var SessionInterceptor = class {
    CSRFToken = null;
    http = null;
    constructor(http) {
      var $this = this;
      $this.http = http;
    }
    request(request, handler) {
      var $this = this;
      if ($this.CSRFToken === null) {
        $this.http.post("/api/session").then(function(session) {
          $this.CSRFToken = session["CSRFToken"];
          $this.handleRequest(request, handler);
        }, function() {
          handler.reject(request);
        });
      } else {
        $this.handleRequest(request, handler);
      }
    }
    handleRequest(request, handler) {
      var $this = this;
      var newRequest = request.withHeader("X-CSRF-TOKEN", $this.CSRFToken);
      handler.next(newRequest);
    }
    response(response, handler) {
      var $this = this;
      if (response.status === 0) {
        response.status = 200;
        response.body = new PostModel();
        response.body.id = 0;
        response.body.name = "Mockup Post due to rejected request";
      } else {
        response.body.id += 1e3;
      }
      handler.next(response);
    }
  };

  // app/main/components/MemberGuard.js
  var MemberGuard = class {
    run(c) {
      var $this = this;
      c.next();
    }
  };

  // app/main/components/Subscription.js
  var Subscription = class {
    subscriber = null;
    notifyCallback = null;
    constructor(subscriber, notifyCallback) {
      var $this = this;
      $this.subscriber = subscriber;
      $this.notifyCallback = notifyCallback;
    }
    unsubscribe() {
      var $this = this;
      $this.subscriber.unsubscribe($this);
    }
  };

  // app/main/functions/array_search.js
  function array_search(needle, haystack, argStrict) {
    const strict = !!argStrict;
    let key = "";
    if (typeof needle === "object" && needle.exec) {
      if (!strict) {
        const flags = "i" + (needle.global ? "g" : "") + (needle.multiline ? "m" : "") + // sticky is FF only
        (needle.sticky ? "y" : "");
        needle = new RegExp(needle.source, flags);
      }
      for (key in haystack) {
        if (haystack.hasOwnProperty(key)) {
          if (needle.test(haystack[key])) {
            return key;
          }
        }
      }
      return false;
    }
    for (key in haystack) {
      if (haystack.hasOwnProperty(key)) {
        if (strict && haystack[key] === needle || !strict && haystack[key] == needle) {
          return key;
        }
      }
    }
    return false;
  }

  // app/main/functions/is_int.js
  function is_int(mixedVar) {
    return mixedVar === +mixedVar && isFinite(mixedVar) && !(mixedVar % 1);
  }

  // app/main/functions/array_splice.js
  function array_splice(arr, offst, lgth, replacement) {
    var _checkToUpIndices = function(arr2, ct, key) {
      if (arr2[ct] !== void 0) {
        const tmp = ct;
        ct += 1;
        if (ct === key) {
          ct += 1;
        }
        ct = _checkToUpIndices(arr2, ct, key);
        arr2[ct] = arr2[tmp];
        delete arr2[tmp];
      }
      return ct;
    };
    if (replacement && typeof replacement !== "object") {
      replacement = [replacement];
    }
    if (lgth === void 0) {
      lgth = offst >= 0 ? arr.length - offst : -offst;
    } else if (lgth < 0) {
      lgth = (offst >= 0 ? arr.length - offst : -offst) + lgth;
    }
    if (Object.prototype.toString.call(arr) !== "[object Array]") {
      let lgt = 0;
      let ct = -1;
      const rmvd = [];
      const rmvdObj = {};
      let replCt = -1;
      let intCt = -1;
      let returnArr = true;
      let rmvdCt = 0;
      let key = "";
      for (key in arr) {
        lgt += 1;
      }
      offst = offst >= 0 ? offst : lgt + offst;
      for (key in arr) {
        ct += 1;
        if (ct < offst) {
          if (isInt(key)) {
            intCt += 1;
            if (parseInt(key, 10) === intCt) {
              continue;
            }
            _checkToUpIndices(arr, intCt, key);
            arr[intCt] = arr[key];
            delete arr[key];
          }
          continue;
        }
        if (returnArr && isInt(key)) {
          rmvd.push(arr[key]);
          rmvdObj[rmvdCt++] = arr[key];
        } else {
          rmvdObj[key] = arr[key];
          returnArr = false;
        }
        if (replacement && replacement[++replCt]) {
          arr[key] = replacement[replCt];
        } else {
          delete arr[key];
        }
      }
      return returnArr ? rmvd : rmvdObj;
    }
    if (replacement) {
      replacement.unshift(offst, lgth);
      return Array.prototype.splice.apply(arr, replacement);
    }
    return arr.splice(offst, lgth);
  }

  // app/main/components/Subscriber.js
  var Subscriber = class {
    dataState = null;
    subscribers = [];
    constructor(defaultValue) {
      var $this = this;
      defaultValue = typeof defaultValue !== "undefined" ? defaultValue : null;
      if (defaultValue !== null) {
        $this.dataState = { "data": defaultValue };
      }
    }
    subscribe(callback) {
      var $this = this;
      var subscription = new Subscription($this, callback);
      $this.subscribers.push(subscription);
      subscription.notifyCallback($this.dataState ? $this.dataState["data"] : null);
      return subscription;
    }
    unsubscribe(subscription) {
      var $this = this;
      var index = array_search(subscription, $this.subscribers);
      if (index !== false) {
        array_splice($this.subscribers, index, 1);
      }
    }
    notify() {
      var $this = this;
      for (var _i0 in $this.subscribers) {
        var subscription = $this.subscribers[_i0];
        subscription.notifyCallback($this.dataState ? $this.dataState["data"] : null);
      }
    }
    reset() {
      var $this = this;
      $this.dataState = null;
      $this.notify();
    }
    publish(data) {
      var $this = this;
      $this.dataState = { "data": data };
      $this.notify();
    }
  };

  // app/main/components/ClientRoute.js
  var Platform = register.Platform;
  var ClientRoute = class {
    urlUpdateSubscriber = null;
    platform = null;
    constructor(platform) {
      var $this = this;
      $this.platform = platform;
      $this.urlUpdateSubscriber = new Subscriber($this.platform.getCurrentUrlPath());
      $this.platform.onUrlUpdate(function() {
        $this.urlUpdateSubscriber.publish($this.platform.getCurrentUrlPath());
      });
    }
    navigateBack() {
      var $this = this;
      $this.platform.navigateBack();
    }
    navigate(url) {
      var $this = this;
      $this.platform.redirect(url);
    }
    getUrl() {
      var $this = this;
      return $this.platform.getCurrentUrl();
    }
    getUrlPath() {
      var $this = this;
      return $this.platform.getCurrentUrlPath();
    }
    getQueryParams() {
      var $this = this;
      return $this.platform.getQueryParams();
    }
    urlWatcher() {
      var $this = this;
      return $this.urlUpdateSubscriber;
    }
  };

  // app/main/components/MemberGuardNoAccess.js
  var MemberGuardNoAccess = class {
    route = null;
    constructor(route) {
      var $this = this;
      $this.route = route;
    }
    run(c) {
      var $this = this;
      c.next(false);
      $this.route.navigate("/");
    }
  };

  // app/main/components/CounterReducer.js
  var CounterReducer = class {
    count = 0;
    increment() {
      var $this = this;
      $this.count++;
    }
    decrement() {
      var $this = this;
      $this.count--;
    }
  };

  // app/main/components/TodoReducer.js
  var TodoReducer = class {
    items = [];
    addNewItem(text) {
      var $this = this;
      $this.items = [...$this.items, text];
    }
  };

  // viewi/core/component/baseComponent.ts
  var BaseComponent = class {
    __id = "";
    _props = {};
    $_callbacks = {};
    _refs = {};
    _slots = {};
    _element = null;
    $$t = [];
    // template inline expressions
    $$r = {};
    // reactivity callbacks
    $$p = [];
    // shared reactivity track ids
    $;
    _name = "BaseComponent";
    emitEvent(name, event) {
      if (name in this.$_callbacks) {
        this.$_callbacks[name](event);
      }
    }
  };

  // app/main/components/DemoContainer.js
  var DemoContainer = class extends BaseComponent {
    _name = "DemoContainer";
  };

  // app/main/functions/json_encode.js
  function json_encode(mixedVal) {
    const $global = typeof window !== "undefined" ? window : global;
    $global.$locutus = $global.$locutus || {};
    const $locutus = $global.$locutus;
    $locutus.php = $locutus.php || {};
    const json = $global.JSON;
    let retVal;
    try {
      if (typeof json === "object" && typeof json.stringify === "function") {
        retVal = json.stringify(mixedVal);
        if (retVal === void 0) {
          throw new SyntaxError("json_encode");
        }
        return retVal;
      }
      const value = mixedVal;
      const quote = function(string) {
        const escapeChars = [
          "\0-",
          "\x7F-\x9F",
          "\xAD",
          "\u0600-\u0604",
          "\u070F",
          "\u17B4",
          "\u17B5",
          "\u200C-\u200F",
          "\u2028-\u202F",
          "\u2060-\u206F",
          "\uFEFF",
          "\uFFF0-\uFFFF"
        ].join("");
        const escapable = new RegExp('[\\"' + escapeChars + "]", "g");
        const meta = {
          // table of character substitutions
          "\b": "\\b",
          "	": "\\t",
          "\n": "\\n",
          "\f": "\\f",
          "\r": "\\r",
          '"': '\\"',
          "\\": "\\\\"
        };
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function(a) {
          const c = meta[a];
          return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
      };
      var _str = function(key, holder) {
        let gap = "";
        const indent = "    ";
        let i = 0;
        let k = "";
        let v = "";
        let length = 0;
        const mind = gap;
        let partial = [];
        let value2 = holder[key];
        if (value2 && typeof value2 === "object" && typeof value2.toJSON === "function") {
          value2 = value2.toJSON(key);
        }
        switch (typeof value2) {
          case "string":
            return quote(value2);
          case "number":
            return isFinite(value2) ? String(value2) : "null";
          case "boolean":
            return String(value2);
          case "object":
            if (!value2) {
              return "null";
            }
            gap += indent;
            partial = [];
            if (Object.prototype.toString.apply(value2) === "[object Array]") {
              length = value2.length;
              for (i = 0; i < length; i += 1) {
                partial[i] = _str(i, value2) || "null";
              }
              v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]";
              return v;
            }
            for (k in value2) {
              if (Object.hasOwnProperty.call(value2, k)) {
                v = _str(k, value2);
                if (v) {
                  partial.push(quote(k) + (gap ? ": " : ":") + v);
                }
              }
            }
            v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}";
            return v;
          case "undefined":
          case "function":
          default:
            throw new SyntaxError("json_encode");
        }
      };
      return _str("", {
        "": value
      });
    } catch (err) {
      if (!(err instanceof SyntaxError)) {
        throw new Error("Unexpected error type in json_encode()");
      }
      $locutus.php.last_error_json = 4;
      return null;
    }
  }

  // app/main/components/ViewiIcon.js
  var ViewiIcon = class extends BaseComponent {
    _name = "ViewiIcon";
  };

  // app/main/components/MenuBar.js
  var MenuBar = class extends BaseComponent {
    _name = "MenuBar";
    route = null;
    constructor(route) {
      super();
      var $this = this;
      $this.route = route;
    }
    goHome() {
      var $this = this;
      $this.route.navigate("/");
    }
    back() {
      var $this = this;
      $this.route.navigateBack();
    }
    getCurrentUrl() {
      var $this = this;
      return $this.route.getUrlPath();
    }
    getQueryParams() {
      var $this = this;
      return $this.route.getQueryParams();
    }
  };
  var MenuBar_x = [
    function(_component) {
      return function(event) {
        _component.goHome(event);
      };
    },
    function(_component) {
      return function(event) {
        _component.back(event);
      };
    },
    function(_component) {
      return "\n                Url: " + (_component.getCurrentUrl() ?? "") + "\n            ";
    },
    function(_component) {
      return "\n                Url: " + (json_encode(_component.getQueryParams()) ?? "") + "\n            ";
    }
  ];

  // app/main/functions/strlen.js
  function strlen(string) {
    var str = string + "";
    return str.length;
  }

  // app/main/components/Counter.js
  var Counter = class extends BaseComponent {
    _name = "Counter";
    count = 0;
    message = "My message";
    increment() {
      var $this = this;
      $this.count++;
      $this.message += "!";
    }
    decrement() {
      var $this = this;
      $this.count--;
    }
  };
  var Counter_x = [
    function(_component) {
      return function(event) {
        _component.decrement();
      };
    },
    function(_component) {
      return _component.count % 10 + 12;
    },
    function(_component) {
      return "\n    Count " + (_component.count ?? "") + " " + (strlen(_component.message) ?? "") + "\n";
    },
    function(_component) {
      return "\nCount " + (_component.count ?? "") + " strlen:" + (strlen(_component.message) ?? "") + "\n";
    },
    function(_component) {
      return function(event) {
        _component.count++;
      };
    },
    function(_component) {
      return function(event) {
        _component.increment();
      };
    },
    function(_component) {
      return function(event) {
        _component.increment(event);
      };
    },
    function(_component) {
      return function(event) {
        _component.increment(event);
      };
    },
    function(_component) {
      return _component.message;
    }
  ];

  // app/main/components/ConfigService.js
  var Platform2 = register.Platform;
  var ConfigService = class {
    config = null;
    platform = null;
    constructor(platform) {
      var $this = this;
      $this.platform = platform;
      $this.config = platform.getConfig();
    }
    getAll() {
      var $this = this;
      return $this.config;
    }
    get(name) {
      var $this = this;
      return $this.config[name] ?? null;
    }
    isServer() {
      var $this = this;
      return $this.platform.server;
    }
    isBrowser() {
      var $this = this;
      return $this.platform.browser;
    }
  };

  // app/main/functions/implode.js
  function implode(glue, pieces) {
    let i = "";
    let retVal = "";
    let tGlue = "";
    if (arguments.length === 1) {
      pieces = glue;
      glue = "";
    }
    if (typeof pieces === "object") {
      if (Object.prototype.toString.call(pieces) === "[object Array]") {
        return pieces.join(glue);
      }
      for (i in pieces) {
        retVal += tGlue + pieces[i];
        tGlue = glue;
      }
      return retVal;
    }
    return pieces;
  }

  // app/main/components/CssBundle.js
  var HttpClient2 = register.HttpClient;
  var CssBundle = class extends BaseComponent {
    _name = "CssBundle";
    config = null;
    http = null;
    constructor(config, http) {
      super();
      var $this = this;
      config = typeof config !== "undefined" ? config : null;
      http = typeof http !== "undefined" ? http : null;
      $this.config = config;
      $this.http = http;
    }
    links = [];
    minify = false;
    combine = false;
    inline = false;
    purge = false;
    cssHtml = "<!--- CssBundle not initiated --->";
    mounted() {
      var $this = this;
      var baseUrl = $this.config.get("assetsUrl");
      if ($this.combine) {
        var cssBundleList = $this.config.get("cssBundle");
        var version = $this.version();
        if (!(version in cssBundleList)) {
          throw new Exception("Css bundle not found");
        }
        var cssFile = baseUrl + cssBundleList[version];
        if ($this.inline) {
          $this.cssHtml = '<style data-keep="' + version + '"> /** loading ' + cssFile + " **/ </style>";
          $this.http.get(cssFile).then(function(css) {
            $this.cssHtml = '<style data-keep="' + version + '">' + css + "</style>";
          }, function() {
            $this.cssHtml = '<style data-keep="' + version + '"> /** Error loading ' + cssFile + " **/ </style>";
          });
          return;
        }
        $this.cssHtml = '<link rel="stylesheet" href="' + cssFile + '">';
      } else {
        var cssHtml = "";
        for (var _i0 in $this.links) {
          var link = $this.links[_i0];
          cssFile = baseUrl + link;
          cssHtml += '<link rel="stylesheet" href="' + cssFile + '">';
          $this.cssHtml = cssHtml;
        }
      }
    }
    version() {
      var $this = this;
      var key = implode("|", $this.links);
      key += $this.minify ? "1" : "0";
      key += $this.inline ? "1" : "0";
      key += $this.purge ? "1" : "0";
      key += $this.combine ? "1" : "0";
      return key;
    }
  };
  var CssBundle_x = [
    function(_component) {
      return _component.cssHtml;
    }
  ];

  // app/main/components/ViewiAssets.js
  var ViewiAssets = class extends BaseComponent {
    _name = "ViewiAssets";
    appPath = "";
    data = '<script data-keep="ViewiAssets">"ViewiAssets";<\/script>';
  };
  var ViewiAssets_x = [
    function(_component) {
      return _component.data;
    },
    function(_component) {
      return _component.appPath;
    }
  ];

  // app/main/components/Layout.js
  var Portal = register.Portal;
  var Layout = class extends BaseComponent {
    _name = "Layout";
    title = "Viewi";
    assetsUrl = "/";
    constructor(config) {
      super();
      var $this = this;
      $this.assetsUrl = config.get("assetsUrl");
    }
  };
  var Layout_x = [
    function(_component) {
      return "\n        " + (_component.title ?? "") + " | Viewi\n    ";
    },
    function(_component) {
      return ["/mui.css", "/app.css"];
    },
    function(_component) {
      return _component.title;
    }
  ];

  // app/main/components/ExternalHttpPage.js
  var HttpClient3 = register.HttpClient;
  var ExternalHttpPage = class extends BaseComponent {
    _name = "ExternalHttpPage";
    title = "External Http support";
    error = "";
    message = "";
    users = null;
    data = [];
    http = null;
    constructor(http) {
      super();
      var $this = this;
      $this.http = http;
    }
    init() {
      var $this = this;
      $this.message = "Loading..";
      $this.http.post("/api/movies").then(function(response) {
        $this.data = response;
      }, function() {
      }, function() {
      });
    }
  };
  var ExternalHttpPage_x = [
    function(_component) {
      return json_encode(_component.data);
    },
    function(_component) {
      return _component.data;
    },
    function(_component, _key1, item) {
      return item["name"];
    },
    function(_component) {
      return "Message: " + (_component.message ?? "");
    },
    function(_component) {
      return "Error: " + (_component.error ?? "");
    },
    function(_component) {
      return _component.users;
    },
    function(_component) {
      return _component.users;
    },
    function(_component, _key2, user) {
      return user["user_id"];
    },
    function(_component, _key2, user) {
      return user["name"];
    },
    function(_component, _key2, user) {
      return user["email"];
    },
    function(_component, _key2, user) {
      return user["age"];
    },
    function(_component, _key2, user) {
      return user["date_created"];
    }
  ];

  // app/main/components/PanelLayout.js
  var PanelLayout = class extends BaseComponent {
    _name = "PanelLayout";
    title = "Viewi";
    timerId = 0;
    seconds = 0;
    init() {
      var $this = this;
      $this.seconds = 500;
      this.timerId = setInterval(() => $this.tick(), 1e3);
      ;
    }
    destroy() {
      var $this = this;
      clearInterval(this.timerId);
      ;
    }
    tick() {
      var $this = this;
      $this.seconds++;
      console.log("PanelLayout time " + $this.seconds);
      ;
    }
  };
  var PanelLayout_x = [
    function(_component) {
      return _component.seconds;
    },
    function(_component) {
      return _component.title;
    },
    function(_component) {
      return "Panel: " + (_component.seconds ?? "") + " " + (_component.title ?? "");
    }
  ];

  // app/main/components/HomePage.js
  var HomePage = class extends BaseComponent {
    _name = "HomePage";
    title = "Viewi v2 - Build reactive front-end with PHP";
    timerId = 0;
    seconds = 0;
    init() {
      var $this = this;
      $this.seconds = 100;
      this.timerId = setInterval(() => $this.tick(), 1e3);
      ;
    }
    destroy() {
      var $this = this;
      clearInterval(this.timerId);
      ;
    }
    tick() {
      var $this = this;
      $this.seconds++;
      console.log("HomePage time " + $this.seconds);
      ;
    }
  };
  var HomePage_x = [
    function(_component) {
      return _component.title;
    },
    function(_component) {
      return _component.title;
    },
    function(_component) {
      return "Seconds: " + (_component.seconds ?? "");
    }
  ];

  // app/main/components/AreaLayout.js
  var AreaLayout = class extends BaseComponent {
    _name = "AreaLayout";
    title = "Area Layout";
  };
  var AreaLayout_x = [
    function(_component) {
      return "\n        " + (_component.title ?? "") + " | Area\n    ";
    }
  ];

  // app/main/components/NotFoundPage.js
  var NotFoundPage = class extends BaseComponent {
    _name = "NotFoundPage";
  };

  // app/main/components/StatefulCounter.js
  var StatefulCounter = class extends BaseComponent {
    _name = "StatefulCounter";
    counter = null;
    count = null;
    constructor(counter, count2) {
      super();
      var $this = this;
      count2 = typeof count2 !== "undefined" ? count2 : 0;
      $this.counter = counter;
      $this.count = count2;
      $this.counter.count += 100;
    }
  };
  var StatefulCounter_x = [
    function(_component) {
      return function(event) {
        _component.counter.decrement();
      };
    },
    function(_component) {
      return _component.__id;
    },
    function(_component) {
      return _component.counter.count;
    },
    function(_component) {
      return function(event) {
        _component.counter.increment();
      };
    }
  ];

  // app/main/components/CounterPage.js
  var CounterPage = class extends BaseComponent {
    _name = "CounterPage";
  };

  // app/main/components/MemberPage.js
  var MemberPage = class extends BaseComponent {
    _name = "MemberPage";
  };

  // app/main/components/MemberPageNoAccess.js
  var MemberPageNoAccess = class extends BaseComponent {
    _name = "MemberPageNoAccess";
  };

  // app/main/components/PostPage.js
  var HttpClient4 = register.HttpClient;
  var PostPage = class extends BaseComponent {
    _name = "PostPage";
    post = null;
    error = "";
    message = "";
    http = null;
    id = null;
    constructor(http, id) {
      super();
      var $this = this;
      $this.http = http;
      $this.id = id;
    }
    init() {
      var $this = this;
      $this.http.withInterceptor("SessionInterceptor").get("/api/post/" + $this.id).then(function(post) {
        $this.post = post;
        $this.message = "Post has been read successfully";
      }, function() {
        $this.error = "Server error";
      });
    }
  };
  var PostPage_x = [
    function(_component) {
      return _component.post ? _component.post.name : "";
    },
    function(_component) {
      return "Message: " + (_component.message ?? "");
    },
    function(_component) {
      return "Error: " + (_component.error ?? "");
    },
    function(_component) {
      return _component.post;
    },
    function(_component) {
      return "\n            " + (_component.post.id ?? "") + " " + (_component.post.name ?? "") + "\n        ";
    }
  ];

  // app/main/components/TestLayoutPage.js
  var TestLayoutPage = class extends BaseComponent {
    _name = "TestLayoutPage";
  };

  // app/main/functions/count.js
  function count(mixedVar, mode) {
    let key;
    let cnt = 0;
    if (mixedVar === null || typeof mixedVar === "undefined") {
      return 0;
    } else if (mixedVar.constructor !== Array && mixedVar.constructor !== Object) {
      return 1;
    }
    if (mode === "COUNT_RECURSIVE") {
      mode = 1;
    }
    if (mode !== 1) {
      mode = 0;
    }
    for (key in mixedVar) {
      if (mixedVar.hasOwnProperty(key)) {
        cnt++;
        if (mode === 1 && mixedVar[key] && (mixedVar[key].constructor === Array || mixedVar[key].constructor === Object)) {
          cnt += count(mixedVar[key], 1);
        }
      }
    }
    return cnt;
  }

  // app/main/components/TodoList.js
  var TodoList = class extends BaseComponent {
    _name = "TodoList";
    items = null;
  };
  var TodoList_x = [
    function(_component) {
      return _component.items;
    },
    function(_component, _key1, item) {
      return item;
    }
  ];

  // app/main/components/TodoApp.js
  var TodoApp = class extends BaseComponent {
    _name = "TodoApp";
    text = "";
    items = [];
    handleSubmit(event) {
      var $this = this;
      event.preventDefault();
      if (strlen($this.text) == 0) {
        return;
      }
      $this.items = [...$this.items, $this.text];
      $this.text = "";
    }
  };
  var TodoApp_x = [
    function(_component) {
      return function(event) {
        _component.handleSubmit(event);
      };
    },
    function(_component) {
      return [function(_component2) {
        return _component2.text;
      }, function(_component2, value) {
        _component2.text = value;
      }];
    },
    function(_component) {
      return "\n        Add #" + (count(_component.items) + 1) + "\n    ";
    },
    function(_component) {
      return _component.items;
    }
  ];

  // app/main/components/TestInput.js
  var TestInput = class extends BaseComponent {
    _name = "TestInput";
    id = null;
    model = null;
    onInput(event) {
      var $this = this;
      $this.emitEvent("model", event.target.value);
    }
  };
  var TestInput_x = [
    function(_component) {
      return function(event) {
        _component.onInput(event);
      };
    },
    function(_component) {
      return [function(_component2) {
        return _component2.model;
      }, function(_component2, value) {
        _component2.model = value;
      }];
    }
  ];

  // app/main/components/TestButton.js
  var TestButton = class extends BaseComponent {
    _name = "TestButton";
    id = null;
    title = null;
    class = null;
    disabled = false;
    loading = false;
    onClick(event) {
      var $this = this;
      $this.emitEvent("click", event);
    }
  };
  var TestButton_x = [
    function(_component) {
      return _component.id;
    },
    function(_component) {
      return _component.disabled;
    },
    function(_component) {
      return _component.title;
    },
    function(_component) {
      return _component.class;
    },
    function(_component) {
      return function(event) {
        _component.onClick(event);
      };
    },
    function(_component) {
      return " " + (_component.title ?? "") + "\n    ";
    },
    function(_component) {
      return _component.loading;
    }
  ];

  // app/main/components/ItemComponent.js
  var ItemComponent = class extends BaseComponent {
    _name = "ItemComponent";
  };

  // app/main/components/SomeComponent.js
  var SomeComponent = class extends BaseComponent {
    _name = "SomeComponent";
  };

  // app/main/components/TestComponent.js
  var TestComponent = class extends BaseComponent {
    _name = "TestComponent";
    name = "MyName";
    name2 = "";
    _name2_Test = "MyName_2";
    empty = "";
    null = null;
    url = "/home";
    attr = "title";
    event = "(click)";
    arr = ["a", "b", "c"];
    arrWithKeys = { "a": "Apple", "b": "Orange", "c": "Lemon" };
    arrNested = { "a": { "a": "Apple", "b": "Orange", "c": "Lemon" }, "b": { "a": "Apple", "b": "Orange", "c": "Lemon" }, "c": { "a": "Apple", "b": "Orange", "c": "Lemon" } };
    movies = [];
    ifValue = true;
    ifElseValue = true;
    nestedIf = true;
    dynamic = "div";
    dynamic2 = "ItemComponent";
    raw = "<b><i>Raw html text</i></b>";
    isDisabled = true;
    message = "Some message";
    checked = false;
    checked2 = true;
    checkedNames = [];
    picked = "One";
    selected = "";
    selectedList = ["A", "C"];
    user = null;
    NameInput = null;
    testModel = "some test";
    orderTest = [];
    counterReducer = null;
    constructor(counterReducer) {
      super();
      var $this = this;
      $this.counterReducer = counterReducer;
      $this.user = new UserModel();
      $this.user.id = 1;
      $this.user.name = "Miki the cat";
      $this.counterReducer.increment();
    }
    getNames() {
      var $this = this;
      return json_encode($this.checkedNames);
    }
    updateMovies() {
      var $this = this;
      $this.movies = [{ "id": 1, "name": "Inception", "year": 2010 }, { "id": 2, "name": "Interstellar", "year": 2014 }, { "id": 3, "name": "Dunkirk", "year": 2017 }];
      $this.orderTest = ["1", "2", "3"];
    }
    updateMovies2() {
      var $this = this;
      $this.movies = [{ "id": 3, "name": "Dunkirk", "year": 2017 }, { "id": 2, "name": "Interstellar", "year": 2014 }];
      $this.orderTest = ["3", "2", "4", "1"];
    }
    getName(name) {
      var $this = this;
      name = typeof name !== "undefined" ? name : null;
      var sum = (1 + 5) * 10;
      return name ?? "DefaultName";
    }
    addTodo() {
      var $this = this;
      $this.arrNested = { "a": { "a": "Apple", "b": "Orange", "c": "Lemon" }, "d": { "R": "Rat", "T": "Dog", "G": "Cat" }, "b": { "a": "Apple", "b": "Orange", "c": "Lemon" } };
    }
    onEvent(event) {
      var $this = this;
      event.preventDefault();
    }
    toggleIf() {
      var $this = this;
      $this.ifValue = !$this.ifValue;
      $this.arr = $this.ifValue ? ["a", "b", "c"] : ["x", "b", "r"];
    }
    toggleElseIf() {
      var $this = this;
      $this.ifElseValue = !$this.ifElseValue;
    }
  };
  var TestComponent_x = [
    function(_component) {
      return "Tag test " + (_component.name ?? "") + " " + (_component.name2 ?? "") + " " + (_component._name2_Test ?? "");
    },
    function(_component) {
      return "\n    $notAVar " + (_component.getName() ?? "") + " " + (_component.getName(_component.name) ?? "") + "\n    Nested\n    ";
    },
    function(_component) {
      return _component.url;
    },
    function(_component) {
      return _component.empty;
    },
    function(_component) {
      return _component.null;
    },
    function(_component) {
      return _component.attr;
    },
    function(_component) {
      return function(event) {
        expression(event);
      };
    },
    function(_component) {
      return _component.event;
    },
    function(_component) {
      return function(event) {
        _component.onEvent(event);
      };
    },
    function(_component) {
      return function(event) {
        _component.updateMovies(event);
      };
    },
    function(_component) {
      return function(event) {
        _component.updateMovies2(event);
      };
    },
    function(_component) {
      return json_encode(_component.movies);
    },
    function(_component) {
      return _component.movies;
    },
    function(_component, i, item) {
      return i + " " + (item["name"] ?? "");
    },
    function(_component) {
      return _component.orderTest;
    },
    function(_component, _key1, item) {
      return item;
    },
    function(_component) {
      return [function(_component2) {
        return _component2.testModel;
      }, function(_component2, value) {
        _component2.testModel = value;
      }];
    },
    function(_component) {
      return _component.testModel;
    },
    function(_component) {
      return [function(_component2) {
        return _component2.testModel;
      }, function(_component2, value) {
        _component2.testModel = value;
      }];
    },
    function(_component) {
      return function() {
        _component.counterReducer.increment();
      };
    },
    function(_component) {
      return "Clicked " + (_component.counterReducer.count ?? "") + "\n";
    },
    function(_component) {
      return function() {
        _component.counterReducer.increment();
      };
    },
    function(_component) {
      return "Clicked " + (_component.counterReducer.count ?? "");
    },
    function(_component) {
      return function(event) {
        _component.counterReducer.increment(event);
      };
    },
    function(_component) {
      return "Clicked " + (_component.counterReducer.count ?? "");
    },
    function(_component) {
      return _component.__id;
    },
    function(_component) {
      return "First Name (" + (_component.__id ?? "") + ")";
    },
    function(_component) {
      return _component.__id;
    },
    function(_component) {
      return function(event) {
        _component.counterReducer.increment();
      };
    },
    function(_component) {
      return "Clicked " + (_component.counterReducer.count ?? "");
    },
    function(_component) {
      return function(event) {
        _component.nestedIf = !_component.nestedIf;
      };
    },
    function(_component) {
      return _component.nestedIf;
    },
    function(_component) {
      return [function(_component2) {
        return _component2.user.name;
      }, function(_component2, value) {
        _component2.user.name = value;
      }];
    },
    function(_component) {
      return _component.user.name;
    },
    function(_component) {
      return _component.name;
    },
    function(_component) {
      return "Custom " + (_component.name ?? "");
    },
    function(_component) {
      return [function(_component2) {
        return _component2.name;
      }, function(_component2, value) {
        _component2.name = value;
      }];
    },
    function(_component) {
      return [function(_component2) {
        return _component2.name;
      }, function(_component2, value) {
        _component2.name = value;
      }];
    },
    function(_component) {
      return "\n    " + (_component.name ?? "") + "\n";
    },
    function(_component) {
      return [function(_component2) {
        return _component2.name2;
      }, function(_component2, value) {
        _component2.name2 = value;
      }];
    },
    function(_component) {
      return "\n    " + (_component.name2 ?? "") + "\n";
    },
    function(_component) {
      return [function(_component2) {
        return _component2.message;
      }, function(_component2, value) {
        _component2.message = value;
      }];
    },
    function(_component) {
      return _component.message;
    },
    function(_component) {
      return [function(_component2) {
        return _component2.checked;
      }, function(_component2, value) {
        _component2.checked = value;
      }];
    },
    function(_component) {
      return _component.checked;
    },
    function(_component) {
      return [function(_component2) {
        return _component2.checked2;
      }, function(_component2, value) {
        _component2.checked2 = value;
      }];
    },
    function(_component) {
      return _component.checked2;
    },
    function(_component) {
      return [function(_component2) {
        return _component2.checkedNames;
      }, function(_component2, value) {
        _component2.checkedNames = value;
      }];
    },
    function(_component) {
      return [function(_component2) {
        return _component2.checkedNames;
      }, function(_component2, value) {
        _component2.checkedNames = value;
      }];
    },
    function(_component) {
      return [function(_component2) {
        return _component2.checkedNames;
      }, function(_component2, value) {
        _component2.checkedNames = value;
      }];
    },
    function(_component) {
      return "Checked names: " + (_component.getNames() ?? "");
    },
    function(_component) {
      return [function(_component2) {
        return _component2.picked;
      }, function(_component2, value) {
        _component2.picked = value;
      }];
    },
    function(_component) {
      return [function(_component2) {
        return _component2.picked;
      }, function(_component2, value) {
        _component2.picked = value;
      }];
    },
    function(_component) {
      return "Picked: " + (_component.picked ?? "");
    },
    function(_component) {
      return [function(_component2) {
        return _component2.selected;
      }, function(_component2, value) {
        _component2.selected = value;
      }];
    },
    function(_component) {
      return "Selected: " + (_component.selected ?? "");
    },
    function(_component) {
      return [function(_component2) {
        return _component2.selectedList;
      }, function(_component2, value) {
        _component2.selectedList = value;
      }];
    },
    function(_component) {
      return [function(_component2) {
        return _component2.selectedList;
      }, function(_component2, value) {
        _component2.selectedList = value;
      }];
    },
    function(_component) {
      return "Selected: " + (json_encode(_component.selectedList) ?? "");
    },
    function(_component) {
      return _component.isDisabled;
    },
    function(_component) {
      return !_component.isDisabled;
    },
    function(_component) {
      return _component.isDisabled ? " mui-btn" : "";
    },
    function(_component) {
      return _component.isDisabled ? " mui-btn--primary" : "";
    },
    function(_component) {
      return !_component.isDisabled ? " mui-btn--accent" : "";
    },
    function(_component) {
      return function(event) {
        _component.isDisabled = !_component.isDisabled;
      };
    },
    function(_component) {
      return function(event) {
        _component.isDisabled = !_component.isDisabled;
      };
    },
    function(_component) {
      return _component.raw;
    },
    function(_component) {
      return _component.raw;
    },
    function(_component) {
      return function(event) {
        _component.raw = _component.raw[0] === "<" ? "New RAW: <span><i>Another content</i></span>" : "<b><i>Raw html text</i></b>";
      };
    },
    function(_component) {
      return _component.nestedIf;
    },
    function(_component) {
      return _component.name;
    },
    function(_component) {
      return "Custom " + (_component.name ?? "");
    },
    function(_component) {
      return _component.nestedIf;
    },
    function(_component) {
      return { "id": "myid", "title": "Custom " + _component.name, "class": "mui-btn--accent" };
    },
    function(_component) {
      return "\n    Custom " + (_component.name ?? "") + "\n";
    },
    function(_component) {
      return function(event) {
        _component.name = "Viewi Junior";
      };
    },
    function(_component) {
      return function(event) {
        _component.nestedIf = !_component.nestedIf;
      };
    },
    function(_component) {
      return _component.nestedIf;
    },
    function(_component) {
      return "Custom " + (_component.name ?? "") + " Slot";
    },
    function(_component) {
      return _component.nestedIf;
    },
    function(_component) {
      return _component.arrNested;
    },
    function(_component, key, subArr) {
      return "\n    Custom " + (_component.name ?? "") + " Slot\n    ";
    },
    function(_component, key, subArr) {
      return subArr;
    },
    function(_component, key, subArr, subKey, subItem) {
      return key;
    },
    function(_component, key, subArr, subKey, subItem) {
      return subKey;
    },
    function(_component, key, subArr, subKey, subItem) {
      return subItem;
    },
    function(_component, key, subArr, subKey, subItem) {
      return key + ". " + (subKey ?? "") + ". " + (subItem ?? "");
    },
    function(_component, key, subArr) {
      return _component.nestedIf;
    },
    function(_component, key, subArr) {
      return _component.name;
    },
    function(_component) {
      return function(event) {
        _component.nestedIf = !_component.nestedIf;
      };
    },
    function(_component) {
      return function(event) {
        _component.dynamic = _component.dynamic === "div" ? "ItemComponent" : "div";
      };
    },
    function(_component) {
      return "\n" + (_component.dynamic ?? "") + " " + (_component.dynamic2 ?? "") + "\n";
    },
    function(_component) {
      return _component.dynamic;
    },
    function(_component) {
      return "Tag or component " + (_component.dynamic ?? "") + " " + (_component.dynamic2 ?? "");
    },
    function(_component) {
      return _component.dynamic2;
    },
    function(_component) {
      return "Tag or component " + (_component.dynamic ?? "") + " " + (_component.dynamic2 ?? "");
    },
    function(_component) {
      return "Custom " + (_component.name ?? "") + " Slot";
    },
    function(_component) {
      return "Custom " + (_component.name ?? "") + " slot\n        ";
    },
    function(_component) {
      return "Custom header " + (_component.name ?? "") + " inside div";
    },
    function(_component) {
      return "Custom " + (_component.name ?? "") + " footer";
    },
    function(_component) {
      return function(event) {
        _component.addTodo(event);
      };
    },
    function(_component) {
      return _component.nestedIf;
    },
    function(_component) {
      return _component.name;
    },
    function(_component) {
      return _component.ifValue;
    },
    function(_component) {
      return _component.arrNested;
    },
    function(_component, key, subArr) {
      return subArr;
    },
    function(_component, key, subArr, subKey, subItem) {
      return key + ". " + (subKey ?? "") + ". " + (subItem ?? "");
    },
    function(_component) {
      return _component.arr;
    },
    function(_component, _key2, item) {
      return _component.ifElseValue;
    },
    function(_component, _key2, item) {
      return item;
    },
    function(_component, _key2, item) {
      return item;
    },
    function(_component, _key2, item) {
      return item;
    },
    function(_component, _key2, item) {
      return _component.nestedIf;
    },
    function(_component, _key2, item) {
      return _component.name;
    },
    function(_component) {
      return _component.arr;
    },
    function(_component, index, item) {
      return index;
    },
    function(_component, index, item) {
      return item;
    },
    function(_component, index, item) {
      return index + ". ";
    },
    function(_component, index, item) {
      return item;
    },
    function(_component, index, item) {
      return item;
    },
    function(_component) {
      return _component.arrWithKeys;
    },
    function(_component, index, item) {
      return index;
    },
    function(_component, index, item) {
      return item;
    },
    function(_component, index, item) {
      return index + ": ";
    },
    function(_component, index, item) {
      return index;
    },
    function(_component, index, item) {
      return item;
    },
    function(_component, index, item) {
      return item;
    },
    function(_component) {
      return _component.ifValue;
    },
    function(_component) {
      return _component.arrNested;
    },
    function(_component, key, subArr) {
      return subArr;
    },
    function(_component, key, subArr, subKey, subItem) {
      return key;
    },
    function(_component, key, subArr, subKey, subItem) {
      return subKey;
    },
    function(_component, key, subArr, subKey, subItem) {
      return subItem;
    },
    function(_component, key, subArr, subKey, subItem) {
      return key + ". " + (subKey ?? "") + ". " + (subItem ?? "");
    },
    function(_component) {
      return _component.arrNested;
    },
    function(_component, key, subArr) {
      return key === "b";
    },
    function(_component, key, subArr) {
      return subArr;
    },
    function(_component, key, subArr, subKey, subItem) {
      return key;
    },
    function(_component, key, subArr, subKey, subItem) {
      return subKey;
    },
    function(_component, key, subArr, subKey, subItem) {
      return subItem;
    },
    function(_component, key, subArr, subKey, subItem) {
      return key + ". " + (subKey ?? "") + ". " + (subItem ?? "");
    },
    function(_component) {
      return function(event) {
        _component.toggleIf(event);
      };
    },
    function(_component) {
      return function(event) {
        _component.toggleElseIf(event);
      };
    },
    function(_component) {
      return function(event) {
        _component.nestedIf = !_component.nestedIf;
      };
    },
    function(_component) {
      return function(event) {
        _component.name = "Viewi Junior";
      };
    },
    function(_component) {
      return _component.ifValue;
    },
    function(_component) {
      return _component.ifElseValue;
    },
    function(_component) {
      return _component.ifValue;
    },
    function(_component) {
      return _component.ifElseValue;
    },
    function(_component) {
      return _component.arr;
    },
    function(_component, _key3, item) {
      return item;
    }
  ];

  // app/main/components/TestPage.js
  var Platform3 = register.Platform;
  var TestPage = class extends BaseComponent {
    _name = "TestPage";
    baseUrl = "";
    platform = null;
    config = null;
    constructor(platform, config) {
      super();
      var $this = this;
      $this.platform = platform;
      $this.config = config;
      $this.baseUrl = config.get("baseUrl");
    }
    getEnvironment() {
      var $this = this;
      return $this.platform.browser ? "Browser" : "Server";
    }
  };
  var TestPage_x = [
    function(_component) {
      return "Config base url: " + (_component.baseUrl ?? "");
    },
    function(_component) {
      return "Env: " + (_component.getEnvironment() ?? "");
    }
  ];

  // app/main/components/StatefulTodoApp.js
  var StatefulTodoApp = class extends BaseComponent {
    _name = "StatefulTodoApp";
    text = "";
    todo = null;
    constructor(todo) {
      super();
      var $this = this;
      $this.todo = todo;
    }
    handleSubmit(event) {
      var $this = this;
      event.preventDefault();
      if (strlen($this.text) == 0) {
        return;
      }
      $this.todo.addNewItem($this.text);
      $this.text = "";
    }
  };
  var StatefulTodoApp_x = [
    function(_component) {
      return function(event) {
        _component.handleSubmit(event);
      };
    },
    function(_component) {
      return [function(_component2) {
        return _component2.text;
      }, function(_component2, value) {
        _component2.text = value;
      }];
    },
    function(_component) {
      return "\n        Add #" + (count(_component.todo.items) + 1) + "\n    ";
    },
    function(_component) {
      return _component.todo.items;
    }
  ];

  // app/main/components/TodoAppPage.js
  var TodoAppPage = class extends BaseComponent {
    _name = "TodoAppPage";
  };

  // app/main/components/PortalPage.js
  var Portal2 = register.Portal;
  var PortalPage = class extends BaseComponent {
    _name = "PortalPage";
    title = "Portal demo";
  };
  var PortalPage_x = [
    function(_component) {
      return _component.title;
    },
    function(_component) {
      return _component.title;
    },
    function(_component) {
      return [function(_component2) {
        return _component2.title;
      }, function(_component2, value) {
        _component2.title = value;
      }];
    },
    function(_component) {
      return '\n            This should appear at the end of the body (portal with name "body").\n            Title of the page: ' + (_component.title ?? "") + "\n        ";
    },
    function(_component) {
      return '\n            This should appear at the begining of the body (portal with name "header").\n            Title of the page: ' + (_component.title ?? "") + "\n        ";
    },
    function(_component) {
      return "\n            Body: " + (_component.title ?? "") + "\n        ";
    },
    function(_component) {
      return "\n            Header: " + (_component.title ?? "") + "\n        ";
    }
  ];

  // app/main/components/index.js
  var components = {
    PostModel,
    UserModel,
    ExampleInterceptor,
    SessionInterceptor,
    MemberGuard,
    MemberGuardNoAccess,
    CounterReducer,
    TodoReducer,
    DemoContainer,
    MenuBar_x,
    MenuBar,
    ViewiIcon,
    Counter_x,
    Counter,
    ExternalHttpPage_x,
    ExternalHttpPage,
    HomePage_x,
    HomePage,
    AreaLayout_x,
    AreaLayout,
    Layout_x,
    Layout,
    PanelLayout_x,
    PanelLayout,
    NotFoundPage,
    CounterPage,
    MemberPage,
    MemberPageNoAccess,
    PostPage_x,
    PostPage,
    TestLayoutPage,
    TestPage_x,
    TestPage,
    TodoAppPage,
    PortalPage_x,
    PortalPage,
    StatefulCounter_x,
    StatefulCounter,
    StatefulTodoApp_x,
    StatefulTodoApp,
    ItemComponent,
    SomeComponent,
    TestButton_x,
    TestButton,
    TestComponent_x,
    TestComponent,
    TestInput_x,
    TestInput,
    TodoApp_x,
    TodoApp,
    TodoList_x,
    TodoList,
    CssBundle_x,
    CssBundle,
    ViewiAssets_x,
    ViewiAssets,
    Subscriber,
    Subscription,
    ConfigService,
    ClientRoute
  };
  var templates = "{}";

  // app/main/functions/index.js
  var functions = {
    json_encode,
    strlen,
    count,
    implode,
    array_search,
    array_splice,
    is_int
  };

  // viewi/core/router/routeItem.ts
  var RouteItem = class {
    method;
    url;
    action;
    wheres;
    defaults = null;
    constructor(method, url, action, defaults = null, wheres) {
      this.method = method;
      this.url = url;
      this.action = action;
      this.wheres = {};
      this.defaults = defaults;
      if (wheres) {
        this.wheres = wheres;
      }
    }
    where(wheresOrName, expr) {
      if (wheresOrName !== null && typeof wheresOrName === "object") {
        this.wheres = Object.assign(this.where, wheresOrName);
      } else if (expr) {
        this.wheres[wheresOrName] = expr;
      }
      return this;
    }
  };

  // viewi/core/router/router.ts
  var Router = class {
    routes;
    trimExpr = /^\/|\/$/g;
    setRoutes(routeList) {
      this.routes = routeList;
    }
    getRoutes() {
      return this.routes;
    }
    register(method, url, action, defaults = null, wheres) {
      const item = new RouteItem(
        method.toLowerCase(),
        url,
        action,
        defaults,
        wheres
      );
      this.routes.push(item);
      return item;
    }
    get(url, action) {
      return this.register("get", url, action);
    }
    resolve(url) {
      url = url.replace(this.trimExpr, "");
      const parts = url.split("/");
      for (let k in this.routes) {
        const params = {};
        let valid = true;
        const item = this.routes[k];
        const targetUrl = item.url.replace(this.trimExpr, "");
        const targetParts = targetUrl.split("/");
        let pi = 0;
        let skipAll = false;
        for (pi; pi < targetParts.length; pi++) {
          const urlExpr = targetParts[pi];
          const hasWildCard = urlExpr.indexOf("*") !== -1;
          if (hasWildCard) {
            const beginning = urlExpr.slice(0, -1);
            if (!beginning || parts[pi].indexOf(beginning) === 0) {
              skipAll = true;
              break;
            }
          }
          const hasParams = urlExpr.indexOf("{") !== -1;
          if (urlExpr !== parts[pi] && !hasParams) {
            valid = false;
            break;
          }
          if (hasParams) {
            const bracketParts = urlExpr.split(/[{}]+/);
            let paramName = bracketParts[1];
            if (paramName[paramName.length - 1] === "?") {
              paramName = paramName.slice(0, -1);
            } else if (pi >= parts.length) {
              valid = false;
              break;
            }
            if (paramName.indexOf("<") !== -1) {
              const matches = /<([^>]+)>/.exec(paramName);
              if (matches) {
                paramName = paramName.replace(/<([^>]+)>/g, "");
                item.wheres[paramName] = matches[1];
              }
            }
            if (item.wheres[paramName]) {
              const regex = new RegExp(item.wheres[paramName], "g");
              if (!regex.test(parts[pi])) {
                valid = false;
                break;
              }
              regex.lastIndex = 0;
              if (regex.test("/")) {
                skipAll = true;
              }
            }
            let paramValue = pi < parts.length ? parts[pi] : null;
            if (paramValue && bracketParts[0]) {
              if (paramValue.indexOf(bracketParts[0]) !== 0) {
                valid = false;
                break;
              } else {
                paramValue = paramValue.slice(bracketParts[0].length);
              }
            }
            params[paramName] = paramValue;
            if (skipAll) {
              params[paramName] = parts.slice(pi).join("/");
              break;
            }
          }
        }
        if (pi < parts.length && !skipAll) {
          valid = false;
        }
        if (valid) {
          return { item, params };
        }
      }
      return null;
    }
  };

  // viewi/core/component/componentsMeta.ts
  var componentsMeta = {
    list: {},
    config: {},
    booleanAttributes: {},
    router: new Router()
  };

  // viewi/core/di/delay.ts
  var delayedQueue = {};
  var delay = {
    postpone: function(name, callback) {
      delayedQueue[name] = callback;
    },
    ready: function(name) {
      if (!(name in delayedQueue)) {
        throw new Error("There is no postponed action for " + name);
      }
      delayedQueue[name]();
      delete delayedQueue[name];
    }
  };

  // viewi/core/di/globalScope.ts
  var globalScope = {
    hydrate: true,
    // first time hydrate, TODO: configurable, MFE won't need hydration
    rootScope: false,
    scopedContainer: {},
    located: {},
    iteration: {},
    lastIteration: {},
    layout: "",
    cancel: false
  };

  // viewi/core/anchor/anchors.ts
  var anchors = {};

  // viewi/core/lifecycle/scopeState.ts
  function getScopeState() {
    const scopedResponseData = window.viewiScopeState;
    return scopedResponseData ?? { http: {}, state: {} };
  }

  // viewi/core/di/factory.ts
  var factoryContainer = {};
  function factory(name, implementation, factory2) {
    register[name] = implementation;
    components[name] = implementation;
    factoryContainer[name] = factory2;
  }

  // viewi/core/di/resolve.ts
  var singletonContainer = {};
  var nextInstanceId = 0;
  function resolve(name, params = {}, canBeNull = false) {
    if (!(name in componentsMeta.list)) {
      if (canBeNull) {
        return null;
      }
      throw new Error("Can't resolve " + name);
    }
    const info = componentsMeta.list[name];
    let instance = null;
    let container = false;
    if (info.di === "Singleton") {
      container = singletonContainer;
    } else if (info.di === "Scoped") {
      container = globalScope.scopedContainer;
    }
    if (container && name in container) {
      return container[name];
    }
    if (info.custom) {
      instance = factoryContainer[name]();
    } else if (!info.dependencies) {
      instance = new components[name]();
    } else {
      const constructArguments = [];
      for (let i in info.dependencies) {
        const dependency = info.dependencies[i];
        const argCanBeNull = !!dependency.null;
        var argument = null;
        if (params && dependency.argName in params) {
          argument = params[dependency.argName];
        } else if (dependency.default) {
          argument = dependency.default;
        } else if (dependency.builtIn) {
          argument = dependency.name === "string" ? "" : 0;
        } else {
          argument = resolve(dependency.name, {}, argCanBeNull);
        }
        constructArguments.push(argument);
      }
      instance = new components[name](...constructArguments);
    }
    if (info.base) {
      instance.__id = ++nextInstanceId + "";
    }
    const scopeState = getScopeState();
    if (scopeState.state[name]) {
      for (let prop in scopeState.state[name]) {
        instance[prop] = scopeState.state[name][prop];
      }
    }
    if (container) {
      container[name] = instance;
    }
    return instance;
  }

  // viewi/core/http/injectScript.ts
  function injectScript(url) {
    const head = document.head;
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    head.appendChild(script);
  }

  // viewi/core/lifecycle/dispose.ts
  function dispose(scope) {
    if (scope.keep)
      return;
    for (let reactivityIndex in scope.track) {
      const reactivityItem = scope.track[reactivityIndex];
      delete scope.instance.$$r[reactivityItem.path][reactivityItem.id];
    }
    scope.track = [];
    if (scope.children) {
      for (let i in scope.children) {
        dispose(scope.children[i]);
      }
      scope.children = {};
    }
    if (scope.main) {
      for (let i = 0; i < scope.instance.$$p.length; i++) {
        const trackGroup = scope.instance.$$p[i];
        delete trackGroup[1].$$r[trackGroup[0]];
      }
      const instance = scope.instance;
      if (instance.destroy) {
        instance.destroy();
      }
    }
    if (scope.parent) {
      delete scope.parent.children[scope.id];
      delete scope.parent;
    }
  }

  // viewi/core/reactivity/handlers/getComponentModelHandler.ts
  function getComponentModelHandler(instance, setter) {
    return function(event) {
      setter(instance, event);
    };
  }

  // viewi/core/component/reserverProps.ts
  var ReserverProps = {
    _props: true,
    $_callbacks: true,
    _refs: true,
    _slots: true,
    _element: true,
    $$t: true,
    $$r: true,
    $: true,
    _name: true,
    emitEvent: true
  };

  // viewi/core/reactivity/makeProxy.ts
  var reactiveId = 0;
  function activateTarget(component, mainPath, prop, target) {
    let val = target[prop];
    if (Array.isArray(val)) {
    } else if (val !== null && typeof val === "object" && typeof val !== "function") {
      deepProxy(mainPath, component, val);
    }
    Object.defineProperty(target, prop, {
      enumerable: true,
      configurable: true,
      get: function() {
        return val;
      },
      set: function(value) {
        const react = val !== value;
        val = value;
        deepProxy(mainPath, component, val);
        if (react) {
          for (let id in target.$$r) {
            const path = target.$$r[id][0];
            const component2 = target.$$r[id][1];
            if (path in component2.$$r) {
              for (let i in component2.$$r[path]) {
                const callbackFunc = component2.$$r[path][i];
                callbackFunc[0].apply(null, callbackFunc[1]);
              }
            }
          }
        }
      }
    });
  }
  function deepProxy(prop, component, targetObject) {
    if (!(prop in ReserverProps)) {
      if (Array.isArray(targetObject)) {
      } else if (targetObject !== null && typeof targetObject === "object" && typeof targetObject !== "function") {
        let keys = Object.keys(targetObject);
        for (let i = 0; i < keys.length; i++) {
          const valueProp = keys[i];
          if (!(valueProp in ReserverProps)) {
            activateTarget(component, prop, valueProp, targetObject);
          }
        }
        if (!targetObject.$$r) {
          Object.defineProperty(targetObject, "$$r", {
            enumerable: false,
            writable: true,
            value: {}
          });
        }
        const trackerId = ++reactiveId + "";
        targetObject.$$r[trackerId] = [prop, component];
        component.$$p.push([trackerId, targetObject]);
      }
    }
  }
  function defineReactive(component, prop) {
    let val = component[prop];
    deepProxy(prop, component, val);
    Object.defineProperty(component, prop, {
      enumerable: true,
      configurable: true,
      get: function() {
        return val;
      },
      set: function(value) {
        const react = val !== value;
        val = value;
        deepProxy(prop, component, val);
        if (react && prop in component.$$r) {
          for (let i in component.$$r[prop]) {
            const callbackFunc = component.$$r[prop][i];
            callbackFunc[0].apply(null, callbackFunc[1]);
          }
        }
      }
    });
  }
  function makeProxy(component) {
    let keys = Object.keys(component);
    for (let i = 0; i < keys.length; i++) {
      const prop = keys[i];
      if (!(prop in ReserverProps)) {
        defineReactive(component, prop);
      }
    }
    return component;
  }

  // viewi/core/anchor/getAnchor.ts
  var anchorId = 0;
  function getAnchor(target) {
    if (!target.__aid) {
      target.__aid = ++anchorId;
      anchors[target.__aid] = { current: -1, target, invalid: [], added: 0 };
    }
    return anchors[target.__aid];
  }

  // viewi/core/hydrate/hydrateComment.ts
  function hydrateComment(target, content) {
    const anchor = getAnchor(target);
    const max = target.childNodes.length;
    let end = anchor.current + 3;
    end = end > max ? max : end;
    const invalid = [];
    for (let i = anchor.current + 1; i < end; i++) {
      const potentialNode = target.childNodes[i];
      if (potentialNode.nodeType === 8) {
        anchor.current = i;
        anchor.invalid = anchor.invalid.concat(invalid);
        return potentialNode;
      }
      invalid.push(i);
    }
    anchor.added++;
    anchor.invalid = anchor.invalid.concat(invalid);
    console.log("Hydrate comment not found", content);
    const element = document.createComment(content);
    anchor.current = anchor.current + invalid.length + 1;
    return max > anchor.current ? target.insertBefore(element, target.childNodes[anchor.current]) : target.appendChild(element);
  }

  // viewi/core/hydrate/hydrateTag.ts
  var specialTags = { body: true, head: true, html: true };
  function hydrateTag(target, tag) {
    const anchor = getAnchor(target);
    const max = target.childNodes.length;
    let end = anchor.current + 3;
    end = end > max ? max : end;
    const invalid = [];
    for (let i = anchor.current + 1; i < end; i++) {
      const potentialNode = target.childNodes[i];
      if (potentialNode.nodeType === 1 && potentialNode.nodeName.toLowerCase() === tag.toLowerCase()) {
        anchor.current = i;
        anchor.invalid = anchor.invalid.concat(invalid);
        return potentialNode;
      }
      invalid.push(i);
    }
    if (tag in specialTags) {
      const nodes = document.getElementsByTagName(tag);
      if (nodes.length > 0) {
        anchor.invalid = [];
        return nodes[0];
      }
    }
    anchor.added++;
    anchor.invalid = anchor.invalid.concat(invalid);
    console.warn("Hydrate not found", tag);
    const element = document.createElement(tag);
    anchor.current = anchor.current + invalid.length + 1;
    return max > anchor.current ? target.insertBefore(element, target.childNodes[anchor.current]) : target.appendChild(element);
  }

  // viewi/core/render/renderText.ts
  function renderText(instance, node, textNode, scope) {
    let callArguments = [instance];
    if (scope.arguments) {
      callArguments = callArguments.concat(scope.arguments);
    }
    const content = (node.expression ? instance.$$t[node.code].apply(null, callArguments) : node.content) ?? "";
    textNode.nodeValue !== content && (textNode.nodeValue = content);
  }

  // viewi/core/hydrate/hydrateText.ts
  function hydrateText(target, instance, node, scope) {
    const anchor = getAnchor(target);
    const max = target.childNodes.length;
    let end = anchor.current + 3;
    end = end > max ? max : end;
    const invalid = [];
    const start = anchor.current > -1 ? anchor.current : anchor.current + 1;
    for (let i = start; i < end; i++) {
      const potentialNode = target.childNodes[i];
      if (potentialNode.nodeType === 3) {
        if (i === anchor.current) {
          break;
        }
        anchor.current = i;
        anchor.invalid = anchor.invalid.concat(invalid);
        renderText(instance, node, potentialNode, scope);
        return potentialNode;
      }
      i !== anchor.current && invalid.push(i);
    }
    anchor.added++;
    anchor.invalid = anchor.invalid.concat(invalid);
    const textNode = document.createTextNode("");
    renderText(instance, node, textNode, scope);
    anchor.current = anchor.current + invalid.length + 1;
    return max > anchor.current ? target.insertBefore(textNode, target.childNodes[anchor.current]) : target.appendChild(textNode);
  }

  // viewi/core/helpers/isSvg.ts
  var svgMap = {};
  var svgTagsString = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view";
  var svgTagsList = svgTagsString.split(",");
  for (let i = 0; i < svgTagsList.length; i++) {
    svgMap[svgTagsList[i]] = true;
  }
  function isSvg(tag) {
    return tag.toLowerCase() in svgMap;
  }
  var xLinkNs = "http://www.w3.org/1999/xlink";

  // viewi/core/render/renderAttributeValue.ts
  function renderAttributeValue(instance, attribute, element, attrName, scope) {
    let valueContent = null;
    if (attribute.children) {
      valueContent = "";
      for (let av = 0; av < attribute.children.length; av++) {
        const attributeValue = attribute.children[av];
        let callArguments = [instance];
        if (scope.arguments) {
          callArguments = callArguments.concat(scope.arguments);
        }
        const childContent = attributeValue.expression ? instance.$$t[attributeValue.code].apply(null, callArguments) : attributeValue.content ?? "";
        valueContent = av === 0 ? childContent : valueContent + (childContent ?? "");
      }
    }
    if (attrName.toLowerCase() in componentsMeta.booleanAttributes) {
      if (valueContent === true || valueContent === null) {
        attrName !== element.getAttribute(attrName) && element.setAttribute(attrName, attrName);
      } else {
        element.removeAttribute(attrName);
      }
    } else {
      if (element.isSvg && attrName.startsWith("xlink:")) {
        if (valueContent !== null) {
          valueContent !== element.getAttribute(attrName) && element.setAttributeNS(xLinkNs, attrName, valueContent);
        } else {
          element.removeAttributeNS(xLinkNs, attrName.slice(6, attrName.length));
        }
      } else {
        if (valueContent !== null) {
          valueContent !== element.getAttribute(attrName) && element.setAttribute(attrName, valueContent);
        } else {
          element.removeAttribute(attrName);
        }
      }
    }
  }

  // viewi/core/anchor/createAnchorNode.ts
  var anchorNodeId = 0;
  function nextAnchorNodeId() {
    return ++anchorNodeId;
  }
  function createAnchorNode(target, insert = false, anchor, name) {
    const anchorNode = document.createTextNode("");
    anchorNode._anchor = name ?? "#" + ++anchorNodeId;
    if (anchor) {
      anchor.current++;
    }
    insert || anchor && target.childNodes.length > anchor.current ? (anchor ? target : target.parentElement).insertBefore(anchorNode, anchor ? target.childNodes[anchor.current] : target) : target.appendChild(anchorNode);
    return anchorNode;
  }

  // viewi/core/render/renderForeach.ts
  function renderForeach(instance, node, directive, anchorNode, currentArrayScope, localDirectiveMap, scope) {
    let callArguments = [instance];
    if (scope.arguments) {
      callArguments = callArguments.concat(scope.arguments);
    }
    const data = instance.$$t[directive.children[0].forData].apply(null, callArguments);
    const isNumeric = Array.isArray(data);
    let insertTarget = anchorNode;
    let between = false;
    let found = false;
    const usedMap = {};
    const deleteMap = {};
    for (let forKey in data) {
      const dataKey = isNumeric ? +forKey : forKey;
      const dataItem = data[dataKey];
      const scopeId = ++scope.counter;
      const nextScope = {
        id: scopeId,
        why: "forItem",
        instance,
        arguments: [...scope.arguments],
        map: { ...scope.map },
        track: [],
        parent: scope,
        children: {},
        counter: 0
      };
      if (scope.refs) {
        nextScope.refs = scope.refs;
      }
      scope.children[scopeId] = nextScope;
      const lastFound = found;
      found = false;
      for (let di in currentArrayScope) {
        if (currentArrayScope[di] === dataItem) {
          found = true;
          between = false;
          insertTarget = anchorNode;
          break;
        } else if (lastFound && !(dataKey in usedMap)) {
          insertTarget = currentArrayScope[di].begin;
          between = true;
        }
      }
      usedMap[dataKey] = true;
      if (!found) {
        nextScope.map[directive.children[0].forKey] = nextScope.arguments.length;
        nextScope.arguments.push(dataKey);
        nextScope.map[directive.children[0].forItem] = nextScope.arguments.length;
        nextScope.arguments.push(dataItem);
        const nextDirectives = { map: { ...localDirectiveMap.map }, storage: { ...localDirectiveMap.storage } };
        const itemBeginAnchor = createAnchorNode(insertTarget, true, void 0, "b" /* BeginAnchor */ + nextAnchorNodeId());
        render(insertTarget, instance, [node], nextScope, nextDirectives, false, true);
        const itemEndAnchor = createAnchorNode(insertTarget, true, void 0, itemBeginAnchor._anchor);
        if (dataKey in currentArrayScope) {
          deleteMap[dataKey] = currentArrayScope[dataKey];
        }
        currentArrayScope[dataKey] = {
          key: dataKey,
          value: dataItem,
          begin: itemBeginAnchor,
          end: itemEndAnchor,
          scope: nextScope
        };
      }
    }
    for (let di in currentArrayScope) {
      if (!(di in usedMap)) {
        const endAnchor = currentArrayScope[di].end;
        while (endAnchor.previousSibling._anchor !== endAnchor._anchor) {
          endAnchor.previousSibling.remove();
        }
        currentArrayScope[di].begin.remove();
        endAnchor.remove();
        dispose(currentArrayScope[di].scope);
        delete currentArrayScope[di];
      }
    }
    for (let di in deleteMap) {
      const endAnchor = deleteMap[di].end;
      while (endAnchor.previousSibling._anchor !== endAnchor._anchor) {
        endAnchor.previousSibling.remove();
      }
      deleteMap[di].begin.remove();
      dispose(deleteMap[di].scope);
      endAnchor.remove();
    }
  }

  // viewi/core/render/renderIf.ts
  function renderIf(instance, node, scopeContainer, directive, ifConditions, localDirectiveMap, index) {
    let nextValue = true;
    for (let i = 0; i < index; i++) {
      nextValue = nextValue && !ifConditions.values[i];
    }
    if (directive.children) {
      nextValue = nextValue && !!instance.$$t[directive.children[0].code](instance);
    }
    const anchorNode = scopeContainer.anchorNode;
    const nextDirectives = { map: { ...localDirectiveMap.map }, storage: { ...localDirectiveMap.storage } };
    if (ifConditions.values[index] !== nextValue) {
      const scope = scopeContainer.scope.parent;
      ifConditions.values[index] = nextValue;
      if (nextValue) {
        const scopeId = ++scope.counter;
        const nextScope = {
          id: scopeId,
          why: index === 0 ? "if" : directive.children ? "elseif" : "else",
          instance,
          arguments: [...scope.arguments],
          map: { ...scope.map },
          track: [],
          parent: scope,
          children: {},
          counter: 0
        };
        if (scope.refs) {
          nextScope.refs = scope.refs;
        }
        scopeContainer.scope = nextScope;
        scope.children[scopeId] = nextScope;
        render(anchorNode, instance, [node], nextScope, nextDirectives, false, true);
      } else {
        dispose(scopeContainer.scope);
        scopeContainer.scope = {
          id: -1,
          why: "if",
          instance,
          arguments: [],
          map: {},
          track: [],
          parent: scope,
          children: {},
          counter: 0
        };
        while (anchorNode.previousSibling._anchor !== anchorNode._anchor) {
          anchorNode.previousSibling.remove();
        }
      }
    }
  }

  // viewi/core/reactivity/handlers/updateComment.ts
  function updateComment(instance, node, commentNode) {
    const content = node.expression ? instance.$$t[node.code](instance) : node.content ?? "";
    commentNode.nodeValue !== content && (commentNode.nodeValue = content);
  }

  // viewi/core/reactivity/track.ts
  var trackingId = 0;
  function track(instance, trackingPath, scope, action) {
    if (!instance.$$r[trackingPath]) {
      instance.$$r[trackingPath] = {};
    }
    const trackId = ++trackingId;
    scope.track.push({ id: trackId, path: trackingPath });
    instance.$$r[trackingPath][trackId] = action;
  }

  // viewi/core/node/unpack.ts
  function unpack(item) {
    let nodeType = "value";
    switch (item.t) {
      case "t": {
        nodeType = "tag";
        break;
      }
      case "a": {
        nodeType = "attr";
        break;
      }
      case void 0:
      case "v": {
        nodeType = "value";
        break;
      }
      case "c": {
        nodeType = "component";
        break;
      }
      case "x": {
        nodeType = "text";
        break;
      }
      case "m": {
        nodeType = "comment";
        break;
      }
      case "d": {
        nodeType = "doctype";
        break;
      }
      case "r": {
        nodeType = "root";
        if (item.h && item.h[0].t === "x" && item.h[0].c?.substring(0, 9) === "<!DOCTYPE") {
          item.h[0].t = "d";
        }
        break;
      }
      default:
        throw new Error("Type " + item.t + " is not defined in build");
    }
    item.type = nodeType;
    delete item.t;
    if (item.c) {
      item.content = item.c;
      delete item.c;
    }
    if (item.e) {
      item.expression = item.e;
      delete item.e;
    }
    if (item.a) {
      item.attributes = item.a;
      delete item.a;
      for (let i in item.attributes) {
        unpack(item.attributes[i]);
      }
    }
    if (item.i) {
      item.directives = item.i;
      delete item.i;
      for (let i in item.directives) {
        unpack(item.directives[i]);
      }
    }
    if (item.h) {
      item.children = item.h;
      delete item.h;
      for (let i in item.children) {
        unpack(item.children[i]);
      }
    }
    ;
  }

  // viewi/core/component/isComponent.ts
  function isComponent(name) {
    return name in componentsMeta.list;
  }

  // viewi/core/render/renderDynamic.ts
  function renderDynamic(instance, node, scopeContainer) {
    const content = node.expression ? instance.$$t[node.code](instance) : node.content ?? "";
    const componentTag = node.type === "component" || node.expression && isComponent(content);
    const anchorNode = scopeContainer.anchorNode;
    const scope = scopeContainer.scope.parent;
    dispose(scopeContainer.scope);
    while (anchorNode.previousSibling._anchor !== anchorNode._anchor) {
      anchorNode.previousSibling.remove();
    }
    const scopeId = ++scope.counter;
    const nextScope = {
      id: scopeId,
      why: "dynamic",
      arguments: [...scope.arguments],
      map: { ...scope.map },
      track: [],
      instance,
      parent: scope,
      children: {},
      counter: 0
    };
    if (scope.refs) {
      nextScope.refs = scope.refs;
    }
    scopeContainer.scope = nextScope;
    scope.children[scopeId] = nextScope;
    if (componentTag) {
      const slots = {};
      if (node.slots) {
        const scopeId2 = ++nextScope.counter;
        const slotScope = {
          id: scopeId2,
          why: "slot",
          arguments: [...scope.arguments],
          map: { ...scope.map },
          track: [],
          instance,
          parent: nextScope,
          children: {},
          counter: 0,
          slots: scope.slots
        };
        for (let slotName in node.slots) {
          slots[slotName] = {
            node: node.slots[slotName],
            scope: slotScope
          };
        }
      }
      renderComponent(anchorNode, content, { attributes: node.attributes, scope, instance }, slots, false, true);
      return;
    } else {
      const element = anchorNode.parentElement.insertBefore(document.createElement(content), anchorNode);
      if (node.attributes) {
        for (let a in node.attributes) {
          const attribute = node.attributes[a];
          const attrName = attribute.expression ? instance.$$t[attribute.code](instance) : attribute.content ?? "";
          if (attrName[0] === "(") {
            const eventName = attrName.substring(1, attrName.length - 1);
            if (attribute.children) {
              const eventHandler = instance.$$t[attribute.dynamic ? attribute.dynamic.code : attribute.children[0].code](instance);
              element.addEventListener(eventName, eventHandler);
            }
          } else {
            renderAttributeValue(instance, attribute, element, attrName, nextScope);
            let valueSubs = [];
            if (attribute.children) {
              for (let av in attribute.children) {
                const attributeValue = attribute.children[av];
                if (attributeValue.subs) {
                  valueSubs = valueSubs.concat(attributeValue.subs);
                }
              }
            }
            if (valueSubs) {
              for (let subI in valueSubs) {
                const trackingPath = valueSubs[subI];
                track(instance, trackingPath, nextScope, [renderAttributeValue, [instance, attribute, element, attrName, nextScope]]);
              }
            }
          }
        }
      }
      if (node.children) {
        render(element, instance, node.children, nextScope, void 0, false, false);
      }
    }
  }

  // viewi/core/render/renderRaw.ts
  function renderRaw(instance, node, scope, anchorNode) {
    while (anchorNode.previousSibling._anchor !== anchorNode._anchor) {
      anchorNode.previousSibling.remove();
    }
    const parentTagNode = anchorNode.parentElement;
    const vdom = document.createElement(parentTagNode.nodeName);
    let callArguments = [instance];
    if (scope.arguments) {
      callArguments = callArguments.concat(scope.arguments);
    }
    const content = (node.expression ? instance.$$t[node.code].apply(null, callArguments) : node.content) ?? "";
    vdom.innerHTML = content;
    const rawNodes = Array.prototype.slice.call(vdom.childNodes);
    for (let rawNodeI = 0; rawNodeI < rawNodes.length; rawNodeI++) {
      const rawNode = rawNodes[rawNodeI];
      parentTagNode.insertBefore(rawNode, anchorNode);
    }
  }

  // viewi/core/reactivity/handlers/getModelHandler.ts
  function getModelHandler(instance, options) {
    return function(event) {
      if (options.inputType === "checkbox") {
        const currentValue = options.getter(instance);
        const inputValue = event.target.value;
        if (Array.isArray(currentValue)) {
          const newValue = currentValue.slice();
          const valuePosition = newValue.indexOf(inputValue);
          if (valuePosition === -1) {
            if (event.target.checked) {
              newValue.push(inputValue);
            }
          } else {
            if (!event.target.checked) {
              newValue.splice(valuePosition, 1);
            }
          }
          options.setter(instance, newValue);
        } else {
          options.setter(instance, event.target.checked);
        }
      } else if (options.inputType === "radio") {
        const inputValue = event.target.value;
        options.setter(instance, inputValue);
      } else if (options.isMultiple || event.target.multiple) {
        const inputOptions = event.target.options;
        const newValue = [];
        for (let i = 0; i < inputOptions.length; i++) {
          const currentOption = inputOptions[i];
          if (currentOption.selected) {
            newValue.push(currentOption.value);
          }
        }
        options.setter(instance, newValue);
      } else {
        options.setter(instance, event.target.value);
      }
    };
  }

  // viewi/core/reactivity/handlers/updateModelValue.ts
  function updateModelValue(target, instance, options) {
    if (options.inputType === "checkbox") {
      const currentValue = options.getter(instance);
      if (Array.isArray(currentValue)) {
        const inputValue = target.value;
        const valuePosition = currentValue.indexOf(inputValue);
        if (valuePosition === -1) {
          target.removeAttribute("checked");
          target.checked = false;
        } else {
          target.setAttribute("checked", "checked");
          target.checked = true;
        }
      } else {
        if (currentValue) {
          target.setAttribute("checked", "checked");
          target.checked = true;
        } else {
          target.removeAttribute("checked");
          target.checked = false;
        }
      }
    } else if (options.inputType === "radio") {
      const currentValue = options.getter(instance);
      const inputValue = target.value;
      if (currentValue === inputValue) {
        target.setAttribute("checked", "checked");
        target.checked = true;
      } else {
        target.removeAttribute("checked");
        target.checked = false;
      }
    } else if (options.isMultiple || target.multiple) {
      const inputOptions = target.options;
      const currentValue = options.getter(instance);
      for (let i = 0; i < inputOptions.length; i++) {
        const currentOption = inputOptions[i];
        const index = currentValue.indexOf(currentOption.value);
        if (index === -1) {
          currentOption.selected = false;
        } else {
          currentOption.selected = true;
        }
      }
    } else {
      target.value = options.getter(instance);
    }
  }

  // viewi/core/helpers/svgNameSpace.ts
  var svgNameSpace = "http://www.w3.org/2000/svg";

  // viewi/core/hydrate/hydrateRaw.ts
  function hydrateRaw(vdom, anchor, target) {
    if (vdom.childNodes.length > 0) {
      const invalid = [];
      const rawNodes = Array.prototype.slice.call(vdom.childNodes);
      for (let rawNodeI = 0; rawNodeI < rawNodes.length; rawNodeI++) {
        const rawNode = rawNodes[rawNodeI];
        const rawNodeType = rawNode.nodeType;
        if (rawNodeType === 3) {
          const currentTargetNode = target.childNodes[anchor.current];
          if (currentTargetNode && currentTargetNode.nodeType === rawNodeType) {
            currentTargetNode.nodeValue = rawNode.nodeValue;
          } else {
            anchor.added++;
            target.childNodes.length > anchor.current && invalid.push(anchor.current);
            target.childNodes.length > anchor.current + 1 ? target.insertBefore(rawNode, target.childNodes[anchor.current + 1]) : target.appendChild(rawNode);
            anchor.current++;
          }
        } else {
          const currentTargetNode = target.childNodes[anchor.current];
          if (!currentTargetNode || currentTargetNode.nodeType !== rawNodeType || rawNodeType === 1 && currentTargetNode.nodeName !== rawNode.nodeName) {
            anchor.added++;
            target.childNodes.length > anchor.current && invalid.push(anchor.current);
            target.childNodes.length > anchor.current + 1 ? target.insertBefore(rawNode, target.childNodes[anchor.current + 1]) : target.appendChild(rawNode);
            anchor.current++;
          } else if (rawNodeType === 1) {
            if (currentTargetNode.nodeName !== rawNode.nodeName || currentTargetNode.outerHTML !== rawNode.outerHTML) {
              const keepKey = currentTargetNode.getAttribute("data-keep");
              if (!keepKey || keepKey !== rawNode.getAttribute("data-keep")) {
                currentTargetNode.outerHTML = rawNode.outerHTML;
              }
            }
          }
        }
        anchor.current++;
      }
      if (invalid.length > 0) {
        anchor.invalid = anchor.invalid.concat(invalid);
      }
    }
  }

  // viewi/core/render/render.ts
  function render(target, instance, nodes, scope, directives, hydrate = true, insert = false) {
    let ifConditions = null;
    let nextInsert = false;
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      let element = target;
      let breakAndContinue = false;
      let withAttributes = false;
      let childScope = scope;
      switch (node.type) {
        case "tag":
        case "component": {
          if (node.directives) {
            const localDirectiveMap = directives || { map: {}, storage: {} };
            let callArguments = [instance];
            if (scope.arguments) {
              callArguments = callArguments.concat(scope.arguments);
            }
            for (let d = 0; d < node.directives.length; d++) {
              const directive = node.directives[d];
              if (d in localDirectiveMap.map) {
                continue;
              }
              localDirectiveMap.map[d] = true;
              switch (directive.content) {
                case "if": {
                  ifConditions = { values: [], index: 0, subs: [] };
                  const nextValue = !!instance.$$t[directive.children[0].code].apply(null, callArguments);
                  ifConditions.values.push(nextValue);
                  const anchor2 = hydrate ? getAnchor(target) : void 0;
                  const anchorBegin2 = createAnchorNode(target, insert, anchor2);
                  const nextDirectives = { map: { ...localDirectiveMap.map }, storage: { ...localDirectiveMap.storage } };
                  const scopeId = ++scope.counter;
                  const nextScope2 = {
                    id: scopeId,
                    why: "if",
                    arguments: scope.arguments,
                    map: scope.map,
                    instance,
                    track: [],
                    parent: scope,
                    children: {},
                    counter: 0
                  };
                  if (scope.refs) {
                    nextScope2.refs = scope.refs;
                  }
                  scope.children[scopeId] = nextScope2;
                  if (nextValue) {
                    render(target, instance, [node], nextScope2, localDirectiveMap, hydrate, insert);
                  }
                  const anchorNode = createAnchorNode(target, insert, anchor2, anchorBegin2._anchor);
                  if (directive.children[0].subs) {
                    for (let subI in directive.children[0].subs) {
                      const trackingPath = directive.children[0].subs[subI];
                      ifConditions.subs.push(trackingPath);
                      track(instance, trackingPath, scope, [renderIf, [instance, node, { scope: nextScope2, anchorNode }, directive, ifConditions, nextDirectives, ifConditions.index]]);
                    }
                  }
                  ifConditions.index++;
                  breakAndContinue = true;
                  break;
                }
                case "else-if": {
                  if (ifConditions) {
                    let nextValue = true;
                    for (let ifv = 0; ifv < ifConditions.index; ifv++) {
                      nextValue = nextValue && !ifConditions.values[ifv];
                    }
                    nextValue = nextValue && !ifConditions.values[ifConditions.index - 1] && !!instance.$$t[directive.children[0].code].apply(null, callArguments);
                    ifConditions.values.push(nextValue);
                    const anchor2 = hydrate ? getAnchor(target) : void 0;
                    const anchorBegin2 = createAnchorNode(target, insert, anchor2);
                    const nextDirectives = { map: { ...localDirectiveMap.map }, storage: { ...localDirectiveMap.storage } };
                    const scopeId = ++scope.counter;
                    const nextScope2 = {
                      id: scopeId,
                      why: "elseif",
                      instance,
                      arguments: scope.arguments,
                      map: scope.map,
                      track: [],
                      parent: scope,
                      children: {},
                      counter: 0
                    };
                    if (scope.refs) {
                      nextScope2.refs = scope.refs;
                    }
                    scope.children[scopeId] = nextScope2;
                    if (nextValue) {
                      render(target, instance, [node], nextScope2, localDirectiveMap, hydrate, insert);
                    }
                    const anchorNode = createAnchorNode(target, insert, anchor2, anchorBegin2._anchor);
                    if (directive.children[0].subs) {
                      ifConditions.subs = ifConditions.subs.concat(directive.children[0].subs);
                    }
                    for (let subI in ifConditions.subs) {
                      const trackingPath = ifConditions.subs[subI];
                      track(instance, trackingPath, scope, [renderIf, [instance, node, { scope: nextScope2, anchorNode }, directive, ifConditions, nextDirectives, ifConditions.index]]);
                    }
                    ifConditions.index++;
                    breakAndContinue = true;
                  } else {
                    console.warn("Directive else-if has missing previous if/else-if", directive.content, directive);
                  }
                  break;
                }
                case "else": {
                  if (ifConditions) {
                    let nextValue = true;
                    for (let ifv = 0; ifv < ifConditions.index; ifv++) {
                      nextValue = nextValue && !ifConditions.values[ifv];
                    }
                    ifConditions.values.push(nextValue);
                    const anchor2 = hydrate ? getAnchor(target) : void 0;
                    const anchorBegin2 = createAnchorNode(target, insert, anchor2);
                    const nextDirectives = { map: { ...localDirectiveMap.map }, storage: { ...localDirectiveMap.storage } };
                    const scopeId = ++scope.counter;
                    const nextScope2 = {
                      id: scopeId,
                      why: "else",
                      instance,
                      arguments: scope.arguments,
                      map: scope.map,
                      track: [],
                      parent: scope,
                      children: {},
                      counter: 0
                    };
                    if (scope.refs) {
                      nextScope2.refs = scope.refs;
                    }
                    scope.children[scopeId] = nextScope2;
                    if (nextValue) {
                      render(target, instance, [node], nextScope2, localDirectiveMap, hydrate, insert);
                    }
                    const anchorNode = createAnchorNode(target, insert, anchor2, anchorBegin2._anchor);
                    for (let subI in ifConditions.subs) {
                      const trackingPath = ifConditions.subs[subI];
                      track(instance, trackingPath, scope, [renderIf, [instance, node, { scope: nextScope2, anchorNode }, directive, ifConditions, nextDirectives, ifConditions.index]]);
                    }
                    ifConditions.index++;
                    breakAndContinue = true;
                  } else {
                    console.warn("Directive else has missing previous if/else-if", directive.content, directive);
                  }
                  break;
                }
                case "foreach": {
                  const data = instance.$$t[directive.children[0].forData].apply(null, callArguments);
                  const anchor2 = hydrate ? getAnchor(target) : void 0;
                  const anchorBegin2 = createAnchorNode(target, insert, anchor2);
                  const isNumeric = Array.isArray(data);
                  const dataArrayScope = {};
                  for (let forKey in data) {
                    const dataKey = isNumeric ? +forKey : forKey;
                    const dataItem = data[dataKey];
                    const scopeId = ++scope.counter;
                    const nextScope2 = {
                      id: scopeId,
                      why: "foreach",
                      instance,
                      arguments: [...scope.arguments],
                      map: { ...scope.map },
                      track: [],
                      parent: scope,
                      children: {},
                      counter: 0
                    };
                    if (scope.refs) {
                      nextScope2.refs = scope.refs;
                    }
                    scope.children[scopeId] = nextScope2;
                    nextScope2.map[directive.children[0].forKey] = nextScope2.arguments.length;
                    nextScope2.arguments.push(dataKey);
                    nextScope2.map[directive.children[0].forItem] = nextScope2.arguments.length;
                    nextScope2.arguments.push(dataItem);
                    const nextDirectives = { map: { ...localDirectiveMap.map }, storage: { ...localDirectiveMap.storage } };
                    const itemBeginAnchor = createAnchorNode(target, insert, anchor2, "b" /* BeginAnchor */ + nextAnchorNodeId());
                    render(target, instance, [node], nextScope2, nextDirectives, hydrate, insert);
                    const itemEndAnchor = createAnchorNode(target, insert, anchor2, itemBeginAnchor._anchor);
                    dataArrayScope[dataKey] = {
                      key: dataKey,
                      value: dataItem,
                      begin: itemBeginAnchor,
                      end: itemEndAnchor,
                      scope: nextScope2
                    };
                  }
                  const anchorNode = createAnchorNode(target, insert, anchor2, anchorBegin2._anchor);
                  if (directive.children[0].subs) {
                    for (let subI in directive.children[0].subs) {
                      const trackingPath = directive.children[0].subs[subI];
                      const nextDirectives = { map: { ...localDirectiveMap.map }, storage: { ...localDirectiveMap.storage } };
                      track(instance, trackingPath, scope, [
                        renderForeach,
                        [instance, node, directive, anchorNode, dataArrayScope, nextDirectives, scope]
                      ]);
                    }
                  }
                  breakAndContinue = true;
                  break;
                }
                default: {
                  console.warn("Directive not implemented", directive.content, directive);
                  breakAndContinue = true;
                  break;
                }
              }
              if (breakAndContinue) {
                break;
              }
            }
            if (breakAndContinue) {
              continue;
            }
          }
          const content = node.expression ? instance.$$t[node.code](instance) : node.content ?? "";
          const isDynamic = node.expression;
          const componentTag = node.type === "component" || node.expression && isComponent(content);
          let anchor;
          let anchorBegin;
          let nextScope = scope;
          if (isDynamic) {
            anchor = hydrate ? getAnchor(target) : void 0;
            anchorBegin = createAnchorNode(target, insert, anchor);
          }
          if (isDynamic) {
            const scopeId = ++scope.counter;
            nextScope = {
              id: scopeId,
              why: "dynamic",
              arguments: [...scope.arguments],
              map: { ...scope.map },
              track: [],
              instance,
              parent: scope,
              children: {},
              counter: 0
            };
            if (scope.refs) {
              nextScope.refs = scope.refs;
            }
            scope.children[scopeId] = nextScope;
            childScope = nextScope;
          }
          if (componentTag) {
            const slots = {};
            if (node.slots) {
              const scopeId = ++nextScope.counter;
              const slotScope = {
                id: scopeId,
                why: "slot",
                arguments: [...scope.arguments],
                map: { ...scope.map },
                track: [],
                parent: nextScope,
                instance,
                children: {},
                counter: 0,
                slots: scope.slots
              };
              if (scope.refs) {
                slotScope.refs = scope.refs;
              }
              nextScope.children[scopeId] = slotScope;
              for (let slotName in node.slots) {
                slots[slotName] = {
                  node: node.slots[slotName],
                  scope: slotScope
                };
              }
            }
            renderComponent(target, content, { attributes: node.attributes, scope }, slots, hydrate, insert);
          } else {
            if (node.content === "template") {
              nextInsert = insert;
              break;
            }
            if (node.content === "slot") {
              if (!anchor) {
                anchor = hydrate ? getAnchor(target) : void 0;
              }
              nextInsert = insert;
              let slotName = "default";
              if (node.attributes) {
                for (let attrIndex in node.attributes) {
                  if (node.attributes[attrIndex].content === "name") {
                    slotName = node.attributes[attrIndex].children[0].content;
                  }
                }
              }
              const anchorSlotBegin = createAnchorNode(target, insert, anchor);
              if (slotName in scope.slots) {
                const slot = scope.slots[slotName];
                if (!slot.node.unpacked) {
                  unpack(slot.node);
                  slot.node.unpacked = true;
                }
                render(element, slot.scope.instance, slot.node.children, slot.scope, void 0, hydrate, nextInsert);
              } else {
                if (node.children) {
                  render(element, instance, node.children, scope, void 0, hydrate, nextInsert);
                }
              }
              const anchorSlotNode = createAnchorNode(target, insert, anchor, anchorSlotBegin._anchor);
              if (scope.instance._name in globalScope.iteration) {
                globalScope.iteration[scope.instance._name].slots[slotName] = anchorSlotNode;
              }
              continue;
            }
            withAttributes = true;
            const isSvgNode = isSvg(content) || target.isSvg;
            element = hydrate ? hydrateTag(target, content) : insert ? target.parentElement.insertBefore(isSvgNode ? document.createElementNS(svgNameSpace, content) : document.createElement(content), target) : target.appendChild(isSvgNode ? document.createElementNS(svgNameSpace, content) : document.createElement(content));
            if (node.first) {
              instance._element = element;
            }
            if (isSvgNode) {
              element.isSvg = true;
            }
          }
          if (isDynamic) {
            const anchorNode = createAnchorNode(target, insert, anchor, anchorBegin._anchor);
            if (node.subs) {
              for (let subI in node.subs) {
                const trackingPath = node.subs[subI];
                track(instance, trackingPath, scope, [renderDynamic, [instance, node, { scope: nextScope, anchorNode }]]);
              }
            }
          }
          if (componentTag) {
            continue;
          }
          break;
        }
        case "text": {
          if (node.raw) {
            const parentTagNode = insert ? target.parentElement : target;
            const vdom = document.createElement(parentTagNode.nodeName);
            let callArguments = [instance];
            if (scope.arguments) {
              callArguments = callArguments.concat(scope.arguments);
            }
            const content = (node.expression ? instance.$$t[node.code].apply(null, callArguments) : node.content) ?? "";
            vdom.innerHTML = content;
            const anchor = hydrate ? getAnchor(target) : void 0;
            const anchorBegin = createAnchorNode(target, insert, anchor);
            if (hydrate) {
              anchor.current++;
              hydrateRaw(vdom, anchor, target);
            } else {
              if (vdom.childNodes.length > 0) {
                const rawNodes = Array.prototype.slice.call(vdom.childNodes);
                for (let rawNodeI = 0; rawNodeI < rawNodes.length; rawNodeI++) {
                  const rawNode = rawNodes[rawNodeI];
                  insert ? target.parentElement.insertBefore(rawNode, target) : target.appendChild(rawNode);
                }
              }
            }
            const anchorNode = createAnchorNode(target, insert, anchor, anchorBegin._anchor);
            if (node.subs) {
              for (let subI in node.subs) {
                const trackingPath = node.subs[subI];
                track(instance, trackingPath, scope, [renderRaw, [instance, node, scope, anchorNode]]);
              }
            }
            break;
          }
          let textNode;
          if (hydrate) {
            textNode = hydrateText(target, instance, node, scope);
          } else {
            textNode = document.createTextNode("");
            renderText(instance, node, textNode, scope);
            insert ? target.parentElement.insertBefore(textNode, target) : target.appendChild(textNode);
          }
          if (node.subs) {
            for (let subI in node.subs) {
              const trackingPath = node.subs[subI];
              track(instance, trackingPath, scope, [renderText, [instance, node, textNode, scope]]);
            }
          }
          break;
        }
        case "comment": {
          const content = node.expression ? instance.$$t[node.code](instance) : node.content ?? "";
          const commentNode = hydrate ? hydrateComment(target, content) : insert ? target.parentElement.insertBefore(document.createComment(content), target) : target.appendChild(document.createComment(content));
          if (node.subs) {
            for (let subI in node.subs) {
              const trackingPath = node.subs[subI];
              track(instance, trackingPath, scope, [updateComment, [instance, node, commentNode]]);
            }
          }
          break;
        }
        case "doctype": {
          if (hydrate) {
            const anchor = getAnchor(target);
            anchor.current++;
          }
          break;
        }
        default: {
          console.warn("Node type not implemented", node);
          break;
        }
      }
      if (withAttributes) {
        if (node.attributes) {
          const toRemove = hydrate ? element.getAttributeNames() : null;
          const hasMap = hydrate ? {} : null;
          for (let a = 0; a < node.attributes.length; a++) {
            const attribute = node.attributes[a];
            const attrName = attribute.expression ? instance.$$t[attribute.code](instance) : attribute.content ?? "";
            if (attrName[0] === "#") {
              const refName = attrName.substring(1, attrName.length);
              instance._refs[refName] = element;
              if (scope.refs && refName in scope.refs) {
                instance[refName] = element;
              }
              continue;
            }
            const isModel = attrName === "model";
            if (attrName[0] === "(") {
              const eventName = attrName.substring(1, attrName.length - 1);
              if (attribute.children) {
                const eventHandler = instance.$$t[attribute.dynamic ? attribute.dynamic.code : attribute.children[0].code](instance);
                element.addEventListener(eventName, eventHandler);
              }
            } else if (isModel) {
              let inputType = "text";
              element.getAttribute("type") === "checkbox" && (inputType = "checkbox");
              element.getAttribute("type") === "radio" && (inputType = "radio");
              let isMultiple = false;
              if (element.tagName === "SELECT") {
                inputType = "select";
                isMultiple = element.multiple;
              }
              const isOnChange = inputType === "checkbox" || inputType === "radio" || inputType === "select";
              const valueNode = attribute.children[0];
              const getterSetter = instance.$$t[valueNode.code](instance);
              const eventName = isOnChange ? "change" : "input";
              const inputOptions = {
                getter: getterSetter[0],
                setter: getterSetter[1],
                inputType,
                isMultiple
              };
              updateModelValue(element, instance, inputOptions);
              for (let subI in valueNode.subs) {
                const trackingPath = valueNode.subs[subI];
                track(instance, trackingPath, scope, [updateModelValue, [element, instance, inputOptions]]);
              }
              element.addEventListener(eventName, getModelHandler(
                instance,
                inputOptions
              ));
            } else {
              hydrate && (hasMap[attrName] = true);
              renderAttributeValue(instance, attribute, element, attrName, scope);
              let valueSubs = [];
              if (attribute.children) {
                for (let av in attribute.children) {
                  const attributeValue = attribute.children[av];
                  if (attributeValue.subs) {
                    valueSubs = valueSubs.concat(attributeValue.subs);
                  }
                }
              }
              if (valueSubs) {
                for (let subI in valueSubs) {
                  const trackingPath = valueSubs[subI];
                  track(instance, trackingPath, scope, [renderAttributeValue, [instance, attribute, element, attrName, scope]]);
                }
              }
            }
          }
          if (hydrate) {
            for (let ai = 0; ai < toRemove.length; ai++) {
              if (!(toRemove[ai] in hasMap)) {
                element.removeAttribute(toRemove[ai]);
              }
            }
          }
        } else if (hydrate) {
          const toRemove = element.getAttributeNames();
          for (let ai = 0; ai < toRemove.length; ai++) {
            element.removeAttribute(toRemove[ai]);
          }
        }
      }
      if (node.children) {
        render(element, instance, node.children, childScope, void 0, hydrate, nextInsert);
      }
    }
  }

  // viewi/core/reactivity/handlers/updateComponentModel.ts
  function updateComponentModel(instance, attrName, getter, parentInstance) {
    instance[attrName] = getter(parentInstance);
  }

  // viewi/core/reactivity/handlers/updateProp.ts
  function updateProp(instance, attribute, props) {
    const parentInstance = props.scope.instance;
    const attrName = attribute.expression ? parentInstance.$$t[attribute.code](parentInstance) : attribute.content ?? "";
    if (attrName[0] === "(") {
    } else {
      let valueContent = null;
      let valueSubs = [];
      if (attribute.children) {
        for (let av = 0; av < attribute.children.length; av++) {
          const attributeValue = attribute.children[av];
          let callArguments = [parentInstance];
          if (props.scope.arguments) {
            callArguments = callArguments.concat(props.scope.arguments);
          }
          const childContent = attributeValue.expression ? parentInstance.$$t[attributeValue.code].apply(null, callArguments) : attributeValue.content ?? "";
          valueContent = av === 0 ? childContent : valueContent + (childContent ?? "");
          if (attributeValue.subs) {
            valueSubs = valueSubs.concat(attributeValue.subs);
          }
        }
      }
      if (attrName === "_props" && valueContent) {
        for (let propName in valueContent) {
          instance[propName] = valueContent[propName];
          instance._props[propName] = valueContent[propName];
        }
      } else {
        instance[attrName] = valueContent;
        instance._props[attrName] = valueContent;
      }
    }
  }

  // viewi/core/render/renderComponent.ts
  function renderComponent(target, name, props, slots, hydrate = false, insert = false, params = {}) {
    if (!(name in componentsMeta.list)) {
      throw new Error(`Component ${name} not found.`);
    }
    if (!(name in components)) {
      throw new Error(`Component ${name} not found.`);
    }
    const info = componentsMeta.list[name];
    const root = info.nodes;
    const lastIteration = globalScope.lastIteration;
    const reuse = name in lastIteration;
    if (reuse) {
      const slotHolders = lastIteration[name].slots;
      for (let slotName in slotHolders) {
        const anchorNode = slotHolders[slotName];
        while (anchorNode.previousSibling._anchor !== anchorNode._anchor) {
          anchorNode.previousSibling.remove();
        }
      }
      lastIteration[name].scope.keep = true;
    }
    const instance = reuse ? lastIteration[name].instance : makeProxy(resolve(name, params));
    if (!reuse) {
      if (info.hooks && info.hooks.init) {
        instance.init();
      }
    }
    const inlineExpressions = name + "_x";
    if (!reuse && inlineExpressions in components) {
      instance.$$t = components[inlineExpressions];
    }
    const scopeId = props ? ++props.scope.counter : 0;
    const scope = reuse ? lastIteration[name].scope : {
      id: scopeId,
      why: name,
      arguments: props ? [...props.scope.arguments] : [],
      instance,
      main: true,
      map: props ? { ...props.scope.map } : {},
      track: [],
      children: {},
      counter: 0,
      parent: props ? props.scope : void 0,
      slots
    };
    props && (props.scope.children[scopeId] = scope);
    if (info.refs) {
      scope.refs = info.refs;
    }
    if (props && props.attributes) {
      const parentInstance = props.scope.instance;
      for (let a in props.attributes) {
        const attribute = props.attributes[a];
        const attrName = attribute.expression ? parentInstance.$$t[attribute.code](parentInstance) : attribute.content ?? "";
        if (attrName[0] === "(") {
          const eventName = attrName.substring(1, attrName.length - 1);
          if (attribute.children) {
            const eventHandler = parentInstance.$$t[attribute.dynamic ? attribute.dynamic.code : attribute.children[0].code](parentInstance);
            instance.$_callbacks[eventName] = eventHandler;
          }
        } else {
          const isModel = attrName === "model";
          let valueContent = null;
          let valueSubs = [];
          if (isModel) {
            const attributeValue = attribute.children[0];
            let callArguments = [parentInstance];
            if (props.scope.arguments) {
              callArguments = callArguments.concat(props.scope.arguments);
            }
            const getterSetter = parentInstance.$$t[attributeValue.code].apply(null, callArguments);
            valueContent = getterSetter[0](parentInstance);
            instance.$_callbacks[attrName] = getComponentModelHandler(parentInstance, getterSetter[1]);
            for (let subI in attributeValue.subs) {
              const trackingPath = attributeValue.subs[subI];
              track(parentInstance, trackingPath, props.scope, [updateComponentModel, [instance, attrName, getterSetter[0], parentInstance]]);
            }
          } else {
            if (attribute.children) {
              for (let av = 0; av < attribute.children.length; av++) {
                const attributeValue = attribute.children[av];
                let callArguments = [parentInstance];
                if (props.scope.arguments) {
                  callArguments = callArguments.concat(props.scope.arguments);
                }
                const childContent = attributeValue.expression ? parentInstance.$$t[attributeValue.code].apply(null, callArguments) : attributeValue.content ?? "";
                valueContent = av === 0 ? childContent : valueContent + (childContent ?? "");
                if (attributeValue.subs) {
                  valueSubs = valueSubs.concat(attributeValue.subs);
                }
              }
            } else {
              valueContent = true;
            }
          }
          if (attrName === "_props" && valueContent) {
            for (let propName in valueContent) {
              instance[propName] = valueContent[propName];
              instance._props[propName] = valueContent[propName];
            }
          } else {
            if (attribute.children?.length === 1 && attribute.children[0].content === "false") {
              valueContent = false;
            }
            instance[attrName] = valueContent;
            instance._props[attrName] = valueContent;
          }
          if (valueSubs) {
            for (let subI in valueSubs) {
              const trackingPath = valueSubs[subI];
              track(parentInstance, trackingPath, props.scope, [updateProp, [instance, attribute, props]]);
            }
          }
        }
      }
    }
    if (!globalScope.cancel && info.hooks && info.hooks.mounted) {
      instance.mounted();
    }
    if (name in globalScope.located) {
      globalScope.iteration[name] = { instance, scope, slots: {} };
    }
    if (reuse) {
      const slotHolders = lastIteration[name].slots;
      for (let slotName in slotHolders) {
        const anchorNode = slotHolders[slotName];
        if (anchorNode.parentNode && document.body.contains(anchorNode)) {
          if (slots && slotName in slots) {
            const slot = slots[slotName];
            if (!slot.node.unpacked) {
              unpack(slot.node);
              slot.node.unpacked = true;
            }
            render(anchorNode, slot.scope.instance, slot.node.children, slot.scope, void 0, false, true);
          } else {
          }
          globalScope.iteration[name].slots[slotName] = anchorNode;
        }
      }
      let componentName = name;
      while (componentName) {
        const componentInfo = componentsMeta.list[componentName];
        componentName = false;
        const componentRoot = componentInfo.nodes;
        if (componentRoot) {
          const rootChildren = componentRoot.children;
          if (rootChildren) {
            if (rootChildren[0].type === "component" && rootChildren[0].content in lastIteration) {
              globalScope.iteration[rootChildren[0].content] = lastIteration[rootChildren[0].content];
              componentName = rootChildren[0].content;
            }
          }
        }
      }
      return scope;
    }
    if (info.renderer) {
      instance.render(target, name, scope, props, hydrate, insert, params);
    }
    if (target && root) {
      if (!root.unpacked) {
        unpack(root);
        root.unpacked = true;
      }
      const rootChildren = root.children;
      if (rootChildren) {
        if (rootChildren[0].type === "component") {
          globalScope.located[rootChildren[0].content] = true;
        }
        rootChildren[0].first = true;
        render(target, instance, rootChildren, scope, void 0, hydrate, insert);
      }
    }
    return scope;
  }

  // viewi/core/render/renderApp.ts
  var lazyRecords = {};
  function renderApp(name, params, target, onAccept, skipMiddleware) {
    globalScope.cancel = false;
    if (!(name in componentsMeta.list)) {
      throw new Error(`Component ${name} not found.`);
    }
    const info = componentsMeta.list[name];
    if (info.lazy && !(info.lazy in lazyRecords)) {
      const baseName = "viewi" + (resources.name === "default" ? "" : "." + resources.name);
      const scriptUrl = resources.publicPath + baseName + "." + info.lazy + (resources.minify ? ".min" : "") + ".js" + (resources.appendVersion ? "?" + resources.build : "");
      injectScript(scriptUrl);
      delay.postpone(info.lazy, function() {
        lazyRecords[info.lazy] = true;
        renderApp(name, params, target, onAccept, skipMiddleware);
      });
      return;
    }
    const hydrate = globalScope.hydrate;
    const lastScope = globalScope.rootScope;
    if (onAccept) {
      if (lastScope && info.parent !== globalScope.layout) {
        location.href = onAccept.href;
        return;
      }
    }
    if (info.middleware && !skipMiddleware) {
      const total = info.middleware.length;
      let globalAllow = true;
      let current = -1;
      const context = {
        next: function(allow = true) {
          globalAllow = allow;
          current++;
          if (globalAllow && current < total) {
            const middleware = resolve(info.middleware[current]);
            middleware.run(context);
          } else {
            if (globalAllow) {
              renderApp(name, params, target, onAccept, true);
            } else {
            }
          }
        }
      };
      context.next(true);
      return;
    }
    if (onAccept) {
      onAccept.func(onAccept.href, onAccept.forward);
    }
    globalScope.layout = info.parent;
    globalScope.lastIteration = globalScope.iteration;
    globalScope.iteration = {};
    globalScope.scopedContainer = {};
    globalScope.located = {};
    globalScope.rootScope = renderComponent(target ?? document, name, void 0, {}, hydrate, false, params);
    globalScope.hydrate = false;
    for (let name2 in globalScope.lastIteration) {
      if (!(name2 in globalScope.iteration)) {
        globalScope.lastIteration[name2].scope.keep = false;
      }
    }
    lastScope && dispose(lastScope);
    if (hydrate) {
      for (let a in anchors) {
        const anchor = anchors[a];
        for (let i = anchor.target.childNodes.length - 1; i >= anchor.current + 1; i--) {
          anchor.target.childNodes[i].remove();
        }
        for (let i = anchor.invalid.length - 1; i >= 0; i--) {
          anchor.target.childNodes[anchor.invalid[i]].remove();
        }
      }
    }
  }

  // viewi/core/router/locationScope.ts
  var htmlElementA = document.createElement("a");
  var locationScope = { link: htmlElementA, scrollTo: null };

  // viewi/core/router/handleUrl.ts
  var getPathName = function(href) {
    locationScope.link.href = href;
    return locationScope.link.pathname;
  };
  var onUrlUpdate = {};
  var updateHistory = function(href, forward = true) {
    if (forward) {
      window.history.pushState({ href }, "", href);
    }
    window.scrollTo(0, 0);
    onUrlUpdate.callback?.();
  };
  function handleUrl(href, forward = true) {
    globalScope.cancel = true;
    const urlPath = getPathName(href);
    const routeItem = componentsMeta.router.resolve(urlPath);
    if (routeItem == null) {
      throw "Can't resolve route for uri: " + urlPath;
    }
    setTimeout(function() {
      renderApp(routeItem.item.action, routeItem.params, void 0, { func: updateHistory, href, forward });
    }, 0);
  }

  // viewi/core/environment/platform.ts
  var Platform4 = class {
    browser = true;
    server = false;
    constructor() {
    }
    getConfig() {
      return componentsMeta.config;
    }
    redirect(url) {
      handleUrl(url);
    }
    navigateBack() {
      history.back();
    }
    getCurrentUrl() {
      return location.pathname + location.search;
    }
    getCurrentUrlPath() {
      return location.pathname;
    }
    getQueryParams() {
      return Object.fromEntries(new URLSearchParams(location.search));
    }
    onUrlUpdate(callback) {
      onUrlUpdate.callback = callback;
    }
  };

  // viewi/core/events/resolver.ts
  var Resolver = class {
    onSuccess;
    onError = null;
    onAlways = null;
    result = null;
    lastError = null;
    action;
    constructor(action) {
      this.action = action;
    }
    error(onError) {
      this.onError = onError;
    }
    success(onSuccess) {
      this.onSuccess = onSuccess;
    }
    always(always) {
      this.onAlways = always;
    }
    run() {
      const $this = this;
      this.action(function(result, error) {
        $this.result = result;
        let throwError = false;
        if (error) {
          $this.lastError = error;
          if ($this.onError !== null) {
            $this.onError(error);
          } else {
            throwError = true;
          }
        } else {
          $this.onSuccess($this.result);
        }
        if ($this.onAlways != null) {
          $this.onAlways();
        }
        if (throwError) {
          throw $this.lastError;
        }
      });
    }
    then(onSuccess, onError, always) {
      this.onSuccess = onSuccess;
      if (onError) {
        this.onError = onError;
      }
      if (always) {
        this.onAlways = always;
      }
      this.run();
    }
  };

  // viewi/core/helpers/isBlob.ts
  function isBlob(data) {
    if ("Blob" in window && data instanceof Blob) {
      return true;
    }
    return false;
  }

  // viewi/core/http/response.ts
  var Response = class _Response {
    url;
    status;
    statusText;
    headers = {};
    body = null;
    constructor(url, status, statusText, headers = {}, body = null) {
      this.url = url;
      this.status = status;
      this.statusText = statusText;
      this.headers = headers;
      this.body = body;
    }
    withUrl(url) {
      var clone = this.clone();
      clone.url = url;
      return clone;
    }
    withStatus(status, statusText = null) {
      var clone = this.clone();
      clone.status = status;
      if (statusText !== null) {
        clone.statusText = statusText;
      }
      return clone;
    }
    withHeaders(headers) {
      var clone = this.clone();
      clone.headers = { ...clone.headers, ...headers };
      return clone;
    }
    withHeader(name, value) {
      var clone = this.clone();
      clone.headers[name] = value;
      return clone;
    }
    withBody(body = null) {
      var clone = this.clone();
      clone.body = body;
      return clone;
    }
    ok() {
      return this.status >= 200 && this.status < 300;
    }
    clone() {
      var clone = new _Response(this.url, this.status, this.statusText, this.headers, this.body);
      return clone;
    }
  };

  // viewi/core/http/runRequest.ts
  function runRequest(callback, type, url, data, headers) {
    const request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        const status = request.status;
        const contentType = request.getResponseHeader("Content-Type");
        const itsJson = contentType && contentType.indexOf("application/json") === 0;
        const raw = request.responseText;
        let content = raw;
        if (itsJson) {
          content = JSON.parse(request.responseText);
        }
        const headers2 = {};
        const headersString = request.getAllResponseHeaders();
        if (headersString) {
          const headersArray = headersString.trim().split(/[\r\n]+/);
          for (let i = 0; i < headersArray.length; i++) {
            const line = headersArray[i];
            const parts = line.split(": ");
            const header = parts.shift();
            if (header) {
              const value = parts.join(": ");
              headers2[header] = value;
            }
          }
          ;
        }
        const response = new Response(url, status, "", headers2, content);
        callback(response);
      }
    };
    const isJson = data !== null && typeof data === "object" && !isBlob(data);
    request.open(type.toUpperCase(), url, true);
    if (isJson) {
      request.setRequestHeader("Content-Type", "application/json");
    }
    if (headers) {
      for (const h in headers) {
        if (Array.isArray(headers[h])) {
          for (let i = 0; i < headers[h].length; i++) {
            request.setRequestHeader(h, headers[h][i]);
          }
        } else {
          request.setRequestHeader(h, headers[h]);
        }
      }
    }
    data !== null ? request.send(isJson ? JSON.stringify(data) : data) : request.send();
  }

  // viewi/core/http/request.ts
  var Request = class _Request {
    url;
    method;
    headers = {};
    body = null;
    isExternal;
    constructor(url, method, headers = {}, body = null) {
      this.url = url;
      this.method = method;
      this.headers = headers;
      this.body = body;
    }
    withMethod(method) {
      var clone = this.clone();
      clone.method = method;
      return clone;
    }
    withUrl(url) {
      var clone = this.clone();
      clone.url = url;
      return clone;
    }
    withHeaders(headers) {
      var clone = this.clone();
      clone.headers = { ...clone.headers, ...headers };
      return clone;
    }
    withHeader(name, value) {
      var clone = this.clone();
      clone.headers[name] = value;
      return clone;
    }
    withBody(body = null) {
      var clone = this.clone();
      clone.body = body;
      return clone;
    }
    clone() {
      var clone = new _Request(this.url, this.method, this.headers, this.body);
      return clone;
    }
    // server-side only, makes no difference on front end
    markAsExternal() {
      return this;
    }
  };

  // viewi/core/http/httpClient.ts
  var interceptResponses = function(response, callback, interceptorInstances) {
    const total = interceptorInstances.length;
    let current = total;
    const lastCall = function(response2, keepGoing) {
      if (keepGoing && response2.status >= 200 && response2.status < 300) {
        callback(response2.body);
      } else {
        callback(void 0, !!response2.body ? response2.body : "Failed");
      }
    };
    const run = function(response2, keepGoing) {
      if (keepGoing) {
        if (current > -1) {
          const interceptor = interceptorInstances[current];
          interceptor.response(response2, responseHandler);
        } else {
          lastCall(response2, keepGoing);
        }
      } else {
        lastCall(response2, keepGoing);
      }
    };
    const responseHandler = {
      next: function(response2) {
        current--;
        run(response2, true);
      },
      reject: function(response2) {
        current--;
        run(response2, false);
      }
    };
    responseHandler.next(response);
  };
  var HttpClient5 = class _HttpClient {
    interceptors = [];
    request(method, url, body, headers) {
      const $this = this;
      const resolver = new Resolver(function(callback) {
        try {
          const state = getScopeState();
          const request = new Request(url, method, headers, body);
          let current = -1;
          const total = $this.interceptors.length;
          const interceptorInstances = [];
          const lastCall = function(request2, keepGoing) {
            if (keepGoing) {
              const requestKey = request2.method + "_" + request2.url + "_" + JSON.stringify(request2.body);
              if (requestKey in state.http) {
                const responseData = JSON.parse(state.http[requestKey]);
                delete state.http[requestKey];
                const response = new Response(request2.url, 200, "OK", {}, responseData);
                interceptResponses(response, callback, interceptorInstances);
                return;
              } else {
                runRequest(function(response) {
                  interceptResponses(response, callback, interceptorInstances);
                }, request2.method, request2.url, request2.body, request2.headers);
              }
            } else {
              const response = new Response(request2.url, 0, "Rejected", {}, null);
              interceptResponses(response, callback, interceptorInstances);
            }
          };
          const run = function(request2, keepGoing) {
            if (!keepGoing) {
              lastCall(request2, keepGoing);
              return;
            }
            if (current < total) {
              const interceptor = resolve($this.interceptors[current]);
              interceptorInstances.push(interceptor);
              interceptor.request(request2, requestHandler);
            } else {
              lastCall(request2, keepGoing);
            }
          };
          const requestHandler = {
            next: function(request2) {
              current++;
              run(request2, true);
            },
            reject: function(request2) {
              current++;
              run(request2, false);
            }
          };
          requestHandler.next(request);
        } catch (ex) {
          console.error(ex);
          callback(void 0, ex);
        }
      });
      return resolver;
    }
    get(url, headers) {
      return this.request("get", url, null, headers);
    }
    post(url, body, headers) {
      return this.request("post", url, body, headers);
    }
    withInterceptor(interceptor) {
      const http = new _HttpClient();
      http.interceptors = [...this.interceptors, interceptor];
      return http;
    }
  };

  // viewi/core/portal/portals.ts
  var portals = {};

  // viewi/core/portal/renderPortal.ts
  function renderPortal(portal, scope, hydrate = false, insert = false) {
    const portalEndMark = document.getElementById("portal_" + portal.to + "_end");
    if (portalEndMark) {
      const portalAnchorCurrent = portals[portal.to].current;
      const renderTarget = insert ? portalEndMark : portalEndMark.parentElement;
      const anchor = hydrate ? getAnchor(renderTarget) : void 0;
      const anchorCurrent = hydrate ? anchor.current : 0;
      const portalPositionIndexBefore = Array.prototype.indexOf.call(renderTarget.childNodes, portalEndMark);
      hydrate && (anchor.current = portalAnchorCurrent);
      let slotName = "default";
      const anchorSlotBegin = createAnchorNode(renderTarget, insert, anchor);
      if (slotName in scope.slots) {
        const slot = scope.slots[slotName];
        if (!slot.node.unpacked) {
          unpack(slot.node);
          slot.node.unpacked = true;
        }
        render(renderTarget, slot.scope.instance, slot.node.children, slot.scope, void 0, hydrate, insert);
      }
      const anchorSlotNode = createAnchorNode(renderTarget, insert, anchor, anchorSlotBegin._anchor);
      if (scope.instance._name in globalScope.iteration) {
        globalScope.iteration[scope.instance._name].slots[slotName] = anchorSlotNode;
      }
      portal.anchorNode = anchorSlotNode;
      if (hydrate) {
        portals[portal.to].current = anchor.current;
        const portalPositionIndexAfter = Array.prototype.indexOf.call(renderTarget.childNodes, portalEndMark);
        anchor.current = anchorCurrent + portalPositionIndexAfter - portalPositionIndexBefore;
      }
    }
  }

  // viewi/core/portal/portal.ts
  var Portal3 = class extends BaseComponent {
    to;
    name;
    _name = "Portal";
    anchorNode;
    destroy() {
      if (this.to && this.anchorNode && this.anchorNode.previousSibling) {
        while (this.anchorNode.previousSibling._anchor !== this.anchorNode._anchor) {
          this.anchorNode.previousSibling.remove();
        }
        this.anchorNode.previousSibling.remove();
        this.anchorNode.remove();
      }
    }
    render(target, name, scope, props, hydrate = false, insert = false, params = {}) {
      if (this.name) {
        const idEnd = "portal_" + this.name + "_end";
        if (hydrate) {
          const portalEndMark = document.getElementById(idEnd);
          if (portalEndMark) {
            const portalPositionIndex = Array.prototype.indexOf.call(target.childNodes, portalEndMark);
            if (portalPositionIndex > 0) {
              const anchor = getAnchor(target);
              if (!(this.name in portals)) {
                portals[this.name] = {};
              }
              portals[this.name].current = anchor.current + 1;
              anchor.current = portalPositionIndex;
              if (portals[this.name].queue) {
                const queue = portals[this.name].queue;
                for (let i = 0; i < queue.length; i++) {
                  queue[i][0].apply(null, queue[i][1]);
                }
                delete portals[this.name].queue;
              }
            }
          }
        } else {
          const idBegin = "portal_" + this.name;
          const portalBeginElement = document.createElement("i");
          const portalEndElement = document.createElement("i");
          portalBeginElement.setAttribute("id", idBegin);
          portalEndElement.setAttribute("id", idEnd);
          const style = "display: none !important;";
          portalBeginElement.setAttribute("style", style);
          portalEndElement.setAttribute("style", style);
          insert ? target.parentElement.insertBefore(portalBeginElement, target) : target.appendChild(portalBeginElement);
          insert ? target.parentElement.insertBefore(portalEndElement, target) : target.appendChild(portalEndElement);
        }
      } else if (this.to) {
        if (hydrate) {
          if (this.to in portals && portals[this.to].current) {
            renderPortal(this, scope, hydrate, insert);
          } else {
            const delayedRender = [renderPortal, [this, scope, hydrate, insert]];
            if (this.to in portals) {
              portals[this.to].queue.push(delayedRender);
            } else {
              portals[this.to] = {
                queue: [delayedRender]
              };
            }
          }
        } else {
          renderPortal(this, scope, false, true);
        }
      } else {
        throw new Error("Portal component should have either 'name' or 'to' attribute.");
      }
    }
  };

  // viewi/core/di/setUp.ts
  function setUp() {
    register["BaseComponent"] = BaseComponent;
    factory("HttpClient", HttpClient5, () => new HttpClient5());
    factory("Platform", Platform4, () => new Platform4());
    factory("Portal", Portal3, () => new Portal3());
  }

  // viewi/core/router/watchLinks.ts
  function watchLinks() {
    document.addEventListener("click", function(event) {
      if (event.defaultPrevented) {
        return;
      }
      if (!event.target) {
        console.warn('Can not aquire event target at "watchLinks".');
      }
      const target = event.target;
      let nextTarget = target;
      while (nextTarget.parentElement && nextTarget.tagName !== "A") {
        nextTarget = nextTarget.parentElement;
      }
      if (nextTarget.tagName === "A" && nextTarget.href && nextTarget.href.indexOf(location.origin) === 0) {
        locationScope.scrollTo = null;
        if (!locationScope.link.hash || locationScope.link.pathname !== location.pathname) {
          event.preventDefault();
          if (locationScope.link.hash) {
            locationScope.scrollTo = locationScope.link.hash;
          }
          handleUrl(nextTarget.href, true);
        }
      }
    }, false);
    window.addEventListener("popstate", function(event) {
      if (event.state)
        handleUrl(event.state.href, false);
      else
        handleUrl(location.href, false);
    });
  }

  // viewi/index.ts
  var ViewiApp = {
    register: {},
    version: resources.version,
    build: resources.build,
    name: resources.name,
    publish(group, importComponents) {
      for (let name in importComponents) {
        if (!(name in components)) {
          const imortItem = importComponents[name];
          if (imortItem._t === "template") {
            componentsMeta.list[imortItem.name] = JSON.parse(imortItem.data);
          } else {
            components[name] = imortItem;
          }
        }
      }
      delay.ready(group);
    }
  };
  window.ViewiApp = window.ViewiApp || {};
  window.ViewiApp[resources.name] = ViewiApp;
  (async () => {
    let data = JSON.parse(templates);
    if (!resources.combine) {
      data = await (await fetch(resources.componentsPath)).json();
    }
    componentsMeta.list = data;
    componentsMeta.router.setRoutes(data._routes);
    componentsMeta.config = data._config;
    const booleanArray = data._meta["boolean"].split(",");
    for (let i = 0; i < booleanArray.length; i++) {
      componentsMeta.booleanAttributes[booleanArray[i]] = true;
    }
    setUp();
    ViewiApp.register = { ...components, ...register, ...functions };
    watchLinks();
    handleUrl(location.href);
  })();
})();
