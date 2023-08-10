// import CalculatedHorizonsAlgorithm from './calculatedHorizons';
import { AlgorithmProps, PhysicalBody, Timestamp } from '../types';
import { Vector3 } from 'three';

const mul = Math.PI / 180;
export const sin = (angle: number) => Math.sin(angle * mul);
export const cos = (angle: number) => Math.cos(angle * mul);

const algorithms: Record<string, AlgorithmProps> = {
    'ellipse2d': {
        label: '2D Ellipse', // TODO
        default: false,
        description: 'todo', // TODO
        algorithm: (body: PhysicalBody, timestamp: Timestamp): Vector3 => {
            const { orbitalPeriodYears, trueAnomalyDegrees, semiMajorAxisAu, eccentricity } = body.properties.elements;
            const longitude = (360 * timestamp) / orbitalPeriodYears + trueAnomalyDegrees;
            const sinLongitude = sin(longitude);
            const cosLongitude = cos(longitude);
            const mul: number = semiMajorAxisAu * (1 - (eccentricity ** 2)) / (1 - (eccentricity * cosLongitude));
            return new Vector3(
                mul * cosLongitude,
                0,
                mul * sinLongitude,
            )
        },
    },
    'ellipse3d': {
        label: '3D Ellipse', // TODO
        default: true,
        description: 'todo', // TODO
        algorithm: (body: PhysicalBody, timestamp: Timestamp): Vector3 => {
            const {
                semiMajorAxisAu,
                eccentricity,
                inclinationDegrees,
                orbitalPeriodYears,
                perihelionLongitudeDegrees,
                ascendingLongitudeDegrees,
                trueAnomalyDegrees,
            } = body.properties.elements;
            const longitude = (360 * timestamp) / orbitalPeriodYears + trueAnomalyDegrees;
            const sinLongitude = sin(longitude);
            const cosLongitude = cos(longitude);

            const sinInclination = sin(inclinationDegrees);
            const cosInclination = cos(inclinationDegrees);

            const sinPerihelionLongitude = sin(perihelionLongitudeDegrees);
            const cosPerihelionLongitude = cos(perihelionLongitudeDegrees);

            const sinAscendingLongitude = sin(ascendingLongitudeDegrees);
            const cosAscendingLongitude = cos(ascendingLongitudeDegrees); // TODO move constants into setup

            const magnitude = semiMajorAxisAu * (1 - eccentricity ** 2) / (1 + eccentricity * cosLongitude);

            const constant0 = 1 - cosInclination;
            const constant1 = sinAscendingLongitude * cosAscendingLongitude;
            const constant2 = cosPerihelionLongitude * cosLongitude - sinPerihelionLongitude * sinLongitude;
            const constant3 = sinPerihelionLongitude * cosLongitude + cosPerihelionLongitude * sinLongitude;

            return new Vector3(
                magnitude * ((constant0 * cosAscendingLongitude ** 2 + cosInclination) * constant2 + constant0 * constant1 * constant3),
                magnitude * sinInclination * sinAscendingLongitude * (constant3 - constant2),
                magnitude * (constant0 * constant1 * constant2 + (constant0 * sinAscendingLongitude ** 2 + cosInclination) * constant3),
            );
        },
    },
    // "calculatedHorizons":  {
    //     algorithm: new CalculatedHorizonsAlgorithm(),
    //     label: "Calculated Horizons", // TODO
    //     default: false,
    //     description: "todo", // TODO
    // },
};

export default algorithms;
