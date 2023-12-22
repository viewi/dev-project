import { ClientRoute } from "./ClientRoute";

class MemberGuardNoAccess {
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

export { MemberGuardNoAccess }