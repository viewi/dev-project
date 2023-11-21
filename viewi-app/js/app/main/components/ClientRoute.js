import { register } from "../../../viewi/core/di/register";

var Platform = register.Platform;

class ClientRoute {
    config = null;
    platform = null;

    constructor(platform) {
        var $this = this;
        $this.platform = platform;
        $this.config = platform.getConfig();
    }

    navigateBack() {
        var $this = this;
        $this.platform.navigateBack();
    }

    navigate(url) {
        var $this = this;
        $this.platform.redirect(url);
    }

    getUrl() {
        var $this = this;
        return $this.platform.getCurrentUrl();
    }
}

export { ClientRoute }