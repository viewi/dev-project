import { BaseComponent } from "../../viewi/core/component/baseComponent";
import { ConfigService } from "./ConfigService";
import { register } from "../../viewi/core/di/register"
import { Layout } from "./Layout";
import { TestComponent } from "./TestComponent";

var Process = register.Process;

class TestPage extends BaseComponent {
    _name = 'TestPage';
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
}

export const TestPage_x = [
    function (_component) { return "Config base url: " + (_component.baseUrl ?? ""); },
    function (_component) { return "Env: " + (_component.getEnvironment() ?? ""); }
];

export { TestPage }