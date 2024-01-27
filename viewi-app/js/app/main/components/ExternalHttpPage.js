import { BaseComponent } from "../../../viewi/core/component/baseComponent";
import { register } from "../../../viewi/core/di/register";
import { Layout } from "./Layout";

var HttpClient = register.HttpClient;

class ExternalHttpPage extends BaseComponent {
    _name = 'ExternalHttpPage';
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
        $this.http.get("https:\/\/apingweb.com\/api\/users").then(function (response) {
            $this.message = "Users has been read successfully";
            $this.users = response["data"];
        }, function () {
            $this.error = "Server error";
        }, function () {
            $this.message = "";
        });
        $this.http.get("https:\/\/jsonplaceholder.typicode.com\/todos").then(function (response) {
            $this.data = response;
        }, function () {
        }, function () {
        });
    }
}

export const ExternalHttpPage_x = [
    function (_component) { return _component.data; },
    function (_component, _key1, item) { return item["title"]; },
    function (_component) { return "Message: " + (_component.message ?? ""); },
    function (_component) { return "Error: " + (_component.error ?? ""); },
    function (_component) { return _component.users; },
    function (_component) { return _component.users; },
    function (_component, _key2, user) { return user["user_id"]; },
    function (_component, _key2, user) { return user["name"]; },
    function (_component, _key2, user) { return user["email"]; },
    function (_component, _key2, user) { return user["age"]; },
    function (_component, _key2, user) { return user["date_created"]; }
];

export { ExternalHttpPage }