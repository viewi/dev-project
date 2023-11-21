import { BaseComponent } from "../../../viewi/core/component/baseComponent";
import { ConfigService } from "./ConfigService";
import { register } from "../../../viewi/core/di/register";
import { Layout } from "./Layout";
import { TestComponent } from "./TestComponent";

var Platform = register.Platform;

class TestPage extends BaseComponent {
    _name = 'TestPage';
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
}

export const TestPage_x = [
    function (_component) { return "Config base url: " + (_component.baseUrl ?? ""); },
    function (_component) { return "Env: " + (_component.getEnvironment() ?? ""); }
];

export { TestPage }