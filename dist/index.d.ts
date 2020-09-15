export declare function usePubSub(): PubSub;
export interface PubSub {
    publish(event: string, ...data: PubSubData[]): void;
    subscribe(event: string, callback: PubSubHandler): PubSubUnsubscribe;
    clearAllSubscriptions(event: string): void;
    countSubscription(event: string): number;
}
export declare type PubSubData = string | number | Record<any, any> | string[] | number[] | any;
export declare type PubSubHandler = (...data: PubSubData[]) => void;
export declare type PubSubUnsubscribe = () => void;
export default usePubSub;
