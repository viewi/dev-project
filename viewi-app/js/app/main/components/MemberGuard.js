class MemberGuard {
    run(c) {
        var $this = this;
        c.next();
    }
}

export { MemberGuard }