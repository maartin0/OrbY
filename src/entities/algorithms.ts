import { AlgorithmProps, PhysicalBody, Timestamp } from '../types';
import { Vector3 } from 'three';

const mul = Math.PI / 180;
export const sin = (angle: number) => Math.sin(angle * mul);
export const cos = (angle: number) => Math.cos(angle * mul);

export const ELLIPSE_2D: AlgorithmProps = {
    id: 'ellipse2d',
    label: '2D Ellipse',
    defaultSelected: false,
    description: { value: '2D Ellipse' },
    algorithm: (body: PhysicalBody, timestamp: Timestamp): Vector3 => {
        const {
            semiMajorAxisAu,
            eccentricity,
            orbitalPeriodYears,
            startingLongitudeDegrees,
        } = body.properties.elements;

        const longitude = (360 * timestamp) / orbitalPeriodYears + startingLongitudeDegrees;
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
    label: '2D Ellipse + P',
    defaultSelected: false,
    description: { value: '2D Ellipse with correct perihelion longitude' },
    algorithm: (body: PhysicalBody, timestamp: Timestamp): Vector3 => {
        const {
            semiMajorAxisAu,
            eccentricity,
            orbitalPeriodYears,
            perihelionLongitudeDegrees,
            trueAnomalyDegrees,
        } = body.properties.elements;

        const longitude = (360 * timestamp) / orbitalPeriodYears + trueAnomalyDegrees;
        const sinLongitude = sin(longitude);
        const cosLongitude = cos(longitude);

        const sinPerihelionLongitude = sin(perihelionLongitudeDegrees);
        const cosPerihelionLongitude = cos(perihelionLongitudeDegrees);

        const magnitudeP: number = semiMajorAxisAu * (1 - (eccentricity ** 2)) / (1 + (eccentricity * cosLongitude));

        const constant0 = cosPerihelionLongitude * cosLongitude - sinPerihelionLongitude * sinLongitude;
        const constant1 = sinPerihelionLongitude * cosLongitude + cosPerihelionLongitude * sinLongitude;

        return new Vector3(
            magnitudeP * constant1,
            0,
            magnitudeP * constant0,
        )
    },
};

export const ELLIPSE_3D: AlgorithmProps = {
    id: 'ellipse3d',
    label: '3D Ellipse',
    defaultSelected: false,
    description: { value: '3D Ellipse' },
    algorithm: (body: PhysicalBody, timestamp: Timestamp): Vector3 => {
        const {
            semiMajorAxisAu,
            eccentricity,
            inclinationDegrees,
            orbitalPeriodYears,
            startingLongitudeDegrees,
        } = body.properties.elements;

        const longitude = (360 * timestamp) / orbitalPeriodYears + startingLongitudeDegrees;
        const sinLongitude = sin(longitude);
        const cosLongitude = cos(longitude);

        const sinInclination = sin(inclinationDegrees);
        const cosInclination = cos(inclinationDegrees);

        const magnitude: number = semiMajorAxisAu * (1 - (eccentricity ** 2)) / (1 - (eccentricity * cosLongitude));

        return new Vector3(
            magnitude * sinLongitude,
            magnitude * cosLongitude * sinInclination,
            magnitude * cosLongitude * cosInclination,
        )
    },
};

export const ELLIPSE_3D_P: AlgorithmProps = {
    id: 'ellipse3dp',
    label: '3D Ellipse + P',
    defaultSelected: false,
    description: { value: '3D Ellipse with correct perihelion longitude' },
    algorithm: (body: PhysicalBody, timestamp: Timestamp): Vector3 => {
        const {
            semiMajorAxisAu,
            eccentricity,
            inclinationDegrees,
            orbitalPeriodYears,
            perihelionLongitudeDegrees,
            trueAnomalyDegrees,
        } = body.properties.elements;

        const longitude = (360 * timestamp) / orbitalPeriodYears + trueAnomalyDegrees;
        const sinLongitude = sin(longitude);
        const cosLongitude = cos(longitude);

        const sinInclination = sin(inclinationDegrees);
        const cosInclination = cos(inclinationDegrees);

        const sinPerihelionLongitude = sin(perihelionLongitudeDegrees);
        const cosPerihelionLongitude = cos(perihelionLongitudeDegrees);

        const magnitudeP: number = semiMajorAxisAu * (1 - (eccentricity ** 2)) / (1 + (eccentricity * cosLongitude));

        const constant0 = sinPerihelionLongitude * cosLongitude + cosPerihelionLongitude * sinLongitude;
        const constant1 = cosPerihelionLongitude * cosLongitude - sinPerihelionLongitude * sinLongitude;

        return new Vector3(
            magnitudeP * constant0,
            magnitudeP * constant1 * sinInclination,
            magnitudeP * constant1 * cosInclination,
        )
    },
};

export const ELLIPSE_3D_A: AlgorithmProps = {
    id: 'ellipse3da',
    label: '3D Ellipse + A',
    defaultSelected: false,
    description: { value: '3D Ellipse with correct ascending node longitude' },
    algorithm: (body: PhysicalBody, timestamp: Timestamp): Vector3 => {
        const {
            semiMajorAxisAu,
            eccentricity,
            inclinationDegrees,
            orbitalPeriodYears,
            ascendingLongitudeDegrees,
            startingLongitudeDegrees,
        } = body.properties.elements;

        const longitude = (360 * timestamp) / orbitalPeriodYears + startingLongitudeDegrees;
        const sinLongitude = sin(longitude);
        const cosLongitude = cos(longitude);

        const sinInclination = sin(inclinationDegrees);
        const cosInclination = cos(inclinationDegrees);

        const sinAscendingLongitude = sin(ascendingLongitudeDegrees);
        const cosAscendingLongitude = cos(ascendingLongitudeDegrees);

        const magnitude: number = semiMajorAxisAu * (1 - (eccentricity ** 2)) / (1 - (eccentricity * cosLongitude));

        const constant2 = 1 - cosInclination;
        const constant3 = sinAscendingLongitude * cosAscendingLongitude;

        return new Vector3(
            magnitude * ((constant2 * sinAscendingLongitude ** 2 + cosInclination) * sinLongitude + constant2 * constant3 * cosLongitude),
            magnitude * sinInclination * (cosAscendingLongitude * sinLongitude - sinAscendingLongitude * cosLongitude),
            magnitude * (constant2 * constant3 * sinLongitude + (constant2 * cosAscendingLongitude ** 2 + cosInclination) * cosLongitude),
        )
    },
};

export const ELLIPSE_3D_P_A: AlgorithmProps = {
    id: 'ellipse3dpa',
    label: '3D Ellipse + P + A',
    defaultSelected: true,
    description: { value: '3D Ellipse with correct perihelion and ascending node longitudes' },
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

        const magnitudeP = semiMajorAxisAu * (1 - eccentricity ** 2) / (1 + eccentricity * cosLongitude);

        const constant0 = sinPerihelionLongitude * cosLongitude + cosPerihelionLongitude * sinLongitude;
        const constant1 = cosPerihelionLongitude * cosLongitude - sinPerihelionLongitude * sinLongitude;
        const constant2 = 1 - cosInclination;
        const constant3 = sinAscendingLongitude * cosAscendingLongitude;

        return new Vector3(
            magnitudeP * ((constant2 * sinAscendingLongitude ** 2 + cosInclination) * constant0 + constant2 * constant3 * constant1),
            magnitudeP * sinInclination * (cosAscendingLongitude * constant0 - sinAscendingLongitude * constant1),
            magnitudeP * (constant2 * constant3 * constant0 + (constant2 * cosAscendingLongitude ** 2 + cosInclination) * constant1),
        );
    },
}

export default { ELLIPSE_2D, ELLIPSE_2D_P, ELLIPSE_3D, ELLIPSE_3D_P, ELLIPSE_3D_A, ELLIPSE_3D_P_A };
