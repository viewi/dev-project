import { BaseComponent } from "../../../viewi/core/component/baseComponent";
import { ConfigService } from "./ConfigService";
import { CssBundle } from "./CssBundle";
import { register } from "../../../viewi/core/di/register";
import { MenuBar } from "./MenuBar";
import { DemoContainer } from "./DemoContainer";
import { ViewiAssets } from "./ViewiAssets";

var Portal = register.Portal;

class Layout extends BaseComponent {
    _name = 'Layout';
    title = "Viewi";
    assetsUrl = "\/";

    constructor(config) {
        super();
        var $this = this;
        $this.assetsUrl = config.get("assetsUrl");
    }
}

export const Layout_x = [
    function (_component) { return "\n        " + (_component.title ?? "") + " | Viewi\n    "; },
    function (_component) { return ["\/mui.css", "\/app.css"]; },
    function (_component) { return _component.title; }
];

export { Layout }