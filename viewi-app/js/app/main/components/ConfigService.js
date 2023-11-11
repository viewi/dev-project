import { register } from "../../../viewi/core/di/register";

var Process = register.Process;

class ConfigService {
    config = null;
    process = null;

    constructor(process) {
        var $this = this;
        $this.process = process;
        $this.config = process.getConfig();
    }

    getAll() {
        var $this = this;
        return $this.config;
    }

    get(name) {
        var $this = this;
        return $this.config[name] ?? null;
    }
}

export { ConfigService }