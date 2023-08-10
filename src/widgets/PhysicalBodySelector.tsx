import * as React from 'react';
import bodies from '../renderer/bodies';
import { PhysicalBody } from '../types';
import InfoButton from './InfoButton';
import { setBodySelected } from '../renderer';

export default () => {
    return (
        <div className="body-selector">
            <h2>Body Selection:</h2>
            {Object.values(bodies).map((body: PhysicalBody) => (
                <div key={`${body.id}-body-select`}>
                    <label>
                        <input type="checkbox"
                               defaultChecked={true}
                               onChange={(event) => setBodySelected(body, event.target.checked)} />
                        <span>{body.label}</span>
                        <InfoButton>
                            <span><a href={body.description.wikipedia}>wikipedia</a></span>
                        </InfoButton>
                    </label>
                </div>
            ))}
        </div>
    );
}
