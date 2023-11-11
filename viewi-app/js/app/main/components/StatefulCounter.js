import { CounterReducer } from "./CounterReducer";
import { BaseComponent } from "../../../viewi/core/component/baseComponent";

class StatefulCounter extends BaseComponent {
    _name = 'StatefulCounter';
    counter = null;
    count = null;
    constructor(counter, count) {
        super();
        var $this = this;
        count = typeof count !== 'undefined' ? count : 0;
        $this.counter = counter;
        $this.count = count;
        $this.counter.count+=100;
    }
}

export const StatefulCounter_x = [
    function (_component) { return function (event) { _component.counter.decrement(); }; },
    function (_component) { return _component.__id; },
    function (_component) { return _component.counter.count; },
    function (_component) { return function (event) { _component.counter.increment(); }; }
];

export { StatefulCounter }