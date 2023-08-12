import { AlgorithmProps, PhysicalBody, Timestamp } from '../../types';
import { Vector3 } from 'three';

const mul = Math.PI / 180;
export const sin = (angle: number) => Math.sin(angle * mul);
export const cos = (angle: number) => Math.cos(angle * mul);

export const ELLIPSE_2D: AlgorithmProps = {
    id: 'ellipse2d',
    label: '2D Ellipse', // TODO
    defaultSelected: false,
    description: { value: 'todo' }, // TODO
    algorithm: (body: PhysicalBody, timestamp: Timestamp): Vector3 => {
        const { orbitalPeriodYears, trueAnomalyDegrees, semiMajorAxisAu, eccentricity } = body.properties.elements;
        const longitude = (360 * timestamp) / orbitalPeriodYears + trueAnomalyDegrees;
        const sinLongitude = sin(longitude);
        const cosLongitude = cos(longitude);
        const magnitude: number = semiMajorAxisAu * (1 - (eccentricity ** 2)) / (1 - (eccentricity * cosLongitude));
        return new Vector3(
            magnitude * sinLongitude,
            0,
            magnitude * cosLongitude,
        )
    },
};

export const ELLIPSE_2D_P: AlgorithmProps = {
    id: 'ellipse2dp',
    label: '2D Ellipse with correct perihelion longitude', // TODO
    defaultSelected: false,
    description: { value: 'todo' }, // TODO
    algorithm: (body: PhysicalBody, timestamp: Timestamp): Vector3 => {
        const { orbitalPeriodYears, trueAnomalyDegrees, semiMajorAxisAu, eccentricity } = body.properties.elements;
        const longitude = (360 * timestamp) / orbitalPeriodYears + trueAnomalyDegrees;
        const sinLongitude = sin(longitude);
        const cosLongitude = cos(longitude);
        const magnitude: number = semiMajorAxisAu * (1 - (eccentricity ** 2)) / (1 - (eccentricity * cosLongitude));
        return new Vector3(
            magnitude * sinLongitude,
            0,
            magnitude * cosLongitude,
        )
    },
};

export const ELLIPSE_3D: AlgorithmProps = {
    id: 'ellipse3d',
    label: '3D Ellipse', // TODO
    defaultSelected: true,
    description: { value: 'todo' }, // TODO
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
            magnitude * (constant0 * constant1 * constant2 + (constant0 * sinAscendingLongitude ** 2 + cosInclination) * constant3),
            magnitude * sinInclination * sinAscendingLongitude * (constant3 - constant2),
            magnitude * ((constant0 * cosAscendingLongitude ** 2 + cosInclination) * constant2 + constant0 * constant1 * constant3),
        );
    },
}

export default { ELLIPSE_2D, ELLIPSE_3D };
