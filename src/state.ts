import { getDateString } from "./util/date";

export enum AnimationDirection {
    forward = 1,
    backward = -1,
}

export interface State {
    time: {
        ms: bigint,
        label: string,
    },
    animation: {
        direction: AnimationDirection,
        speedRatio: bigint, // Speed ratio, e.g. 1: 1ms real = 1ms animation vs 1000 where 1s real = 1ms animation
    }
}

export let state: State;

export type Consumer<T> = (arg: T) => any;
export type Listener = Consumer<State>;

export const listeners: Listener[] = [];

export function subscribe(..._listeners: Listener[]): void {
    listeners.push(..._listeners);
}

function broadcast(): void {
    listeners.forEach(l => l(state));
}

export function update(ms: bigint) {
    if (state.time.ms !== ms) {
        state.time.ms = ms;
        state.time.label = getDateString(ms);
        broadcast();
    }
}

// tick() should be called every ms
export function tick(): void {
    update(state.time.ms
        + (
            BigInt(state.animation.direction.valueOf())
            * state.animation.speedRatio
        )
    );
}
