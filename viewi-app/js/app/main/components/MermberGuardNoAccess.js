import { ClientRoute } from "./ClientRoute";

class MermberGuardNoAccess {
    route = null;
    constructor(route) {
        var $this = this;
        $this.route = route;
    }

    run(c) {
        var $this = this;
        c.next(false);
        $this.route.navigate("\/");
    }
}

export { MermberGuardNoAccess }