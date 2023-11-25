import { BaseComponent } from "../../../viewi/core/component/baseComponent";
import { Layout } from "./Layout";
import { register } from "../../../viewi/core/di/register";

var Portal = register.Portal;

class PortalPage extends BaseComponent {
    _name = 'PortalPage';
    title = "Portal demo";
}

export const PortalPage_x = [
    function (_component) { return _component.title; },
    function (_component) { return _component.title; },
    function (_component) { return [function (_component) {
    return _component.title;
}, function (_component, value) {
    _component.title = value;
}]; },
    function (_component) { return "\n            This should appear at the end of the body (portal with name \"body\").\n            Title of the page: " + (_component.title ?? "") + "\n        "; },
    function (_component) { return "\n            This should appear at the begining of the body (portal with name \"header\").\n            Title of the page: " + (_component.title ?? "") + "\n        "; },
    function (_component) { return "\n            Body: " + (_component.title ?? "") + "\n        "; },
    function (_component) { return "\n            Header: " + (_component.title ?? "") + "\n        "; }
];

export { PortalPage }