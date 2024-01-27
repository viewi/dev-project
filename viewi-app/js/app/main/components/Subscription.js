import { Subscriber } from "./Subscriber";

class Subscription {
    subscriber = null;
    notifyCallback = null;
    constructor(subscriber, notifyCallback) {
        var $this = this;
        $this.subscriber = subscriber;
        $this.notifyCallback = notifyCallback;
    }

    unsubscribe() {
        var $this = this;
        $this.subscriber.unsubscribe($this);
    }
}

export { Subscription }