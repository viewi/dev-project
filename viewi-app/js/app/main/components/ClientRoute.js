import { Subscriber } from "./Subscriber";
import { register } from "../../../viewi/core/di/register";

var Platform = register.Platform;

class ClientRoute {
    urlUpdateSubscriber = null;
    platform = null;

    constructor(platform) {
        var $this = this;
        $this.platform = platform;
        $this.urlUpdateSubscriber = new Subscriber($this.platform.getCurrentUrlPath());
        $this.platform.onUrlUpdate(function () {
            $this.urlUpdateSubscriber.publish($this.platform.getCurrentUrlPath());
        });
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

    urlWatcher() {
        var $this = this;
        return $this.urlUpdateSubscriber;
    }
}

export { ClientRoute }