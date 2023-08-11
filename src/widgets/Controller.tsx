import * as React from 'react';
import { useState } from 'react';
import SelectorWidget from './SelectorWidget';
import bodies from '../renderer/bodies';
import { setSelectedAlgorithms, setSelectedBodies } from '../renderer';
import algorithms from '../renderer/orbits';

export default () => {
    const [expanded, setExpanded] = useState<boolean>(false);
    return (
        <div className={`controls${expanded ? ' expanded' : ''}`}>
            <h2>Body Selection:</h2>
            <SelectorWidget id="body" options={Object.values(bodies)} setter={setSelectedBodies}/>
            <h2>Algorithm Selection:</h2>
            <SelectorWidget id="algorithm" options={algorithms} setter={setSelectedAlgorithms}/>
        </div>
    )
}
