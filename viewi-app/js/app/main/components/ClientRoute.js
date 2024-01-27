import { register } from "../../../viewi/core/di/register";

var Platform = register.Platform;

class ClientRoute {
    platform = null;
    constructor(platform) {
        var $this = this;
        $this.platform = platform;
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

    getUrlPath() {
        var $this = this;
        return $this.platform.getCurrentUrlPath();
    }

    getQueryParams() {
        var $this = this;
        return $this.platform.getQueryParams();
    }
}

export { ClientRoute }