import type { PhysicalBody, PhysicalBodyAlgorithm, Timestamp } from '../../types';
import { Vector3 } from 'three';
import { cos, sin } from './index';

// TODO
export default class Ellipse2dAlgorithm implements PhysicalBodyAlgorithm {
    setup(): void {
    }

    calculate(body: PhysicalBody, timestamp: Timestamp): Vector3 {
        const {orbitalPeriodYears, trueAnomalyDegrees, semiMajorAxisAu, eccentricity} = body.properties.elements;
        const longitude = (360 * timestamp) / orbitalPeriodYears + trueAnomalyDegrees;
        const sinLongitude = sin(longitude);
        const cosLongitude = cos(longitude);
        const mul: number = semiMajorAxisAu * (1 - (eccentricity ** 2)) / (1 - (eccentricity * cosLongitude));
        return new Vector3(
            mul * cosLongitude,
            0,
            mul * sinLongitude,
        )
    }
}
