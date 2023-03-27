import { getDateString } from './util/date';

export enum AnimationDirection {
    forward = 1,
    backward = -1,
}

export default interface AnimationState {
    time: {
        ms: bigint,
        label: string,
    },
    animation: {
        direction: AnimationDirection,
        speedRatio: bigint, // Speed ratio, e.g. 1: 1ms real = 1ms animation vs 1000 where 1s real = 1ms animation
    }
}

export let animationState: AnimationState;

export type Consumer<T> = (arg: T) => any;
export type Listener = Consumer<AnimationState>;

export const listeners: Listener[] = [];

export function subscribe(..._listeners: Listener[]): void {
    listeners.push(..._listeners);
}

function broadcast(): void {
    listeners.forEach(l => l(animationState));
}

export function update(ms: bigint, bypass?: boolean | undefined) {
    if (bypass || animationState.time.ms !== ms) {
        animationState.time.ms = ms;
        animationState.time.label = getDateString(ms);
        broadcast();
    }
}

// tick() should be called every ms
export function tick(): void {
    update(animationState.time.ms
        + (
            BigInt(animationState.animation.direction.valueOf())
            * animationState.animation.speedRatio
        )
    );
}

// Set initial state
update(BigInt(0), true);
