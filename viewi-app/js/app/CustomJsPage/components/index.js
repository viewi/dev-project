import { CustomJsPage, CustomJsPage_x, CustomJsPage_t } from "./CustomJsPage";
import "../../../modules/CustomJsPage";

export const components = {
    CustomJsPage_x,
    CustomJsPage_t,
    CustomJsPage,
};

window.ViewiApp.demo.publish("CustomJsPage", components);
