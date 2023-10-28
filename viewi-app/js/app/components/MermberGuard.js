class MermberGuard {
    run(next) {
        var $this = this;
        next();
    }
}

export { MermberGuard }