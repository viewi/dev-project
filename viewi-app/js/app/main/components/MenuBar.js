import { BaseComponent } from "../../../viewi/core/component/baseComponent";
import { ClientRoute } from "./ClientRoute";
import { json_encode } from "../functions/json_encode";
import { ViewiIcon } from "./ViewiIcon";

class MenuBar extends BaseComponent {
    _name = 'MenuBar';
    route = null;
    constructor(route) {
        super();
        var $this = this;
        $this.route = route;
    }

    goHome() {
        var $this = this;
        $this.route.navigate("\/");
    }

    back() {
        var $this = this;
        $this.route.navigateBack();
    }

    getCurrentUrl() {
        var $this = this;
        return $this.route.getUrlPath();
    }

    getQueryParams() {
        var $this = this;
        return $this.route.getQueryParams();
    }
}

export const MenuBar_x = [
    function (_component) { return function (event) { _component.goHome(event); }; },
    function (_component) { return function (event) { _component.back(event); }; },
    function (_component) { return "\n                Url: " + (_component.getCurrentUrl() ?? "") + "\n            "; },
    function (_component) { return "\n                Url: " + (json_encode(_component.getQueryParams()) ?? "") + "\n            "; }
];

export { MenuBar }