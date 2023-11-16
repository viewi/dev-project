import { register } from "../../../viewi/core/di/register";
import { crc32 } from "../functions/crc32";

var PostModel = register.PostModel;
var SessionInterceptor = register.SessionInterceptor;
var BaseComponent = register.BaseComponent;
var HttpClient = register.HttpClient;
var json_encode = register.json_encode;
var Layout = register.Layout;

class LazyPostPage extends BaseComponent {
    _name = 'LazyPostPage';
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
        $this.http.withInterceptor("SessionInterceptor").get("\/api\/post\/" + $this.id).then(function (post) {
            $this.post = post;
            $this.message = "Post has been read successfully";
        }, function () {
            $this.error = "Server error";
        });
    }

    clean() {
        var $this = this;
        $this.newPost = new PostModel();
        // $this->newPost->id = 0;
        // $this->newPost->name = 'New';
    }
}

export const LazyPostPage_x = [
    function (_component) { return _component.post ? _component.post.name : ""; },
    function (_component) { return _component.__id; },
    function (_component) { return _component.__id; },
    function (_component) { return [function (_component) {
    return _component.newPost.name;
}, function (_component, value) {
    _component.newPost.name = value;
}]; },
    function (_component) { return "\n            " + (_component.newPost.id ?? "") + " " + (_component.newPost.name ?? "") + "\n        "; },
    function (_component) { return "\n            " + (json_encode(_component.newPost) ?? "") + "\n        "; },
    function (_component) { return _component.newPost.name; },
    function (_component) { return "\n            " + (crc32(_component.newPost.name) ?? "") + "\n        "; },
    function (_component) { return function (event) { _component.clean(event); }; },
    function (_component) { return "Message: " + (_component.message ?? ""); },
    function (_component) { return "Error: " + (_component.error ?? ""); },
    function (_component) { return _component.post; },
    function (_component) { return "\n            " + (_component.post.id ?? "") + " " + (_component.post.name ?? "") + "\n        "; }
];

