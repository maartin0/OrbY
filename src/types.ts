/* Properties from Horizons API: https://ssd-api.jpl.nasa.gov/doc/horizons.html */
import { Line, Mesh, Vector3 } from 'three';

export interface Texture {
    color: string,
    // TODO
}

export interface Description {
    wikipedia: string,
    // TODO
}

export enum PhysicalBodyType {
    STAR,
    PLANET,
    ASTEROID,
    NATURAL_SATELLITE,
    ARTIFICIAL_SATELLITE,
    DWARF_PLANET,
    MOON,
}

export interface PhysicalBody {
    id: number,
    label: string,
    type: PhysicalBodyType,
    texture: Texture,
    parent?: PhysicalBody | undefined,
    description: Description,
    properties: PhysicalBodyProperties,
}

export interface PhysicalBodyProperties {
    radiusAu: number, // Mean body radius
    massRel: number, // Mass relative to earth
    rotationPeriodYears: number,
    startingLongitudeDegrees: number,
    elements: KeplerianElements,
}

export interface KeplerianElements {
    semiMajorAxisAu: number,
    eccentricity: number,
    inclinationDegrees: number,
    orbitalPeriodYears: number,
    perihelionLongitudeDegrees: number,
    ascendingLongitudeDegrees: number,
    trueAnomalyDegrees: number,
}

export interface PhysicalBodyNode {
    body: PhysicalBody,
    algorithm: PhysicalBodyAlgorithm,
    mesh: Mesh,
    line: Line,
    points: Vector3[],
}

// Timestamp is seconds from the year 0
export type Timestamp = number;

export interface AlgorithmProps {
    algorithm: PhysicalBodyAlgorithm,
    default: boolean,
    label: string,
    description: string,
}

export type PhysicalBodyAlgorithm = (body: PhysicalBody, timestamp: Timestamp) => Vector3;
