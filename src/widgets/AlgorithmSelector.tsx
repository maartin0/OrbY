import * as React from "react";
import algorithms from '../renderer/orbits';
import { AlgorithmProps } from '../types';
import { setAlgorithmSelected } from '../renderer';
import InfoButton from './InfoButton';

export default () => {
    return (
        <div className="algorithm-selector">
            <h2>Algorithm Selection:</h2>
            {Object.entries(algorithms).map(([key, props]: [string, AlgorithmProps]) => (
               <div key={`${key}-algorithm-select`}>
                   <label>
                       <input type="checkbox"
                              defaultChecked={props.default}
                              onChange={(event) => setAlgorithmSelected(props.algorithm, event.target.checked)} />
                       <span>{props.label}</span>
                       <InfoButton>
                           <span>{props.description}</span>
                       </InfoButton>
                   </label>
               </div>
            ))}
        </div>
    );
}
