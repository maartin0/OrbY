import { tickAll } from './index';

const mul: number = 1/(1000 * 60 * 60 * 24 * 365.25);
export const getYears = (ms: number) => ms * mul + 30;
export const getMs = (years: number) => (years - 30) / mul;
const getNow = () => getYears(Math.round((Date.now())));

export const loopState = {
    frame: 0,
    lastTick: getNow(),
    pointer: getNow(),
    speed: 1,
    fps: 0,
};

export function tick() {
    const now = getNow();
    loopState.pointer += (now - loopState.lastTick) * loopState.speed;
    loopState.fps = (now - loopState.lastTick) / mul;
    loopState.lastTick = now;
    loopState.frame += 1;
    tickAll(loopState.pointer);
}
