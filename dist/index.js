export function usePubSub() {
    const events = Object.create(null);
    function publish(event, ...data) {
        if (!events[event])
            return;
        events[event]
            .forEach((callback) => callback(...data));
    }
    function subscribe(event, callback) {
        if (!events[event]) {
            events[event] = [];
        }
        events[event].push(callback);
        const index = events[event].length - 1;
        return function () {
            events[event].splice(index, 1);
        };
    }
    return { publish, subscribe };
}
export default usePubSub;
