import * as React from "react";
import { useState } from 'react';
import PhysicalBodySelector from './PhysicalBodySelector';
import AlgorithmSelector from './AlgorithmSelector';

export default () => {
    const [expanded, setExpanded] = useState<boolean>(false);
    return (
        <div className={`controls${expanded ? ' expanded' : ''}`}>
            <PhysicalBodySelector />
            <AlgorithmSelector />
        </div>
    )
}
