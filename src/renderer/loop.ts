import { tickAll } from './index';


const mul: number = 1/(1000 * 60 * 60 * 24 * 365.25);
const now = () => Math.round((Date.now())) * mul - 30;

export const loopState = {
    frame: 0,
    lastTick: now(),
    pointer: now(),
    speed: 1/mul/10,
};

export function tick() {
    loopState.pointer += (now() - loopState.lastTick) * loopState.speed;
    loopState.lastTick = now();
    loopState.frame += 1;
    tickAll(loopState.pointer);
}
