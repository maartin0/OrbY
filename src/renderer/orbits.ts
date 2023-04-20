import { Vector3 } from 'three';

export const circularOrbit = (radius: number, speed?: number) => ((ms: bigint) => {
    const angle: number = ((Number(ms) / 1000) * (speed ?? 1)) % (Math.PI * 2);
    return new Vector3(
        radius * Math.cos(angle),
        0,
        radius * Math.sin(angle)
    );
});

export const ellipticalOrbit = (radius: number, eccentricity: number, periodMs: bigint) => ((ms: bigint) => {
    const angle: number = Number(ms % periodMs) / Number(periodMs) * (Math.PI * 2);
    const sin: number = Math.sin(angle);
    const cos: number = Math.cos(angle);
    const mul: number = radius * (1 - (eccentricity * eccentricity)) / (1 - (eccentricity * cos));
    return new Vector3(
        mul * cos,
        0,
        mul * sin,
    )
});