export const LazyPostPage_t = { _t: 'template', name: 'LazyPostPage', data: "{\"hooks\":{\"init\":1},\"dependencies\":[{\"argName\":\"http\",\"name\":\"HttpClient\"},{\"argName\":\"id\",\"name\":\"int\",\"builtIn\":1}],\"lazy\":\"LazyPostPage\",\"base\":1,\"parent\":\"Layout\",\"nodes\":{\"c\":null,\"t\":\"r\",\"h\":[{\"c\":\"Layout\",\"t\":\"c\",\"slots\":{\"default\":{\"c\":null,\"t\":\"r\",\"h\":[{\"c\":\"\\n    \",\"t\":\"x\"},{\"c\":\"h1\",\"t\":\"t\",\"h\":[{\"c\":\"Post\",\"t\":\"x\"}]},{\"c\":\"\\n    \",\"t\":\"x\"},{\"c\":\"div\",\"t\":\"t\",\"a\":[{\"c\":\"class\",\"t\":\"a\",\"h\":[{\"c\":\"mui-container-fluid\"}]}],\"h\":[{\"c\":\"\\n        \",\"t\":\"x\"},{\"c\":\"h3\",\"t\":\"t\",\"h\":[{\"c\":\"New post\",\"t\":\"x\"}]},{\"c\":\"\\n        \",\"t\":\"x\"},{\"c\":\"label\",\"t\":\"t\",\"a\":[{\"c\":\"for\",\"t\":\"a\",\"h\":[{\"e\":1,\"code\":1,\"subs\":[\"__id\"]}]}],\"h\":[{\"c\":\"Name\",\"t\":\"x\"}]},{\"c\":\"\\n        \",\"t\":\"x\"},{\"c\":\"input\",\"t\":\"t\",\"a\":[{\"c\":\"id\",\"t\":\"a\",\"h\":[{\"e\":1,\"code\":2,\"subs\":[\"__id\"]}]},{\"c\":\"type\",\"t\":\"a\",\"h\":[{\"c\":\"text\"}]},{\"c\":\"model\",\"t\":\"a\",\"h\":[{\"e\":1,\"code\":3,\"subs\":[\"newPost\",\"newPost.name\",\"value\"]}]}]},{\"c\":\"\\n        \",\"t\":\"x\"},{\"c\":\"div\",\"t\":\"t\",\"h\":[{\"t\":\"x\",\"e\":1,\"code\":4,\"subs\":[\"newPost\",\"newPost.id\",\"newPost.name\"]}]},{\"c\":\"\\n        \",\"t\":\"x\"},{\"c\":\"div\",\"t\":\"t\",\"h\":[{\"t\":\"x\",\"e\":1,\"code\":5,\"subs\":[\"newPost\"]}]},{\"c\":\"\\n        \",\"t\":\"x\"},{\"c\":\"div\",\"t\":\"t\",\"a\":[{\"c\":\"id\",\"t\":\"a\",\"h\":[{\"e\":1,\"code\":6,\"subs\":[\"newPost\",\"newPost.name\"]}]}],\"h\":[{\"t\":\"x\",\"e\":1,\"code\":7,\"subs\":[\"newPost\",\"newPost.name\"]}]},{\"c\":\"\\n        \",\"t\":\"x\"},{\"c\":\"button\",\"t\":\"t\",\"a\":[{\"c\":\"class\",\"t\":\"a\",\"h\":[{\"c\":\"mui-btn mui-btn--accent\"}]},{\"c\":\"(click)\",\"t\":\"a\",\"h\":[{\"e\":1,\"code\":8}]}],\"h\":[{\"c\":\"Clean\",\"t\":\"x\"}]},{\"c\":\"\\n    \",\"t\":\"x\"}]},{\"c\":\"\\n    \",\"t\":\"x\"},{\"c\":\"hr\",\"t\":\"t\"},{\"c\":\"\\n    \",\"t\":\"x\"},{\"c\":\"div\",\"t\":\"t\",\"a\":[{\"c\":\"class\",\"t\":\"a\",\"h\":[{\"c\":\"mui-container-fluid\"}]}],\"h\":[{\"c\":\"\\n        \",\"t\":\"x\"},{\"c\":\"h3\",\"t\":\"t\",\"h\":[{\"c\":\"Current post\",\"t\":\"x\"}]},{\"c\":\"\\n        \",\"t\":\"x\"},{\"c\":\"div\",\"t\":\"t\",\"h\":[{\"t\":\"x\",\"e\":1,\"code\":9,\"subs\":[\"message\"]}]},{\"c\":\"\\n        \",\"t\":\"x\"},{\"c\":\"div\",\"t\":\"t\",\"h\":[{\"t\":\"x\",\"e\":1,\"code\":10,\"subs\":[\"error\"]}]},{\"c\":\"\\n        \",\"t\":\"x\"},{\"c\":\"div\",\"t\":\"t\",\"i\":[{\"c\":\"if\",\"t\":\"a\",\"h\":[{\"e\":1,\"code\":11,\"subs\":[\"post\"]}]}],\"h\":[{\"t\":\"x\",\"e\":1,\"code\":12,\"subs\":[\"post\",\"post.id\",\"post.name\"]}]},{\"c\":\"\\n    \",\"t\":\"x\"}]},{\"c\":\"\\n\",\"t\":\"x\"}]}},\"a\":[{\"c\":\"title\",\"t\":\"a\",\"h\":[{\"c\":\"Post \"},{\"e\":1,\"code\":0,\"subs\":[\"post\",\"post.post.name\"]}]}],\"h\":[{\"c\":\"\\n    \",\"t\":\"x\"},{\"c\":\"h1\",\"t\":\"t\",\"h\":[{\"c\":\"Post\",\"t\":\"x\"}]},{\"c\":\"\\n    \",\"t\":\"x\"},{\"c\":\"div\",\"t\":\"t\",\"a\":[{\"c\":\"class\",\"t\":\"a\",\"h\":[{\"c\":\"mui-container-fluid\"}]}],\"h\":[{\"c\":\"\\n        \",\"t\":\"x\"},{\"c\":\"h3\",\"t\":\"t\",\"h\":[{\"c\":\"New post\",\"t\":\"x\"}]},{\"c\":\"\\n        \",\"t\":\"x\"},{\"c\":\"label\",\"t\":\"t\",\"a\":[{\"c\":\"for\",\"t\":\"a\",\"h\":[{\"e\":1,\"code\":1,\"subs\":[\"__id\"]}]}],\"h\":[{\"c\":\"Name\",\"t\":\"x\"}]},{\"c\":\"\\n        \",\"t\":\"x\"},{\"c\":\"input\",\"t\":\"t\",\"a\":[{\"c\":\"id\",\"t\":\"a\",\"h\":[{\"e\":1,\"code\":2,\"subs\":[\"__id\"]}]},{\"c\":\"type\",\"t\":\"a\",\"h\":[{\"c\":\"text\"}]},{\"c\":\"model\",\"t\":\"a\",\"h\":[{\"e\":1,\"code\":3,\"subs\":[\"newPost\",\"newPost.name\",\"value\"]}]}]},{\"c\":\"\\n        \",\"t\":\"x\"},{\"c\":\"div\",\"t\":\"t\",\"h\":[{\"t\":\"x\",\"e\":1,\"code\":4,\"subs\":[\"newPost\",\"newPost.id\",\"newPost.name\"]}]},{\"c\":\"\\n        \",\"t\":\"x\"},{\"c\":\"div\",\"t\":\"t\",\"h\":[{\"t\":\"x\",\"e\":1,\"code\":5,\"subs\":[\"newPost\"]}]},{\"c\":\"\\n        \",\"t\":\"x\"},{\"c\":\"div\",\"t\":\"t\",\"a\":[{\"c\":\"id\",\"t\":\"a\",\"h\":[{\"e\":1,\"code\":6,\"subs\":[\"newPost\",\"newPost.name\"]}]}],\"h\":[{\"t\":\"x\",\"e\":1,\"code\":7,\"subs\":[\"newPost\",\"newPost.name\"]}]},{\"c\":\"\\n        \",\"t\":\"x\"},{\"c\":\"button\",\"t\":\"t\",\"a\":[{\"c\":\"class\",\"t\":\"a\",\"h\":[{\"c\":\"mui-btn mui-btn--accent\"}]},{\"c\":\"(click)\",\"t\":\"a\",\"h\":[{\"e\":1,\"code\":8}]}],\"h\":[{\"c\":\"Clean\",\"t\":\"x\"}]},{\"c\":\"\\n    \",\"t\":\"x\"}]},{\"c\":\"\\n    \",\"t\":\"x\"},{\"c\":\"hr\",\"t\":\"t\"},{\"c\":\"\\n    \",\"t\":\"x\"},{\"c\":\"div\",\"t\":\"t\",\"a\":[{\"c\":\"class\",\"t\":\"a\",\"h\":[{\"c\":\"mui-container-fluid\"}]}],\"h\":[{\"c\":\"\\n        \",\"t\":\"x\"},{\"c\":\"h3\",\"t\":\"t\",\"h\":[{\"c\":\"Current post\",\"t\":\"x\"}]},{\"c\":\"\\n        \",\"t\":\"x\"},{\"c\":\"div\",\"t\":\"t\",\"h\":[{\"t\":\"x\",\"e\":1,\"code\":9,\"subs\":[\"message\"]}]},{\"c\":\"\\n        \",\"t\":\"x\"},{\"c\":\"div\",\"t\":\"t\",\"h\":[{\"t\":\"x\",\"e\":1,\"code\":10,\"subs\":[\"error\"]}]},{\"c\":\"\\n        \",\"t\":\"x\"},{\"c\":\"div\",\"t\":\"t\",\"i\":[{\"c\":\"if\",\"t\":\"a\",\"h\":[{\"e\":1,\"code\":11,\"subs\":[\"post\"]}]}],\"h\":[{\"t\":\"x\",\"e\":1,\"code\":12,\"subs\":[\"post\",\"post.id\",\"post.name\"]}]},{\"c\":\"\\n    \",\"t\":\"x\"}]},{\"c\":\"\\n\",\"t\":\"x\"}]}]}}" };

export { LazyPostPage }