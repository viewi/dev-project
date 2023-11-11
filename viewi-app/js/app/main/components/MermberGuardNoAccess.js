class MermberGuardNoAccess {
    run(c) {
        var $this = this;
        c.next(false);
        // cancel
    }
}

export { MermberGuardNoAccess }