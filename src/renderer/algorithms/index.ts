// import Ellipse2dAlgorithm from './ellipse2d';
import Ellipse3dAlgorithm from './ellipse3d';
// import CalculatedHorizonsAlgorithm from './calculatedHorizons';
import { AlgorithmProps } from '../../types';

const algorithms: Record<string, AlgorithmProps> = {
    // "ellipse2d": {
    //     algorithm: new Ellipse2dAlgorithm(),
    //     label: "2D Ellipse", // TODO
    //     default: false,
    //     description: "todo", // TODO
    // },
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
