import Ellipse3dAlgorithm from './ellipse3d';
// import CalculatedHorizonsAlgorithm from './calculatedHorizons';
import { AlgorithmProps } from '../../types';
import Ellipse2dAlgorithm from './ellipse2d';

const mul = Math.PI / 180;
export const sin = (angle: number) => Math.sin(angle * mul);
export const cos = (angle: number) => Math.cos(angle * mul);

const algorithms: Record<string, AlgorithmProps> = {
    "ellipse2d": {
        algorithm: new Ellipse2dAlgorithm(),
        label: "2D Ellipse", // TODO
        default: false,
        description: "todo", // TODO
    },
    "ellipse3d": {
        algorithm: new Ellipse3dAlgorithm(),
        label: "3D Ellipse", // TODO
        default: true,
        description: "todo", // TODO
    },
    // "calculatedHorizons":  {
    //     algorithm: new CalculatedHorizonsAlgorithm(),
    //     label: "Calculated Horizons", // TODO
    //     default: false,
    //     description: "todo", // TODO
    // },
};

export default algorithms;
