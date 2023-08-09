/* Properties from Horizons API: https://ssd-api.jpl.nasa.gov/doc/horizons.html */
import { Vector3 } from 'three';

interface PhysicalBody {
    label: string,
    epoch: number,
    eccentricity: number,
    perihelionDistanceAu: number,
    perihelionJulianDayNumber: number,
    longitudeAscendingNodeDegrees: number,
    perihelionArgumentDegrees: number,
    inclinationDegrees: number,
    meanAnomalyDegrees: number,
    semiMajorAxis: number,
    meanMotionDegreesPerDay: number,
    radiusKm: number,
}

// Timestamp is seconds from the year 0
type Timestamp = number;

interface Algorithm {
    setup(): void,
    calculate(body: PhysicalBody, timestamp: Timestamp): Vector3,
}
