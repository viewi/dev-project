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

export { LazyPostPage }