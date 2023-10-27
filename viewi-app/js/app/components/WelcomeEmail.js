import { BaseComponent } from "../../viewi/core/component/baseComponent";
import { ConfigService } from "./ConfigService";

class WelcomeEmail extends BaseComponent {
    _name = 'WelcomeEmail';
    baseUrl = "\/";

    constructor(config) {
        super();
        var $this = this;
        $this.config = config;
        $this.baseUrl = config.get("baseUrl");
    }
}

export const WelcomeEmail_x = [
    function (_component) { return _component.baseUrl; }
];

export { WelcomeEmail }