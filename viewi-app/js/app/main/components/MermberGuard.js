class MermberGuard {
    run(c) {
        var $this = this;
        c.next();
    }
}

export { MermberGuard }