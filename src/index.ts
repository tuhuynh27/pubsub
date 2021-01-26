function usePubSub (): PubSub {
    const events: Record<string, PubSubHandler[]> = Object.create(null)
    function publish (event: string, ...data: PubSubData[]): void {
        if (!events[event]) return

        events[event]
            .forEach(
                (callback: PubSubHandler) => {
                    if (callback) {
                        callback(...data)
                    }
                })
    }
    function subscribe (event: string, callback: PubSubHandler): PubSubUnsubscribe {
        if (!events[event]) {
            events[event] = []
        }
        const index = events[event].length
        events[event].push(callback)
        return function () {
            events[event][index] = null
        }
    }
    function subscribeOnce (event: string, callback: PubSubHandler): void {
        if (!events[event]) {
            events[event] = []
        }
        const index = events[event].length
        function unsubscribe () {
            events[event][index] = null
        }
        events[event].push((...data: PubSubData) => {
            callback(...data)
            unsubscribe()
        })
    }
    function clearAllSubscriptions (event: string): void {
        if (!event) return
        events[event] = []
    }
    function countSubscription (event: string): number {
        if (!event || !events[event]) return 0
        return events[event].length
    }
    return { publish, subscribe, subscribeOnce, clearAllSubscriptions, countSubscription }
}

export interface PubSub {
    publish (event: string, ...data: PubSubData[]): void
    subscribe (event: string, callback: PubSubHandler): PubSubUnsubscribe
    subscribeOnce (event: string, callback: PubSubHandler): void
    clearAllSubscriptions (event: string): void
    countSubscription (event: string): number
}

export type PubSubData = string | number | Record<any, any> | string[] | number[] | any

export type PubSubHandler = (...data: PubSubData[]) => void
export type PubSubUnsubscribe = () => void

export default usePubSub
