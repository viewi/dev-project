class MermberGuardNoAccess {
    run(next) {
        var $this = this;
        next(false);
        // cancel
    }
}

export { MermberGuardNoAccess }