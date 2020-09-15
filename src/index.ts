function usePubSub(): PubSub {
    const events: Record<string, PubSubHandler[]> = Object.create(null)
    function publish (event: string, ...data: PubSubData[]): void {
        if (!events[event]) return

        events[event]
            .forEach(
                (callback: PubSubHandler) => callback(...data))
    }
    function subscribe (event: string, callback: PubSubHandler): PubSubUnsubscribe {
        if (!events[event] || !Array.isArray(events[event])) {
            events[event] = []
        }

        events[event].push(callback)

        const index = events[event].length - 1
        return function() {
            events[event].splice(index, 1)
        }
    }
    return { publish, subscribe }
}

export interface PubSub {
    publish (event: string, ...data: PubSubData[]): void
    subscribe (event: string, callback: PubSubHandler): PubSubUnsubscribe
}

export type PubSubData = string | number | Record<any, any> | string[] | number[] |  any

export type PubSubHandler = (...data: PubSubData[]) => void
export type PubSubUnsubscribe = () => void

export default usePubSub
