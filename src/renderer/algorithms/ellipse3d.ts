import type { PhysicalBodyAlgorithm, PhysicalBody, Timestamp } from '../../types';
import { Vector3 } from 'three';
import { cos, sin } from './index';

// TODO
export default class Ellipse3dAlgorithm implements PhysicalBodyAlgorithm {
    setup(): void {
    }

    calculate(body: PhysicalBody, timestamp: Timestamp): Vector3 {
        const {semiMajorAxisAu, eccentricity, inclinationDegrees, orbitalPeriodYears, perihelionLongitudeDegrees, ascendingLongitudeDegrees, trueAnomalyDegrees} = body.properties.elements;
        const longitude = (360 * timestamp) / orbitalPeriodYears + trueAnomalyDegrees;
        const sinLongitude = sin(longitude);
        const cosLongitude = cos(longitude);

        const sinInclination = sin(inclinationDegrees);
        const cosInclination = cos(inclinationDegrees);

        const sinPerihelionLongitude = sin(perihelionLongitudeDegrees);
        const cosPerihelionLongitude = cos(perihelionLongitudeDegrees);

        const sinAscendingLongitude = sin(ascendingLongitudeDegrees);
        const cosAscendingLongitude = cos(ascendingLongitudeDegrees); // TODO move constants into setup

        const magnitude = semiMajorAxisAu * (1 - eccentricity**2) / (1 + eccentricity * cosLongitude);

        const constant0 = 1 - cosInclination;
        const constant1 = sinAscendingLongitude * cosAscendingLongitude;
        const constant2 = cosPerihelionLongitude * cosLongitude - sinPerihelionLongitude * sinLongitude;
        const constant3 = sinPerihelionLongitude * cosLongitude + cosPerihelionLongitude * sinLongitude;

        return new Vector3(
            magnitude * constant0 * ((cosAscendingLongitude**2 + cosInclination) * constant2 + constant1 * constant3),
            magnitude * constant0 * (constant1 * constant2 + (sinAscendingLongitude**2 + cosInclination) * constant3),
            magnitude * sinInclination * sinAscendingLongitude * (constant3 - constant2),
        );
    }
}

