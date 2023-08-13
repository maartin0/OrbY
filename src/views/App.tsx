import * as React from 'react';
import { useEffect, useState } from 'react';
import Controller from '../widgets/Controller';
import Labeler from '../widgets/Labeler';
import { scheduleUpdate } from '../renderer';
import { loopState } from '../renderer/loop';
import { orbitControls } from '../renderer/controller';

export default () => {
    const [expanded, setExpanded] = useState<boolean>(false);
    useEffect(() => {
        loopState.paused = expanded;
        orbitControls.enabled = !expanded;
    }, [expanded]);
    return (
        <>
            <Labeler />
            <Controller show={expanded} />
            {expanded ? <>
                <div className="expander expanded" onClick={() => {
                    scheduleUpdate();
                    setExpanded(false);
                }}>
                    <span>Resume</span>
                </div>
            </> : <div className="expander" onClick={() => setExpanded(true)}>
                <span>Show controls</span>
            </div>}
        </>
    );
};
