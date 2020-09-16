"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePubSub = void 0;
function usePubSub() {
    var events = Object.create(null);
    function publish(event) {
        var data = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            data[_i - 1] = arguments[_i];
        }
        if (!events[event])
            return;
        events[event]
            .forEach(function (callback) { return callback.apply(void 0, data); });
    }
    function subscribe(event, callback) {
        if (!events[event]) {
            events[event] = [];
        }
        events[event].push(callback);
        var index = events[event].length - 1;
        return function () {
            events[event].splice(index, 1);
        };
    }
    function subscribeOnce(event, callback) {
        if (!events[event]) {
            events[event] = [];
        }
        var index = events[event].length;
        function unsubscribe() {
            events[event].splice(index, 1);
        }
        events[event].push(function () {
            var data = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                data[_i] = arguments[_i];
            }
            callback.apply(void 0, data);
            unsubscribe();
        });
    }
    function clearAllSubscriptions(event) {
        if (!event)
            return;
        events[event] = [];
    }
    function countSubscription(event) {
        if (!event || !events[event])
            return 0;
        return events[event].length;
    }
    return { publish: publish, subscribe: subscribe, subscribeOnce: subscribeOnce, clearAllSubscriptions: clearAllSubscriptions, countSubscription: countSubscription };
}
exports.usePubSub = usePubSub;
exports.default = usePubSub;
