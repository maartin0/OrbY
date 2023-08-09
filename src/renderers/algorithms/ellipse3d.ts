import type { Algorithm, PhysicalBody, Timestamp } from '../../types';
import { Vector3 } from 'three';

// TODO
export default class Ellipse3dAlgorithm implements Algorithm {
    setup(): void {
    }
    calculate(body: PhysicalBody, timestamp: Timestamp): Vector3 {
        return undefined;
    }
}

