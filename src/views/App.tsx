import * as React from "react";
import PhysicalBodySelector from '../widgets/PhysicalBodySelector';
import AlgorithmSelector from '../widgets/AlgorithmSelector';

export default () => (
    <>
        <div className="controls">
            <PhysicalBodySelector />
            <AlgorithmSelector />
        </div>
    </>
);
