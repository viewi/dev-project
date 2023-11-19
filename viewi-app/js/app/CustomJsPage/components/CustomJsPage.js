import { register } from "../../../viewi/core/di/register";

var BaseComponent = register.BaseComponent;
var Layout = register.Layout;

class CustomJsPage extends BaseComponent {
    _name = 'CustomJsPage';
    title = "Custom JS page with lazy loading";
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

export const CustomJsPage_t = { _t: 'template', name: 'CustomJsPage', data: "{\"lazy\":\"CustomJsPage\",\"base\":1,\"parent\":\"Layout\",\"nodes\":{\"c\":null,\"t\":\"r\",\"h\":[{\"c\":\"Layout\",\"t\":\"c\",\"slots\":{\"default\":{\"c\":null,\"t\":\"r\",\"h\":[{\"c\":\"\\n    \",\"t\":\"x\"},{\"c\":\"h1\",\"t\":\"t\",\"h\":[{\"t\":\"x\",\"e\":1,\"code\":1,\"subs\":[\"title\"]}]},{\"c\":\"\\n    \",\"t\":\"x\"},{\"c\":\"p\",\"t\":\"t\",\"h\":[{\"c\":\"\\n        Usin JS library marked to render markdown on client-side.\\n    \",\"t\":\"x\"}]},{\"c\":\"\\n    \",\"t\":\"x\"},{\"c\":\"p\",\"t\":\"t\",\"h\":[{\"c\":\"\\n        File: server\\\\viewi-app\\\\js\\\\modules\\\\CustomJsPage\\\\index.ts\\n    \",\"t\":\"x\"}]},{\"c\":\"\\n    \",\"t\":\"x\"},{\"c\":\"pre\",\"t\":\"t\",\"h\":[{\"c\":\"import { marked } from 'marked';\\nimport { CustomJsPage } from '..\\\/..\\\/app\\\/CustomJsPage\\\/components\\\/CustomJsPage';\\n\\nCustomJsPage.prototype.getMarkedHtml = function (this: CustomJsPage) {\\n    return marked(this.markText);\\n};\\n\\nexport const modules = { CustomJsPage };\",\"t\":\"x\"}]},{\"c\":\"\\n    \",\"t\":\"x\"},{\"c\":\"h3\",\"t\":\"t\",\"h\":[{\"c\":\"Input\",\"t\":\"x\"}]},{\"c\":\"\\n    \",\"t\":\"x\"},{\"c\":\"label\",\"t\":\"t\",\"a\":[{\"c\":\"for\",\"t\":\"a\",\"h\":[{\"c\":\"markdown-text\"}]}],\"h\":[{\"c\":\"\\n        Enter some markdown\\n    \",\"t\":\"x\"}]},{\"c\":\"\\n    \",\"t\":\"x\"},{\"c\":\"div\",\"t\":\"t\",\"h\":[{\"c\":\"\\n        \",\"t\":\"x\"},{\"c\":\"textarea\",\"t\":\"t\",\"a\":[{\"c\":\"id\",\"t\":\"a\",\"h\":[{\"c\":\"markdown-text\"}]},{\"c\":\"rows\",\"t\":\"a\",\"h\":[{\"c\":\"10\"}]},{\"c\":\"model\",\"t\":\"a\",\"h\":[{\"e\":1,\"code\":2,\"subs\":[\"markText\",\"value\"]}]},{\"c\":\"style\",\"t\":\"a\",\"h\":[{\"c\":\"width: 100%;\"}]}]},{\"c\":\"\\n    \",\"t\":\"x\"}]},{\"c\":\"\\n    \",\"t\":\"x\"},{\"c\":\"h3\",\"t\":\"t\",\"h\":[{\"c\":\"Input:\",\"t\":\"x\"}]},{\"c\":\"\\n    \",\"t\":\"x\"},{\"c\":\"div\",\"t\":\"t\",\"h\":[{\"c\":\"\\n        \",\"t\":\"x\"},{\"c\":\"pre\",\"t\":\"t\",\"h\":[{\"t\":\"x\",\"e\":1,\"code\":3,\"subs\":[\"markText\"]}]},{\"c\":\"\\n    \",\"t\":\"x\"}]},{\"c\":\"\\n    \",\"t\":\"x\"},{\"c\":\"h3\",\"t\":\"t\",\"h\":[{\"c\":\"Output:\",\"t\":\"x\"}]},{\"c\":\"\\n    \",\"t\":\"x\"},{\"c\":\"div\",\"t\":\"t\",\"h\":[{\"t\":\"x\",\"e\":1,\"raw\":1,\"code\":4,\"subs\":[\"markText\"]}]},{\"c\":\"\\n\",\"t\":\"x\"}]}},\"a\":[{\"c\":\"title\",\"t\":\"a\",\"h\":[{\"e\":1,\"code\":0,\"subs\":[\"title\"]}]}],\"h\":[{\"c\":\"\\n    \",\"t\":\"x\"},{\"c\":\"h1\",\"t\":\"t\",\"h\":[{\"t\":\"x\",\"e\":1,\"code\":1,\"subs\":[\"title\"]}]},{\"c\":\"\\n    \",\"t\":\"x\"},{\"c\":\"p\",\"t\":\"t\",\"h\":[{\"c\":\"\\n        Usin JS library marked to render markdown on client-side.\\n    \",\"t\":\"x\"}]},{\"c\":\"\\n    \",\"t\":\"x\"},{\"c\":\"p\",\"t\":\"t\",\"h\":[{\"c\":\"\\n        File: server\\\\viewi-app\\\\js\\\\modules\\\\CustomJsPage\\\\index.ts\\n    \",\"t\":\"x\"}]},{\"c\":\"\\n    \",\"t\":\"x\"},{\"c\":\"pre\",\"t\":\"t\",\"h\":[{\"c\":\"import { marked } from 'marked';\\nimport { CustomJsPage } from '..\\\/..\\\/app\\\/CustomJsPage\\\/components\\\/CustomJsPage';\\n\\nCustomJsPage.prototype.getMarkedHtml = function (this: CustomJsPage) {\\n    return marked(this.markText);\\n};\\n\\nexport const modules = { CustomJsPage };\",\"t\":\"x\"}]},{\"c\":\"\\n    \",\"t\":\"x\"},{\"c\":\"h3\",\"t\":\"t\",\"h\":[{\"c\":\"Input\",\"t\":\"x\"}]},{\"c\":\"\\n    \",\"t\":\"x\"},{\"c\":\"label\",\"t\":\"t\",\"a\":[{\"c\":\"for\",\"t\":\"a\",\"h\":[{\"c\":\"markdown-text\"}]}],\"h\":[{\"c\":\"\\n        Enter some markdown\\n    \",\"t\":\"x\"}]},{\"c\":\"\\n    \",\"t\":\"x\"},{\"c\":\"div\",\"t\":\"t\",\"h\":[{\"c\":\"\\n        \",\"t\":\"x\"},{\"c\":\"textarea\",\"t\":\"t\",\"a\":[{\"c\":\"id\",\"t\":\"a\",\"h\":[{\"c\":\"markdown-text\"}]},{\"c\":\"rows\",\"t\":\"a\",\"h\":[{\"c\":\"10\"}]},{\"c\":\"model\",\"t\":\"a\",\"h\":[{\"e\":1,\"code\":2,\"subs\":[\"markText\",\"value\"]}]},{\"c\":\"style\",\"t\":\"a\",\"h\":[{\"c\":\"width: 100%;\"}]}]},{\"c\":\"\\n    \",\"t\":\"x\"}]},{\"c\":\"\\n    \",\"t\":\"x\"},{\"c\":\"h3\",\"t\":\"t\",\"h\":[{\"c\":\"Input:\",\"t\":\"x\"}]},{\"c\":\"\\n    \",\"t\":\"x\"},{\"c\":\"div\",\"t\":\"t\",\"h\":[{\"c\":\"\\n        \",\"t\":\"x\"},{\"c\":\"pre\",\"t\":\"t\",\"h\":[{\"t\":\"x\",\"e\":1,\"code\":3,\"subs\":[\"markText\"]}]},{\"c\":\"\\n    \",\"t\":\"x\"}]},{\"c\":\"\\n    \",\"t\":\"x\"},{\"c\":\"h3\",\"t\":\"t\",\"h\":[{\"c\":\"Output:\",\"t\":\"x\"}]},{\"c\":\"\\n    \",\"t\":\"x\"},{\"c\":\"div\",\"t\":\"t\",\"h\":[{\"t\":\"x\",\"e\":1,\"raw\":1,\"code\":4,\"subs\":[\"markText\"]}]},{\"c\":\"\\n\",\"t\":\"x\"}]}]}}" };

export { CustomJsPage }