import { BaseComponent } from "../../../viewi/core/component/baseComponent";
import { Layout } from "./Layout";

class CustomJsPage extends BaseComponent {
    _name = 'CustomJsPage';
    title = "Custom JS page";
    markText = "some text \n\n# Marked in browser\n\nRendered by **marked**.";

    getMarkedHtml(text) {
        var $this = this;
        // nothing on server-side
    }
}

export const CustomJsPage_x = [
    function (_component) { return _component.title; },
    function (_component) { return _component.title; },
    function (_component) { return [function (_component) {
    return _component.markText;
}, function (_component, value) {
    _component.markText = value;
}]; },
    function (_component) { return _component.markText; },
    function (_component) { return _component.getMarkedHtml(_component.markText); }
];

export { CustomJsPage }