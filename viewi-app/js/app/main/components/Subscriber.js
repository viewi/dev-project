import { Subscription } from "./Subscription";
import { array_search } from "../functions/array_search";
import { array_splice } from "../functions/array_splice";

class Subscriber {
    dataState = null;
    subscribers = [];

    constructor(defaultValue) {
        var $this = this;
        defaultValue = typeof defaultValue !== 'undefined' ? defaultValue : null;
        if (defaultValue !== null) {
            $this.dataState = {"data": defaultValue};
        }
    }

    subscribe(callback) {
        var $this = this;
        var subscription = new Subscription($this, callback);
        $this.subscribers.push(subscription);
        subscription.notifyCallback($this.dataState ? $this.dataState["data"] : null);
        return subscription;
    }

    unsubscribe(subscription) {
        var $this = this;
        var index = array_search(subscription, $this.subscribers);
        if (index !== false) {
            array_splice($this.subscribers, index, 1);
        }
    }

    notify() {
        var $this = this;
        for (var _i0 in $this.subscribers) {
            var subscription = $this.subscribers[_i0];
            subscription.notifyCallback($this.dataState ? $this.dataState["data"] : null);
        }
    }

    reset() {
        var $this = this;
        $this.dataState = null;
        $this.notify();
    }

    publish(data) {
        var $this = this;
        $this.dataState = {"data": data};
        $this.notify();
    }
}

export { Subscriber }