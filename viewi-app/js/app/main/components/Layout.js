import { BaseComponent } from "../../../viewi/core/component/baseComponent";
import { register } from "../../../viewi/core/di/register";
import { MenuBar } from "./MenuBar";
import { DemoContainer } from "./DemoContainer";
import { ViewiAssets } from "./ViewiAssets";

var Portal = register.Portal;

class Layout extends BaseComponent {
    _name = 'Layout';
    title = "Viewi";
}

export const Layout_x = [
    function (_component) { return "\n        " + (_component.title ?? "") + " | Viewi\n    "; },
    function (_component) { return _component.title; }
];

export { Layout }