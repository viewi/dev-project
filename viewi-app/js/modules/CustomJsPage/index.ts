import { marked } from 'marked';
import { CustomJsPage } from '../../app/CustomJsPage/components/CustomJsPage';

CustomJsPage.prototype.getMarkedHtml = function (this: CustomJsPage) {
    return marked(this.markText);
};

export const modules = { CustomJsPage };