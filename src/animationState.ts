import { getDateString, now, programStart } from './util/date';
import { PerspectiveCamera, Scene } from 'three';
import { l1 } from './util/number';
import Body from './renderer/body';

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
        paused: boolean,
    },
    viewport: {
        scene: Scene,
        camera: PerspectiveCamera,
    },
    planets: Body[],
    lastTick: bigint, // Last actual time of tick, used for synchronising speeds
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
        animationState.planets = Body.getSortedBodies();
        broadcast();
    }
}

export function tick(): void {
    if (!animationState.animation.paused) {
        update(animationState.time.ms
            + (
                BigInt(animationState.animation.direction.valueOf())
                * BigInt(animationState.animation.speedRatio)
                * (now() - animationState.lastTick)
            )
        );
    }
    animationState.lastTick = now();
}

export function initialise(scene: Scene, camera: PerspectiveCamera): void {
    animationState = {
        time: {
            ms: programStart,
            label: getDateString(programStart),
        },
        animation: {
            direction: AnimationDirection.forward,
            speedRatio: l1,
            paused: false,
        },
        viewport: {
            scene,
            camera,
        },
        planets: [],
        lastTick: programStart,
    }
    update(programStart, true);
}
