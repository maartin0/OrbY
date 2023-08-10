import type { PhysicalBodyAlgorithm, PhysicalBody, Timestamp } from '../../types';
import { Vector3 } from 'three';

// TODO
export default class Ellipse2dAlgorithm implements PhysicalBodyAlgorithm {
    setup(): void {
    }

    calculate(body: PhysicalBody, timestamp: Timestamp): Vector3 {
        return undefined;
    }
}
