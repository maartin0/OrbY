import { Vector3 } from 'three';

export const circularOrbit = (radius: number, speed?: number) => ((ms: bigint) => {
    const angle: number = ((Number(ms) / 1000) * (speed ?? 1)) % (Math.PI * 2);
    return new Vector3(
        radius * Math.cos(angle),
        0,
        radius * Math.sin(angle)
    );
});
