import { CustomJsPage } from "../app/main/components/CustomJsPage";
import { marked } from 'marked';

CustomJsPage.prototype.getMarkedHtml = function (this: CustomJsPage) {
    return marked(this.markText);
};

export const modules = { CustomJsPage };