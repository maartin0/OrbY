/* Properties from Horizons API: https://ssd-api.jpl.nasa.gov/doc/horizons.html */
import {Line, Mesh, Vector3} from 'three';

export interface Texture {
    color: string,
    // TODO
}

export interface Description {
    value?: string,
    wikipedia?: string,
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

export interface PhysicalBody extends Selectable {
    id: number,
    type: PhysicalBodyType,
    texture: Texture,
    parent?: PhysicalBody | undefined,
    properties: PhysicalBodyProperties,
    label: string,
    description: Description,
    defaultSelected: boolean,
}

export interface PhysicalBodyProperties {
    radiusAu: number, // Mean body radius
    massRel: number, // Mass relative to earth
    rotationPeriodYears: number,
    elements: KeplerianElements,
    elementPairs: KeplerianElementPairs,
}

export interface GenericKeplerianElements<T> {
    semiMajorAxisAu: T,
    eccentricity: T,
    inclinationDegrees: T,
    orbitalPeriodYears: T,
    perihelionLongitudeDegrees: T,
    ascendingLongitudeDegrees: T,
    trueAnomalyDegrees: T,
    startingLongitudeDegrees: T,
}

export interface KeplerianElementPair {
    offset: number,
    mul: number,
}

export type KeplerianElements = GenericKeplerianElements<number>;

export interface KeplerianElementPairs {
    semiMajorAxisAu: KeplerianElementPair,
    eccentricity: KeplerianElementPair,
    inclinationDegrees: KeplerianElementPair,
    perihelionLongitudeDegrees: KeplerianElementPair,
    ascendingLongitudeDegrees: KeplerianElementPair,
    startingLongitudeDegrees: KeplerianElementPair,
}

export const computeElements = (pairs: KeplerianElementPairs, timestamp: Timestamp): Record<keyof KeplerianElementPairs, number> => Object.fromEntries(
    Object.entries(pairs)
        .map(([k, {mul, offset}]) =>
            [k, mul * (timestamp / 100) + offset]
        )) as Record<keyof KeplerianElementPairs, number>;

export interface PhysicalBodyNode {
    body: PhysicalBody,
    algorithmProps: AlgorithmProps,
    mesh: Mesh,
    line: Line,
    points: Vector3[],
}

// Timestamp is seconds from the year 0
export type Timestamp = number;

export interface AlgorithmProps extends Selectable {
    id: string,
    algorithm: (body: PhysicalBody, timestamp: Timestamp) => Vector3,
    label: string,
    description: Description,
    defaultSelected: boolean,
}

export interface Selectable {
    id: number | string,
    label: string,
    description?: Description,
    defaultSelected: boolean,
}

export interface SpirographOption extends Selectable {
    id: string,
    label: string,
    defaultSelected: boolean,
    from: PhysicalBodyNode,
    to: PhysicalBodyNode,
    lastPlot: number,
    plotInterval: number,
    lines: Line[],
    end: number,
}
