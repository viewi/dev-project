(() => {
  // app/main/resources/index.js
  var resources = {
    componentsPath: "/assets/viewi-demo/viewi.demo.json",
    publicPath: "/assets/viewi-demo/",
    name: "demo",
    minify: false,
    combine: false,
    appendVersion: false,
    build: "NyyzEWaE",
    version: "2.0.0"
  };

  // viewi/core/di/register.ts
  var register = window.ViewiApp ? window.ViewiApp[resources.name].register : {};

  // app/LazyPostPage/functions/utf8_encode.js
  function utf8_encode(argString) {
    if (argString === null || typeof argString === "undefined") {
      return "";
    }
    const string = argString + "";
    let utftext = "";
    let start;
    let end;
    let stringl = 0;
    start = end = 0;
    stringl = string.length;
    for (let n = 0; n < stringl; n++) {
      let c1 = string.charCodeAt(n);
      let enc = null;
      if (c1 < 128) {
        end++;
      } else if (c1 > 127 && c1 < 2048) {
        enc = String.fromCharCode(
          c1 >> 6 | 192,
          c1 & 63 | 128
        );
      } else if ((c1 & 63488) !== 55296) {
        enc = String.fromCharCode(
          c1 >> 12 | 224,
          c1 >> 6 & 63 | 128,
          c1 & 63 | 128
        );
      } else {
        if ((c1 & 64512) !== 55296) {
          throw new RangeError("Unmatched trail surrogate at " + n);
        }
        const c2 = string.charCodeAt(++n);
        if ((c2 & 64512) !== 56320) {
          throw new RangeError("Unmatched lead surrogate at " + (n - 1));
        }
        c1 = ((c1 & 1023) << 10) + (c2 & 1023) + 65536;
        enc = String.fromCharCode(
          c1 >> 18 | 240,
          c1 >> 12 & 63 | 128,
          c1 >> 6 & 63 | 128,
          c1 & 63 | 128
        );
      }
      if (enc !== null) {
        if (end > start) {
          utftext += string.slice(start, end);
        }
        utftext += enc;
        start = end = n + 1;
      }
    }
    if (end > start) {
      utftext += string.slice(start, stringl);
    }
    return utftext;
  }

  // app/LazyPostPage/functions/crc32.js
  function crc32(str) {
    str = utf8_encode(str);
    const table = [
      "00000000",
      "77073096",
      "EE0E612C",
      "990951BA",
      "076DC419",
      "706AF48F",
      "E963A535",
      "9E6495A3",
      "0EDB8832",
      "79DCB8A4",
      "E0D5E91E",
      "97D2D988",
      "09B64C2B",
      "7EB17CBD",
      "E7B82D07",
      "90BF1D91",
      "1DB71064",
      "6AB020F2",
      "F3B97148",
      "84BE41DE",
      "1ADAD47D",
      "6DDDE4EB",
      "F4D4B551",
      "83D385C7",
      "136C9856",
      "646BA8C0",
      "FD62F97A",
      "8A65C9EC",
      "14015C4F",
      "63066CD9",
      "FA0F3D63",
      "8D080DF5",
      "3B6E20C8",
      "4C69105E",
      "D56041E4",
      "A2677172",
      "3C03E4D1",
      "4B04D447",
      "D20D85FD",
      "A50AB56B",
      "35B5A8FA",
      "42B2986C",
      "DBBBC9D6",
      "ACBCF940",
      "32D86CE3",
      "45DF5C75",
      "DCD60DCF",
      "ABD13D59",
      "26D930AC",
      "51DE003A",
      "C8D75180",
      "BFD06116",
      "21B4F4B5",
      "56B3C423",
      "CFBA9599",
      "B8BDA50F",
      "2802B89E",
      "5F058808",
      "C60CD9B2",
      "B10BE924",
      "2F6F7C87",
      "58684C11",
      "C1611DAB",
      "B6662D3D",
      "76DC4190",
      "01DB7106",
      "98D220BC",
      "EFD5102A",
      "71B18589",
      "06B6B51F",
      "9FBFE4A5",
      "E8B8D433",
      "7807C9A2",
      "0F00F934",
      "9609A88E",
      "E10E9818",
      "7F6A0DBB",
      "086D3D2D",
      "91646C97",
      "E6635C01",
      "6B6B51F4",
      "1C6C6162",
      "856530D8",
      "F262004E",
      "6C0695ED",
      "1B01A57B",
      "8208F4C1",
      "F50FC457",
      "65B0D9C6",
      "12B7E950",
      "8BBEB8EA",
      "FCB9887C",
      "62DD1DDF",
      "15DA2D49",
      "8CD37CF3",
      "FBD44C65",
      "4DB26158",
      "3AB551CE",
      "A3BC0074",
      "D4BB30E2",
      "4ADFA541",
      "3DD895D7",
      "A4D1C46D",
      "D3D6F4FB",
      "4369E96A",
      "346ED9FC",
      "AD678846",
      "DA60B8D0",
      "44042D73",
      "33031DE5",
      "AA0A4C5F",
      "DD0D7CC9",
      "5005713C",
      "270241AA",
      "BE0B1010",
      "C90C2086",
      "5768B525",
      "206F85B3",
      "B966D409",
      "CE61E49F",
      "5EDEF90E",
      "29D9C998",
      "B0D09822",
      "C7D7A8B4",
      "59B33D17",
      "2EB40D81",
      "B7BD5C3B",
      "C0BA6CAD",
      "EDB88320",
      "9ABFB3B6",
      "03B6E20C",
      "74B1D29A",
      "EAD54739",
      "9DD277AF",
      "04DB2615",
      "73DC1683",
      "E3630B12",
      "94643B84",
      "0D6D6A3E",
      "7A6A5AA8",
      "E40ECF0B",
      "9309FF9D",
      "0A00AE27",
      "7D079EB1",
      "F00F9344",
      "8708A3D2",
      "1E01F268",
      "6906C2FE",
      "F762575D",
      "806567CB",
      "196C3671",
      "6E6B06E7",
      "FED41B76",
      "89D32BE0",
      "10DA7A5A",
      "67DD4ACC",
      "F9B9DF6F",
      "8EBEEFF9",
      "17B7BE43",
      "60B08ED5",
      "D6D6A3E8",
      "A1D1937E",
      "38D8C2C4",
      "4FDFF252",
      "D1BB67F1",
      "A6BC5767",
      "3FB506DD",
      "48B2364B",
      "D80D2BDA",
      "AF0A1B4C",
      "36034AF6",
      "41047A60",
      "DF60EFC3",
      "A867DF55",
      "316E8EEF",
      "4669BE79",
      "CB61B38C",
      "BC66831A",
      "256FD2A0",
      "5268E236",
      "CC0C7795",
      "BB0B4703",
      "220216B9",
      "5505262F",
      "C5BA3BBE",
      "B2BD0B28",
      "2BB45A92",
      "5CB36A04",
      "C2D7FFA7",
      "B5D0CF31",
      "2CD99E8B",
      "5BDEAE1D",
      "9B64C2B0",
      "EC63F226",
      "756AA39C",
      "026D930A",
      "9C0906A9",
      "EB0E363F",
      "72076785",
      "05005713",
      "95BF4A82",
      "E2B87A14",
      "7BB12BAE",
      "0CB61B38",
      "92D28E9B",
      "E5D5BE0D",
      "7CDCEFB7",
      "0BDBDF21",
      "86D3D2D4",
      "F1D4E242",
      "68DDB3F8",
      "1FDA836E",
      "81BE16CD",
      "F6B9265B",
      "6FB077E1",
      "18B74777",
      "88085AE6",
      "FF0F6A70",
      "66063BCA",
      "11010B5C",
      "8F659EFF",
      "F862AE69",
      "616BFFD3",
      "166CCF45",
      "A00AE278",
      "D70DD2EE",
      "4E048354",
      "3903B3C2",
      "A7672661",
      "D06016F7",
      "4969474D",
      "3E6E77DB",
      "AED16A4A",
      "D9D65ADC",
      "40DF0B66",
      "37D83BF0",
      "A9BCAE53",
      "DEBB9EC5",
      "47B2CF7F",
      "30B5FFE9",
      "BDBDF21C",
      "CABAC28A",
      "53B39330",
      "24B4A3A6",
      "BAD03605",
      "CDD70693",
      "54DE5729",
      "23D967BF",
      "B3667A2E",
      "C4614AB8",
      "5D681B02",
      "2A6F2B94",
      "B40BBE37",
      "C30C8EA1",
      "5A05DF1B",
      "2D02EF8D"
    ].join(" ");
    let crc = 0;
    let x = 0;
    let y = 0;
    crc = crc ^ -1;
    for (let i = 0, iTop = str.length; i < iTop; i++) {
      y = (crc ^ str.charCodeAt(i)) & 255;
      x = "0x" + table.substring(y * 9, y * 9 + 8);
      crc = crc >>> 8 ^ x;
    }
    return crc ^ -1;
  }

  // app/LazyPostPage/components/LazyPostPage.js
  var PostModel = register.PostModel;
  var SessionInterceptor = register.SessionInterceptor;
  var BaseComponent = register.BaseComponent;
  var HttpClient = register.HttpClient;
  var json_encode = register.json_encode;
  var Layout = register.Layout;
  var LazyPostPage = class extends BaseComponent {
    _name = "LazyPostPage";
    post = null;
    error = "";
    message = "";
    newPost = null;
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
      $this.newPost = new PostModel();
      $this.newPost.id = 0;
      $this.newPost.name = "New";
      $this.http.withInterceptor("SessionInterceptor").get("/api/post/" + $this.id).then(function(post) {
        $this.post = post;
        $this.message = "Post has been read successfully";
      }, function() {
        $this.error = "Server error";
      });
    }
    clean() {
      var $this = this;
      $this.newPost = new PostModel();
    }
  };
  var LazyPostPage_x = [
    function(_component) {
      return _component.post ? _component.post.name : "";
    },
    function(_component) {
      return _component.__id;
    },
    function(_component) {
      return _component.__id;
    },
    function(_component) {
      return [function(_component2) {
        return _component2.newPost.name;
      }, function(_component2, value) {
        _component2.newPost.name = value;
      }];
    },
    function(_component) {
      return "\n            " + (_component.newPost.id ?? "") + " " + (_component.newPost.name ?? "") + "\n        ";
    },
    function(_component) {
      return "\n            " + (json_encode(_component.newPost) ?? "") + "\n        ";
    },
    function(_component) {
      return _component.newPost.name;
    },
    function(_component) {
      return "\n            " + (crc32(_component.newPost.name) ?? "") + "\n        ";
    },
    function(_component) {
      return function(event) {
        _component.clean(event);
      };
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
  var LazyPostPage_t = { _t: "template", name: "LazyPostPage", data: '{"hooks":{"init":1},"dependencies":[{"argName":"http","name":"HttpClient"},{"argName":"id","name":"int","builtIn":1}],"lazy":"LazyPostPage","base":1,"parent":"Layout","nodes":{"c":null,"t":"r","h":[{"c":"Layout","t":"c","slots":{"default":{"c":null,"t":"r","h":[{"c":"\\n    ","t":"x"},{"c":"h1","t":"t","h":[{"c":"Post","t":"x"}]},{"c":"\\n    ","t":"x"},{"c":"div","t":"t","a":[{"c":"class","t":"a","h":[{"c":"mui-container-fluid"}]}],"h":[{"c":"\\n        ","t":"x"},{"c":"h3","t":"t","h":[{"c":"New post","t":"x"}]},{"c":"\\n        ","t":"x"},{"c":"label","t":"t","a":[{"c":"for","t":"a","h":[{"e":1,"code":1,"subs":["__id"]}]}],"h":[{"c":"Name","t":"x"}]},{"c":"\\n        ","t":"x"},{"c":"input","t":"t","a":[{"c":"id","t":"a","h":[{"e":1,"code":2,"subs":["__id"]}]},{"c":"type","t":"a","h":[{"c":"text"}]},{"c":"model","t":"a","h":[{"e":1,"code":3,"subs":["newPost","newPost.name","value"]}]}]},{"c":"\\n        ","t":"x"},{"c":"div","t":"t","h":[{"t":"x","e":1,"code":4,"subs":["newPost","newPost.id","newPost.name"]}]},{"c":"\\n        ","t":"x"},{"c":"div","t":"t","h":[{"t":"x","e":1,"code":5,"subs":["newPost"]}]},{"c":"\\n        ","t":"x"},{"c":"div","t":"t","a":[{"c":"id","t":"a","h":[{"e":1,"code":6,"subs":["newPost","newPost.name"]}]}],"h":[{"t":"x","e":1,"code":7,"subs":["newPost","newPost.name"]}]},{"c":"\\n        ","t":"x"},{"c":"button","t":"t","a":[{"c":"class","t":"a","h":[{"c":"mui-btn mui-btn--accent"}]},{"c":"(click)","t":"a","h":[{"e":1,"code":8}]}],"h":[{"c":"Clean","t":"x"}]},{"c":"\\n    ","t":"x"}]},{"c":"\\n    ","t":"x"},{"c":"hr","t":"t"},{"c":"\\n    ","t":"x"},{"c":"div","t":"t","a":[{"c":"class","t":"a","h":[{"c":"mui-container-fluid"}]}],"h":[{"c":"\\n        ","t":"x"},{"c":"h3","t":"t","h":[{"c":"Current post","t":"x"}]},{"c":"\\n        ","t":"x"},{"c":"div","t":"t","h":[{"t":"x","e":1,"code":9,"subs":["message"]}]},{"c":"\\n        ","t":"x"},{"c":"div","t":"t","h":[{"t":"x","e":1,"code":10,"subs":["error"]}]},{"c":"\\n        ","t":"x"},{"c":"div","t":"t","i":[{"c":"if","t":"a","h":[{"e":1,"code":11,"subs":["post"]}]}],"h":[{"t":"x","e":1,"code":12,"subs":["post","post.id","post.name"]}]},{"c":"\\n    ","t":"x"}]},{"c":"\\n","t":"x"}]}},"a":[{"c":"title","t":"a","h":[{"c":"Post "},{"e":1,"code":0,"subs":["post","post.post.name"]}]}],"h":[{"c":"\\n    ","t":"x"},{"c":"h1","t":"t","h":[{"c":"Post","t":"x"}]},{"c":"\\n    ","t":"x"},{"c":"div","t":"t","a":[{"c":"class","t":"a","h":[{"c":"mui-container-fluid"}]}],"h":[{"c":"\\n        ","t":"x"},{"c":"h3","t":"t","h":[{"c":"New post","t":"x"}]},{"c":"\\n        ","t":"x"},{"c":"label","t":"t","a":[{"c":"for","t":"a","h":[{"e":1,"code":1,"subs":["__id"]}]}],"h":[{"c":"Name","t":"x"}]},{"c":"\\n        ","t":"x"},{"c":"input","t":"t","a":[{"c":"id","t":"a","h":[{"e":1,"code":2,"subs":["__id"]}]},{"c":"type","t":"a","h":[{"c":"text"}]},{"c":"model","t":"a","h":[{"e":1,"code":3,"subs":["newPost","newPost.name","value"]}]}]},{"c":"\\n        ","t":"x"},{"c":"div","t":"t","h":[{"t":"x","e":1,"code":4,"subs":["newPost","newPost.id","newPost.name"]}]},{"c":"\\n        ","t":"x"},{"c":"div","t":"t","h":[{"t":"x","e":1,"code":5,"subs":["newPost"]}]},{"c":"\\n        ","t":"x"},{"c":"div","t":"t","a":[{"c":"id","t":"a","h":[{"e":1,"code":6,"subs":["newPost","newPost.name"]}]}],"h":[{"t":"x","e":1,"code":7,"subs":["newPost","newPost.name"]}]},{"c":"\\n        ","t":"x"},{"c":"button","t":"t","a":[{"c":"class","t":"a","h":[{"c":"mui-btn mui-btn--accent"}]},{"c":"(click)","t":"a","h":[{"e":1,"code":8}]}],"h":[{"c":"Clean","t":"x"}]},{"c":"\\n    ","t":"x"}]},{"c":"\\n    ","t":"x"},{"c":"hr","t":"t"},{"c":"\\n    ","t":"x"},{"c":"div","t":"t","a":[{"c":"class","t":"a","h":[{"c":"mui-container-fluid"}]}],"h":[{"c":"\\n        ","t":"x"},{"c":"h3","t":"t","h":[{"c":"Current post","t":"x"}]},{"c":"\\n        ","t":"x"},{"c":"div","t":"t","h":[{"t":"x","e":1,"code":9,"subs":["message"]}]},{"c":"\\n        ","t":"x"},{"c":"div","t":"t","h":[{"t":"x","e":1,"code":10,"subs":["error"]}]},{"c":"\\n        ","t":"x"},{"c":"div","t":"t","i":[{"c":"if","t":"a","h":[{"e":1,"code":11,"subs":["post"]}]}],"h":[{"t":"x","e":1,"code":12,"subs":["post","post.id","post.name"]}]},{"c":"\\n    ","t":"x"}]},{"c":"\\n","t":"x"}]}]}}' };

  // app/LazyPostPage/components/index.js
  var components = {
    LazyPostPage_x,
    LazyPostPage_t,
    LazyPostPage
  };
  window.ViewiApp.demo.publish("LazyPostPage", components);
})();
