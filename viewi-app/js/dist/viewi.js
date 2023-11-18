(() => {
  // app/main/components/PostModel.js
  var PostModel = class {
    id = 0;
    name = null;
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
    componentsPath: "/assets/viewi.demo.json",
    publicPath: "/assets/",
    name: "demo",
    minify: false,
    combine: false,
    appendVersion: false,
    build: "8JOx8sEw",
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

  // app/main/components/MermberGuard.js
  var MermberGuard = class {
    run(c) {
      var $this = this;
      c.next();
    }
  };

  // app/main/components/MermberGuardNoAccess.js
  var MermberGuardNoAccess = class {
    run(c) {
      var $this = this;
      c.next(false);
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

  // app/main/components/ViewiIcon.js
  var ViewiIcon = class extends BaseComponent {
    _name = "ViewiIcon";
  };

  // app/main/components/MenuBar.js
  var MenuBar = class extends BaseComponent {
    _name = "MenuBar";
  };

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
  var Layout = class extends BaseComponent {
    _name = "Layout";
    title = "Viewi";
  };
  var Layout_x = [
    function(_component) {
      return "\n        " + (_component.title ?? "") + " | Viewi\n    ";
    }
  ];

  // app/main/components/CustomJsPage.js
  var CustomJsPage = class extends BaseComponent {
    _name = "CustomJsPage";
    title = "Custom JS page";
    markText = "some text \n\n# Marked in browser\n\nRendered by **marked**.";
    getMarkedHtml(text) {
      var $this = this;
    }
  };
  var CustomJsPage_x = [
    function(_component) {
      return _component.title;
    },
    function(_component) {
      return _component.title;
    },
    function(_component) {
      return [function(_component2) {
        return _component2.markText;
      }, function(_component2, value) {
        _component2.markText = value;
      }];
    },
    function(_component) {
      return _component.markText;
    },
    function(_component) {
      return _component.getMarkedHtml(_component.markText);
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
  var HttpClient2 = register.HttpClient;
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

  // app/main/components/ConfigService.js
  var Process = register.Process;
  var ConfigService = class {
    config = null;
    process = null;
    constructor(process) {
      var $this = this;
      $this.process = process;
      $this.config = process.getConfig();
    }
    getAll() {
      var $this = this;
      return $this.config;
    }
    get(name) {
      var $this = this;
      return $this.config[name] ?? null;
    }
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
    function(_component, _key1, item) {
      return _component.ifElseValue;
    },
    function(_component, _key1, item) {
      return item;
    },
    function(_component, _key1, item) {
      return item;
    },
    function(_component, _key1, item) {
      return item;
    },
    function(_component, _key1, item) {
      return _component.nestedIf;
    },
    function(_component, _key1, item) {
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
    function(_component, _key2, item) {
      return item;
    }
  ];

  // app/main/components/TestPage.js
  var Process2 = register.Process;
  var TestPage = class extends BaseComponent {
    _name = "TestPage";
    baseUrl = "";
    process = null;
    config = null;
    constructor(process, config) {
      super();
      var $this = this;
      $this.process = process;
      $this.config = config;
      $this.baseUrl = config.get("baseUrl");
    }
    getEnvironment() {
      var $this = this;
      return $this.process.browser ? "Browser" : "Server";
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

  // app/main/components/index.js
  var components = {
    PostModel,
    UserModel,
    ExampleInterceptor,
    SessionInterceptor,
    MermberGuard,
    MermberGuardNoAccess,
    CounterReducer,
    TodoReducer,
    DemoContainer,
    MenuBar,
    ViewiIcon,
    Counter_x,
    Counter,
    CustomJsPage_x,
    CustomJsPage,
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
    ViewiAssets_x,
    ViewiAssets,
    ConfigService
  };
  var templates = "{}";

  // app/main/functions/index.js
  var functions = {
    strlen,
    count,
    json_encode
  };

  // node_modules/marked/lib/marked.esm.js
  function _getDefaults() {
    return {
      async: false,
      breaks: false,
      extensions: null,
      gfm: true,
      hooks: null,
      pedantic: false,
      renderer: null,
      silent: false,
      tokenizer: null,
      walkTokens: null
    };
  }
  var _defaults = _getDefaults();
  function changeDefaults(newDefaults) {
    _defaults = newDefaults;
  }
  var escapeTest = /[&<>"']/;
  var escapeReplace = new RegExp(escapeTest.source, "g");
  var escapeTestNoEncode = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/;
  var escapeReplaceNoEncode = new RegExp(escapeTestNoEncode.source, "g");
  var escapeReplacements = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  };
  var getEscapeReplacement = (ch) => escapeReplacements[ch];
  function escape(html, encode) {
    if (encode) {
      if (escapeTest.test(html)) {
        return html.replace(escapeReplace, getEscapeReplacement);
      }
    } else {
      if (escapeTestNoEncode.test(html)) {
        return html.replace(escapeReplaceNoEncode, getEscapeReplacement);
      }
    }
    return html;
  }
  var unescapeTest = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;
  function unescape(html) {
    return html.replace(unescapeTest, (_, n) => {
      n = n.toLowerCase();
      if (n === "colon")
        return ":";
      if (n.charAt(0) === "#") {
        return n.charAt(1) === "x" ? String.fromCharCode(parseInt(n.substring(2), 16)) : String.fromCharCode(+n.substring(1));
      }
      return "";
    });
  }
  var caret = /(^|[^\[])\^/g;
  function edit(regex, opt) {
    regex = typeof regex === "string" ? regex : regex.source;
    opt = opt || "";
    const obj = {
      replace: (name, val) => {
        val = typeof val === "object" && "source" in val ? val.source : val;
        val = val.replace(caret, "$1");
        regex = regex.replace(name, val);
        return obj;
      },
      getRegex: () => {
        return new RegExp(regex, opt);
      }
    };
    return obj;
  }
  function cleanUrl(href) {
    try {
      href = encodeURI(href).replace(/%25/g, "%");
    } catch (e) {
      return null;
    }
    return href;
  }
  var noopTest = { exec: () => null };
  function splitCells(tableRow, count2) {
    const row = tableRow.replace(/\|/g, (match, offset, str) => {
      let escaped = false;
      let curr = offset;
      while (--curr >= 0 && str[curr] === "\\")
        escaped = !escaped;
      if (escaped) {
        return "|";
      } else {
        return " |";
      }
    }), cells = row.split(/ \|/);
    let i = 0;
    if (!cells[0].trim()) {
      cells.shift();
    }
    if (cells.length > 0 && !cells[cells.length - 1].trim()) {
      cells.pop();
    }
    if (count2) {
      if (cells.length > count2) {
        cells.splice(count2);
      } else {
        while (cells.length < count2)
          cells.push("");
      }
    }
    for (; i < cells.length; i++) {
      cells[i] = cells[i].trim().replace(/\\\|/g, "|");
    }
    return cells;
  }
  function rtrim(str, c, invert) {
    const l = str.length;
    if (l === 0) {
      return "";
    }
    let suffLen = 0;
    while (suffLen < l) {
      const currChar = str.charAt(l - suffLen - 1);
      if (currChar === c && !invert) {
        suffLen++;
      } else if (currChar !== c && invert) {
        suffLen++;
      } else {
        break;
      }
    }
    return str.slice(0, l - suffLen);
  }
  function findClosingBracket(str, b) {
    if (str.indexOf(b[1]) === -1) {
      return -1;
    }
    let level = 0;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === "\\") {
        i++;
      } else if (str[i] === b[0]) {
        level++;
      } else if (str[i] === b[1]) {
        level--;
        if (level < 0) {
          return i;
        }
      }
    }
    return -1;
  }
  function outputLink(cap, link, raw, lexer2) {
    const href = link.href;
    const title = link.title ? escape(link.title) : null;
    const text = cap[1].replace(/\\([\[\]])/g, "$1");
    if (cap[0].charAt(0) !== "!") {
      lexer2.state.inLink = true;
      const token = {
        type: "link",
        raw,
        href,
        title,
        text,
        tokens: lexer2.inlineTokens(text)
      };
      lexer2.state.inLink = false;
      return token;
    }
    return {
      type: "image",
      raw,
      href,
      title,
      text: escape(text)
    };
  }
  function indentCodeCompensation(raw, text) {
    const matchIndentToCode = raw.match(/^(\s+)(?:```)/);
    if (matchIndentToCode === null) {
      return text;
    }
    const indentToCode = matchIndentToCode[1];
    return text.split("\n").map((node) => {
      const matchIndentInNode = node.match(/^\s+/);
      if (matchIndentInNode === null) {
        return node;
      }
      const [indentInNode] = matchIndentInNode;
      if (indentInNode.length >= indentToCode.length) {
        return node.slice(indentToCode.length);
      }
      return node;
    }).join("\n");
  }
  var _Tokenizer = class {
    options;
    // TODO: Fix this rules type
    rules;
    lexer;
    constructor(options2) {
      this.options = options2 || _defaults;
    }
    space(src) {
      const cap = this.rules.block.newline.exec(src);
      if (cap && cap[0].length > 0) {
        return {
          type: "space",
          raw: cap[0]
        };
      }
    }
    code(src) {
      const cap = this.rules.block.code.exec(src);
      if (cap) {
        const text = cap[0].replace(/^ {1,4}/gm, "");
        return {
          type: "code",
          raw: cap[0],
          codeBlockStyle: "indented",
          text: !this.options.pedantic ? rtrim(text, "\n") : text
        };
      }
    }
    fences(src) {
      const cap = this.rules.block.fences.exec(src);
      if (cap) {
        const raw = cap[0];
        const text = indentCodeCompensation(raw, cap[3] || "");
        return {
          type: "code",
          raw,
          lang: cap[2] ? cap[2].trim().replace(this.rules.inline._escapes, "$1") : cap[2],
          text
        };
      }
    }
    heading(src) {
      const cap = this.rules.block.heading.exec(src);
      if (cap) {
        let text = cap[2].trim();
        if (/#$/.test(text)) {
          const trimmed = rtrim(text, "#");
          if (this.options.pedantic) {
            text = trimmed.trim();
          } else if (!trimmed || / $/.test(trimmed)) {
            text = trimmed.trim();
          }
        }
        return {
          type: "heading",
          raw: cap[0],
          depth: cap[1].length,
          text,
          tokens: this.lexer.inline(text)
        };
      }
    }
    hr(src) {
      const cap = this.rules.block.hr.exec(src);
      if (cap) {
        return {
          type: "hr",
          raw: cap[0]
        };
      }
    }
    blockquote(src) {
      const cap = this.rules.block.blockquote.exec(src);
      if (cap) {
        const text = rtrim(cap[0].replace(/^ *>[ \t]?/gm, ""), "\n");
        const top = this.lexer.state.top;
        this.lexer.state.top = true;
        const tokens = this.lexer.blockTokens(text);
        this.lexer.state.top = top;
        return {
          type: "blockquote",
          raw: cap[0],
          tokens,
          text
        };
      }
    }
    list(src) {
      let cap = this.rules.block.list.exec(src);
      if (cap) {
        let bull = cap[1].trim();
        const isordered = bull.length > 1;
        const list = {
          type: "list",
          raw: "",
          ordered: isordered,
          start: isordered ? +bull.slice(0, -1) : "",
          loose: false,
          items: []
        };
        bull = isordered ? `\\d{1,9}\\${bull.slice(-1)}` : `\\${bull}`;
        if (this.options.pedantic) {
          bull = isordered ? bull : "[*+-]";
        }
        const itemRegex = new RegExp(`^( {0,3}${bull})((?:[	 ][^\\n]*)?(?:\\n|$))`);
        let raw = "";
        let itemContents = "";
        let endsWithBlankLine = false;
        while (src) {
          let endEarly = false;
          if (!(cap = itemRegex.exec(src))) {
            break;
          }
          if (this.rules.block.hr.test(src)) {
            break;
          }
          raw = cap[0];
          src = src.substring(raw.length);
          let line = cap[2].split("\n", 1)[0].replace(/^\t+/, (t) => " ".repeat(3 * t.length));
          let nextLine = src.split("\n", 1)[0];
          let indent = 0;
          if (this.options.pedantic) {
            indent = 2;
            itemContents = line.trimStart();
          } else {
            indent = cap[2].search(/[^ ]/);
            indent = indent > 4 ? 1 : indent;
            itemContents = line.slice(indent);
            indent += cap[1].length;
          }
          let blankLine = false;
          if (!line && /^ *$/.test(nextLine)) {
            raw += nextLine + "\n";
            src = src.substring(nextLine.length + 1);
            endEarly = true;
          }
          if (!endEarly) {
            const nextBulletRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`);
            const hrRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`);
            const fencesBeginRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:\`\`\`|~~~)`);
            const headingBeginRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}#`);
            while (src) {
              const rawLine = src.split("\n", 1)[0];
              nextLine = rawLine;
              if (this.options.pedantic) {
                nextLine = nextLine.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ");
              }
              if (fencesBeginRegex.test(nextLine)) {
                break;
              }
              if (headingBeginRegex.test(nextLine)) {
                break;
              }
              if (nextBulletRegex.test(nextLine)) {
                break;
              }
              if (hrRegex.test(src)) {
                break;
              }
              if (nextLine.search(/[^ ]/) >= indent || !nextLine.trim()) {
                itemContents += "\n" + nextLine.slice(indent);
              } else {
                if (blankLine) {
                  break;
                }
                if (line.search(/[^ ]/) >= 4) {
                  break;
                }
                if (fencesBeginRegex.test(line)) {
                  break;
                }
                if (headingBeginRegex.test(line)) {
                  break;
                }
                if (hrRegex.test(line)) {
                  break;
                }
                itemContents += "\n" + nextLine;
              }
              if (!blankLine && !nextLine.trim()) {
                blankLine = true;
              }
              raw += rawLine + "\n";
              src = src.substring(rawLine.length + 1);
              line = nextLine.slice(indent);
            }
          }
          if (!list.loose) {
            if (endsWithBlankLine) {
              list.loose = true;
            } else if (/\n *\n *$/.test(raw)) {
              endsWithBlankLine = true;
            }
          }
          let istask = null;
          let ischecked;
          if (this.options.gfm) {
            istask = /^\[[ xX]\] /.exec(itemContents);
            if (istask) {
              ischecked = istask[0] !== "[ ] ";
              itemContents = itemContents.replace(/^\[[ xX]\] +/, "");
            }
          }
          list.items.push({
            type: "list_item",
            raw,
            task: !!istask,
            checked: ischecked,
            loose: false,
            text: itemContents,
            tokens: []
          });
          list.raw += raw;
        }
        list.items[list.items.length - 1].raw = raw.trimEnd();
        list.items[list.items.length - 1].text = itemContents.trimEnd();
        list.raw = list.raw.trimEnd();
        for (let i = 0; i < list.items.length; i++) {
          this.lexer.state.top = false;
          list.items[i].tokens = this.lexer.blockTokens(list.items[i].text, []);
          if (!list.loose) {
            const spacers = list.items[i].tokens.filter((t) => t.type === "space");
            const hasMultipleLineBreaks = spacers.length > 0 && spacers.some((t) => /\n.*\n/.test(t.raw));
            list.loose = hasMultipleLineBreaks;
          }
        }
        if (list.loose) {
          for (let i = 0; i < list.items.length; i++) {
            list.items[i].loose = true;
          }
        }
        return list;
      }
    }
    html(src) {
      const cap = this.rules.block.html.exec(src);
      if (cap) {
        const token = {
          type: "html",
          block: true,
          raw: cap[0],
          pre: cap[1] === "pre" || cap[1] === "script" || cap[1] === "style",
          text: cap[0]
        };
        return token;
      }
    }
    def(src) {
      const cap = this.rules.block.def.exec(src);
      if (cap) {
        const tag = cap[1].toLowerCase().replace(/\s+/g, " ");
        const href = cap[2] ? cap[2].replace(/^<(.*)>$/, "$1").replace(this.rules.inline._escapes, "$1") : "";
        const title = cap[3] ? cap[3].substring(1, cap[3].length - 1).replace(this.rules.inline._escapes, "$1") : cap[3];
        return {
          type: "def",
          tag,
          raw: cap[0],
          href,
          title
        };
      }
    }
    table(src) {
      const cap = this.rules.block.table.exec(src);
      if (cap) {
        if (!/[:|]/.test(cap[2])) {
          return;
        }
        const item = {
          type: "table",
          raw: cap[0],
          header: splitCells(cap[1]).map((c) => {
            return { text: c, tokens: [] };
          }),
          align: cap[2].replace(/^\||\| *$/g, "").split("|"),
          rows: cap[3] && cap[3].trim() ? cap[3].replace(/\n[ \t]*$/, "").split("\n") : []
        };
        if (item.header.length === item.align.length) {
          let l = item.align.length;
          let i, j, k, row;
          for (i = 0; i < l; i++) {
            const align = item.align[i];
            if (align) {
              if (/^ *-+: *$/.test(align)) {
                item.align[i] = "right";
              } else if (/^ *:-+: *$/.test(align)) {
                item.align[i] = "center";
              } else if (/^ *:-+ *$/.test(align)) {
                item.align[i] = "left";
              } else {
                item.align[i] = null;
              }
            }
          }
          l = item.rows.length;
          for (i = 0; i < l; i++) {
            item.rows[i] = splitCells(item.rows[i], item.header.length).map((c) => {
              return { text: c, tokens: [] };
            });
          }
          l = item.header.length;
          for (j = 0; j < l; j++) {
            item.header[j].tokens = this.lexer.inline(item.header[j].text);
          }
          l = item.rows.length;
          for (j = 0; j < l; j++) {
            row = item.rows[j];
            for (k = 0; k < row.length; k++) {
              row[k].tokens = this.lexer.inline(row[k].text);
            }
          }
          return item;
        }
      }
    }
    lheading(src) {
      const cap = this.rules.block.lheading.exec(src);
      if (cap) {
        return {
          type: "heading",
          raw: cap[0],
          depth: cap[2].charAt(0) === "=" ? 1 : 2,
          text: cap[1],
          tokens: this.lexer.inline(cap[1])
        };
      }
    }
    paragraph(src) {
      const cap = this.rules.block.paragraph.exec(src);
      if (cap) {
        const text = cap[1].charAt(cap[1].length - 1) === "\n" ? cap[1].slice(0, -1) : cap[1];
        return {
          type: "paragraph",
          raw: cap[0],
          text,
          tokens: this.lexer.inline(text)
        };
      }
    }
    text(src) {
      const cap = this.rules.block.text.exec(src);
      if (cap) {
        return {
          type: "text",
          raw: cap[0],
          text: cap[0],
          tokens: this.lexer.inline(cap[0])
        };
      }
    }
    escape(src) {
      const cap = this.rules.inline.escape.exec(src);
      if (cap) {
        return {
          type: "escape",
          raw: cap[0],
          text: escape(cap[1])
        };
      }
    }
    tag(src) {
      const cap = this.rules.inline.tag.exec(src);
      if (cap) {
        if (!this.lexer.state.inLink && /^<a /i.test(cap[0])) {
          this.lexer.state.inLink = true;
        } else if (this.lexer.state.inLink && /^<\/a>/i.test(cap[0])) {
          this.lexer.state.inLink = false;
        }
        if (!this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
          this.lexer.state.inRawBlock = true;
        } else if (this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
          this.lexer.state.inRawBlock = false;
        }
        return {
          type: "html",
          raw: cap[0],
          inLink: this.lexer.state.inLink,
          inRawBlock: this.lexer.state.inRawBlock,
          block: false,
          text: cap[0]
        };
      }
    }
    link(src) {
      const cap = this.rules.inline.link.exec(src);
      if (cap) {
        const trimmedUrl = cap[2].trim();
        if (!this.options.pedantic && /^</.test(trimmedUrl)) {
          if (!/>$/.test(trimmedUrl)) {
            return;
          }
          const rtrimSlash = rtrim(trimmedUrl.slice(0, -1), "\\");
          if ((trimmedUrl.length - rtrimSlash.length) % 2 === 0) {
            return;
          }
        } else {
          const lastParenIndex = findClosingBracket(cap[2], "()");
          if (lastParenIndex > -1) {
            const start = cap[0].indexOf("!") === 0 ? 5 : 4;
            const linkLen = start + cap[1].length + lastParenIndex;
            cap[2] = cap[2].substring(0, lastParenIndex);
            cap[0] = cap[0].substring(0, linkLen).trim();
            cap[3] = "";
          }
        }
        let href = cap[2];
        let title = "";
        if (this.options.pedantic) {
          const link = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);
          if (link) {
            href = link[1];
            title = link[3];
          }
        } else {
          title = cap[3] ? cap[3].slice(1, -1) : "";
        }
        href = href.trim();
        if (/^</.test(href)) {
          if (this.options.pedantic && !/>$/.test(trimmedUrl)) {
            href = href.slice(1);
          } else {
            href = href.slice(1, -1);
          }
        }
        return outputLink(cap, {
          href: href ? href.replace(this.rules.inline._escapes, "$1") : href,
          title: title ? title.replace(this.rules.inline._escapes, "$1") : title
        }, cap[0], this.lexer);
      }
    }
    reflink(src, links) {
      let cap;
      if ((cap = this.rules.inline.reflink.exec(src)) || (cap = this.rules.inline.nolink.exec(src))) {
        let link = (cap[2] || cap[1]).replace(/\s+/g, " ");
        link = links[link.toLowerCase()];
        if (!link) {
          const text = cap[0].charAt(0);
          return {
            type: "text",
            raw: text,
            text
          };
        }
        return outputLink(cap, link, cap[0], this.lexer);
      }
    }
    emStrong(src, maskedSrc, prevChar = "") {
      let match = this.rules.inline.emStrong.lDelim.exec(src);
      if (!match)
        return;
      if (match[3] && prevChar.match(/[\p{L}\p{N}]/u))
        return;
      const nextChar = match[1] || match[2] || "";
      if (!nextChar || !prevChar || this.rules.inline.punctuation.exec(prevChar)) {
        const lLength = [...match[0]].length - 1;
        let rDelim, rLength, delimTotal = lLength, midDelimTotal = 0;
        const endReg = match[0][0] === "*" ? this.rules.inline.emStrong.rDelimAst : this.rules.inline.emStrong.rDelimUnd;
        endReg.lastIndex = 0;
        maskedSrc = maskedSrc.slice(-1 * src.length + lLength);
        while ((match = endReg.exec(maskedSrc)) != null) {
          rDelim = match[1] || match[2] || match[3] || match[4] || match[5] || match[6];
          if (!rDelim)
            continue;
          rLength = [...rDelim].length;
          if (match[3] || match[4]) {
            delimTotal += rLength;
            continue;
          } else if (match[5] || match[6]) {
            if (lLength % 3 && !((lLength + rLength) % 3)) {
              midDelimTotal += rLength;
              continue;
            }
          }
          delimTotal -= rLength;
          if (delimTotal > 0)
            continue;
          rLength = Math.min(rLength, rLength + delimTotal + midDelimTotal);
          const lastCharLength = [...match[0]][0].length;
          const raw = src.slice(0, lLength + match.index + lastCharLength + rLength);
          if (Math.min(lLength, rLength) % 2) {
            const text2 = raw.slice(1, -1);
            return {
              type: "em",
              raw,
              text: text2,
              tokens: this.lexer.inlineTokens(text2)
            };
          }
          const text = raw.slice(2, -2);
          return {
            type: "strong",
            raw,
            text,
            tokens: this.lexer.inlineTokens(text)
          };
        }
      }
    }
    codespan(src) {
      const cap = this.rules.inline.code.exec(src);
      if (cap) {
        let text = cap[2].replace(/\n/g, " ");
        const hasNonSpaceChars = /[^ ]/.test(text);
        const hasSpaceCharsOnBothEnds = /^ /.test(text) && / $/.test(text);
        if (hasNonSpaceChars && hasSpaceCharsOnBothEnds) {
          text = text.substring(1, text.length - 1);
        }
        text = escape(text, true);
        return {
          type: "codespan",
          raw: cap[0],
          text
        };
      }
    }
    br(src) {
      const cap = this.rules.inline.br.exec(src);
      if (cap) {
        return {
          type: "br",
          raw: cap[0]
        };
      }
    }
    del(src) {
      const cap = this.rules.inline.del.exec(src);
      if (cap) {
        return {
          type: "del",
          raw: cap[0],
          text: cap[2],
          tokens: this.lexer.inlineTokens(cap[2])
        };
      }
    }
    autolink(src) {
      const cap = this.rules.inline.autolink.exec(src);
      if (cap) {
        let text, href;
        if (cap[2] === "@") {
          text = escape(cap[1]);
          href = "mailto:" + text;
        } else {
          text = escape(cap[1]);
          href = text;
        }
        return {
          type: "link",
          raw: cap[0],
          text,
          href,
          tokens: [
            {
              type: "text",
              raw: text,
              text
            }
          ]
        };
      }
    }
    url(src) {
      let cap;
      if (cap = this.rules.inline.url.exec(src)) {
        let text, href;
        if (cap[2] === "@") {
          text = escape(cap[0]);
          href = "mailto:" + text;
        } else {
          let prevCapZero;
          do {
            prevCapZero = cap[0];
            cap[0] = this.rules.inline._backpedal.exec(cap[0])[0];
          } while (prevCapZero !== cap[0]);
          text = escape(cap[0]);
          if (cap[1] === "www.") {
            href = "http://" + cap[0];
          } else {
            href = cap[0];
          }
        }
        return {
          type: "link",
          raw: cap[0],
          text,
          href,
          tokens: [
            {
              type: "text",
              raw: text,
              text
            }
          ]
        };
      }
    }
    inlineText(src) {
      const cap = this.rules.inline.text.exec(src);
      if (cap) {
        let text;
        if (this.lexer.state.inRawBlock) {
          text = cap[0];
        } else {
          text = escape(cap[0]);
        }
        return {
          type: "text",
          raw: cap[0],
          text
        };
      }
    }
  };
  var block = {
    newline: /^(?: *(?:\n|$))+/,
    code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
    fences: /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
    hr: /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
    heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
    blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
    list: /^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,
    html: "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",
    def: /^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,
    table: noopTest,
    lheading: /^(?!bull )((?:.|\n(?!\s*?\n|bull ))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
    // regex template, placeholders will be replaced according to different paragraph
    // interruption rules of commonmark and the original markdown spec:
    _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
    text: /^[^\n]+/
  };
  block._label = /(?!\s*\])(?:\\.|[^\[\]\\])+/;
  block._title = /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;
  block.def = edit(block.def).replace("label", block._label).replace("title", block._title).getRegex();
  block.bullet = /(?:[*+-]|\d{1,9}[.)])/;
  block.listItemStart = edit(/^( *)(bull) */).replace("bull", block.bullet).getRegex();
  block.list = edit(block.list).replace(/bull/g, block.bullet).replace("hr", "\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def", "\\n+(?=" + block.def.source + ")").getRegex();
  block._tag = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
  block._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/;
  block.html = edit(block.html, "i").replace("comment", block._comment).replace("tag", block._tag).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
  block.lheading = edit(block.lheading).replace(/bull/g, block.bullet).getRegex();
  block.paragraph = edit(block._paragraph).replace("hr", block.hr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", block._tag).getRegex();
  block.blockquote = edit(block.blockquote).replace("paragraph", block.paragraph).getRegex();
  block.normal = { ...block };
  block.gfm = {
    ...block.normal,
    table: "^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"
    // Cells
  };
  block.gfm.table = edit(block.gfm.table).replace("hr", block.hr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", block._tag).getRegex();
  block.gfm.paragraph = edit(block._paragraph).replace("hr", block.hr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", block.gfm.table).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", block._tag).getRegex();
  block.pedantic = {
    ...block.normal,
    html: edit(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", block._comment).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
    def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
    heading: /^(#{1,6})(.*)(?:\n+|$)/,
    fences: noopTest,
    lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
    paragraph: edit(block.normal._paragraph).replace("hr", block.hr).replace("heading", " *#{1,6} *[^\n]").replace("lheading", block.lheading).replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").getRegex()
  };
  var inline = {
    escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
    autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
    url: noopTest,
    tag: "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
    link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
    reflink: /^!?\[(label)\]\[(ref)\]/,
    nolink: /^!?\[(ref)\](?:\[\])?/,
    reflinkSearch: "reflink|nolink(?!\\()",
    emStrong: {
      lDelim: /^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/,
      //         (1) and (2) can only be a Right Delimiter. (3) and (4) can only be Left.  (5) and (6) can be either Left or Right.
      //         | Skip orphan inside strong      | Consume to delim | (1) #***              | (2) a***#, a***                    | (3) #***a, ***a                  | (4) ***#                 | (5) #***#                         | (6) a***a
      rDelimAst: /^[^_*]*?__[^_*]*?\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\*)[punct](\*+)(?=[\s]|$)|[^punct\s](\*+)(?!\*)(?=[punct\s]|$)|(?!\*)[punct\s](\*+)(?=[^punct\s])|[\s](\*+)(?!\*)(?=[punct])|(?!\*)[punct](\*+)(?!\*)(?=[punct])|[^punct\s](\*+)(?=[^punct\s])/,
      rDelimUnd: /^[^_*]*?\*\*[^_*]*?_[^_*]*?(?=\*\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\s]|$)|[^punct\s](_+)(?!_)(?=[punct\s]|$)|(?!_)[punct\s](_+)(?=[^punct\s])|[\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])/
      // ^- Not allowed for _
    },
    code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
    br: /^( {2,}|\\)\n(?!\s*$)/,
    del: noopTest,
    text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
    punctuation: /^((?![*_])[\spunctuation])/
  };
  inline._punctuation = "\\p{P}$+<=>`^|~";
  inline.punctuation = edit(inline.punctuation, "u").replace(/punctuation/g, inline._punctuation).getRegex();
  inline.blockSkip = /\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g;
  inline.anyPunctuation = /\\[punct]/g;
  inline._escapes = /\\([punct])/g;
  inline._comment = edit(block._comment).replace("(?:-->|$)", "-->").getRegex();
  inline.emStrong.lDelim = edit(inline.emStrong.lDelim, "u").replace(/punct/g, inline._punctuation).getRegex();
  inline.emStrong.rDelimAst = edit(inline.emStrong.rDelimAst, "gu").replace(/punct/g, inline._punctuation).getRegex();
  inline.emStrong.rDelimUnd = edit(inline.emStrong.rDelimUnd, "gu").replace(/punct/g, inline._punctuation).getRegex();
  inline.anyPunctuation = edit(inline.anyPunctuation, "gu").replace(/punct/g, inline._punctuation).getRegex();
  inline._escapes = edit(inline._escapes, "gu").replace(/punct/g, inline._punctuation).getRegex();
  inline._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;
  inline._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;
  inline.autolink = edit(inline.autolink).replace("scheme", inline._scheme).replace("email", inline._email).getRegex();
  inline._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;
  inline.tag = edit(inline.tag).replace("comment", inline._comment).replace("attribute", inline._attribute).getRegex();
  inline._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
  inline._href = /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/;
  inline._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;
  inline.link = edit(inline.link).replace("label", inline._label).replace("href", inline._href).replace("title", inline._title).getRegex();
  inline.reflink = edit(inline.reflink).replace("label", inline._label).replace("ref", block._label).getRegex();
  inline.nolink = edit(inline.nolink).replace("ref", block._label).getRegex();
  inline.reflinkSearch = edit(inline.reflinkSearch, "g").replace("reflink", inline.reflink).replace("nolink", inline.nolink).getRegex();
  inline.normal = { ...inline };
  inline.pedantic = {
    ...inline.normal,
    strong: {
      start: /^__|\*\*/,
      middle: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
      endAst: /\*\*(?!\*)/g,
      endUnd: /__(?!_)/g
    },
    em: {
      start: /^_|\*/,
      middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,
      endAst: /\*(?!\*)/g,
      endUnd: /_(?!_)/g
    },
    link: edit(/^!?\[(label)\]\((.*?)\)/).replace("label", inline._label).getRegex(),
    reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", inline._label).getRegex()
  };
  inline.gfm = {
    ...inline.normal,
    escape: edit(inline.escape).replace("])", "~|])").getRegex(),
    _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
    url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
    _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
    del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
    text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
  };
  inline.gfm.url = edit(inline.gfm.url, "i").replace("email", inline.gfm._extended_email).getRegex();
  inline.breaks = {
    ...inline.gfm,
    br: edit(inline.br).replace("{2,}", "*").getRegex(),
    text: edit(inline.gfm.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
  };
  var _Lexer = class __Lexer {
    tokens;
    options;
    state;
    tokenizer;
    inlineQueue;
    constructor(options2) {
      this.tokens = [];
      this.tokens.links = /* @__PURE__ */ Object.create(null);
      this.options = options2 || _defaults;
      this.options.tokenizer = this.options.tokenizer || new _Tokenizer();
      this.tokenizer = this.options.tokenizer;
      this.tokenizer.options = this.options;
      this.tokenizer.lexer = this;
      this.inlineQueue = [];
      this.state = {
        inLink: false,
        inRawBlock: false,
        top: true
      };
      const rules = {
        block: block.normal,
        inline: inline.normal
      };
      if (this.options.pedantic) {
        rules.block = block.pedantic;
        rules.inline = inline.pedantic;
      } else if (this.options.gfm) {
        rules.block = block.gfm;
        if (this.options.breaks) {
          rules.inline = inline.breaks;
        } else {
          rules.inline = inline.gfm;
        }
      }
      this.tokenizer.rules = rules;
    }
    /**
     * Expose Rules
     */
    static get rules() {
      return {
        block,
        inline
      };
    }
    /**
     * Static Lex Method
     */
    static lex(src, options2) {
      const lexer2 = new __Lexer(options2);
      return lexer2.lex(src);
    }
    /**
     * Static Lex Inline Method
     */
    static lexInline(src, options2) {
      const lexer2 = new __Lexer(options2);
      return lexer2.inlineTokens(src);
    }
    /**
     * Preprocessing
     */
    lex(src) {
      src = src.replace(/\r\n|\r/g, "\n");
      this.blockTokens(src, this.tokens);
      let next;
      while (next = this.inlineQueue.shift()) {
        this.inlineTokens(next.src, next.tokens);
      }
      return this.tokens;
    }
    blockTokens(src, tokens = []) {
      if (this.options.pedantic) {
        src = src.replace(/\t/g, "    ").replace(/^ +$/gm, "");
      } else {
        src = src.replace(/^( *)(\t+)/gm, (_, leading, tabs) => {
          return leading + "    ".repeat(tabs.length);
        });
      }
      let token;
      let lastToken;
      let cutSrc;
      let lastParagraphClipped;
      while (src) {
        if (this.options.extensions && this.options.extensions.block && this.options.extensions.block.some((extTokenizer) => {
          if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            return true;
          }
          return false;
        })) {
          continue;
        }
        if (token = this.tokenizer.space(src)) {
          src = src.substring(token.raw.length);
          if (token.raw.length === 1 && tokens.length > 0) {
            tokens[tokens.length - 1].raw += "\n";
          } else {
            tokens.push(token);
          }
          continue;
        }
        if (token = this.tokenizer.code(src)) {
          src = src.substring(token.raw.length);
          lastToken = tokens[tokens.length - 1];
          if (lastToken && (lastToken.type === "paragraph" || lastToken.type === "text")) {
            lastToken.raw += "\n" + token.raw;
            lastToken.text += "\n" + token.text;
            this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
          } else {
            tokens.push(token);
          }
          continue;
        }
        if (token = this.tokenizer.fences(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.heading(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.hr(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.blockquote(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.list(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.html(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.def(src)) {
          src = src.substring(token.raw.length);
          lastToken = tokens[tokens.length - 1];
          if (lastToken && (lastToken.type === "paragraph" || lastToken.type === "text")) {
            lastToken.raw += "\n" + token.raw;
            lastToken.text += "\n" + token.raw;
            this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
          } else if (!this.tokens.links[token.tag]) {
            this.tokens.links[token.tag] = {
              href: token.href,
              title: token.title
            };
          }
          continue;
        }
        if (token = this.tokenizer.table(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.lheading(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        cutSrc = src;
        if (this.options.extensions && this.options.extensions.startBlock) {
          let startIndex = Infinity;
          const tempSrc = src.slice(1);
          let tempStart;
          this.options.extensions.startBlock.forEach((getStartIndex) => {
            tempStart = getStartIndex.call({ lexer: this }, tempSrc);
            if (typeof tempStart === "number" && tempStart >= 0) {
              startIndex = Math.min(startIndex, tempStart);
            }
          });
          if (startIndex < Infinity && startIndex >= 0) {
            cutSrc = src.substring(0, startIndex + 1);
          }
        }
        if (this.state.top && (token = this.tokenizer.paragraph(cutSrc))) {
          lastToken = tokens[tokens.length - 1];
          if (lastParagraphClipped && lastToken.type === "paragraph") {
            lastToken.raw += "\n" + token.raw;
            lastToken.text += "\n" + token.text;
            this.inlineQueue.pop();
            this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
          } else {
            tokens.push(token);
          }
          lastParagraphClipped = cutSrc.length !== src.length;
          src = src.substring(token.raw.length);
          continue;
        }
        if (token = this.tokenizer.text(src)) {
          src = src.substring(token.raw.length);
          lastToken = tokens[tokens.length - 1];
          if (lastToken && lastToken.type === "text") {
            lastToken.raw += "\n" + token.raw;
            lastToken.text += "\n" + token.text;
            this.inlineQueue.pop();
            this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
          } else {
            tokens.push(token);
          }
          continue;
        }
        if (src) {
          const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
          if (this.options.silent) {
            console.error(errMsg);
            break;
          } else {
            throw new Error(errMsg);
          }
        }
      }
      this.state.top = true;
      return tokens;
    }
    inline(src, tokens = []) {
      this.inlineQueue.push({ src, tokens });
      return tokens;
    }
    /**
     * Lexing/Compiling
     */
    inlineTokens(src, tokens = []) {
      let token, lastToken, cutSrc;
      let maskedSrc = src;
      let match;
      let keepPrevChar, prevChar;
      if (this.tokens.links) {
        const links = Object.keys(this.tokens.links);
        if (links.length > 0) {
          while ((match = this.tokenizer.rules.inline.reflinkSearch.exec(maskedSrc)) != null) {
            if (links.includes(match[0].slice(match[0].lastIndexOf("[") + 1, -1))) {
              maskedSrc = maskedSrc.slice(0, match.index) + "[" + "a".repeat(match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex);
            }
          }
        }
      }
      while ((match = this.tokenizer.rules.inline.blockSkip.exec(maskedSrc)) != null) {
        maskedSrc = maskedSrc.slice(0, match.index) + "[" + "a".repeat(match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
      }
      while ((match = this.tokenizer.rules.inline.anyPunctuation.exec(maskedSrc)) != null) {
        maskedSrc = maskedSrc.slice(0, match.index) + "++" + maskedSrc.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
      }
      while (src) {
        if (!keepPrevChar) {
          prevChar = "";
        }
        keepPrevChar = false;
        if (this.options.extensions && this.options.extensions.inline && this.options.extensions.inline.some((extTokenizer) => {
          if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            return true;
          }
          return false;
        })) {
          continue;
        }
        if (token = this.tokenizer.escape(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.tag(src)) {
          src = src.substring(token.raw.length);
          lastToken = tokens[tokens.length - 1];
          if (lastToken && token.type === "text" && lastToken.type === "text") {
            lastToken.raw += token.raw;
            lastToken.text += token.text;
          } else {
            tokens.push(token);
          }
          continue;
        }
        if (token = this.tokenizer.link(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.reflink(src, this.tokens.links)) {
          src = src.substring(token.raw.length);
          lastToken = tokens[tokens.length - 1];
          if (lastToken && token.type === "text" && lastToken.type === "text") {
            lastToken.raw += token.raw;
            lastToken.text += token.text;
          } else {
            tokens.push(token);
          }
          continue;
        }
        if (token = this.tokenizer.emStrong(src, maskedSrc, prevChar)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.codespan(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.br(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.del(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.autolink(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (!this.state.inLink && (token = this.tokenizer.url(src))) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        cutSrc = src;
        if (this.options.extensions && this.options.extensions.startInline) {
          let startIndex = Infinity;
          const tempSrc = src.slice(1);
          let tempStart;
          this.options.extensions.startInline.forEach((getStartIndex) => {
            tempStart = getStartIndex.call({ lexer: this }, tempSrc);
            if (typeof tempStart === "number" && tempStart >= 0) {
              startIndex = Math.min(startIndex, tempStart);
            }
          });
          if (startIndex < Infinity && startIndex >= 0) {
            cutSrc = src.substring(0, startIndex + 1);
          }
        }
        if (token = this.tokenizer.inlineText(cutSrc)) {
          src = src.substring(token.raw.length);
          if (token.raw.slice(-1) !== "_") {
            prevChar = token.raw.slice(-1);
          }
          keepPrevChar = true;
          lastToken = tokens[tokens.length - 1];
          if (lastToken && lastToken.type === "text") {
            lastToken.raw += token.raw;
            lastToken.text += token.text;
          } else {
            tokens.push(token);
          }
          continue;
        }
        if (src) {
          const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
          if (this.options.silent) {
            console.error(errMsg);
            break;
          } else {
            throw new Error(errMsg);
          }
        }
      }
      return tokens;
    }
  };
  var _Renderer = class {
    options;
    constructor(options2) {
      this.options = options2 || _defaults;
    }
    code(code, infostring, escaped) {
      const lang = (infostring || "").match(/^\S*/)?.[0];
      code = code.replace(/\n$/, "") + "\n";
      if (!lang) {
        return "<pre><code>" + (escaped ? code : escape(code, true)) + "</code></pre>\n";
      }
      return '<pre><code class="language-' + escape(lang) + '">' + (escaped ? code : escape(code, true)) + "</code></pre>\n";
    }
    blockquote(quote) {
      return `<blockquote>
${quote}</blockquote>
`;
    }
    html(html, block2) {
      return html;
    }
    heading(text, level, raw) {
      return `<h${level}>${text}</h${level}>
`;
    }
    hr() {
      return "<hr>\n";
    }
    list(body, ordered, start) {
      const type = ordered ? "ol" : "ul";
      const startatt = ordered && start !== 1 ? ' start="' + start + '"' : "";
      return "<" + type + startatt + ">\n" + body + "</" + type + ">\n";
    }
    listitem(text, task, checked) {
      return `<li>${text}</li>
`;
    }
    checkbox(checked) {
      return "<input " + (checked ? 'checked="" ' : "") + 'disabled="" type="checkbox">';
    }
    paragraph(text) {
      return `<p>${text}</p>
`;
    }
    table(header, body) {
      if (body)
        body = `<tbody>${body}</tbody>`;
      return "<table>\n<thead>\n" + header + "</thead>\n" + body + "</table>\n";
    }
    tablerow(content) {
      return `<tr>
${content}</tr>
`;
    }
    tablecell(content, flags) {
      const type = flags.header ? "th" : "td";
      const tag = flags.align ? `<${type} align="${flags.align}">` : `<${type}>`;
      return tag + content + `</${type}>
`;
    }
    /**
     * span level renderer
     */
    strong(text) {
      return `<strong>${text}</strong>`;
    }
    em(text) {
      return `<em>${text}</em>`;
    }
    codespan(text) {
      return `<code>${text}</code>`;
    }
    br() {
      return "<br>";
    }
    del(text) {
      return `<del>${text}</del>`;
    }
    link(href, title, text) {
      const cleanHref = cleanUrl(href);
      if (cleanHref === null) {
        return text;
      }
      href = cleanHref;
      let out = '<a href="' + href + '"';
      if (title) {
        out += ' title="' + title + '"';
      }
      out += ">" + text + "</a>";
      return out;
    }
    image(href, title, text) {
      const cleanHref = cleanUrl(href);
      if (cleanHref === null) {
        return text;
      }
      href = cleanHref;
      let out = `<img src="${href}" alt="${text}"`;
      if (title) {
        out += ` title="${title}"`;
      }
      out += ">";
      return out;
    }
    text(text) {
      return text;
    }
  };
  var _TextRenderer = class {
    // no need for block level renderers
    strong(text) {
      return text;
    }
    em(text) {
      return text;
    }
    codespan(text) {
      return text;
    }
    del(text) {
      return text;
    }
    html(text) {
      return text;
    }
    text(text) {
      return text;
    }
    link(href, title, text) {
      return "" + text;
    }
    image(href, title, text) {
      return "" + text;
    }
    br() {
      return "";
    }
  };
  var _Parser = class __Parser {
    options;
    renderer;
    textRenderer;
    constructor(options2) {
      this.options = options2 || _defaults;
      this.options.renderer = this.options.renderer || new _Renderer();
      this.renderer = this.options.renderer;
      this.renderer.options = this.options;
      this.textRenderer = new _TextRenderer();
    }
    /**
     * Static Parse Method
     */
    static parse(tokens, options2) {
      const parser2 = new __Parser(options2);
      return parser2.parse(tokens);
    }
    /**
     * Static Parse Inline Method
     */
    static parseInline(tokens, options2) {
      const parser2 = new __Parser(options2);
      return parser2.parseInline(tokens);
    }
    /**
     * Parse Loop
     */
    parse(tokens, top = true) {
      let out = "";
      for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[token.type]) {
          const genericToken = token;
          const ret = this.options.extensions.renderers[genericToken.type].call({ parser: this }, genericToken);
          if (ret !== false || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(genericToken.type)) {
            out += ret || "";
            continue;
          }
        }
        switch (token.type) {
          case "space": {
            continue;
          }
          case "hr": {
            out += this.renderer.hr();
            continue;
          }
          case "heading": {
            const headingToken = token;
            out += this.renderer.heading(this.parseInline(headingToken.tokens), headingToken.depth, unescape(this.parseInline(headingToken.tokens, this.textRenderer)));
            continue;
          }
          case "code": {
            const codeToken = token;
            out += this.renderer.code(codeToken.text, codeToken.lang, !!codeToken.escaped);
            continue;
          }
          case "table": {
            const tableToken = token;
            let header = "";
            let cell = "";
            for (let j = 0; j < tableToken.header.length; j++) {
              cell += this.renderer.tablecell(this.parseInline(tableToken.header[j].tokens), { header: true, align: tableToken.align[j] });
            }
            header += this.renderer.tablerow(cell);
            let body = "";
            for (let j = 0; j < tableToken.rows.length; j++) {
              const row = tableToken.rows[j];
              cell = "";
              for (let k = 0; k < row.length; k++) {
                cell += this.renderer.tablecell(this.parseInline(row[k].tokens), { header: false, align: tableToken.align[k] });
              }
              body += this.renderer.tablerow(cell);
            }
            out += this.renderer.table(header, body);
            continue;
          }
          case "blockquote": {
            const blockquoteToken = token;
            const body = this.parse(blockquoteToken.tokens);
            out += this.renderer.blockquote(body);
            continue;
          }
          case "list": {
            const listToken = token;
            const ordered = listToken.ordered;
            const start = listToken.start;
            const loose = listToken.loose;
            let body = "";
            for (let j = 0; j < listToken.items.length; j++) {
              const item = listToken.items[j];
              const checked = item.checked;
              const task = item.task;
              let itemBody = "";
              if (item.task) {
                const checkbox = this.renderer.checkbox(!!checked);
                if (loose) {
                  if (item.tokens.length > 0 && item.tokens[0].type === "paragraph") {
                    item.tokens[0].text = checkbox + " " + item.tokens[0].text;
                    if (item.tokens[0].tokens && item.tokens[0].tokens.length > 0 && item.tokens[0].tokens[0].type === "text") {
                      item.tokens[0].tokens[0].text = checkbox + " " + item.tokens[0].tokens[0].text;
                    }
                  } else {
                    item.tokens.unshift({
                      type: "text",
                      text: checkbox + " "
                    });
                  }
                } else {
                  itemBody += checkbox + " ";
                }
              }
              itemBody += this.parse(item.tokens, loose);
              body += this.renderer.listitem(itemBody, task, !!checked);
            }
            out += this.renderer.list(body, ordered, start);
            continue;
          }
          case "html": {
            const htmlToken = token;
            out += this.renderer.html(htmlToken.text, htmlToken.block);
            continue;
          }
          case "paragraph": {
            const paragraphToken = token;
            out += this.renderer.paragraph(this.parseInline(paragraphToken.tokens));
            continue;
          }
          case "text": {
            let textToken = token;
            let body = textToken.tokens ? this.parseInline(textToken.tokens) : textToken.text;
            while (i + 1 < tokens.length && tokens[i + 1].type === "text") {
              textToken = tokens[++i];
              body += "\n" + (textToken.tokens ? this.parseInline(textToken.tokens) : textToken.text);
            }
            out += top ? this.renderer.paragraph(body) : body;
            continue;
          }
          default: {
            const errMsg = 'Token with "' + token.type + '" type was not found.';
            if (this.options.silent) {
              console.error(errMsg);
              return "";
            } else {
              throw new Error(errMsg);
            }
          }
        }
      }
      return out;
    }
    /**
     * Parse Inline Tokens
     */
    parseInline(tokens, renderer) {
      renderer = renderer || this.renderer;
      let out = "";
      for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[token.type]) {
          const ret = this.options.extensions.renderers[token.type].call({ parser: this }, token);
          if (ret !== false || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(token.type)) {
            out += ret || "";
            continue;
          }
        }
        switch (token.type) {
          case "escape": {
            const escapeToken = token;
            out += renderer.text(escapeToken.text);
            break;
          }
          case "html": {
            const tagToken = token;
            out += renderer.html(tagToken.text);
            break;
          }
          case "link": {
            const linkToken = token;
            out += renderer.link(linkToken.href, linkToken.title, this.parseInline(linkToken.tokens, renderer));
            break;
          }
          case "image": {
            const imageToken = token;
            out += renderer.image(imageToken.href, imageToken.title, imageToken.text);
            break;
          }
          case "strong": {
            const strongToken = token;
            out += renderer.strong(this.parseInline(strongToken.tokens, renderer));
            break;
          }
          case "em": {
            const emToken = token;
            out += renderer.em(this.parseInline(emToken.tokens, renderer));
            break;
          }
          case "codespan": {
            const codespanToken = token;
            out += renderer.codespan(codespanToken.text);
            break;
          }
          case "br": {
            out += renderer.br();
            break;
          }
          case "del": {
            const delToken = token;
            out += renderer.del(this.parseInline(delToken.tokens, renderer));
            break;
          }
          case "text": {
            const textToken = token;
            out += renderer.text(textToken.text);
            break;
          }
          default: {
            const errMsg = 'Token with "' + token.type + '" type was not found.';
            if (this.options.silent) {
              console.error(errMsg);
              return "";
            } else {
              throw new Error(errMsg);
            }
          }
        }
      }
      return out;
    }
  };
  var _Hooks = class {
    options;
    constructor(options2) {
      this.options = options2 || _defaults;
    }
    static passThroughHooks = /* @__PURE__ */ new Set([
      "preprocess",
      "postprocess"
    ]);
    /**
     * Process markdown before marked
     */
    preprocess(markdown) {
      return markdown;
    }
    /**
     * Process HTML after marked is finished
     */
    postprocess(html) {
      return html;
    }
  };
  var Marked = class {
    defaults = _getDefaults();
    options = this.setOptions;
    parse = this.#parseMarkdown(_Lexer.lex, _Parser.parse);
    parseInline = this.#parseMarkdown(_Lexer.lexInline, _Parser.parseInline);
    Parser = _Parser;
    Renderer = _Renderer;
    TextRenderer = _TextRenderer;
    Lexer = _Lexer;
    Tokenizer = _Tokenizer;
    Hooks = _Hooks;
    constructor(...args) {
      this.use(...args);
    }
    /**
     * Run callback for every token
     */
    walkTokens(tokens, callback) {
      let values = [];
      for (const token of tokens) {
        values = values.concat(callback.call(this, token));
        switch (token.type) {
          case "table": {
            const tableToken = token;
            for (const cell of tableToken.header) {
              values = values.concat(this.walkTokens(cell.tokens, callback));
            }
            for (const row of tableToken.rows) {
              for (const cell of row) {
                values = values.concat(this.walkTokens(cell.tokens, callback));
              }
            }
            break;
          }
          case "list": {
            const listToken = token;
            values = values.concat(this.walkTokens(listToken.items, callback));
            break;
          }
          default: {
            const genericToken = token;
            if (this.defaults.extensions?.childTokens?.[genericToken.type]) {
              this.defaults.extensions.childTokens[genericToken.type].forEach((childTokens) => {
                values = values.concat(this.walkTokens(genericToken[childTokens], callback));
              });
            } else if (genericToken.tokens) {
              values = values.concat(this.walkTokens(genericToken.tokens, callback));
            }
          }
        }
      }
      return values;
    }
    use(...args) {
      const extensions = this.defaults.extensions || { renderers: {}, childTokens: {} };
      args.forEach((pack) => {
        const opts = { ...pack };
        opts.async = this.defaults.async || opts.async || false;
        if (pack.extensions) {
          pack.extensions.forEach((ext) => {
            if (!ext.name) {
              throw new Error("extension name required");
            }
            if ("renderer" in ext) {
              const prevRenderer = extensions.renderers[ext.name];
              if (prevRenderer) {
                extensions.renderers[ext.name] = function(...args2) {
                  let ret = ext.renderer.apply(this, args2);
                  if (ret === false) {
                    ret = prevRenderer.apply(this, args2);
                  }
                  return ret;
                };
              } else {
                extensions.renderers[ext.name] = ext.renderer;
              }
            }
            if ("tokenizer" in ext) {
              if (!ext.level || ext.level !== "block" && ext.level !== "inline") {
                throw new Error("extension level must be 'block' or 'inline'");
              }
              const extLevel = extensions[ext.level];
              if (extLevel) {
                extLevel.unshift(ext.tokenizer);
              } else {
                extensions[ext.level] = [ext.tokenizer];
              }
              if (ext.start) {
                if (ext.level === "block") {
                  if (extensions.startBlock) {
                    extensions.startBlock.push(ext.start);
                  } else {
                    extensions.startBlock = [ext.start];
                  }
                } else if (ext.level === "inline") {
                  if (extensions.startInline) {
                    extensions.startInline.push(ext.start);
                  } else {
                    extensions.startInline = [ext.start];
                  }
                }
              }
            }
            if ("childTokens" in ext && ext.childTokens) {
              extensions.childTokens[ext.name] = ext.childTokens;
            }
          });
          opts.extensions = extensions;
        }
        if (pack.renderer) {
          const renderer = this.defaults.renderer || new _Renderer(this.defaults);
          for (const prop in pack.renderer) {
            const rendererFunc = pack.renderer[prop];
            const rendererKey = prop;
            const prevRenderer = renderer[rendererKey];
            renderer[rendererKey] = (...args2) => {
              let ret = rendererFunc.apply(renderer, args2);
              if (ret === false) {
                ret = prevRenderer.apply(renderer, args2);
              }
              return ret || "";
            };
          }
          opts.renderer = renderer;
        }
        if (pack.tokenizer) {
          const tokenizer = this.defaults.tokenizer || new _Tokenizer(this.defaults);
          for (const prop in pack.tokenizer) {
            const tokenizerFunc = pack.tokenizer[prop];
            const tokenizerKey = prop;
            const prevTokenizer = tokenizer[tokenizerKey];
            tokenizer[tokenizerKey] = (...args2) => {
              let ret = tokenizerFunc.apply(tokenizer, args2);
              if (ret === false) {
                ret = prevTokenizer.apply(tokenizer, args2);
              }
              return ret;
            };
          }
          opts.tokenizer = tokenizer;
        }
        if (pack.hooks) {
          const hooks = this.defaults.hooks || new _Hooks();
          for (const prop in pack.hooks) {
            const hooksFunc = pack.hooks[prop];
            const hooksKey = prop;
            const prevHook = hooks[hooksKey];
            if (_Hooks.passThroughHooks.has(prop)) {
              hooks[hooksKey] = (arg) => {
                if (this.defaults.async) {
                  return Promise.resolve(hooksFunc.call(hooks, arg)).then((ret2) => {
                    return prevHook.call(hooks, ret2);
                  });
                }
                const ret = hooksFunc.call(hooks, arg);
                return prevHook.call(hooks, ret);
              };
            } else {
              hooks[hooksKey] = (...args2) => {
                let ret = hooksFunc.apply(hooks, args2);
                if (ret === false) {
                  ret = prevHook.apply(hooks, args2);
                }
                return ret;
              };
            }
          }
          opts.hooks = hooks;
        }
        if (pack.walkTokens) {
          const walkTokens2 = this.defaults.walkTokens;
          const packWalktokens = pack.walkTokens;
          opts.walkTokens = function(token) {
            let values = [];
            values.push(packWalktokens.call(this, token));
            if (walkTokens2) {
              values = values.concat(walkTokens2.call(this, token));
            }
            return values;
          };
        }
        this.defaults = { ...this.defaults, ...opts };
      });
      return this;
    }
    setOptions(opt) {
      this.defaults = { ...this.defaults, ...opt };
      return this;
    }
    lexer(src, options2) {
      return _Lexer.lex(src, options2 ?? this.defaults);
    }
    parser(tokens, options2) {
      return _Parser.parse(tokens, options2 ?? this.defaults);
    }
    #parseMarkdown(lexer2, parser2) {
      return (src, options2) => {
        const origOpt = { ...options2 };
        const opt = { ...this.defaults, ...origOpt };
        if (this.defaults.async === true && origOpt.async === false) {
          if (!opt.silent) {
            console.warn("marked(): The async option was set to true by an extension. The async: false option sent to parse will be ignored.");
          }
          opt.async = true;
        }
        const throwError = this.#onError(!!opt.silent, !!opt.async);
        if (typeof src === "undefined" || src === null) {
          return throwError(new Error("marked(): input parameter is undefined or null"));
        }
        if (typeof src !== "string") {
          return throwError(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(src) + ", string expected"));
        }
        if (opt.hooks) {
          opt.hooks.options = opt;
        }
        if (opt.async) {
          return Promise.resolve(opt.hooks ? opt.hooks.preprocess(src) : src).then((src2) => lexer2(src2, opt)).then((tokens) => opt.walkTokens ? Promise.all(this.walkTokens(tokens, opt.walkTokens)).then(() => tokens) : tokens).then((tokens) => parser2(tokens, opt)).then((html) => opt.hooks ? opt.hooks.postprocess(html) : html).catch(throwError);
        }
        try {
          if (opt.hooks) {
            src = opt.hooks.preprocess(src);
          }
          const tokens = lexer2(src, opt);
          if (opt.walkTokens) {
            this.walkTokens(tokens, opt.walkTokens);
          }
          let html = parser2(tokens, opt);
          if (opt.hooks) {
            html = opt.hooks.postprocess(html);
          }
          return html;
        } catch (e) {
          return throwError(e);
        }
      };
    }
    #onError(silent, async) {
      return (e) => {
        e.message += "\nPlease report this to https://github.com/markedjs/marked.";
        if (silent) {
          const msg = "<p>An error occurred:</p><pre>" + escape(e.message + "", true) + "</pre>";
          if (async) {
            return Promise.resolve(msg);
          }
          return msg;
        }
        if (async) {
          return Promise.reject(e);
        }
        throw e;
      };
    }
  };
  var markedInstance = new Marked();
  function marked(src, opt) {
    return markedInstance.parse(src, opt);
  }
  marked.options = marked.setOptions = function(options2) {
    markedInstance.setOptions(options2);
    marked.defaults = markedInstance.defaults;
    changeDefaults(marked.defaults);
    return marked;
  };
  marked.getDefaults = _getDefaults;
  marked.defaults = _defaults;
  marked.use = function(...args) {
    markedInstance.use(...args);
    marked.defaults = markedInstance.defaults;
    changeDefaults(marked.defaults);
    return marked;
  };
  marked.walkTokens = function(tokens, callback) {
    return markedInstance.walkTokens(tokens, callback);
  };
  marked.parseInline = markedInstance.parseInline;
  marked.Parser = _Parser;
  marked.parser = _Parser.parse;
  marked.Renderer = _Renderer;
  marked.TextRenderer = _TextRenderer;
  marked.Lexer = _Lexer;
  marked.lexer = _Lexer.lex;
  marked.Tokenizer = _Tokenizer;
  marked.Hooks = _Hooks;
  marked.parse = marked;
  var options = marked.options;
  var setOptions = marked.setOptions;
  var use = marked.use;
  var walkTokens = marked.walkTokens;
  var parseInline = marked.parseInline;
  var parser = _Parser.parse;
  var lexer = _Lexer.lex;

  // modules/index.ts
  CustomJsPage.prototype.getMarkedHtml = function() {
    return marked(this.markText);
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

  // viewi/core/environment/process.ts
  var Process3 = class {
    browser = true;
    server = false;
    getConfig() {
      return componentsMeta.config;
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

  // viewi/core/lifecycle/scopeState.ts
  function getScopeState() {
    const scopedResponseData = window.viewiScopeState;
    return scopedResponseData ?? { http: {}, state: {} };
  }

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
  };

  // viewi/core/di/factory.ts
  var factoryContainer = {};
  function factory(name, implementation, factory2) {
    register[name] = implementation;
    factoryContainer[name] = factory2;
  }

  // viewi/core/di/globalScope.ts
  var globalScope = {
    hydrate: true,
    // first time hydrate, TODO: configurable, MFE won't need hydration
    rootScope: false,
    scopedContainer: {},
    located: {},
    iteration: {},
    lastIteration: {},
    layout: ""
  };

  // viewi/core/di/resolve.ts
  var singletonContainer = {};
  var nextInstanceId = 0;
  function resolve(name, params = {}) {
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
        var argument = null;
        if (params && dependency.argName in params) {
          argument = params[dependency.argName];
        } else if (dependency.default) {
          argument = dependency.default;
        } else if (dependency.null) {
          argument = null;
        } else if (dependency.builtIn) {
          argument = dependency.name === "string" ? "" : 0;
        } else {
          argument = resolve(dependency.name);
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

  // viewi/core/http/httpClient.ts
  var interceptResponses = function(response, callback, interceptorInstances) {
    const total = interceptorInstances.length;
    let current = total;
    const lastCall = function(response2, keepGoing) {
      if (keepGoing && response2.status >= 200 && response2.status < 300) {
        callback(response2.body);
      } else {
        callback(void 0, response2.body ?? "Failed");
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
  var HttpClient3 = class _HttpClient {
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

  // viewi/core/di/setUp.ts
  function setUp() {
    register["BaseComponent"] = BaseComponent;
    factory("HttpClient", HttpClient3, () => new HttpClient3());
    factory("Process", Process3, () => new Process3());
  }

  // viewi/core/anchor/anchors.ts
  var anchors = {};

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
  function makeReactive(componentProperty, component, path) {
    const targetObject = componentProperty.$ ?? componentProperty;
    if (!targetObject.$) {
      Object.defineProperty(targetObject, "$", {
        enumerable: false,
        writable: true,
        value: targetObject
      });
      Object.defineProperty(targetObject, "$$r", {
        enumerable: false,
        writable: true,
        value: {}
      });
    }
    const proxy = new Proxy(targetObject, {
      set(obj, prop, value) {
        const react = obj[prop] !== value;
        const ret = Reflect.set(obj, prop, value);
        if (react) {
          for (let id in obj.$$r) {
            const path2 = obj.$$r[id][0];
            const component2 = obj.$$r[id][1];
            if (path2 in component2.$$r) {
              for (let i in component2.$$r[path2]) {
                const callbackFunc = component2.$$r[path2][i];
                callbackFunc[0].apply(null, callbackFunc[1]);
              }
            }
          }
        }
        return ret;
      }
    });
    return proxy;
  }
  function deepProxy(prop, component, value) {
    if (!(prop in ReserverProps) && value !== null && typeof value === "object" && !Array.isArray(value)) {
      const activated = makeReactive(value, component, prop);
      component[prop] = activated;
      const trackerId = ++reactiveId + "";
      activated.$$r[trackerId] = [prop, component];
      component.$$p.push([trackerId, activated]);
    }
  }
  function makeProxy(component) {
    let keys = Object.keys(component);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const val = component[key];
      deepProxy(key, component, val);
    }
    const proxy = new Proxy(component, {
      set(obj, prop, value) {
        const react = obj[prop] !== value;
        const ret = Reflect.set(obj, prop, value);
        deepProxy(prop, component, value);
        if (react && prop in obj.$$r) {
          for (let i in obj.$$r[prop]) {
            const callbackFunc = obj.$$r[prop][i];
            callbackFunc[0].apply(null, callbackFunc[1]);
          }
        }
        return ret;
      }
    });
    component.$ = component;
    return proxy;
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
      if (valueContent !== null) {
        valueContent !== element.getAttribute(attrName) && element.setAttribute(attrName, valueContent);
      } else {
        element.removeAttribute(attrName);
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
      let found = false;
      for (let di in currentArrayScope) {
        if (currentArrayScope[di] === dataItem) {
          found = true;
          between = false;
          insertTarget = anchorNode;
          break;
        } else if (!between && !(dataKey in usedMap)) {
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
  function getModelHandler(instance, options2) {
    return function(event) {
      if (options2.inputType === "checkbox") {
        const currentValue = options2.getter(instance);
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
          options2.setter(instance, newValue);
        } else {
          options2.setter(instance, event.target.checked);
        }
      } else if (options2.inputType === "radio") {
        const inputValue = event.target.value;
        options2.setter(instance, inputValue);
      } else if (options2.isMultiple) {
        const inputOptions = event.target.options;
        const newValue = [];
        for (let i = 0; i < inputOptions.length; i++) {
          const currentOption = inputOptions[i];
          if (currentOption.selected) {
            newValue.push(currentOption.value);
          }
        }
        options2.setter(instance, newValue);
      } else {
        options2.setter(instance, event.target.value);
      }
    };
  }

  // viewi/core/reactivity/handlers/updateModelValue.ts
  function updateModelValue(target, instance, options2) {
    if (options2.inputType === "checkbox") {
      const currentValue = options2.getter(instance);
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
    } else if (options2.inputType === "radio") {
      const currentValue = options2.getter(instance);
      const inputValue = target.value;
      if (currentValue === inputValue) {
        target.setAttribute("checked", "checked");
        target.checked = true;
      } else {
        target.removeAttribute("checked");
        target.checked = false;
      }
    } else if (options2.isMultiple) {
      const inputOptions = target.options;
      const currentValue = options2.getter(instance);
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
      target.value = options2.getter(instance);
    }
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

  // viewi/core/helpers/svgNameSpace.ts
  var svgNameSpace = "http://www.w3.org/2000/svg";

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
              if (vdom.childNodes.length > 0) {
                const rawNodes = Array.prototype.slice.call(vdom.childNodes);
                for (let rawNodeI = 0; rawNodeI < rawNodes.length; rawNodeI++) {
                  const rawNode = rawNodes[rawNodeI];
                  const rawNodeType = rawNode.nodeType;
                  if (rawNodeType === 3) {
                    anchor.current++;
                    const currentTargetNode = target.childNodes[anchor.current];
                    if (currentTargetNode && currentTargetNode.nodeType === rawNodeType) {
                      currentTargetNode.nodeValue = rawNode.nodeValue;
                    } else {
                      insert ? target.parentElement.insertBefore(rawNode, target) : target.appendChild(rawNode);
                    }
                  } else {
                    anchor.current++;
                    const currentTargetNode = target.childNodes[anchor.current];
                    if (!currentTargetNode || currentTargetNode.nodeType !== rawNodeType || rawNodeType === 1 && currentTargetNode.nodeName !== rawNode.nodeName) {
                      insert ? target.parentElement.insertBefore(rawNode, target) : target.appendChild(rawNode);
                    } else if (rawNodeType === 1) {
                      if (currentTargetNode.nodeName !== rawNode.nodeName || currentTargetNode.outerHTML !== rawNode.outerHTML) {
                        const keepKey = currentTargetNode.getAttribute("data-keep");
                        if (!keepKey || keepKey !== rawNode.getAttribute("data-keep")) {
                          currentTargetNode.outerHTML = rawNode.outerHTML;
                        }
                      }
                    }
                  }
                }
              }
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
  var updateHistory = function(href, forward = true) {
    if (forward) {
      window.history.pushState({ href }, "", href);
    }
  };
  function handleUrl(href, forward = true) {
    const urlPath = getPathName(href);
    const routeItem = componentsMeta.router.resolve(urlPath);
    if (routeItem == null) {
      throw "Can't resolve route for uri: " + urlPath;
    }
    renderApp(routeItem.item.action, routeItem.params, void 0, { func: updateHistory, href, forward });
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
